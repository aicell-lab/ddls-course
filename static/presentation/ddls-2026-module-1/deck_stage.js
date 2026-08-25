/*
 * deck_stage.js — self-contained slide runtime for Claude-Design decks.
 *
 * Model: every slide is a FIXED 1920x1080 canvas. Only one is visible at a
 * time. The stage scales that canvas with transform: scale() to fit the
 * viewport, letterboxed on black. Controls live OUTSIDE the scaled element so
 * they stay crisp at any zoom.
 *
 * Markup contract (see deck.html):
 *   <div id="deck">
 *     <section class="slide" data-screen-label="01 Title"> ... </section>
 *     <section class="slide" data-screen-label="02 Agenda"> ... </section>
 *   </div>
 *   <script id="speaker-notes" type="application/json">["note 1", "note 2"]</script>
 *
 * Slide labels are 1-INDEXED. "Slide 5" means the 5th <section>, never index 4.
 *
 * Features: keyboard + tap nav, slide counter, fullscreen, deep-link via #N,
 * localStorage resume, print-to-PDF (one slide per page at true size), and a
 * postMessage({ slideIndexChanged }) heartbeat for external speaker-note views.
 *
 * Config (optional): define window.DECK_CONFIG before this script loads.
 *   { width: 1920, height: 1080, storageKey: 'deck:my-talk', resume: true }
 */
