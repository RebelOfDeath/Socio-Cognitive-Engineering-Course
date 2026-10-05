/*
 * Deck engine.
 *
 * The whole presentation is one paused GSAP timeline. Scroll position is the
 * playhead: one timeline unit is one viewport height of scrolling. Named stops
 * sit at fixed timeline positions; the keyboard, clicker, wheel (in step mode)
 * and touch all glide the scroll position from one stop to the next, so every
 * transition is scrubbed and can be replayed backwards.
 */
(function () {
  'use strict';

  const W = 1920, H = 1080;
  const stage = document.getElementById('stage');
  const scroller = document.getElementById('scroller');
  const hud = document.getElementById('hud');
  const indexEl = document.getElementById('index');

  let stops = [], chapters = [], byId = {}, total = 0, tl = null, unit = 1;
  let curT = 0, stepMode = true, nav = null, indexOpen = false, lastIdx = -1;
  const proxies = [];
  const revealed = new WeakSet();

  /* ---------------------------------------------------------------- stage */

  function fit() {
    const s = Math.min(innerWidth / W, innerHeight / H);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }

  function layout() {
    const t = curT;
    unit = Math.max(400, innerHeight);
    scroller.style.height = Math.ceil(total * unit + innerHeight) + 'px';
    window.scrollTo(0, t * unit);
  }

  function render() {
    curT = Math.min(total, Math.max(0, window.scrollY / unit));
    tl.time(curT, true);
    for (const p of proxies) p.apply();
    updateHud();
  }

  let rafPending = false;
  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => { rafPending = false; render(); scheduleSettle(); });
  }

  /* ----------------------------------------------------------- navigation */

  const easeInOut = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  function cancelNav() {
    if (nav) { cancelAnimationFrame(nav.raf); nav = null; }
  }

  function goTo(i, opts = {}) {
    i = Math.max(0, Math.min(stops.length - 1, i));
    const target = stops[i].t * unit;
    const from = window.scrollY;
    cancelNav();
    if (opts.instant || Math.abs(target - from) < 1) {
      window.scrollTo(0, target);
      render(); settle();
      return;
    }
    const forward = target > from;
    const span = Math.abs(stops[i].t - curT);
    let dur;
    if (opts.dur) dur = opts.dur;
    else if (forward && span <= stops[i].w + 1e-6) dur = stops[i].dur || 1300;
    else dur = Math.min(2400, 650 + span * 260);
    if (!forward) dur = Math.min(dur, 1000);

    const t0 = performance.now();
    nav = { raf: 0, i };
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, from + (target - from) * easeInOut(k));
      render();
      if (k < 1) nav.raf = requestAnimationFrame(step);
      else { nav = null; settle(); }
    };
    nav.raf = requestAnimationFrame(step);
  }

  function currentIndex() {
    let idx = 0;
    for (let k = 0; k < stops.length; k++) if (stops[k].t <= curT + 1e-3) idx = k;
    return idx;
  }

  function next() {
    const i = nav ? nav.i + 1 : stops.findIndex(s => s.t > curT + 0.01);
    if (i > 0 && i < stops.length) goTo(i);
  }

  function prev() {
    let i = -1;
    if (nav) i = nav.i - 1;
    else for (let k = 0; k < stops.length; k++) if (stops[k].t < curT - 0.01) i = k;
    if (i >= 0) goTo(i);
  }

  let settleTimer = 0;
  function scheduleSettle() { clearTimeout(settleTimer); settleTimer = setTimeout(settle, 260); }
  function settle() {
    if (!stops.length) return;
    const s = stops[currentIndex()];
    const h = '#' + s.id;
    if (location.hash !== h) history.replaceState(null, '', h);
  }

  function setMode(step) {
    stepMode = step;
    updateHud(true);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /* ---------------------------------------------------------------- input */

  function bindInput() {
    let lastWheel = 0;
    window.addEventListener('wheel', e => {
      if (indexOpen) return;
      if (!stepMode) { cancelNav(); return; }
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 3 || nav || gap < 240) return;
      d > 0 ? next() : prev();
    }, { passive: false });

    let touchY = null;
    window.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => { if (stepMode && !indexOpen) e.preventDefault(); }, { passive: false });
    window.addEventListener('touchend', e => {
      if (!stepMode || touchY == null || indexOpen) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) > 40) dy > 0 ? next() : prev();
    });

    window.addEventListener('keydown', e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (indexOpen) {
        if (k === 'Escape' || k === 'g' || k === 'G' || k === 'o' || k === 'O') { e.preventDefault(); toggleIndex(false); }
        return;
      }
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === 'Enter' || (k === ' ' && !e.shiftKey)) { e.preventDefault(); next(); }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp' || k === 'Backspace' || (k === ' ' && e.shiftKey)) { e.preventDefault(); prev(); }
      else if (k === 'Home') { e.preventDefault(); goTo(0); }
      else if (k === 'End') { e.preventDefault(); goTo(stops.length - 1); }
      else if (k === 'f' || k === 'F') toggleFullscreen();
      else if (k === 's' || k === 'S') setMode(!stepMode);
      else if (k === 'g' || k === 'G' || k === 'o' || k === 'O' || k === 'Escape') { e.preventDefault(); toggleIndex(true); }
      else if (/^[0-8]$/.test(k)) {
        const ch = +k, i = stops.findIndex(s => s.ch === ch);
        if (i >= 0) goTo(i);
      }
    });

    stage.addEventListener('click', e => {
      if (e.target.closest('a, .rail')) return;
      if (e.button === 0) next();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { fit(); layout(); render(); });
  }

  /* ------------------------------------------------------------------ HUD */

  let hudEls = null;
  function buildHud() {
    hud.innerHTML =
      '<div class="hud-top"><div class="brand"><i></i><span>SCE 2026 · Group 04</span><span class="chap"></span></div>' +
      '<div><span class="mode"></span><span class="count"></span></div></div><div class="rail"></div>';
    const rail = hud.querySelector('.rail');
    const railW = W - 240;
    const segs = [];
    chapters.forEach((c, ci) => {
      const first = stops.find(s => s.ch === ci);
      const nextFirst = stops.find(s => s.ch === ci + 1);
      const start = first.t, end = nextFirst ? nextFirst.t : total;
      if (ci === 0) return; // the cover has no segment
      segs.push({ ci, start, end, first: stops.indexOf(first) });
    });
    const span0 = segs[0].start, spanAll = total - span0;
    segs.forEach(sg => {
      const el = document.createElement('div');
      el.className = 'seg';
      el.style.left = ((sg.start - span0) / spanAll * railW) + 'px';
      const segW = (sg.end - sg.start) / spanAll * railW;
      el.style.width = segW + 'px';
      const name = segW > 7.6 * (chapters[sg.ci].length + 5) ? `${roman(sg.ci)} ${chapters[sg.ci]}` : roman(sg.ci);
      el.title = chapters[sg.ci];
      el.innerHTML = `<div class="nm">${name}</div><div class="track"><div class="fill"></div></div>`;
      el.addEventListener('click', ev => { ev.stopPropagation(); goTo(sg.first); });
      rail.appendChild(el);
      sg.el = el; sg.fill = el.querySelector('.fill');
    });
    hudEls = {
      top: hud.querySelector('.hud-top'),
      chap: hud.querySelector('.chap'),
      count: hud.querySelector('.count'),
      mode: hud.querySelector('.mode'),
      rail, segs,
    };
  }

  function roman(n) { return ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][n] || ''; }

  function updateHud(force) {
    if (!hudEls) return;
    const idx = currentIndex();
    const vis = Math.min(1, curT * 2.5);
    hudEls.top.style.opacity = vis;
    hudEls.rail.style.opacity = vis;
    for (const sg of hudEls.segs) {
      const f = Math.max(0, Math.min(1, (curT - sg.start) / (sg.end - sg.start)));
      sg.fill.style.width = (f * 100) + '%';
      sg.el.classList.toggle('on', curT >= sg.start - 1e-3 && curT < sg.end - 1e-3);
    }
    if (idx !== lastIdx || force) {
      lastIdx = idx;
      const s = stops[idx];
      hudEls.chap.textContent = s.ch ? `${roman(s.ch)} · ${chapters[s.ch]}` : '';
      hudEls.count.innerHTML = `<b>${String(idx + 1).padStart(2, '0')}</b> / ${String(stops.length).padStart(2, '0')}`;
      hudEls.mode.textContent = stepMode ? 'Step mode' : 'Free scroll';
      if (indexOpen) markIndex();
    }
  }

  /* --------------------------------------------------------- index panel */

  function buildIndex() {
    let html = '<h2>Contents<span>G or Esc to close</span></h2><div class="cols">';
    chapters.forEach((c, ci) => {
      html += `<div class="ch"><h3>${ci ? roman(ci) + ' · ' : ''}${c}</h3>`;
      stops.forEach((s, i) => {
        if (s.ch === ci) html += `<a href="#${s.id}" data-i="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${s.title}</a>`;
      });
      html += '</div>';
    });
    html += '</div><div class="keys"><span>→ ↓ space · next</span><span>← ↑ · back</span><span>0 to 8 · chapter</span><span>F · fullscreen</span><span>S · step or free scroll</span><span>G · contents</span></div>';
    indexEl.innerHTML = html;
    indexEl.addEventListener('click', e => {
      const a = e.target.closest('a[data-i]');
      if (!a) { if (e.target === indexEl) toggleIndex(false); return; }
      e.preventDefault();
      toggleIndex(false);
      goTo(+a.dataset.i);
    });
  }

  function markIndex() {
    const idx = currentIndex();
    indexEl.querySelectorAll('a[data-i]').forEach(a => a.classList.toggle('on', +a.dataset.i === idx));
  }

  function toggleIndex(open) {
    indexOpen = open ?? !indexOpen;
    indexEl.hidden = !indexOpen;
    if (indexOpen) markIndex();
  }

  /* ---------------------------------------------------- authoring helpers */

  const arr = t => (t == null ? [] : typeof t === 'string' ? [...document.querySelectorAll(t)] : t.length != null && !(t instanceof Element) ? [...t] : [t]);
  const stop = id => { const s = byId[id]; if (!s) throw new Error('Unknown stop ' + id); return s; };
  /* Transition into stop `id` runs from the previous stop's time to this stop's time. */
  const pos = (id, a = 0) => { const s = stop(id); return s.t - s.w + a * s.w; };
  const dur = (id, a = 0, b = 1) => Math.max(1e-4, (b - a) * stop(id).w);

  function reveal(targets, id, o = {}) {
    const els = arr(targets);
    if (!els.length) return;
    const a = o.a ?? 0.4, b = o.b ?? 1;
    const svg = els[0] instanceof SVGElement;
    els.forEach(el => {
      if (revealed.has(el)) return;
      revealed.add(el);
      const init = { autoAlpha: 0 };
      if (!svg) {
        init.y = o.y ?? 26;
        if (o.x) init.x = o.x;
        if (o.s) init.scale = o.s;
      }
      gsap.set(el, init);
    });
    const stag = o.stagger || 0;
    const each = Math.max(0.04, (b - a) - stag * (els.length - 1));
    const vars = { autoAlpha: o.alpha ?? 1, duration: each * stop(id).w, ease: o.ease || 'power3.out' };
    if (stag) vars.stagger = stag * stop(id).w;
    if (!svg) { vars.y = 0; vars.x = 0; if (o.s) vars.scale = 1; }
    tl.to(els, vars, pos(id, a));
  }

  function conceal(targets, id, o = {}) {
    const els = arr(targets);
    if (!els.length) return;
    const a = o.a ?? 0, b = o.b ?? 0.35;
    const svg = els[0] instanceof SVGElement;
    const vars = { autoAlpha: 0, duration: dur(id, a, b), ease: o.ease || 'power2.in' };
    if (!svg && o.y !== 0) vars.y = o.y ?? -16;
    if (o.stagger) vars.stagger = o.stagger * stop(id).w;
    tl.to(els, vars, pos(id, a));
  }

  function span(targets, inId, outId, o = {}) {
    reveal(targets, inId, o.in || o);
    if (outId) conceal(targets, outId, o.out || {});
  }

  function to(targets, id, vars, a = 0, b = 1) {
    const els = arr(targets);
    if (!els.length) return;
    tl.to(els, Object.assign({ duration: dur(id, a, b), ease: 'power2.inOut' }, vars), pos(id, a));
  }

  function set(targets, id, vars, a = 0) {
    tl.set(arr(targets), vars, pos(id, a));
  }

  /* SVG transform proxy. GSAP tweens the numbers; the engine writes the attribute. */
  function xf(el, x = 0, y = 0, s = 1, r = 0) {
    const p = { x, y, s, r, _last: '' };
    p.apply = () => {
      const v = `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) rotate(${p.r.toFixed(2)}) scale(${p.s.toFixed(4)})`;
      if (v !== p._last) { el.setAttribute('transform', v); p._last = v; }
    };
    p.apply();
    proxies.push(p);
    return p;
  }

  /* Generic proxy with a custom apply function (counters, paths). */
  function proxy(init, apply) {
    const p = Object.assign({}, init);
    p.apply = () => apply(p);
    p.apply();
    proxies.push(p);
    return p;
  }

  function move(p, id, vars, a = 0, b = 1, ease = 'power2.inOut') {
    tl.to(p, Object.assign({ duration: dur(id, a, b), ease }, vars), pos(id, a));
  }

  function prepDraw(el) {
    const len = el.getTotalLength();
    el.setAttribute('stroke-dasharray', `${len} ${len}`);
    el.setAttribute('stroke-dashoffset', len);
    el._len = len;
    return len;
  }

  function draw(targets, id, a = 0, b = 1, o = {}) {
    const els = arr(targets);
    els.forEach(el => { if (el._len == null) prepDraw(el); });
    const stag = o.stagger || 0;
    const each = Math.max(0.04, (b - a) - stag * (els.length - 1));
    tl.to(els, {
      attr: { 'stroke-dashoffset': 0 },
      duration: each * stop(id).w,
      stagger: stag * stop(id).w,
      ease: o.ease || 'power2.inOut',
    }, pos(id, a));
  }

  function undraw(targets, id, a = 0, b = 0.4) {
    arr(targets).forEach(el => {
      tl.to(el, { attr: { 'stroke-dashoffset': el._len }, duration: dur(id, a, b), ease: 'power2.in' }, pos(id, a));
    });
  }

  /* ------------------------------------------------------------------ init */

  function init(cfg) {
    stops = cfg.stops;
    chapters = cfg.chapters;
    let t = 0;
    stops.forEach((s, i) => {
      s.w = i === 0 ? 0 : (s.w ?? 1);
      t += s.w;
      s.t = t;
      byId[s.id] = s;
    });
    total = t;
    tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

    cfg.build(Deck.api);
    tl.set({}, {}, total + 0.001);

    fit();
    buildHud();
    buildIndex();
    bindInput();

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    unit = Math.max(400, innerHeight);
    scroller.style.height = Math.ceil(total * unit + innerHeight) + 'px';
    const fromHash = stops.findIndex(s => '#' + s.id === location.hash);
    tl.time(0, true);
    goTo(fromHash > 0 ? fromHash : 0, { instant: true });
    document.documentElement.classList.add('ready');
  }

  window.Deck = {
    init,
    goTo: (idOrIndex, opts) => goTo(typeof idOrIndex === 'string' ? stops.findIndex(s => s.id === idOrIndex) : idOrIndex, opts),
    next, prev,
    get time() { return curT; },
    get stops() { return stops; },
    api: { pos, dur, reveal, conceal, span, to, set, xf, proxy, move, draw, undraw, prepDraw, get tl() { return tl; } },
  };
})();
