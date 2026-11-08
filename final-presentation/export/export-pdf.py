"""Export the deck to a PDF, one page per stop.

Serves website/ locally, opens it in headless Chromium (Playwright), jumps to
every stop, hides the HUD and screenshots the 1920x1080 stage. Video stops get
a still slide with four key frames from img/video/ instead of the player.

    python3 website/export/export-pdf.py [out.pdf]
"""
import functools
import http.server
import io
import sys
import threading
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

SITE = Path(__file__).resolve().parent.parent
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else SITE / 'meaningful-connections-slides.pdf'
SCALE = 1.5  # device pixels per stage pixel, for sharp text

VIDEOS = {
    'part2-video': {
        'kicker': 'Video (3:09): design scenario DS-01 as use case UC02',
        'title': 'Elena and Jan’s first week.',
        'frames': [('story-6', 'Elena decides what other residents may know'),
                   ('story-62', 'The coordinator approves one of three matches'),
                   ('story-86', 'The next morning Pepper asks Jan in private'),
                   ('story-122', 'The next day they walk round the garden')],
    },
    'demo-video': {
        'kicker': 'Video (3:42): proof of concept (github.com/gintskk/sce-poc)',
        'title': 'The proof of concept, running.',
        'frames': [('demo-14', 'Start screen: phone view and operator panel'),
                   ('demo-70', 'Getting-to-know-you conversation with Elena, in Dutch'),
                   ('demo-98', 'Residents she might like to meet'),
                   ('demo-165', 'A simulated Pepper talking with another resident')],
    },
}

VIDEO_SLIDE = """
(spec) => {
  const el = document.createElement('section');
  el.id = 'print-video';
  el.style.cssText = 'position:absolute;inset:0;background:var(--bg);z-index:50;padding:110px 120px 0;box-sizing:border-box';
  el.innerHTML = `<div class="kicker" style="font:600 15px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--elena)">${spec.kicker}</div>
    <h2 style="font:500 64px/1.05 var(--serif);color:var(--ink);margin:18px 0 34px">${spec.title}</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:26px 36px">${spec.frames.map(([f, c]) =>
      `<figure style="margin:0"><img src="img/video/${f}.jpg" style="width:100%;height:330px;object-fit:cover;object-position:top;border:1px solid var(--line);border-radius:10px;display:block">
       <figcaption style="font:400 19px/1.3 var(--sans);color:var(--ink-2);margin-top:10px">${c}</figcaption></figure>`).join('')}</div>`;
  document.getElementById('stage').appendChild(el);
  return Promise.all([...el.querySelectorAll('img')].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
}
"""


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(SITE))
    handler.log_message = lambda *a: None
    httpd = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main():
    httpd = serve()
    url = f'http://127.0.0.1:{httpd.server_port}/index.html'
    pages = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome')
        page = browser.new_page(viewport={'width': 1920, 'height': 1080}, device_scale_factor=SCALE)
        page.goto(url)
        page.wait_for_function('document.documentElement.classList.contains("ready")')
        page.add_style_tag(content='#hud, .hint { display: none !important; } video { visibility: hidden; }')
        stops = page.evaluate('Deck.stops.map(s => s.id)')
        for i, sid in enumerate(stops):
            page.evaluate('i => Deck.goTo(i, { instant: true })', i)
            page.evaluate('() => document.getElementById("print-video")?.remove()')
            if sid in VIDEOS:
                page.evaluate(VIDEO_SLIDE, VIDEOS[sid])
            page.wait_for_timeout(3000 if i == 0 else 700)
            png = page.screenshot()
            pages.append(Image.open(io.BytesIO(png)).convert('RGB'))
            print(f'{i + 1:2d}/{len(stops)} {sid}')
        browser.close()
    httpd.shutdown()
    pages[0].save(OUT, save_all=True, append_images=pages[1:], resolution=72 * SCALE, quality=90)
    print('Wrote', OUT)


if __name__ == '__main__':
    main()