(function () {
  'use strict';

  var CFG = Object.assign(
    { width: 1920, height: 1080, storageKey: 'claude-deck', resume: true, background: '#000' },
    window.DECK_CONFIG || {}
  );

  var deck, slides, stage, counter, notes = [];
  var index = 0;
  var lastSwipe = 0;  // timestamp of the last swipe, to suppress its synthetic click

  function clamp(n) { return Math.max(0, Math.min(slides.length - 1, n)); }

  function readNotes() {
    var el = document.getElementById('speaker-notes');
    if (!el) return [];
    try { return JSON.parse(el.textContent) || []; } catch (e) { return []; }
  }

  // Embedded = running inside an iframe (e.g. an inline artifact). Such iframes
  // auto-size to content height, so a position:fixed 100vh stage has no real
  // flow height and the scaled slide lands off-screen. In that case we lay the
  // stage out as an in-flow 16:9 block sized to the container WIDTH, giving the
  // iframe a concrete height to wrap. Standalone keeps the fullscreen letterbox.
  function isEmbedded() { try { return window.self !== window.top; } catch (e) { return true; } }

  function build() {
    deck = document.getElementById('deck');
    if (!deck) { console.error('[deck] no #deck element found'); return false; }
    slides = Array.prototype.slice.call(deck.querySelectorAll('.slide'));
    if (!slides.length) { console.error('[deck] no .slide elements found'); return false; }
    notes = readNotes();
    var embedded = isEmbedded();

    if (embedded) {
      document.documentElement.style.cssText = 'margin:0;';
      document.body.style.cssText = 'margin:0;overflow-x:hidden;background:' + CFG.background + ';';
    } else {
      document.documentElement.style.height = '100%';
      document.body.style.cssText = 'margin:0;height:100%;overflow:hidden;background:' + CFG.background + ';';
    }

    // Stage is the letterbox area; the deck is the fixed canvas we scale.
    stage = document.createElement('div');
    stage.id = 'deck-stage';
    // Standalone: fixed full-viewport, deck centered via translate (grid-centering
    // an element wider than the viewport pins it off-center and clips it).
    stage.style.cssText = embedded
      ? 'position:relative;width:100%;overflow:hidden;background:' + CFG.background + ';'
      : 'position:fixed;inset:0;overflow:hidden;background:' + CFG.background + ';';
    deck.parentNode.insertBefore(stage, deck);
    stage.appendChild(deck);

    deck.style.cssText = 'position:absolute;left:50%;top:50%;width:' + CFG.width + 'px;height:' + CFG.height +
      'px;transform-origin:center center;';

    slides.forEach(function (s, i) {
      s.style.cssText += ';position:absolute;inset:0;width:' + CFG.width + 'px;height:' + CFG.height +
        'px;overflow:hidden;';
      s.dataset.index = String(i);
      s.hidden = i !== 0;
    });

    counter = document.createElement('div');
    counter.id = 'deck-counter';
    counter.style.cssText = 'position:fixed;bottom:16px;right:20px;z-index:9;font:600 13px/1 ui-sans-serif,' +
      'system-ui,sans-serif;color:#fff;background:rgba(0,0,0,.45);padding:6px 10px;border-radius:999px;' +
      'letter-spacing:.02em;opacity:.55;transition:opacity .2s;user-select:none;';
    counter.addEventListener('mouseenter', function () { counter.style.opacity = '1'; });
    counter.addEventListener('mouseleave', function () { counter.style.opacity = '.55'; });
    document.body.appendChild(counter);

    // On-screen prev/next — essential on touch devices (no keyboard, and tap
    // zones are invisible). 44px hit targets per the mobile-scale rule.
    var nav = document.createElement('div');
    nav.id = 'deck-nav';
    nav.style.cssText = 'position:fixed;bottom:14px;left:20px;z-index:10;display:flex;gap:10px;';
    function mkBtn(glyph, aria, fn) {
      var b = document.createElement('button');
      b.type = 'button'; b.textContent = glyph; b.setAttribute('aria-label', aria);
      b.style.cssText = 'width:48px;height:48px;border:none;border-radius:999px;background:rgba(0,0,0,.42);' +
        'color:#fff;font:600 26px/1 system-ui,sans-serif;cursor:pointer;display:grid;place-items:center;' +
        'opacity:.6;transition:opacity .2s;-webkit-tap-highlight-color:transparent;touch-action:manipulation;';
      b.addEventListener('mouseenter', function () { b.style.opacity = '1'; });
      b.addEventListener('mouseleave', function () { b.style.opacity = '.6'; });
      b.addEventListener('click', function (e) { e.stopPropagation(); fn(); });
      return b;
    }
    nav.appendChild(mkBtn('‹', 'Previous slide', prev));
    nav.appendChild(mkBtn('›', 'Next slide', next));
    document.body.appendChild(nav);

    // Swipe navigation — the natural gesture on iPad/phones.
    var tsx = null, tsy = null;
    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) { tsx = e.touches[0].clientX; tsy = e.touches[0].clientY; }
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (tsx === null) return;
      var t = e.changedTouches[0], dx = t.clientX - tsx, dy = t.clientY - tsy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        lastSwipe = e.timeStamp || 1;             // suppress the synthetic click
        if (dx < 0) next(); else prev();
      }
      tsx = tsy = null;
    }, { passive: true });

    injectPrintCSS();
    return true;
  }

  function fit() {
    if (isEmbedded()) {
      // Fit to width; the stage's height follows as a real box so the host iframe
      // wraps the deck. If the host gives a TALLER area than the 16:9 slide (a
      // long/portrait screen), grow the stage to fill it and center the deck
      // vertically instead of pinning it to the top.
      var cw = document.documentElement.clientWidth || window.innerWidth;
      var s = cw / CFG.width;
      var dh = CFG.height * s;
      var vh = window.innerHeight || dh;
      stage.style.height = Math.round(vh > dh + 4 ? vh : dh) + 'px';
      deck.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
      return;
    }
    var vw = window.innerWidth, vh = window.innerHeight;
    var scale = Math.min(vw / CFG.width, vh / CFG.height);
    deck.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
  }

  function show(n, opts) {
    opts = opts || {};
    index = clamp(n);
    slides.forEach(function (s, i) { s.hidden = i !== index; });
    var label = slides[index].dataset.screenLabel || String(index + 1);
    counter.textContent = label.replace(/^0*(\d)/, '$1') + ' / ' + slides.length;
    if (CFG.resume && !opts.silent) {
      try { localStorage.setItem(CFG.storageKey, String(index)); } catch (e) {}
    }
    if (location.hash !== '#' + (index + 1)) {
      history.replaceState(null, '', '#' + (index + 1));
    }
    // Mark the active slide so animations can be scoped to it in CSS, and
    // restart them. Without the class toggle a diagram animates once, on first
    // load, and is frozen every time you navigate back to it.
    var active = slides[index];
    slides.forEach(function (s) { s.classList.remove('is-active'); });
    active.classList.add('is-active');
    active.querySelectorAll('[data-anim]').forEach(function (el) {
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    });
    // Rewind SMIL timelines (<animate>, <animateTransform>) on the active slide.
    active.querySelectorAll('svg').forEach(function (svg) {
      if (typeof svg.setCurrentTime === 'function') {
        try { svg.setCurrentTime(0); } catch (e) {}
      }
    });
    post();
  }

  function post() {
    try {
      window.parent.postMessage(
        { slideIndexChanged: index, total: slides.length, note: notes[index] || '' },
        '*'
      );
    } catch (e) {}
  }

  function next() { show(index + 1); }
  function prev() { show(index - 1); }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
  }

  function onKey(e) {
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown' || k === ' ') { e.preventDefault(); next(); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); show(0); }
    else if (k === 'End') { e.preventDefault(); show(slides.length - 1); }
    else if (k === 'f' || k === 'F') { toggleFullscreen(); }
    else if (k === 'p' || k === 'P') { e.preventDefault(); window.print(); }
    else if (/^[0-9]$/.test(k)) { show(parseInt(k, 10) - 1); }
  }

  function onTap(e) {
    if (e.target.closest('a,button,input,textarea,select,[data-no-nav]')) return;
    if (e.timeStamp && lastSwipe && Math.abs(e.timeStamp - lastSwipe) < 500) return; // swipe already handled
    var x = e.clientX, w = window.innerWidth;
    if (x < w * 0.33) prev(); else if (x > w * 0.66) next();
  }

  function injectPrintCSS() {
    var css = document.createElement('style');
    css.media = 'print';
    css.textContent =
      '@page{size:' + CFG.width + 'px ' + CFG.height + 'px;margin:0}' +
      'html,body{background:#fff!important;height:auto!important;overflow:visible!important}' +
      '#deck-stage{position:static!important;display:block!important;background:#fff!important}' +
      '#deck{position:static!important;transform:none!important;width:auto!important;height:auto!important}' +
      '#deck-counter{display:none!important}' +
      '.slide{position:relative!important;display:block!important;width:' + CFG.width + 'px!important;height:' +
      CFG.height + 'px!important;page-break-after:always;break-after:page;overflow:hidden!important}' +
      '.slide[hidden]{display:block!important}' +
      // Without this the break after the final slide emits a trailing blank page.
      '.slide:last-of-type{page-break-after:auto!important;break-after:auto!important}';
    document.head.appendChild(css);
    // Reveal every slide during print, restore after.
    window.addEventListener('beforeprint', function () {
      slides.forEach(function (s) { s._h = s.hidden; s.hidden = false; });
    });
    window.addEventListener('afterprint', function () {
      slides.forEach(function (s) { s.hidden = s._h; });
      fit();
    });
  }

  function start() {
    if (!build()) return;
    var initial = 0;
    var fromHash = parseInt((location.hash || '').slice(1), 10);
    if (fromHash) initial = fromHash - 1;
    else if (CFG.resume) {
      var saved = parseInt(localStorage.getItem(CFG.storageKey) || '0', 10);
      if (!isNaN(saved)) initial = saved;
    }
    fit();
    show(initial, { silent: true });
    window.addEventListener('resize', fit);
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onTap);
    window.addEventListener('hashchange', function () {
      var n = parseInt((location.hash || '').slice(1), 10);
      if (n && n - 1 !== index) show(n - 1);
    });
    // Expose a tiny API for external drivers / export tooling.
    window.Deck = { show: show, next: next, prev: prev, count: function () { return slides.length; },
                    index: function () { return index; }, notes: function () { return notes; } };
    post();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
