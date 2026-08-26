/* DDLS 2026 — Lab 1 onboarding film: engine.
 *
 * A deterministic, seekable timeline. Nothing animates on its own clock: the engine
 * owns t (seconds) and every cue is a pure function of t, so scrubbing backwards
 * looks exactly like playing forwards. That is also the HyperFrames contract —
 * `window.__timelines[id].seek(t)` — so this same file can be frame-rendered to MP4
 * without changing a line.
 */
(function (global) {
  'use strict';

  var STAGE_W = 1600, STAGE_H = 900;

  /* ---------- tiny Lucide subset (icons, never emoji — course UI convention) ---------- */
  var ICONS = {
    dna: '<path d="m10 16 1.5 1.5"/><path d="m14 8-1.5-1.5"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m16.5 10.5 1 1"/><path d="m17 6-2.891-2.891"/><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="m20 9 .891.891"/><path d="M3.109 14.109 4 15"/><path d="m6.5 12.5 1 1"/><path d="m7 18 2.891 2.891"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
    book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    replay: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    back: '<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
    fwd: '<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/>',
    sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    apple: '<path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/>',
    penguin: '<circle cx="12" cy="12" r="9"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    wand: '<path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>',
    pen: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a1 1 0 0 1 3 3l-9 9a2 2 0 0 1-.9.5l-2.9.8a.5.5 0 0 1-.6-.6l.8-2.9a2 2 0 0 1 .5-.85z"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    expand: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    shrink: '<path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>'
  };

  function icon(name, size, stroke) {
    var p = ICONS[name] || '';
    size = size || 16;
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (stroke || 2) +
      '" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  }

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(p) { return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }

  /* ---------- Scene ---------- */
  function Scene(film, id, opts) {
    this.film = film;
    this.id = id;
    this.title = opts.title;
    this.kicker = opts.kicker || '';
    this.dur = opts.dur || 10;
    this.t0 = 0;                 // filled in by Film.build
    this.node = el('section', 'scene');
    this.node.setAttribute('data-scene', id);
    this.cues = [];
    this.cursorCues = [];
    this.lines = [];              // narration, resolved to absolute time in Film.finish
    this.body = this.node;       // scenes draw straight into node
  }

  /* raw cue: fn(p, phase) where p in [0,1]; phase is 'before'|'during'|'after' */
  Scene.prototype.at = function (t0, dur, fn) {
    this.cues.push({ t0: t0, t1: t0 + Math.max(dur, 0.0001), fn: fn });
    return this;
  };

  /* fade + rise in */
  Scene.prototype.enter = function (node, t0, dur) {
    dur = dur || 0.45;
    node.classList.add('fx');
    return this.at(t0, dur, function (p) {
      var e = easeOut(p);
      node.style.opacity = e;
      node.style.transform = 'translateY(' + ((1 - e) * 10).toFixed(2) + 'px)';
    });
  };

  /* fade out (and stay out) */
  Scene.prototype.exit = function (node, t0, dur) {
    dur = dur || 0.35;
    return this.at(t0, dur, function (p, phase) {
      // before the window, leave the node to whatever brought it in — otherwise this
      // cue runs later in the frame and cancels its enter() fade
      if (phase === 'before') return;
      node.style.opacity = String(1 - p);
    });
  };

  /* set an element visible only inside a window */
  Scene.prototype.window_ = function (node, t0, t1, fadeIn, fadeOut) {
    fadeIn = fadeIn == null ? 0.3 : fadeIn;
    fadeOut = fadeOut == null ? 0.3 : fadeOut;
    node.classList.add('fx');
    return this.at(t0, t1 - t0, function (p, phase) {
      if (phase === 'before') { node.style.opacity = 0; node.style.transform = 'translateY(8px)'; return; }
      if (phase === 'after') { node.style.opacity = 0; return; }
      var loc = p * (t1 - t0);
      var a = fadeIn > 0 ? clamp(loc / fadeIn, 0, 1) : 1;
      var b = fadeOut > 0 ? clamp((t1 - t0 - loc) / fadeOut, 0, 1) : 1;
      var o = Math.min(a, b);
      node.style.opacity = o;
      node.style.transform = 'translateY(' + ((1 - easeOut(a)) * 8).toFixed(2) + 'px)';
    });
  };

  /* typewriter — text is a pure function of t */
  Scene.prototype.type = function (node, text, t0, dur, opts) {
    opts = opts || {};
    var caret = opts.caret !== false;
    var span = el('span'); var cur = el('span', 'caret off');
    node.textContent = '';
    node.appendChild(span); if (caret) node.appendChild(cur);
    var n = text.length;
    return this.at(t0, dur, function (p, phase) {
      var k = phase === 'after' ? n : Math.round(p * n);
      span.textContent = text.slice(0, k);
      if (caret) cur.className = 'caret' + (phase === 'during' ? '' : ' off');
    });
  };

  /* reveal pre-built child nodes one after another (terminal output, chat, lists) */
  Scene.prototype.stagger = function (nodes, t0, per, fade) {
    fade = fade || 0.28;
    for (var i = 0; i < nodes.length; i++) this.enter(nodes[i], t0 + i * per, fade);
    return this;
  };

  /* toggle a class over a window */
  var klassSeq = 1;

  Scene.prototype.klass = function (node, cls, t0, dur) {
    // several windows may drive the same class on the same node (a field focused for each
    // question, a message hovered twice). Each cue records only its own vote, so a later
    // window sitting in its 'before' phase can no longer switch off an active earlier one.
    var id = 'k' + (klassSeq++);
    return this.at(t0, dur, function (p, phase) {
      var m = node.__klass || (node.__klass = {});
      var votes = m[cls] || (m[cls] = {});
      if (phase === 'during') votes[id] = 1; else delete votes[id];
      var any = false;
      for (var k in votes) { if (votes[k]) { any = true; break; } }
      node.classList.toggle(cls, any);
    });
  };

  /* button press flash */
  Scene.prototype.press = function (node, t0) {
    return this.klass(node, 'press', t0, 0.16);
  };

  /* annotation callout anchored to an element */
  Scene.prototype.note = function (text, t0, dur, opts) {
    opts = opts || {};
    var n = el('div', 'note' + (opts.tone ? ' ' + opts.tone : '') + ' a-' + (opts.side || 'left'), text);
    if (opts.width) n.style.maxWidth = opts.width + 'px';
    this.node.appendChild(n);
    var self = this;
    var placed = false;
    this.at(t0, dur, function (p, phase) {
      if (phase === 'before' || phase === 'after') { n.style.opacity = 0; return; }
      if (opts.anchor) {
        var ab = self.film.rect(opts.anchor);
        if (!ab.w && !ab.h) { n.style.opacity = 0; return; }   // anchor is a hidden OS variant
      }
      if (!placed || self.film.dirty) { self.film.place(n, opts); placed = true; }
      var loc = p * dur;
      var a = clamp(loc / 0.3, 0, 1), b = clamp((dur - loc) / 0.3, 0, 1);
      n.style.opacity = Math.min(a, b);
      n.style.transform = 'translateY(' + ((1 - easeOut(a)) * 6).toFixed(2) + 'px)';
    });
    return n;
  };

  /* highlight ring around a live element */
  Scene.prototype.ring = function (target, t0, dur, opts) {
    opts = opts || {};
    var r = el('div', 'ring' + (opts.tone ? ' ' + opts.tone : ''));
    this.node.appendChild(r);
    var self = this, pad = opts.pad == null ? 6 : opts.pad;
    this.at(t0, dur, function (p, phase) {
      if (phase !== 'during') { r.style.opacity = 0; return; }
      var b = self.film.rect(target);
      // a solo stack hides the variants you are not on — never ring an invisible node
      if (!b.w && !b.h) { r.style.opacity = 0; return; }
      r.style.left = (b.x - pad) + 'px'; r.style.top = (b.y - pad) + 'px';
      r.style.width = (b.w + pad * 2) + 'px'; r.style.height = (b.h + pad * 2) + 'px';
      var loc = p * dur;
      r.style.opacity = Math.min(clamp(loc / 0.25, 0, 1), clamp((dur - loc) / 0.25, 0, 1));
    });
    return r;
  };

  /* move the pointer to an element (optionally click it) */
  Scene.prototype.point = function (target, t0, dur, opts) {
    opts = opts || {};
    this.cursorCues.push({
      t0: t0, t1: t0 + (dur || 0.7), target: target,
      dx: opts.dx || 0, dy: opts.dy || 0, click: !!opts.click, hide: false
    });
    return this;
  };
  Scene.prototype.click = function (target, t0, opts) {
    opts = opts || {};
    this.point(target, t0 - (opts.travel == null ? 0.65 : opts.travel), (opts.travel == null ? 0.65 : opts.travel), { dx: opts.dx, dy: opts.dy, click: true });
    return this;
  };

  /* narration line under the stage */
  Scene.prototype.say = function (t0, dur, text, badge) {
    // scene-local; Film.finish() shifts these by the scene's start once it is known
    this.lines.push({ t0: t0, t1: t0 + dur, text: text, badge: badge || '' });
    return this;
  };

  /* ---------- Film ---------- */
  function Film(mount, opts) {
    opts = opts || {};
    this.id = opts.id || 'film';
    this.mount = mount;
    this.scenes = [];
    this.narration = [];
    this.t = 0;
    this.playing = false;
    this.dur = 0;
    this.rects = new Map();
    this.dirty = true;
    this.osFocus = null;
    this.title = opts.title || 'Data-Driven Life Sciences 2026 — Computer Lab 1';
    this.subtitle = opts.subtitle || '';
    this._build();
  }

  Film.prototype._build = function () {
    var self = this;
    this.root = el('div', 'player');
    this.viewport = el('div', 'viewport');
    this.stage = el('div', 'stage');
    this.viewport.appendChild(this.stage);
    this.root.appendChild(this.viewport);

    // cursor
    this.cursor = el('div', 'cursor');
    this.cursor.innerHTML =
      '<div class="ripple"></div>' +
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" stroke="#141a24" stroke-width="1.3" stroke-linejoin="round">' +
      '<path d="M5.5 3.2 19 12.1l-5.6.6-2.4 5.6-5.5-15.1z"/></svg>';
    this.stage.appendChild(this.cursor);

    // overlay
    this.overlay = el('div', 'overlay');
    this.overlay.innerHTML =
      '<div class="box"><h2>' + this.title + '</h2>' +
      '<p>' + (this.subtitle || '') + '</p>' +
      '<div class="play">' + icon('play', 24) + '</div></div>';
    this.viewport.appendChild(this.overlay);
    this.overlay.addEventListener('click', function () { self.overlay.classList.add('hidden'); self.play(); });

    // narration strip
    this.narrEl = el('div', 'narration');
    this.narrEl.innerHTML = '<span class="badge">READY</span><span class="txt"></span>';
    this.root.appendChild(this.narrEl);

    // controls
    var c = el('div', 'controls');
    this.playBtn = el('button', 'ctrl-btn', icon('play', 16));
    this.playBtn.setAttribute('aria-label', 'Play');
    this.prevBtn = el('button', 'ctrl-btn', icon('back', 16));
    this.prevBtn.setAttribute('aria-label', 'Previous step');
    this.nextBtn = el('button', 'ctrl-btn', icon('fwd', 16));
    this.nextBtn.setAttribute('aria-label', 'Next step');
    this.fsBtn = el('button', 'ctrl-btn', icon('expand', 16));
    this.fsBtn.setAttribute('aria-label', 'Full screen');
    this.fsBtn.title = 'Full screen';
    this.scrub = el('div', 'scrub');
    this.scrub.innerHTML = '<div class="scrub-track"></div><div class="scrub-fill"></div><div class="scrub-marks"></div><div class="scrub-knob"></div>';
    this.fill = this.scrub.querySelector('.scrub-fill');
    this.knob = this.scrub.querySelector('.scrub-knob');
    this.marks = this.scrub.querySelector('.scrub-marks');
    this.tcode = el('div', 'tcode', '0:00 / 0:00');
    c.appendChild(this.prevBtn); c.appendChild(this.playBtn); c.appendChild(this.nextBtn);
    c.appendChild(this.scrub); c.appendChild(this.tcode); c.appendChild(this.fsBtn);

    this.osfilter = el('div', 'osfilter');
    c.appendChild(this.osfilter);
    this.root.appendChild(c);

    this.chapters = el('div', 'chapters');
    this.root.appendChild(this.chapters);

    this.mount.appendChild(this.root);

    // events
    this.playBtn.addEventListener('click', function () { self.playing ? self.pause() : self.play(); });
    this.prevBtn.addEventListener('click', function () { self.jumpRel(-1); });
    this.nextBtn.addEventListener('click', function () { self.jumpRel(1); });
    this.fsBtn.addEventListener('click', function () {
      if (document.fullscreenElement) { document.exitFullscreen(); return; }
      if (self.root.requestFullscreen) self.root.requestFullscreen().catch(function () {});
    });
    document.addEventListener('fullscreenchange', function () {
      self.fsBtn.innerHTML = icon(document.fullscreenElement ? 'shrink' : 'expand', 16);
      self.resize(); self.rects.clear(); self.dirty = true; self.seek(self.t);
    });

    var dragging = false;
    function seekFromEvent(e) {
      var r = self.scrub.getBoundingClientRect();
      var x = ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width;
      self.seek(clamp(x, 0, 1) * self.dur);
    }
    this.scrub.addEventListener('mousedown', function (e) { dragging = true; self.pause(); seekFromEvent(e); });
    window.addEventListener('mousemove', function (e) { if (dragging) seekFromEvent(e); });
    window.addEventListener('mouseup', function () { dragging = false; });
    this.scrub.addEventListener('touchstart', function (e) { self.pause(); seekFromEvent(e); }, { passive: true });
    this.scrub.addEventListener('touchmove', function (e) { seekFromEvent(e); }, { passive: true });

    window.addEventListener('resize', function () { self.resize(); self.dirty = true; self.rects.clear(); self.seek(self.t); });

    this.root.setAttribute('tabindex', '0');
    this.root.addEventListener('keydown', function (e) {
      if (e.key === ' ') { e.preventDefault(); self.playing ? self.pause() : self.play(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); self.seek(self.t + 5); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); self.seek(self.t - 5); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); self.jumpRel(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); self.jumpRel(-1); }
    });
  };

  Film.prototype.scene = function (id, opts) {
    var s = new Scene(this, id, opts);
    this.scenes.push(s);
    this.stage.insertBefore(s.node, this.cursor);
    return s;
  };

  Film.prototype.finish = function () {
    var t = 0, self = this;
    this.scenes.forEach(function (s) { s.t0 = t; t += s.dur; });
    this.dur = t;

    this.narration = [];
    var narr = this.narration;
    this.scenes.forEach(function (s) {
      s.lines.forEach(function (l) {
        narr.push({ t0: s.t0 + l.t0, t1: s.t0 + l.t1, text: l.text, badge: l.badge });
      });
    });
    narr.sort(function (a, b) { return a.t0 - b.t0; });

    // chapter chips
    this.scenes.forEach(function (s, i) {
      var chip = el('button', 'chip', '<span class="num">' + String(i + 1).padStart(2, '0') + '</span>' + s.title);
      chip.addEventListener('click', function () { self.seek(s.t0 + 0.01); self.play(); });
      s.chip = chip;
      self.chapters.appendChild(chip);
      var m = el('div', 'scrub-mark');
      m.style.left = (s.t0 / self.dur * 100) + '%';
      self.marks.appendChild(m);
    });

    // OS filter chips
    var mine = detectOS();
    this.mine = mine;
    var self2 = this;
    [['all', 'All three'], ['win', 'Windows'], ['mac', 'macOS'], ['lin', 'Linux']].forEach(function (o) {
      var b = el('button', 'oschip' + (o[0] === 'all' ? ' on' : ''), o[1] + (o[0] === mine ? ' · yours' : ''));
      b.dataset.os = o[0];
      b.addEventListener('click', function () {
        self2.osFocus = o[0] === 'all' ? null : o[0];
        Array.prototype.forEach.call(self2.osfilter.children, function (x) {
          if (x.dataset && x.dataset.os) x.classList.toggle('on', x.dataset.os === o[0]);
        });
        self2.applyOS();
        self2.seek(self2.t);
      });
      self2.osfilter.appendChild(b);
    });
    this.osfilter.insertBefore(el('span', 'lbl', 'Show:'), this.osfilter.firstChild);
    this.applyOS();

    this.resize();
    var self3 = this;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () {
      // re-measure once webfonts land — but keep wherever the viewer already is
      self3.rects.clear(); self3.dirty = true; self3.seek(self3.t);
    });
    this.seek(0);

    // Autoplay once visible — but only when we ARE the page. Embedded in an iframe our
    // own viewport is always "visible", so the parent tells us when the reader reaches us.
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.canAutoplay = !reduce;
    if (!reduce && window.self === window.top && 'IntersectionObserver' in window) {
      var seen = false;
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !seen) {
            seen = true; self.overlay.classList.add('hidden'); self.play();
          }
        });
      }, { threshold: 0.45 });
      io.observe(this.root);
    }
    return this;
  };

  function detectOS() {
    var p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || '';
    p = p.toLowerCase();
    if (p.indexOf('win') >= 0) return 'win';
    if (p.indexOf('mac') >= 0 || p.indexOf('iphone') >= 0 || p.indexOf('ipad') >= 0) return 'mac';
    if (p.indexOf('linux') >= 0 || p.indexOf('android') >= 0) return 'lin';
    return null;
  }

  Film.prototype.applyOS = function () {
    var f = this.osFocus;
    // three-up comparisons: dim the ones you are not on
    var cols = this.stage.querySelectorAll('.os-grid .os-col, .os-col.os-dimmable');
    Array.prototype.forEach.call(cols, function (c) {
      c.classList.toggle('dim', !!f && c.dataset.os !== f);
    });
    // solo stacks: show exactly one variant — the chosen OS, else the viewer's own
    var want = f || this.mine || 'lin';
    Array.prototype.forEach.call(this.stage.querySelectorAll('.os-solo'), function (st) {
      var kids = st.children, hit = null;
      Array.prototype.forEach.call(kids, function (c) {
        if (!c.dataset || !c.dataset.os) return;
        var on = c.dataset.os === want;
        c.classList.toggle('show', on);
        if (on) hit = c;
      });
      if (!hit && kids.length) kids[0].classList.add('show');
    });
    this.rects.clear(); this.dirty = true;
  };

  Film.prototype.resize = function () {
    var w = this.viewport.clientWidth || this.root.clientWidth || STAGE_W;
    var h = this.viewport.clientHeight || Math.round(w * STAGE_H / STAGE_W);
    // full screen letterboxes: fit on whichever axis runs out first, then centre
    var k = Math.min(w / STAGE_W, h / STAGE_H);
    this.scale = k;
    var ox = Math.max(0, (w - STAGE_W * k) / 2), oy = Math.max(0, (h - STAGE_H * k) / 2);
    this.stage.style.transform = 'translate(' + ox.toFixed(1) + 'px,' + oy.toFixed(1) + 'px) scale(' + k + ')';
    // narrower embeds get a tighter chrome, and the whole control strip scales with the
    // frame instead of towering over a postage-stamp stage on a phone
    this.root.classList.toggle('compact', w < 1180);
    this.root.classList.toggle('tight', w < 700 && !document.fullscreenElement);
    this.root.style.fontSize = Math.max(13, Math.min(16, w / 58)) + 'px';
  };

  /* element rect in stage coordinates (untransformed) */
  Film.prototype.rect = function (node) {
    if (this.rects.has(node)) return this.rects.get(node);
    var s = this.stage.getBoundingClientRect();
    var r = node.getBoundingClientRect();
    var k = this.scale || 1;
    var out = { x: (r.left - s.left) / k, y: (r.top - s.top) / k, w: r.width / k, h: r.height / k };
    out.cx = out.x + out.w / 2; out.cy = out.y + out.h / 2;
    this.rects.set(node, out);
    return out;
  };

  /* position a note beside its anchor */
  Film.prototype.place = function (n, opts) {
    if (opts.x != null) { n.style.left = opts.x + 'px'; n.style.top = opts.y + 'px'; return; }
    var b = this.rect(opts.anchor);
    var nb = { w: n.offsetWidth, h: n.offsetHeight };
    var side = opts.side || 'left';
    var gap = opts.gap == null ? 18 : opts.gap;
    var x, y;
    if (side === 'left') { x = b.x - nb.w - gap; y = b.cy - nb.h / 2; }
    else if (side === 'right') { x = b.x + b.w + gap; y = b.cy - nb.h / 2; }
    else if (side === 'top') { x = b.cx - 40; y = b.y - nb.h - gap; }
    else { x = b.cx - 40; y = b.y + b.h + gap; }
    n.style.left = clamp(x + (opts.dx || 0), 12, STAGE_W - nb.w - 12) + 'px';
    n.style.top = clamp(y + (opts.dy || 0), 12, STAGE_H - nb.h - 12) + 'px';
  };

  Film.prototype.activeScene = function (t) {
    for (var i = this.scenes.length - 1; i >= 0; i--) {
      if (t >= this.scenes[i].t0) return this.scenes[i];
    }
    return this.scenes[0];
  };

  Film.prototype.seek = function (t) {
    t = clamp(t, 0, this.dur);
    this.t = t;
    var active = this.activeScene(t);

    for (var i = 0; i < this.scenes.length; i++) {
      var s = this.scenes[i];
      var on = s === active;
      s.node.classList.toggle('on', on);
      if (s.chip) {
        var was = s.chip.classList.contains('on');
        s.chip.classList.toggle('on', on);
        // narrow embeds scroll the chapter list horizontally — keep the active one visible
        if (on && !was && this.root.classList.contains('tight')) {
          try { s.chip.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {}
        }
      }
      if (!on) continue;
      var lt = t - s.t0;
      for (var j = 0; j < s.cues.length; j++) {
        var c = s.cues[j];
        var phase = lt < c.t0 ? 'before' : lt >= c.t1 ? 'after' : 'during';
        var p = phase === 'before' ? 0 : phase === 'after' ? 1 : (lt - c.t0) / (c.t1 - c.t0);
        c.fn(p, phase);
      }
      this.updateCursor(s, lt);
    }

    this.applyOS();
    this.updateNarration(t);
    this.fill.style.width = (t / this.dur * 100) + '%';
    this.knob.style.left = 'calc(' + (t / this.dur * 100) + '% - 6px)';
    this.tcode.textContent = fmt(t) + ' / ' + fmt(this.dur);
    this.dirty = false;
  };

  function fmt(s) {
    var m = Math.floor(s / 60), r = Math.floor(s % 60);
    return m + ':' + (r < 10 ? '0' : '') + r;
  }

  Film.prototype.updateCursor = function (s, lt) {
    var cs = s.cursorCues;
    if (!cs.length) { this.cursor.style.opacity = 0; return; }
    var idx = -1;
    for (var i = 0; i < cs.length; i++) if (lt >= cs[i].t0) idx = i;
    if (idx < 0) { this.cursor.style.opacity = 0; return; }
    var c = cs[idx];
    var to = this.rect(c.target);
    var tx = to.cx + c.dx, ty = to.cy + c.dy;
    var x, y;
    if (lt < c.t1) {
      var prev = idx > 0 ? cs[idx - 1] : null;
      var fx, fy;
      if (prev) { var pr = this.rect(prev.target); fx = pr.cx + prev.dx; fy = pr.cy + prev.dy; }
      else { fx = tx + 190; fy = ty + 150; }
      var p = ease((lt - c.t0) / (c.t1 - c.t0));
      x = fx + (tx - fx) * p; y = fy + (ty - fy) * p;
      this.cursor.style.opacity = clamp((lt - c.t0) / 0.22, 0, 1);
    } else {
      x = tx; y = ty; this.cursor.style.opacity = 1;
    }
    this.cursor.style.left = (x - 3) + 'px';
    this.cursor.style.top = (y - 2) + 'px';

    // click ripple
    var rip = this.cursor.firstChild;
    if (c.click) {
      var dt = lt - c.t1;
      if (dt >= 0 && dt < 0.5) {
        var q = dt / 0.5;
        rip.style.opacity = (1 - q) * 0.85;
        rip.style.transform = 'scale(' + (0.3 + q * 0.8).toFixed(3) + ')';
      } else { rip.style.opacity = 0; }
    } else { rip.style.opacity = 0; }
  };

  Film.prototype.updateNarration = function (t) {
    var cur = null;
    for (var i = 0; i < this.narration.length; i++) {
      var n = this.narration[i];
      if (t >= n.t0 && t < n.t1) { cur = n; break; }
      if (t >= n.t0) cur = n;   // hold the last line
    }
    var txt = this.narrEl.querySelector('.txt');
    var badge = this.narrEl.querySelector('.badge');
    if (cur) {
      if (txt.dataset.k !== String(cur.t0)) { txt.innerHTML = cur.text; txt.dataset.k = String(cur.t0); }
      badge.textContent = this.activeScene(t).kicker || cur.badge || '';
    }
  };

  Film.prototype.play = function () {
    if (this.playing) return;
    if (this.t >= this.dur - 0.05) this.seek(0);
    this.playing = true;
    this.playBtn.innerHTML = icon('pause', 16);
    this.overlay.classList.add('hidden');
    var self = this, last = null;
    function frame(ts) {
      if (!self.playing) return;
      if (last == null) last = ts;
      var dt = Math.min((ts - last) / 1000, 0.25);
      last = ts;
      var nt = self.t + dt;
      if (nt >= self.dur) { self.seek(self.dur); self.pause(true); return; }
      self.seek(nt);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  Film.prototype.pause = function (ended) {
    this.playing = false;
    this.playBtn.innerHTML = icon(ended ? 'replay' : 'play', 16);
  };

  Film.prototype.jumpRel = function (d) {
    var a = this.activeScene(this.t);
    var i = this.scenes.indexOf(a);
    // "previous" restarts the current chapter if we are more than 1.2s in
    if (d < 0 && this.t - a.t0 > 1.2) { this.seek(a.t0 + 0.01); return; }
    var j = clamp(i + d, 0, this.scenes.length - 1);
    this.seek(this.scenes[j].t0 + 0.01);
  };

  global.DDLSFilm = { Film: Film, icon: icon, el: el, STAGE_W: STAGE_W, STAGE_H: STAGE_H };
})(window);
