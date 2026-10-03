/* Boot: wait for the fonts (labels are measured), then build every scene into one timeline. */
(function () {
  'use strict';
  const start = () => Deck.init({
    stops: K.STOPS,
    chapters: K.CHAPTERS,
    build: A => K.scenes.forEach(scene => scene(A)),
  });
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(r => setTimeout(r, 2500))]).then(start);
})();
