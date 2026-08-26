/* DDLS 2026 — Lab 1 onboarding film: the script.
 * Every line of chat and every line of terminal output below was produced by
 * actually doing the lab against the live portal — the interview really happened,
 * Pi really found the contradiction in scene 12. Names/keys are stand-ins.
 */
(function () {
  'use strict';
  var E = window.DDLSFilm, U = window.DDLSUI;
  var el = E.el, icon = E.icon, OS = U.OS;
  var OSK = ['win', 'mac', 'lin'];
  var FAKE_KEY = 'ddls-sk-7f2c9a41b8e05d3f6a1c4b90d2e78355';
  var GATEWAY = 'https://ddls-portal-6228434e.svc.hypha.aicell.io';
  var HOST = 'ddls-portal-6228434e.svc.hypha.aicell.io';

  var film = new E.Film(document.getElementById('film'), {
    id: 'ddls-lab1-onboarding',
    title: 'Data-Driven Life Sciences 2026 — Computer Lab 1',
    subtitle: 'Module 1 · Introduction to Data-Driven Life Sciences. Activate, interview, install Pi, direct it — about seven minutes, on Windows, macOS and Linux.'
  });

  /* scene header helper */
  function head(s, kicker, title, sub) {
    var h = el('div', 'scene-head');
    var box = el('div');
    box.innerHTML = '<div class="scene-kicker">' + kicker + '</div>' +
      '<h2 class="scene-title">' + title + '</h2>' +
      (sub ? '<p class="scene-sub">' + sub + '</p>' : '');
    h.appendChild(box);
    s.node.appendChild(h);
    s.enter(h, 0.1, 0.5);
    return h;
  }
  function tap(s, node, t) { s.click(node, t); s.press(node, t); return t; }

  /* ============================================================ 1 · intro */
  (function () {
    var s = film.scene('intro', { title: 'What you are about to do', kicker: 'DDLS 2026', dur: 17 });
    var hero = el('div', 'hero');
    hero.innerHTML =
      '<div class="eyebrow">KTH · SK2538 / FSK3538 · Autumn 2026</div>' +
      '<h1>Data-Driven Life Sciences 2026</h1>' +
      '<h2>Module 1 · Computer Lab 1 — interview a data owner, direct an analyst agent</h2>' +
      '<p>Everything Wednesday asks of you — activate the portal, interview a scientist you have never met, ' +
      'install an analyst agent on your own laptop, and point it at her problem. ' +
      'Nothing here is faked: this is a real run, and the agent really does catch her being wrong.</p>';
    var steps = el('div', 'steps');
    [['01', 'Activate', 'Email + course code, once'],
     ['02', 'Interview', 'Agent A, in the browser'],
     ['03', 'Download', 'Transcript + dataset'],
     ['04', 'Install Pi', 'Agent B, on your laptop'],
     ['05', 'Direct it', 'Brief, run, check'],
     ['06', 'Hand in', 'Transcripts + report']].forEach(function (x) {
      var d = el('div', 'step',
        '<div class="n">' + x[0] + '</div><div class="t">' + x[1] + '</div><div class="d">' + x[2] + '</div>');
      steps.appendChild(d);
    });
    hero.appendChild(steps);
    s.node.appendChild(hero);
    s.enter(hero.querySelector('.eyebrow'), 0.2, 0.5);
    s.enter(hero.querySelector('h1'), 0.5, 0.6);
    s.enter(hero.querySelector('h2'), 1.1, 0.6);
    s.enter(hero.querySelector('p'), 1.7, 0.6);
    s.stagger(Array.prototype.slice.call(steps.children), 2.5, 0.18, 0.45);

    var n = s.note('Two agents, and <b>you are the only channel between them</b>. Agent A owns the problem. Agent B does the labour. Nothing crosses except what you write down.',
      5.4, 9.4, { x: 110, y: 742, width: 700 });

    s.say(0, 5.4, 'Data-Driven Life Sciences 2026, Module 1: the whole of Computer Lab 1, in about seven minutes.', 'START');
    s.say(5.4, 5.4, 'You will interview a data owner in the browser, then set up a coding agent on your own machine and direct it at her problem.');
    s.say(10.8, 6.0, 'Every terminal step is shown for <b>Windows, macOS and Linux</b> side by side — pick your column, or filter to just yours in the bar below.');
  })();

  /* ============================================================ 2 · activate */
  (function () {
    var s = film.scene('activate', { title: 'Activate your account', kicker: 'Step 01', dur: 25 });
    head(s, 'Step 01 · in the browser', 'Activate your portal account', 'Once, with the course code from your welcome email.');

    var br = U.browser('', { x: 140, y: 172, w: 980, h: 668 });
    s.node.appendChild(br.node);
    br.setUrl(HOST + '/activate');
    var pg = U.activatePage();
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.3, 0.6);

    // email
    s.klass(pg.fields.email.box, 'focus', 1.4, 3.0);
    tap(s, pg.fields.email.box, 1.5);
    s.type(pg.fields.email.val, 'alex.lindqvist@kth.se', 1.8, 1.9);
    // course code
    s.klass(pg.fields.code.box, 'focus', 4.6, 2.6);
    tap(s, pg.fields.code.box, 4.7);
    s.type(pg.fields.code.val, '••••-••••-••', 5.0, 1.1);
    // passwords
    s.klass(pg.fields.pw1.box, 'focus', 7.5, 2.4);
    tap(s, pg.fields.pw1.box, 7.6);
    s.type(pg.fields.pw1.val, '••••••••••••', 7.9, 1.3);
    s.klass(pg.fields.pw2.box, 'focus', 10.1, 2.3);
    tap(s, pg.fields.pw2.box, 10.2);
    s.type(pg.fields.pw2.val, '••••••••••••', 10.5, 1.3);

    s.note('The <b>course code</b> is in your welcome email. It is used exactly once — to activate. After this you sign in with your password.',
      5.3, 5.2, { anchor: pg.fields.code.box, side: 'right', dx: 40 });

    // submit → dashboard
    tap(s, pg.button, 13.6);
    s.exit(pg.node, 14.0, 0.4);

    var dash = U.dashboardPage({ keys: 0 });
    dash.node.style.opacity = 0;
    br.body.appendChild(dash.node);
    dash.node.style.position = 'absolute';
    dash.node.style.inset = '0';
    s.enter(dash.node, 14.5, 0.6);
    s.at(14.4, 0.1, function (p, phase) { br.setUrl(HOST + (phase === 'after' ? '/dashboard' : '/activate')); });

    s.ring(dash.keyCard, 17.6, 4.4);
    s.note('This is your home for the next six weeks: your <b>budget</b>, your <b>API key</b>, and each week\'s lab.',
      17.8, 4.6, { anchor: dash.keyCard, side: 'top', dx: 250, dy: -6 });

    s.say(0, 5.0, 'Open the portal and choose <b>Activate account</b>. Use the email you registered with.', 'ACTIVATE');
    s.say(5.0, 4.4, 'The course code came by email. It only works once — after today you sign in with email and password.');
    s.say(9.4, 4.2, 'Pick any password you like, at least eight characters, and confirm it.');
    s.say(13.6, 4.0, 'That is the account done. You land on your dashboard.');
    s.say(17.6, 7.4, 'Note the budget meter and the API-key panel — you will come back here in step 4.');
  })();

  /* ============================================================ 3 · interview */
  (function () {
    var s = film.scene('interview', { title: 'Interview the data owner', kicker: 'Step 02', dur: 44 });
    head(s, 'Step 02 · in the browser', 'Interview the data owner', 'Agent A is a busy scientist. A vague question gets a useless answer.');

    var br = U.browser('', { x: 140, y: 172, w: 980, h: 668 });
    br.setUrl(HOST + '/week/1');
    s.node.appendChild(br.node);
    var pg = U.weekPage();
    pg.thread.style.justifyContent = 'flex-end';
    pg.chat.style.height = '400px';
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.2, 0.6);

    var TURNS = [
      { t: 1.4,
        q: "What's the question you're actually trying to answer — and what decision changes once you know it?",
        qd: 2.6, a0: 5.0, ad: 5.4,
        a: "I'm Dr. Marisol Vega at IMAS in Hobart. The Palmer reference file has 344 penguins measured across 2007–2009; I need a simple rule to tell Adélie, chinstrap and gentoo apart from one or two caliper measurements in the hand. Then the new assistant can assign species during banding in about 90 seconds." },
      { t: 12.0,
        q: "What's in the file — one row per bird? Which columns, what units, and how do I load it? Is there a parser already?",
        qd: 2.8, a0: 15.6, ad: 5.6,
        a: "Yes — one row per bird, 344 rows: species, island, bill_length_mm, bill_depth_mm, flipper_length_mm, body_mass_g, sex, study_year, sample_id. Millimetres and grams. There isn't a parser from my side. Two birds have no measurements at all, and nine others have measurements but no recorded sex." },
      { t: 24.0,
        q: "What would make you distrust the result straight away?",
        qd: 2.2, a0: 27.0, ad: 5.4,
        a: "If Adélies and chinstraps were regularly swapped — or if it only worked because island or sex was doing the naming. I'd want at least 98–99% on birds it has not been tuned on, and not a single overall percentage: I want it per species." }
    ];

    // three questions get typed into the same box, so the box keeps one text node and one
    // caret for the whole scene — s.type() would replace them on every turn and leave the
    // earlier turns writing into detached nodes.
    var inkSpan = el('span'), inkCaret = el('span', 'caret off');
    pg.inputVal.textContent = '';
    pg.inputVal.appendChild(inkSpan); pg.inputVal.appendChild(inkCaret);
    function setInput(txt, typing) {
      inkSpan.textContent = txt;
      inkCaret.className = 'caret' + (typing ? '' : ' off');
      // a real input scrolls to keep the caret in view once the line outgrows the box
      var over = pg.inputVal.offsetWidth - (pg.input.clientWidth - 26);
      pg.inputVal.style.transform = over > 0 ? 'translateX(' + (-over).toFixed(0) + 'px)' : '';
    }

    TURNS.forEach(function (T, i) {
      s.klass(pg.input, 'focus', T.t - 0.1, T.qd + 0.4);
      tap(s, pg.input, T.t);
      // typed live; 'before' leaves the box alone so an earlier turn's clear still holds
      s.at(T.t + 0.25, T.qd, function (p, phase) {
        if (phase === 'before') return;
        var n = T.q.length;
        setInput(T.q.slice(0, phase === 'after' ? n : Math.round(p * n)), phase === 'during');
      });
      tap(s, pg.send, T.t + T.qd + 0.5);
      s.at(T.t + T.qd + 0.5, 0.05, function (p, phase) { if (phase === 'after') setInput('', false); });

      var qb = U.bubble('me', ''); qb.textContent = T.q;
      pg.thread.appendChild(qb);
      s.enter(qb, T.t + T.qd + 0.55, 0.28);

      var ab = U.bubble('them', '');
      pg.thread.appendChild(ab);
      s.enter(ab, T.a0 - 0.4, 0.3);
      s.type(ab, T.a, T.a0, T.ad, { caret: false });
    });

    // the two sentences that matter
    s.note('<b>Write that down.</b> "Two birds have no measurements, nine have no sex" is the sort of sentence that costs an afternoon if you miss it.',
      21.4, 4.4, { anchor: pg.chat, side: 'right', dx: 30, dy: -120 });
    s.note('<b>There is the trap.</b> Island predicts species almost perfectly here — and would be useless in the hand. She just told you which column to ban.',
      32.6, 6.0, { anchor: pg.chat, side: 'right', dx: 30, dy: 40, tone: 'warm' });

    // budget ticks
    s.at(6.0, 0.1, function (p, ph) { pg.budget.textContent = ph === 'after' ? '$4.9989' : '$5.0000'; });
    s.at(17.0, 0.1, function (p, ph) { if (ph === 'after') pg.budget.textContent = '$4.9974'; });
    s.at(28.0, 0.1, function (p, ph) { if (ph === 'after') pg.budget.textContent = '$4.9957'; });

    s.say(0, 5.0, 'Open week 1 and start interviewing. Open wide — let her tell it her way.', 'INTERVIEW');
    s.say(5.0, 6.9, 'She has a real question: a field rule to tell three penguin species apart from caliper measurements, in ninety seconds, in the hand.');
    s.say(11.9, 9.4, 'Now ground the data. Spend the longest here — "how do I load it, is there a parser already?" is the question students never ask.');
    s.say(21.3, 10.6, 'Notice what she volunteers: two birds with no measurements, nine with no sex. Those sentences go straight into your spec.');
    s.say(31.9, 12.0, 'Then ask what would make her <b>distrust</b> the answer. That reply just handed you the trap and the bar: ban island and sex, report per species, 98–99% on held-out birds.');
  })();

  /* ====================================================== 3b · coach + edit */
  (function () {
    var s = film.scene('coach', { title: 'Coach me, and edit', kicker: 'Step 02', dur: 46 });
    head(s, 'Step 02 · still in the browser', 'Two buttons on every message you send',
      'A coach that tells you how to ask better — and an edit, so a wasted question costs nothing.');

    var br = U.browser('', { x: 96, y: 168, w: 1000, h: 700 });
    br.setUrl(HOST + '/week/1');
    s.node.appendChild(br.node);
    var pg = U.weekPage();
    pg.thread.style.justifyContent = 'flex-end';
    pg.chat.style.height = '470px';
    pg.budget.textContent = '$4.9957';
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.2, 0.5);

    // one text node + caret for the whole scene: the box gets written several times
    var inkSpan = el('span'), inkCaret = el('span', 'caret off');
    pg.inputVal.textContent = '';
    pg.inputVal.appendChild(inkSpan); pg.inputVal.appendChild(inkCaret);
    function setInput(txt, typing) {
      inkSpan.textContent = txt;
      inkCaret.className = 'caret' + (typing ? '' : ' off');
      var over = pg.inputVal.offsetWidth - (pg.input.clientWidth - 26);
      pg.inputVal.style.transform = over > 0 ? 'translateX(' + (-over).toFixed(0) + 'px)' : '';
    }
    function typeInput(text, t0, dur) {
      s.at(t0, dur, function (p, phase) {
        if (phase === 'before') return;
        var n = text.length;
        setInput(text.slice(0, phase === 'after' ? n : Math.round(p * n)), phase === 'during');
      });
    }

    var VAGUE = 'Tell me about your data.';
    var GOOD = "What's in the file — one row per bird? Which columns, what units, and how do I load it?";

    // --- the vague question, and the deflection it earns ---------------------
    var um = U.userMsg(VAGUE);
    um.panel.style.display = 'none';
    pg.thread.appendChild(um.node);
    var reply = U.bubble('them', '');
    pg.thread.appendChild(reply);

    s.klass(pg.input, 'focus', 1.1, 2.6);
    tap(s, pg.input, 1.2);
    typeInput(VAGUE, 1.4, 1.7);
    tap(s, pg.send, 3.6);
    s.at(3.6, 0.05, function (p, phase) { if (phase === 'after') setInput('', false); });
    um.node.classList.add('fx');
    s.enter(um.node, 3.9, 0.3);
    s.enter(reply, 4.4, 0.3);
    s.type(reply, 'Which part do you mean: the column layout and units, the incomplete workups and repeat records, ' +
      'or the differences among species and colonies? I can answer one cleanly, but not give you another long ' +
      'catalogue from the boat.', 4.8, 4.2, { caret: false });

    s.note('<b>A thin answer is a symptom, not bad luck.</b> She is telling you the question had three questions inside it.',
      9.6, 4.6, { x: 1128, y: 214, width: 430 });

    // --- the tools: pinned on your latest message ---------------------------
    s.klass(um.node, 'pinned', 3.9, 26.6);
    s.ring(um.actions, 10.8, 3.0, { pad: 5 });
    s.note('<b>Your latest message keeps its two buttons out.</b> Older ones show theirs when you hover. The wand asks a coach; the pencil edits.',
      11.4, 5.0, { x: 1128, y: 214, width: 430 });

    // --- the coach ----------------------------------------------------------
    s.klass(um.wand, 'hot', 13.8, 1.2);
    tap(s, um.wand, 14.0);
    s.at(14.3, 0.05, function (p, phase) { um.panel.style.display = phase === 'after' ? '' : 'none'; });
    um.panel.classList.add('fx');
    s.enter(um.panel, 14.4, 0.35);
    var loading = el('div');
    loading.style.cssText = 'font-style:italic;color:#6b7a8a';
    loading.textContent = 'Reading your question in context…';
    um.body.appendChild(loading);
    s.exit(loading, 15.7, 0.2);
    s.at(15.9, 0.05, function (p, phase) { loading.style.display = phase === 'after' ? 'none' : ''; });

    var ul = el('ul');
    um.body.appendChild(ul);
    var HINTS = [
      '<b>“Tell me about your data” is far too broad here.</b> The owner cannot tell whether you mean schema, data quality, or biological patterns. Choose one purpose at a time.',
      'Ask for a <b>structured walkthrough</b>, not a catalogue: what one row represents, the measurement columns and units, dataset size, and how the file is loaded.',
      'Follow up separately on <b>traps relevant to the rule</b>: missing measurements versus missing sex, duplicate IDs, colony or year effects, prior cleaning.'
    ].map(function (h) { var li = el('li', 'fx', h); ul.appendChild(li); return li; });
    s.stagger(HINTS, 16.0, 0.85, 0.35);
    s.at(15.6, 0.05, function (p, ph) { pg.budget.textContent = ph === 'after' ? '$4.9931' : '$4.9957'; });

    s.note('<b>Hints, never a rewrite.</b> It will not write the question for you — that is the skill being examined. Use it early and often; a coaching turn costs about a quarter of a cent.',
      20.4, 6.0, { x: 1128, y: 214, width: 430, tone: 'warm' });

    // --- edit: the message comes back to the box, the turn is undone ---------
    s.klass(um.edit, 'hot', 26.2, 1.0);
    s.point(um.bubble, 26.0, 0.6, { dx: -40 });
    tap(s, um.edit, 26.6);
    s.exit(um.node, 26.9, 0.3);
    s.exit(reply, 26.9, 0.3);
    s.at(27.2, 0.05, function (p, phase) {
      var gone = phase === 'after';
      um.node.style.display = gone ? 'none' : '';
      reply.style.display = gone ? 'none' : '';
      if (gone) setInput(VAGUE, false);
    });
    s.klass(pg.input, 'focus', 27.2, 8.0);
    s.ring(pg.input, 27.6, 2.6, { pad: 4 });

    s.note('<b>No pop-up here:</b> it was your most recent question, so it just comes back. Edit an older one and it warns you first — everything after it goes too.',
      28.0, 5.6, { x: 1128, y: 214, width: 430 });

    // --- rewrite it properly -------------------------------------------------
    var um2 = U.userMsg(GOOD);
    um2.panel.style.display = 'none';
    um2.node.style.display = 'none';
    pg.thread.appendChild(um2.node);
    var reply2 = U.bubble('them', '');
    reply2.style.display = 'none';
    pg.thread.appendChild(reply2);
    s.at(33.8, 0.05, function (p, phase) {
      var on = phase === 'after';
      um2.node.style.display = on ? '' : 'none';
      reply2.style.display = on ? '' : 'none';
    });
    s.klass(um2.node, 'pinned', 34.4, 11.4);

    typeInput(GOOD, 30.6, 2.6);
    tap(s, pg.send, 34.0);
    s.at(34.0, 0.05, function (p, phase) { if (phase === 'after') setInput('', false); });
    um2.node.classList.add('fx');
    s.enter(um2.node, 34.4, 0.3);
    s.enter(reply2, 34.9, 0.3);
    s.type(reply2, 'Yes — one row per bird, 344 rows: species, island, bill_length_mm, bill_depth_mm, ' +
      'flipper_length_mm, body_mass_g, sex, study_year, sample_id. Millimetres and grams. There isn\'t a ' +
      'parser from my side.', 35.3, 4.4, { caret: false });

    s.note('<b>And she has forgotten the bad one.</b> The deleted turn is gone from her memory too, so this is a fresh answer, not a patched one.',
      40.2, 5.2, { x: 1128, y: 214, width: 430 });

    s.say(0, 4.6, 'You will ask a bad question. Everyone does — so the portal gives you two ways out.', 'COACH');
    s.say(4.6, 5.2, 'Here is one: three questions bundled into four words. Watch what it earns.');
    s.say(9.8, 4.6, 'A deflection. She cannot answer it without guessing which answer you wanted.');
    s.say(14.4, 6.0, 'Press the wand. A separate coach reads your question in context and tells you what was wrong with it — hints, never a rewrite.');
    s.say(20.4, 5.6, 'The asking is the part you are here to learn, so it will not hand you the question. It costs a fraction of a cent. Use it.');
    s.say(26.0, 5.6, 'The pencil edits. Your message comes back into the box, and that turn is deleted — from the chat and from her memory.');
    s.say(31.6, 4.6, 'So rewrite it into one question with one purpose, and send it again.');
    s.say(36.2, 9.8, 'The columns and units come back in a single reply. Nothing is stained: a bad question you edited away is not in your transcript at all.');
  })();

  /* ====================================================== 3c · suggest next */
  (function () {
    var s = film.scene('suggest', { title: 'Stuck? Ask for questions', kicker: 'Step 02', dur: 26 });
    head(s, 'Step 02 · still in the browser', 'Stuck on what to ask next?',
      'The wand beside Send proposes questions from your interview so far. It is free.');

    var br = U.browser('', { x: 96, y: 168, w: 1000, h: 700 });
    br.setUrl(HOST + '/week/1');
    s.node.appendChild(br.node);
    var pg = U.weekPage();
    pg.thread.style.justifyContent = 'flex-end';
    pg.chat.style.height = '470px';
    pg.budget.textContent = '$4.9931';
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.2, 0.5);

    var inkSpan = el('span'), inkCaret = el('span', 'caret off');
    pg.inputVal.textContent = '';
    pg.inputVal.appendChild(inkSpan); pg.inputVal.appendChild(inkCaret);

    var q = U.userMsg("What's in the file — one row per bird? Which columns, what units, and how do I load it?");
    q.panel.style.display = 'none';
    q.node.classList.add('pinned');
    pg.thread.appendChild(q.node);
    var a = U.bubble('them', '');
    a.textContent = 'Yes — one row per bird, 344 rows: species, island, bill_length_mm, bill_depth_mm, ' +
      'flipper_length_mm, body_mass_g, sex, study_year, sample_id. Millimetres and grams. There isn\'t a ' +
      'parser from my side.';
    pg.thread.appendChild(a);

    // real output from the portal's /chat/suggest on this very interview
    var QS = [
      'How were the measurements taken and recorded, by whom, and over what dates or field sessions?',
      'How are missing measurements and sex values coded in the spreadsheet, and are there any other unusual or invalid values?',
      'What ranges and units should I expect for each measurement, and which columns or observations do you trust least?'
    ];
    var sp = U.suggestPanel(QS);
    sp.node.style.display = 'none';
    sp.node.classList.add('fx');
    pg.chat.insertBefore(sp.node, pg.form);

    s.ring(pg.suggest, 1.4, 3.0, { pad: 5 });
    s.note('<b>The wand next to Send.</b> Not the same wand as on your messages: that one grades a question you already asked, this one proposes the next ones.',
      1.8, 5.2, { x: 1128, y: 214, width: 430 });

    tap(s, pg.suggest, 4.4);
    s.at(4.6, 0.05, function (p, phase) { sp.node.style.display = phase === 'after' ? '' : 'none'; });
    s.enter(sp.node, 4.7, 0.35);
    s.exit(sp.loading, 6.0, 0.2);
    s.at(6.2, 0.05, function (p, phase) { sp.loading.style.display = phase === 'after' ? 'none' : ''; });
    sp.items.forEach(function (i) { i.classList.add('fx'); });
    s.stagger(sp.items, 6.3, 0.5, 0.3);

    s.note('It reads the interview so far and aims at the gaps — <b>provenance, how missing values are coded, the ranges you should expect and what she trusts least</b>. Probes, in question form.',
      9.4, 5.6, { x: 1128, y: 214, width: 430 });

    // pick one — it drops into the box for you to edit
    s.klass(sp.items[1], 'hot', 15.0, 1.6);
    s.point(sp.items[1], 15.0, 0.6);
    tap(s, sp.items[1], 15.6);
    s.exit(sp.node, 15.9, 0.3);
    s.at(16.2, 0.05, function (p, phase) {
      var gone = phase === 'after';
      sp.node.style.display = gone ? 'none' : '';
      inkSpan.textContent = gone ? QS[1] : '';
      pg.inputVal.style.transform = gone
        ? 'translateX(' + Math.min(0, (pg.input.clientWidth - 26) - pg.inputVal.offsetWidth).toFixed(0) + 'px)'
        : '';
    });
    s.klass(pg.input, 'focus', 16.2, 6.0);
    s.ring(pg.input, 16.6, 2.6, { pad: 4 });

    s.note('<b>It only fills the box.</b> Nothing is sent until you press Send — so put it in your own words first, and keep it a question you understand.',
      17.4, 5.6, { x: 1128, y: 214, width: 430, tone: 'warm' });

    s.say(0, 5.2, 'The hardest part of an interview is knowing what you have not asked yet.', 'SUGGEST');
    s.say(5.2, 4.2, 'The wand beside Send reads your conversation and proposes two to four questions.');
    s.say(9.4, 5.6, 'They aim at the gaps: how the data was collected, how missing values are coded, what ranges to expect and which columns she trusts least.');
    s.say(15.0, 5.4, 'Tap one and it drops into the box. It is not sent — rewrite it in your own words first.');
    s.say(20.4, 5.4, 'And it is free: suggestions are not billed to your five dollars. There is no reason not to press it when you stall.');
  })();

  /* ============================================================ 4 · downloads */
  (function () {
    var s = film.scene('download', { title: 'Take the transcript and the data', kicker: 'Step 03', dur: 17 });
    head(s, 'Step 03 · in the browser', 'Take the transcript and the data', 'Two buttons at the top of the lab page.');

    var br = U.browser('', { x: 140, y: 172, w: 980, h: 668 });
    br.setUrl(HOST + '/week/1');
    s.node.appendChild(br.node);
    var pg = U.weekPage();
    pg.thread.style.justifyContent = 'flex-end';
    ['Yes — one row per bird, 344 rows: species, island, bill_length_mm, bill_depth_mm…',
      'If Adélies and chinstraps were regularly swapped — or if island or sex was doing the naming.'
    ].forEach(function (t, i) {
      var b = U.bubble(i % 2 ? 'them' : 'me', ''); b.textContent = t;
      pg.thread.appendChild(b);
    });
    pg.chat.style.height = '400px';
    pg.budget.textContent = '$4.9957';
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.2, 0.5);

    var sh = U.shelf({ x: 1160, y: 300 });
    var i1 = U.shelfItem('ddls-week1-interview.md', '5.4 KB · downloaded');
    var i2 = U.shelfItem('…penguins-dataset.zip', '21 KB · one file: penguins.csv');
    i1.classList.add('fx'); i2.classList.add('fx');
    sh.appendChild(i1); sh.appendChild(i2);
    sh.style.flexDirection = 'column';
    sh.style.alignItems = 'flex-start';
    s.node.appendChild(sh);
    s.enter(sh, 2.4, 0.4);

    s.ring(pg.actions, 1.4, 3.0);
    tap(s, pg.trBtn, 2.6); s.enter(i1, 3.0, 0.4);
    tap(s, pg.dsBtn, 5.4); s.enter(i2, 5.8, 0.4);

    s.note('The transcript <b>is</b> the brief. Your agent will read this file — not your memory of the conversation.',
      7.4, 6.4, { anchor: sh, side: 'bottom', dx: -40, dy: 24, width: 300 });

    s.say(0, 3.0, 'When the four probes are covered, take both files.', 'DOWNLOAD');
    s.say(3.0, 3.2, 'Transcript first — the whole conversation, exactly as it happened.');
    s.say(6.2, 5.2, 'Then the dataset — and it is exactly what she has: one spreadsheet. No data dictionary, no README, no notes.');
    s.say(11.4, 5.6, 'That is deliberate, and it is normal. What those columns mean exists in one place only: your transcript.');
  })();

  /* ============================================================ 5 · folder + terminal */
  (function () {
    var s = film.scene('folder', { title: 'A folder, and a terminal in it', kicker: 'Step 04', dur: 46 });
    head(s, 'Step 04 · on your laptop', 'Make the folder first, put both files in it, <em>then</em> open a terminal',
      'Order matters: a terminal opened from the folder starts inside it, so you never type a path.');

    var grid = el('div', 'os-grid');
    s.node.appendChild(grid);
    s.enter(grid, 0.3, 0.5);

    // the three file managers really do differ — new-folder route and terminal route both
    var ROUTE = {
      win: {
        newf: ['View', 'New ▸ Folder', 'Open in Terminal'], newfPick: 'New ▸ Folder',
        shortcut: '<b>Shortcut:</b> <code>Ctrl + Shift + N</code> makes a new folder.',
        path: 'Right-click the folder ▸ <b>Open in Terminal</b>',
        sub: 'Windows 11 has this in the normal right-click menu — no Shift needed.',
        fall: '<b>Windows 10, or not listed?</b> Hold <b>Shift</b> and right-click ▸ <i>Open PowerShell window here</i>. ' +
          'Or click the address bar, type <code>powershell</code>, press Enter.'
      },
      mac: {
        newf: ['Get Info', 'New Folder', 'Show View Options'], newfPick: 'New Folder',
        shortcut: '<b>Shortcut:</b> <code>⇧ ⌘ N</code>, or File ▸ New Folder.',
        path: 'Right-click the folder ▸ <b>Services ▸ New Terminal at Folder</b>',
        sub: 'It ships with macOS, but is switched off until you turn it on.',
        fall: '<b>Not in the menu?</b> System Settings ▸ Keyboard ▸ Keyboard Shortcuts ▸ <b>Services</b> ▸ ' +
          'Files and Folders ▸ tick <i>New Terminal at Folder</i>.'
      },
      lin: {
        newf: ['New Folder', 'Paste', 'Open in Terminal'], newfPick: 'New Folder',
        shortcut: '<b>Shortcut:</b> <code>Ctrl + Shift + N</code> makes a new folder.',
        path: 'Right-click inside the folder ▸ <b>Open in Terminal</b>',
        sub: 'Ubuntu ships this with Files; a bare GNOME install may not.',
        fall: '<b>Missing?</b> <code>sudo apt install nautilus-extension-gnome-terminal</code> — ' +
          'or press <b>Ctrl + Alt + T</b> and <code>cd ~/ddls-week1</code>.'
      }
    };

    OSK.forEach(function (k, i) {
      var o = OS[k], R = ROUTE[k];
      var col = U.osColumn(k);
      grid.appendChild(col);

      // starts in Downloads, ends inside ddls-week1
      var fm = U.fileManager(k, { x: 0, y: 0, w: 100 }, 'Downloads');
      fm.node.style.position = 'relative';
      fm.node.style.width = '100%';
      fm.body.style.height = '186px';
      col.appendChild(fm.node);

      var zip = fm.file('ddls-week1-…-dataset.zip', 'file');
      var doc = fm.file('ddls-week1-interview.md', 'file');
      var dir = fm.file('ddls-week1');
      dir.style.display = 'none';
      [zip, doc].forEach(function (f) { f.classList.add('fx'); });
      s.enter(zip, 0.9 + i * 0.12, 0.4);
      s.enter(doc, 1.2 + i * 0.12, 0.4);

      // 1 · make the folder
      var m1 = fm.menu(R.newf, R.newfPick, { x: 92, y: 30 });
      m1.classList.add('fx');
      s.enter(m1, 2.8 + i * 0.12, 0.3);
      s.exit(m1, 5.0, 0.25);
      dir.classList.add('fx');
      s.at(5.2, 0.05, function (p, phase) { dir.style.display = phase === 'after' ? '' : 'none'; });
      s.enter(dir, 5.3, 0.4);

      // 2 · move both downloads into it
      s.klass(zip, 'sel', 8.0, 2.6);
      s.klass(doc, 'sel', 8.0, 2.6);
      s.exit(zip, 10.2, 0.4);
      s.exit(doc, 10.2, 0.4);
      s.at(10.7, 0.05, function (p, phase) {
        var gone = phase === 'after';
        zip.style.display = gone ? 'none' : '';
        doc.style.display = gone ? 'none' : '';
      });
      s.klass(dir, 'sel', 10.4, 1.4);

      // 3 · open it — same window, new location
      var zip2 = fm.file('ddls-week1-…-dataset.zip', 'file');
      var doc2 = fm.file('ddls-week1-interview.md', 'file');
      [zip2, doc2].forEach(function (f) { f.style.display = 'none'; f.classList.add('fx'); });
      s.at(13.2, 0.05, function (p, phase) {
        var inside = phase === 'after';
        fm.where.textContent = inside ? 'ddls-week1' : 'Downloads';
        dir.style.display = inside ? 'none' : '';
        zip2.style.display = inside ? '' : 'none';
        doc2.style.display = inside ? '' : 'none';
      });
      s.enter(zip2, 13.4, 0.35);
      s.enter(doc2, 13.7, 0.35);

      var shortcut = el('div', 'os-note fx', R.shortcut);
      shortcut.style.minHeight = '34px';
      col.appendChild(shortcut);
      s.enter(shortcut, 6.0 + i * 0.12, 0.4);

      // 4 · terminal, from inside that folder
      var m2 = fm.menu(o.ctx, o.ctxPick, { x: 60, y: 40 });
      m2.classList.add('fx');
      s.enter(m2, 16.0 + i * 0.12, 0.32);
      s.exit(m2, 22.0, 0.3);

      var route = el('div', 'os-note fx');
      route.style.minHeight = '74px';
      route.innerHTML = R.path + '<div style="color:#6b7a8a;margin-top:4px">' + R.sub + '</div>';
      col.appendChild(route);
      s.enter(route, 16.6 + i * 0.12, 0.4);

      var note = el('div', 'os-note warm fx');
      note.style.minHeight = '92px';
      note.innerHTML = R.fall;
      col.appendChild(note);
      s.enter(note, 23.0 + i * 0.12, 0.4);

      var t = U.terminal(k, null, { h: 150 });
      t.node.style.marginTop = '12px';
      t.node.classList.add('fx');
      col.appendChild(t.node);
      t.idle();
      s.enter(t.node, 31.0 + i * 0.15, 0.5);
      s.ring(t.body, 33.4, 3.0, { pad: 3 });
    });

    s.note('<b>Works on all three, whatever your menu says:</b> open a terminal any way you like, type ' +
      '<code>cd</code> and a space, then drag the folder into the window — the path types itself. ' +
      'On Windows, right-click the folder ▸ <i>Copy as path</i> and paste it instead.',
      26.4, 4.6, { x: 300, y: 828, width: 1000, tone: 'warm' });

    s.say(0, 3.0, 'Both downloads have landed in Downloads, where everything else already is.', 'FOLDER');
    s.say(3.0, 5.0, 'So first make one folder for this lab — call it <code>ddls-week1</code>. Everything from here happens inside it.');
    s.say(8.0, 5.2, 'Move both files into it: the transcript and the dataset. That folder is about to become your analyst agent\'s entire world.');
    s.say(13.2, 3.2, 'Then open the folder, so you are standing in it.');
    s.say(16.4, 5.4, 'And now the part that saves you pain: open the terminal <b>from this folder</b>, so it starts inside it and you never type a path.');
    s.say(21.8, 4.6, 'This is the one screen where the three systems really differ — find your own column.');
    s.say(26.4, 4.6, 'If your menu does not have it, none of that matters: type <code>cd</code>, a space, then drag the folder into the terminal window.');
    s.say(31.0, 4.6, 'A terminal is only a text window: you type a line, press Enter, it answers.');
    s.say(35.6, 10.4, 'Windows uses PowerShell, macOS and Linux use zsh or bash. The prompt looks different — but from here the commands are the same, so we follow just one.');
  })();

  /* ============================================================ 6a · node.js */
  (function () {
    var s = film.scene('node', { title: 'Install Node.js', kicker: 'Step 05', dur: 30 });
    head(s, 'Step 05 · on your laptop', 'Install Node.js — everyone needs this',
      'Pi needs Node 22 or newer. Check first — you may already have it, but an older one will not do.');

    var grid = el('div', 'os-grid');
    s.node.appendChild(grid);
    s.enter(grid, 0.3, 0.5);

    var HOW = {
      win: ['Download the <b>LTS</b> installer from <b>nodejs.org/en/download</b> — the page detects your system — ' +
            'and run the <code>.msi</code>, clicking through the defaults.', 'monitor'],
      mac: ['Same <b>LTS</b> installer from <b>nodejs.org/en/download</b> (a <code>.pkg</code>). ' +
            'With Homebrew already set up, <code>brew install node</code> does it too.', 'apple'],
      lin: ['Use your distribution’s package manager — the official per-distro commands are at ' +
            '<b>nodejs.org/en/download/package-manager/all</b>.', 'terminal']
    };

    OSK.forEach(function (k, i) {
      var o = OS[k];
      var col = U.osColumn(k);
      grid.appendChild(col);

      var t = U.terminal(k, null, { h: 168 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '13px';
      col.appendChild(t.node);
      var c1 = t.cmd('node --version');
      var o1 = t.out(k === 'win' ? "node : The term 'node' is not recognized."
        : k === 'mac' ? 'zsh: command not found: node'
        : 'bash: node: command not found', 'err');
      o1.classList.add('fx');
      s.type(c1.txt, c1.text, 1.2 + i * 0.1, 1.0);
      s.enter(o1, 2.8, 0.25);

      var how = el('div', 'os-note fx');
      how.style.minHeight = '96px';
      how.innerHTML = HOW[k][0];
      col.appendChild(how);
      s.enter(how, 6.4 + i * 0.12, 0.4);

      // after the installer: a NEW terminal, and both tools answer
      var t2 = U.terminal(k, null, { h: 168 });
      t2.node.style.width = '100%';
      t2.node.style.marginTop = '12px';
      t2.body.style.fontSize = '13px';
      t2.node.classList.add('fx');
      col.appendChild(t2.node);
      var d1 = t2.cmd('node --version');
      var e1 = t2.out('v22.22.0', 'ok'); e1.classList.add('fx');
      var d2 = t2.cmd('npm --version');
      var e2 = t2.out('10.9.4', 'ok'); e2.classList.add('fx');
      s.enter(t2.node, 15.0 + i * 0.15, 0.5);
      s.type(d1.txt, d1.text, 16.4 + i * 0.1, 1.0);
      s.enter(e1, 18.0, 0.25);
      s.type(d2.txt, d2.text, 19.4 + i * 0.1, 1.0);
      s.enter(e2, 21.0, 0.25);
    });

    s.note('<b>Close the terminal and open a new one after installing.</b> The old window still has the old PATH, so <code>node</code> will keep looking missing even though it is there.',
      12.4, 4.6, { x: 300, y: 824, width: 1000, tone: 'warm' });
    s.note('<b>An old Node is worse than none.</b> Node 18 or 20 installs Pi with only a warning, then Pi dies on the first run with <code>does not provide an export named \'globSync\'</code>. If you see that, your Node is too old.',
      17.4, 6.2, { x: 300, y: 824, width: 1000, tone: 'warm' });

    s.say(0, 4.4, 'Pi is installed with npm, which comes with Node.js — so Node comes first.', 'NODE');
    s.say(4.4, 4.6, 'Ask for its version. Pi needs <b>22 or higher</b> — if you already have that, skip ahead.');
    s.say(9.0, 3.4, 'Nothing, or an older number, and you install the current LTS build.');
    s.say(12.0, 5.4, 'Then close the terminal and open a new one from your folder again — the window you already had still has the old settings.');
    s.say(17.4, 6.2, 'Watch the number, not just that it answered. An old Node installs Pi with only a warning, then Pi dies on the first run.');
    s.say(23.6, 6.4, 'If <code>node</code> or <code>npm</code> still comes back empty, bring it to the start of Wednesday’s lab — the first part of the session is exactly for this.');
  })();

  /* ============================================================ 6b · install pi */
  (function () {
    var s = film.scene('install', { title: 'Install Pi', kicker: 'Step 06', dur: 22 });
    head(s, 'Step 06 · on your laptop', 'Install Pi, your analyst agent',
      'One command, identical on all three systems — so from here we show one terminal: yours.');

    var solo = U.osSolo({ x: 300, y: 196, w: 1000 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.5);

    OSK.forEach(function (k) {
      var col = solo.variant(k);
      var o = OS[k];
      col.appendChild(el('div', 'os-tag', '<span class="badge">' + icon(o.badge, 13) + '</span>' + o.name + ' · ' + o.shell));

      var t = U.terminal(k, null, { h: 300 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '14px';
      col.appendChild(t.node);

      var c2 = t.cmd('npm install -g @earendil-works/pi-coding-agent');
      var o2 = t.out('added 61 packages in 6s', 'dim'); o2.classList.add('fx');
      var o3 = t.out('<span class="ok">✓</span> pi 0.84.3 installed', ''); o3.classList.add('fx');
      t.gap();
      var c3 = t.cmd('pi --version');
      var o4 = t.out('0.84.3', 'ok'); o4.classList.add('fx');

      s.type(c2.txt, c2.text, 1.2, 2.6);
      s.enter(o2, 5.2, 0.3);
      s.enter(o3, 5.8, 0.3);
      s.type(c3.txt, c3.text, 8.4, 0.9);
      s.enter(o4, 9.8, 0.25);

      var note = el('div', 'os-note warm fx', k === 'win'
        ? '<b>"Running scripts is disabled"?</b> Run once: <code>Set-ExecutionPolicy -Scope CurrentUser RemoteSigned</code>, answer <b>Y</b>, then try again.'
        : k === 'mac'
          ? '<b>Permission errors (EACCES)?</b> Do not reach for <code>sudo</code> — install Node with <code>nvm</code>, or point npm somewhere you own: <code>npm config set prefix ~/.npm-global</code>.'
          : '<b>Permission errors (EACCES)?</b> Do not reach for <code>sudo</code> — install Node with <code>nvm</code>, or point npm somewhere you own: <code>npm config set prefix ~/.npm-global</code>.');
      col.appendChild(note);
      s.enter(note, 11.0, 0.4);
    });

    s.note('<b>-g</b> means "install it once, for the whole machine" — you do this in week 1 only, not every lab.',
      6.0, 4.6, { x: 460, y: 806, width: 660 });

    s.say(0, 4.6, 'One command installs Pi, and it is the same on Windows, macOS and Linux.', 'INSTALL');
    s.say(4.6, 3.8, 'Then ask Pi its version, to confirm the install actually landed.');
    s.say(8.4, 4.6, 'That is the last thing you install. Everything after this is configuration.');
    s.say(13.0, 9.0, 'Use <b>Show:</b> under the picture if you want to see another platform — but the command does not change, only the prompt in front of it.');
  })();

  /* ============================================================ 8 · models.json */
  (function () {
    var s = film.scene('config', { title: 'Point Pi at the course gateway', kicker: 'Step 07', dur: 30 });
    head(s, 'Step 07 · on your laptop', 'Point Pi at the course gateway',
      'One small file. Pi ignores OPENAI_BASE_URL — this is how it finds us.');

    var card = el('div', 'card');
    card.style.cssText = 'position:absolute;left:56px;top:190px;width:880px;padding:0;overflow:hidden';
    var hdr = el('div');
    hdr.style.cssText = 'padding:10px 15px;border-bottom:1px solid #e8e5de;font-family:var(--mono);font-size:13px;color:#41505f;display:flex;align-items:center;gap:8px';
    hdr.innerHTML = '<span style="color:#0b62b4;display:flex">' + icon('file', 14) + '</span>';
    // Pi resolves its config as homedir()/.pi/agent — so the folder is dotted on Windows too,
    // but the path you type there is not a tilde path.
    var hpath = U.osSolo();
    OSK.forEach(function (k) {
      hpath.variant(k).textContent = OS[k].configPathReal;
    });
    hdr.appendChild(hpath.node);
    var code = el('pre');
    code.style.cssText = 'margin:0;padding:24px 24px;font-family:var(--mono);font-size:15px;line-height:1.9;color:#141a24;background:#fff;overflow:hidden';
    code.innerHTML =
      '{\n' +
      '  <span style="color:#0b62b4">"providers"</span>: {\n' +
      '    <span style="color:#0b62b4">"ddls"</span>: {\n' +
      '      <span style="color:#0b62b4">"baseUrl"</span>: <span style="color:#15803d">"' + GATEWAY + '/v1"</span>,\n' +
      '      <span style="color:#0b62b4">"api"</span>: <span style="color:#15803d">"openai-completions"</span>,\n' +
      '      <span style="color:#0b62b4">"apiKey"</span>: <span style="color:#15803d">"$DDLS_API_KEY"</span>,\n' +
      '      <span style="color:#0b62b4">"models"</span>: [\n' +
      '        { <span style="color:#0b62b4">"id"</span>: <span style="color:#15803d">"gpt-5.6-luna"</span>, <span style="color:#0b62b4">"reasoning"</span>: false, <span style="color:#0b62b4">"input"</span>: [<span style="color:#15803d">"text"</span>],\n' +
      '          <span style="color:#0b62b4">"samplingParams"</span>: { <span style="color:#0b62b4">"reasoning_effort"</span>: <span style="color:#15803d">"none"</span> } }\n' +
      '      ]\n' +
      '    }\n' +
      '  }\n' +
      '}';
    card.appendChild(hdr); card.appendChild(code);
    s.node.appendChild(card);
    s.enter(card, 0.4, 0.6);

    var side = el('div');
    side.style.cssText = 'position:absolute;left:976px;top:190px;width:568px;display:flex;flex-direction:column;gap:16px';
    s.node.appendChild(side);

    // creating a dot-folder and a .json file is genuinely different on each system —
    // and each has its own way of going wrong
    var RECIPE = {
      win: {
        cmds: 'mkdir -Force "$env:USERPROFILE\\.pi\\agent"\nnotepad "$env:USERPROFILE\\.pi\\agent\\models.json"',
        then: 'Notepad asks <b>“Do you want to create a new file?”</b> — click <b>Yes</b>. Paste, then <b>Ctrl + S</b>.',
        trap: 'Do not make this folder in File Explorer: it refuses names starting with a dot. And do not use <i>Save as</i> — it would save <code>models.json.txt</code>.'
      },
      mac: {
        cmds: 'mkdir -p ~/.pi/agent\ntouch ~/.pi/agent/models.json\nopen -e ~/.pi/agent/models.json',
        then: 'TextEdit opens the empty file. Paste, then <b>⌘ S</b> and close it.',
        trap: 'The <code>touch</code> line matters: <code>open -e</code> refuses a file that does not exist yet. <code>~</code> is your home folder — Finder hides it, press <b>⌘ ⇧ .</b> to see it.'
      },
      lin: {
        cmds: 'mkdir -p ~/.pi/agent\nnano ~/.pi/agent/models.json',
        then: 'Paste, then <b>Ctrl + O</b>, <b>Enter</b> to save and <b>Ctrl + X</b> to quit.',
        trap: 'Pasting into nano is <b>Ctrl + Shift + V</b> in most terminals, not Ctrl + V. Files hides dot-folders — <b>Ctrl + H</b> shows them.'
      }
    };

    var solo = U.osSolo();
    OSK.forEach(function (k) {
      var o = OS[k], R = RECIPE[k];
      var col = solo.variant(k);
      var d = el('div', 'card');
      d.style.cssText = 'padding:16px 18px';
      d.innerHTML =
        '<div class="os-tag" style="margin-bottom:9px"><span class="badge">' + icon(o.badge, 13) + '</span>' + o.name + ' · ' + o.shell + '</div>' +
        '<div style="font-family:var(--mono);font-size:13.4px;color:#141a24;line-height:1.75;white-space:pre-wrap;background:#f7f6f3;border:1px solid #e8e5de;border-radius:8px;padding:10px 12px">' + R.cmds + '</div>' +
        '<div style="font-size:13.4px;color:#41505f;line-height:1.55;margin-top:10px">' + R.then + '</div>' +
        '<div style="font-size:12.6px;color:#78350f;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:9px 11px;line-height:1.5;margin-top:10px">' + R.trap + '</div>';
      col.appendChild(d);
    });
    solo.node.classList.add('fx');
    side.appendChild(solo.node);
    s.enter(solo.node, 2.2, 0.5);

    var why = el('div', 'card fx');
    why.style.cssText = 'padding:16px 18px';
    why.innerHTML = '<div style="font-weight:600;font-size:14px;margin-bottom:8px;color:#41505f">What the three lines that matter do</div>' +
      [['baseUrl', 'sends Pi to the course gateway instead of OpenAI'],
       ['apiKey', 'reads <code>$DDLS_API_KEY</code> from your environment — the key is never in this file'],
       ['reasoning_effort', 'required: without it the course model refuses tool calls and Pi stops with a 400']
      ].map(function (r) {
        return '<div style="font-size:13.4px;color:#41505f;line-height:1.55;margin-bottom:6px">' +
          '<span style="font-family:var(--mono);color:#0b62b4">' + r[0] + '</span> — ' + r[1] + '</div>';
      }).join('');
    side.appendChild(why);
    s.enter(why, 4.0, 0.5);

    s.note('<b>Same file, same contents, all three systems.</b> Only the way you create and open it differs.',
      15.0, 5.0, { x: 60, y: 812, width: 800 });

    s.say(0, 5.0, 'Pi needs one config file to know where the course model lives.', 'CONFIG');
    s.say(5.0, 6.0, 'It always goes in the same place — a folder called <code>.pi</code> inside your home folder — on Windows too.');
    s.say(11.0, 6.6, 'Creating it is the part that differs: PowerShell and Notepad on Windows, TextEdit on a Mac, nano on Linux. Follow your own card.');
    s.say(17.6, 5.4, 'Then paste the JSON in exactly as it is, and save.');
    s.say(23.0, 6.8, 'Note <code>"$DDLS_API_KEY"</code> — the key is <b>not</b> in this file. Pi reads it from your environment, which is what you set next.');
  })();

  /* ============================================================ 7 · api key */
  (function () {
    var s = film.scene('key', { title: 'Generate your API key', kicker: 'Step 08', dur: 19 });
    head(s, 'Step 08 · in the browser', 'Generate your API key',
      'This is what lets Pi talk to the course model — and what meters your budget.');

    var br = U.browser('', { x: 140, y: 172, w: 980, h: 668 });
    br.setUrl(HOST + '/dashboard');
    s.node.appendChild(br.node);
    var pg = U.dashboardPage({ keys: 0 });
    br.body.appendChild(pg.node);
    s.enter(br.node, 0.2, 0.5);
    pg.reveal.style.opacity = 0;
    // the page scrolls down as you reach the key panel, the way it really does
    s.at(3.6, 1.0, function (p, phase) {
      var y = (phase === 'before') ? 0 : -170 * (phase === 'after' ? 1 : p * p * (3 - 2 * p));
      pg.node.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
    });

    s.klass(pg.labelField, 'focus', 1.6, 2.4);
    tap(s, pg.labelField, 1.7);
    s.type(pg.labelVal, 'my-laptop', 2.0, 1.1);
    tap(s, pg.genBtn, 4.6);
    s.type(pg.keyVal, FAKE_KEY, 5.4, 1.6, { caret: false });
    s.enter(pg.reveal, 5.2, 0.45);
    s.at(5.0, 0.1, function (p, ph) { pg.keysStat.textContent = ph === 'after' ? '1' : '0'; });
    tap(s, pg.copyBtn, 8.4);

    s.note('<b>Copy it now.</b> The portal shows a key exactly once. Lost it? Generate another — that is fine.',
      9.0, 5.4, { anchor: pg.reveal, side: 'bottom', dy: 16, dx: 120 });

    s.say(0, 4.4, 'Now the key. Back to your dashboard. Give the key a label so you know which machine it is on.', 'API KEY');
    s.say(4.4, 4.4, 'Generate, and the key appears once.');
    s.say(8.8, 4.2, 'Copy it straight away — you will paste it into your terminal in a moment.');
    s.say(13.0, 6.0, 'Every call Pi makes with this key is metered against your $5, and logged. That is by design: we read what your agent did.');
  })();

  /* ============================================================ 9 · env var */
  (function () {
    var s = film.scene('env', { title: 'Save the key in a .env file', kicker: 'Step 09', dur: 30 });
    head(s, 'Step 09 · on your laptop', 'Save the key in a <span style="font-family:var(--mono);font-size:.86em">.env</span> file, then load it',
      'The portal shows a key once. Put it on disk in your lab folder so you never need it again.');

    var solo = U.osSolo({ x: 260, y: 190, w: 1080 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.5);

    var K = FAKE_KEY.slice(0, 22) + '…';
    OSK.forEach(function (k) {
      var o = OS[k];
      var col = solo.variant(k);
      col.appendChild(el('div', 'os-tag', '<span class="badge">' + icon(o.badge, 13) + '</span>' + o.name + ' · ' + o.shell));

      var t = U.terminal(k, null, { h: 300 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '13.6px';
      col.appendChild(t.node);

      // write the file
      var c1 = t.cmd(k === 'win'
        ? 'Set-Content .env "DDLS_API_KEY=' + K + '"'
        : "echo 'DDLS_API_KEY=" + K + "' > .env");
      var c2 = t.cmd(k === 'win' ? 'Add-Content .gitignore ".env"' : 'echo ".env" >> .gitignore');
      t.gap();
      // load it into this terminal
      var c3 = t.cmd(k === 'win'
        ? 'Get-Content .env | ForEach-Object { if ($_ -match \'^\\s*([^#][^=]*)=(.*)$\') {\n    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim()) } }'
        : 'set -a; source .env; set +a');
      t.gap();
      var c4 = t.cmd(k === 'win' ? 'echo $env:DDLS_API_KEY' : 'echo $DDLS_API_KEY');
      var o4 = t.out(K, 'ok'); o4.classList.add('fx');

      s.type(c1.txt, c1.text, 1.4, 2.2);
      s.type(c2.txt, c2.text, 4.4, 1.4);
      s.type(c3.txt, c3.text, 8.0, k === 'win' ? 3.4 : 1.6);
      s.type(c4.txt, c4.text, 13.4, 1.2);
      s.enter(o4, 15.2, 0.3);

      var note = el('div', 'os-note fx', k === 'win'
        ? '<b>No quotes needed</b> around the value inside the file. Prefer a window? <code>notepad .env</code> works just as well.'
        : '<b>No quotes needed</b> around the value inside the file. <code>set -a</code> exports everything the file sets; <code>set +a</code> stops that again.');
      col.appendChild(note);
      s.enter(note, 16.4, 0.4);
    });

    s.note('<b>The file survives. The loading does not.</b> Run the load line in <b>every new terminal</b> before you start Pi — a missing key is the single most common reason Pi refuses to talk to us.',
      18.0, 6.6, { x: 300, y: 806, width: 800, tone: 'warm' });

    s.say(0, 5.4, 'The portal shows your key exactly once, so do not leave it in a terminal that you are about to close.', 'KEY');
    s.say(5.4, 4.6, 'Write it into a file called <code>.env</code>, in the lab folder you made earlier — one line, no quotes.');
    s.say(10.0, 4.4, 'And add <code>.env</code> to <code>.gitignore</code> straight away. This key is a password; it must never reach git.');
    s.say(14.4, 5.0, 'Then load the file into this terminal, and echo it back to check it actually took.');
    s.say(19.4, 5.6, 'A <code>.env</code> file only sits on disk. Loading it is a separate step, and you repeat it in every new terminal.');
    s.say(25.0, 4.8, 'Lose the key and there is no recovery — generate a fresh one in the portal. The file is what stops that happening.');
  })();

  /* ============================================================ 10 · start pi */
  (function () {
    var s = film.scene('start', { title: 'Start Pi', kicker: 'Step 10', dur: 24 });
    head(s, 'Step 10 · on your laptop', 'Start Pi — and check it is really talking to us',
      'Same command everywhere. Only the prompt in front of it changes.');

    var solo = U.osSolo({ x: 240, y: 200, w: 1120 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.55);

    OSK.forEach(function (k) {
      var col = solo.variant(k);
      col.appendChild(el('div', 'os-tag', '<span class="badge">' + icon(OS[k].badge, 13) + '</span>' + OS[k].name + ' · ' + OS[k].shell));
      var t = U.terminal(k, null, { h: 400 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '14.5px';
      t.body.style.height = '340px';
      col.appendChild(t.node);

      var c0 = t.cmd(k === 'win'
        ? 'Get-Content .env | ForEach-Object { if ($_ -match \'^\\s*([^#][^=]*)=(.*)$\') {\n    [Environment]::SetEnvironmentVariable($matches[1].Trim(), $matches[2].Trim()) } }'
        : 'set -a; source .env; set +a');
      t.gap();
      var c1 = t.cmd('pi --provider ddls --model gpt-5.6-luna');
      t.gap();
      var banner = t.out('<span class="ok">pi</span> 0.84.3  ·  provider <span class="path">ddls</span>  ·  model <span class="path">gpt-5.6-luna</span>', '');
      var banner2 = t.out('no AGENTS.md in this folder yet', 'dim');
      var banner3 = t.out('tools: read · write · edit · bash', 'dim');
      t.gap();
      var c2 = t.cmd('list the files in this folder and tell me what you see', '› ');
      t.gap();
      var r1 = t.out('Two files. <span class="path">penguins.csv</span> (344 data rows + header, 9 columns)', '');
      var r2 = t.out('and <span class="path">ddls-week1-interview.md</span>, a transcript of an interview about', '');
      var r3 = t.out('those birds. There is no data dictionary and no brief for me yet —', '');
      var r4 = t.out('nothing here is analysed.', '');
      t.gap();
      var idle = t.idle('› ');
      [banner, banner2, banner3, r1, r2, r3, r4, idle].forEach(function (n) { n.classList.add('fx'); });

      s.type(c0.txt, c0.text, 0.9, k === 'win' ? 2.0 : 1.1);
      s.type(c1.txt, c1.text, 2.6, 2.2);
      s.enter(banner, 5.2, 0.3); s.enter(banner2, 5.5, 0.3); s.enter(banner3, 5.8, 0.3);
      s.type(c2.txt, c2.text, 7.2, 2.6);
      s.stagger([r1, r2, r3, r4], 10.8, 0.4, 0.3);
      s.enter(idle, 13.0, 0.3);
      s.ring(banner, 5.6, 3.0, { pad: 3 });
    });

    s.note('<b>Ask something small first.</b> If this answers, your key, your config and the gateway are all working — before you hand it anything that matters.',
      12.6, 5.2, { x: 380, y: 800, width: 700 });
    s.note('<b>Two files, and no brief.</b> That is Agent B at the start: an empty folder with your materials in it and no idea what you want. Filling that gap is the next step — and it is the whole job.',
      18.0, 5.4, { x: 380, y: 800, width: 760 });

    s.say(0, 5.2, 'New terminal, so load the key first — then run Pi from inside your lab folder. The command itself is the same on every platform.', 'RUN PI');
    s.say(5.2, 4.4, 'The banner tells you which provider and model you actually got — check it says <code>ddls</code>.');
    s.say(9.6, 3.0, 'Then ask it something trivial.');
    s.say(12.6, 5.4, 'If that comes back, everything is wired: key, config, gateway. If it errors, fix it here — not halfway through the analysis.');
    s.say(18.0, 6.0, 'And look at what it can see: two files, no brief, no idea what you want. That is Agent B at the start — an empty folder. What you put in it is the whole job.');
  })();

  /* ============================================================ 11 · the brief */
  (function () {
    var s = film.scene('brief', { title: 'Draft the brief, inside Pi', kicker: 'Step 11', dur: 44 });
    head(s, 'Step 11 · the actual work', 'Draft <span style="font-family:var(--mono);font-size:.86em">AGENTS.md</span> and <span style="font-family:var(--mono);font-size:.86em">spec.md</span> — inside Pi',
      'Two prompts, then you edit both by hand. The transcript is already in the folder; work from it, never from memory.');

    var solo = U.osSolo({ x: 56, y: 186, w: 900 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.5);

    OSK.forEach(function (k) {
      var col = solo.variant(k);
      var t = U.terminal(k, null, { h: 620 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '13.2px';
      t.body.style.height = '560px';
      col.appendChild(t.node);

      // step 1 — read it back as prose, so you can catch a mishearing before it is baked in
      var c1 = t.cmd('read ddls-week1-interview.md. Do not analyse the data yet. Write a\nshort human-readable summary to summary.html: the goal, the data and\nwhere it lives, what has been tried, what "done" looks like, and every\ntrap or caveat you can find.', '› ');
      t.gap();
      var a1 = t.out('<span class="ok">write</span> <span class="path">summary.html</span> <span class="dim">(48 lines)</span>', '');
      var a2 = t.out('Wrote summary.html, a self-contained interview summary. It covers the', '');
      var a3 = t.out('goal, data location and schema, prior attempts, definition of done, and', '');
      var a4 = t.out('all stated caveats. No data analysis was performed.', '');
      t.gap();
      // step 2 — only once the prose is right, split it
      var c2 = t.cmd('now split summary.html into two files. AGENTS.md: under 200 lines,\nloaded every turn — the GOAL, where the data lives, the MUST-NOTs, and\na pointer to spec.md. spec.md: every number, column meaning, unit, trap,\nthe metric, the controls, and what done looks like. Invent nothing.', '› ');
      t.gap();
      var b1 = t.out('<span class="ok">write</span> <span class="path">AGENTS.md</span>  ·  <span class="ok">write</span> <span class="path">spec.md</span>', '');
      var b2 = t.out('Created:', '');
      var b3 = t.out('  · <span class="path">AGENTS.md</span> — 16 lines', '');
      var b4 = t.out('  · <span class="path">spec.md</span> — 51 lines', '');
      t.gap();
      var idle = t.idle('› ');
      [a1, a2, a3, a4, b1, b2, b3, b4, idle].forEach(function (n) { n.classList.add('fx'); });

      s.type(c1.txt, c1.text, 1.0, 4.4, { caret: false });
      s.stagger([a1, a2, a3, a4], 6.2, 0.4, 0.28);
      s.type(c2.txt, c2.text, 17.0, 4.6, { caret: false });
      s.stagger([b1, b2, b3, b4], 22.6, 0.4, 0.28);
      s.enter(idle, 24.6, 0.3);
      s.ring(a1, 6.6, 3.0, { pad: 3 });
    });

    s.note('<b>Read the summary and correct it before you go on.</b> This is where you catch the agent mishearing the scientist — after the split, that mistake is in both files.',
      10.6, 5.8, { x: 986, y: 200, width: 560, tone: 'warm' });

    // the two files, as they actually came out
    var cards = el('div');
    cards.style.cssText = 'position:absolute;left:986px;top:196px;width:560px;display:flex;flex-direction:column;gap:16px';
    s.node.appendChild(cards);
    [['AGENTS.md', '16 lines · read every turn',
      '<b>GOAL</b> — a measurement-only rule for Adélie, chinstrap and gentoo, usable in the hand in about 90 seconds.<br>' +
      '<b>MUST NOT</b> — use <b>island</b> or <b>sex</b> as inputs · silently drop the two unmeasured birds · ' +
      'rely on a single aggregate score instead of per-species errors.<br>' +
      '<b>→ spec.md</b> for every detail.'],
    ['spec.md', '51 lines · the data dictionary the download did not come with',
      '344 rows, one per bird · bill length = culmen along the top, in mm · ' +
      '<span style="font-family:var(--mono);font-size:13px">PAL0708-ADE-004</span> and ' +
      '<span style="font-family:var(--mono);font-size:13px">PAL0910-GEN-120</span> have no measurements at all — flag, never drop · ' +
      'nine more with no sex · done = 98–99% on held-out birds, reported per species.']
    ].forEach(function (c) {
      var d = el('div', 'card fx');
      d.style.cssText = 'padding:18px 20px';
      d.innerHTML = '<div style="font-family:var(--mono);font-size:15px;color:#0b62b4;font-weight:500">' + c[0] + '</div>' +
        '<div style="font-size:12.6px;color:#6b7a8a;margin:3px 0 9px">' + c[1] + '</div>' +
        '<div style="font-size:14px;color:#41505f;line-height:1.65">' + c[2] + '</div>';
      cards.appendChild(d);
    });
    s.stagger(Array.prototype.slice.call(cards.children), 26.4, 0.7, 0.5);

    s.note('<b>Now edit both by hand.</b> Nothing may be <i>added</i> that the transcript did not imply — you are making the implicit explicit, not inventing. And notice what is <b>not</b> in there: nothing about <code>sample_id</code>. She never mentioned it, so the draft cannot know. That one arrives in a moment, when you finally open the file.',
      35.0, 8.4, { x: 986, y: 560, width: 560, tone: 'warm' });

    s.say(0, 5.6, 'Now the real work — and you do it inside Pi, in the folder where the transcript already is.', 'BRIEF');
    s.say(5.6, 5.0, 'First ask it to read the transcript back to you as prose: goal, data, what was tried, what done looks like, every trap.');
    s.say(10.6, 6.4, 'Read that, and correct it. Once you split it into two files, a misheard sentence is in both of them — catch it here.');
    s.say(17.0, 5.6, 'Then split it. <code>AGENTS.md</code> is short and loaded every turn; <code>spec.md</code> holds every detail behind it.');
    s.say(22.6, 6.0, 'Sixteen lines and fifty-one. The brief stays cheap to load, and the detail is one file away when the agent needs it.');
    s.say(28.6, 6.4, 'Then edit both by hand. The test: could a competent stranger, with only these two files and the data, deliver what she wants — without asking you anything?');
    s.say(35.0, 9.0, 'And notice the gap. Nothing here mentions <code>sample_id</code>, because she never did. Your spec is a draft until you have opened the file — which is exactly what happens next.');
  })();

  /* ============================================================ 12 · direct it */
  (function () {
    var s = film.scene('direct', { title: 'Direct it — and check', kicker: 'Step 12', dur: 32 });
    head(s, 'Step 12 · the actual work', 'Ask it to read the data back to you first',
      'Before any analysis. This is where the mismatches show up.');

    var LINES = [
      ['<span class="ok">bash</span> <span class="dim">python3 -c "import pandas…"</span>', ''],
      ['344 rows × 9 columns. species/island complete. bill_length_mm 32.1–59.6,', ''],
      ['bill_depth_mm 13.1–21.5, flipper_length_mm 172–231, body_mass_g 2700–6300.', ''],
      ['&nbsp;', ''],
      ['<b>2 birds have no measurements at all</b> — PAL0708-ADE-004 (Adelie,', ''],
      ['Torgersen) and PAL0910-GEN-120 (Gentoo, Biscoe). Matches the spec.', ''],
      ['&nbsp;', ''],
      ['<span class="warn">There are 11 blank sex values, not 9.</span>', ''],
      ['Two of them are the fully unmeasured birds above, which leaves <b>9</b>', ''],
      ['fully measured birds with no sex. The spec\'s wording is off by two.', ''],
      ['&nbsp;', ''],
      ['All 344 sample_id values are unique, and the ADE/CHI/GEN code inside', ''],
      ['each one agrees with species on every row — confirming sample_id is a', ''],
      ['<span class="err">label leak</span>. It must not reach the model.', '']
    ];

    var solo = U.osSolo({ x: 200, y: 200, w: 1200 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.5);

    OSK.forEach(function (k) {
      var col = solo.variant(k);
      col.appendChild(el('div', 'os-tag', '<span class="badge">' + icon(OS[k].badge, 13) + '</span>' + OS[k].name + ' · ' + OS[k].shell));
      var t = U.terminal(k, null, { h: 520 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '14px';
      t.body.style.height = '460px';
      col.appendChild(t.node);

      var c1 = t.cmd('read AGENTS.md and spec.md, then load penguins.csv and tell me what you\nactually see — shapes, columns, ranges, missing values, anything that\ncontradicts the spec. Do not analyse anything yet.', '› ');
      t.gap();
      var lines = LINES.map(function (l) { var d = t.out(l[0], l[1]); d.classList.add('fx'); return d; });

      s.type(c1.txt, c1.text, 1.2, 4.6, { caret: false });
      s.stagger(lines, 7.0, 0.42, 0.28);
      s.ring(lines[7], 14.6, 6.0, { tone: 'warm', pad: 4 });
    });

    s.note('<b>She said nine. The file says eleven.</b> Not a big error — but you found it in ninety seconds, and it is exactly the kind of thing that quietly wrecks an analysis. Go back and fix <code>spec.md</code>.',
      15.4, 8.0, { x: 240, y: 800, width: 760, tone: 'warm' });

    s.say(0, 6.2, 'Point Pi at the brief and the data — and ask it to describe what it sees before it analyses anything.', 'DIRECT');
    s.say(6.2, 5.0, 'It loads the file and reads the numbers back: shapes, ranges, the missing values.');
    s.say(11.2, 3.6, 'Most of it matches what she told you.');
    s.say(14.8, 8.2, 'And then it does not. She said nine birds without sex; the file has eleven. Your spec was a draft until you opened the file — that is always true.');
    s.say(23.0, 9.0, 'It also confirms the leak you were warned about: <code>sample_id</code> spells out the species. Ban it, and re-check every result against a shuffled-label control.');
  })();

  /* ====================================================== 12b · validate */
  (function () {
    var s = film.scene('validate', { title: 'Validate it — controls, not vibes', kicker: 'Step 13', dur: 36 });
    head(s, 'Step 13 · the actual work', 'Corner it from three directions',
      'Code that runs is not code that is right — and a fluent explanation is not proof. Nothing turns red when the answer is wrong.');

    var solo = U.osSolo({ x: 130, y: 190, w: 1000 });
    s.node.appendChild(solo.node);
    s.enter(solo.node, 0.3, 0.5);

    OSK.forEach(function (k) {
      var col = solo.variant(k);
      var t = U.terminal(k, null, { h: 600 });
      t.node.style.width = '100%';
      t.body.style.fontSize = '13.4px';
      t.body.style.height = '540px';
      col.appendChild(t.node);

      var c1 = t.cmd('build the simplest measurement-only rule you can — never island,\nsex, study_year or sample_id — evaluate it on held-out birds, and\nreport accuracy PER SPECIES plus the Adelie/chinstrap confusion.\nThen run two controls: shuffle the species labels and re-fit, and a\nmajority-class baseline.', '› ');
      t.gap();
      var L = [
        ['Held-out evaluation (30%, stratified, fixed seed). Depth-4 tree on the', ''],
        ['four caliper measurements. The two unmeasured birds are flagged.', ''],
        ['&nbsp;', ''],
        ['Overall accuracy      <b>97.1%</b>', ''],
        ['  Adélie              42/46   <span class="warn">91.3%</span>', ''],
        ['  Chinstrap           19/21   <span class="warn">90.5%</span>', ''],
        ['  Gentoo              36/37   97.3%', ''],
        ['  Adélie↔chinstrap    3 and 2 the other way', ''],
        ['&nbsp;', ''],
        ['<span class="ok">Shuffled-label refit   33.7%</span>  (chance ≈ 33.3%)', ''],
        ['Majority-class         44.2%  (always Adélie)   <span class="dim">— a second, dumber method</span>', '']
      ].map(function (l) { var d = t.out(l[0], l[1]); d.classList.add('fx'); return d; });
      t.gap();
      var idle = t.idle('› '); idle.classList.add('fx');

      s.type(c1.txt, c1.text, 1.0, 4.6, { caret: false });
      s.stagger(L, 7.0, 0.34, 0.28);
      s.enter(idle, 11.4, 0.3);
      s.ring(L[9], 13.4, 4.0, { pad: 4 });
      s.ring(L[4], 22.0, 6.0, { tone: 'warm', pad: 4 });
    });

    s.note('<b>A negative control</b> — Part 5, family 5. Give the method two groups that <i>should</i> look the same and it must find nothing. Shuffle the species labels, re-fit: 33.7% against a chance of 33.3%. Nothing is leaking — no island, no sex, no <code>sample_id</code>.',
      13.4, 7.2, { x: 1150, y: 200, width: 400 });

    s.note('<b>And a known benchmark. 97.1% is not a pass.</b> She asked for <b>98–99%, per species</b> — Adélie is at 91.3%, chinstrap at 90.5%. The overall number was hiding exactly the confusion she warned you about. Back to Pi.',
      22.0, 8.0, { x: 1150, y: 200, width: 400, tone: 'warm' });

    s.say(0, 5.0, 'The analysis runs. That tells you nothing — a wrong answer runs just as happily as a right one.', 'VALIDATE');
    s.say(5.0, 5.0, 'Part 5 gives you five families of check. In week one, one move from each is the win — so ask for the result and the checks in the same breath.');
    s.say(10.0, 3.4, 'Ninety-seven percent. Looks like a finished lab.');
    s.say(13.4, 8.6, 'First a <b>negative control</b>: give the method labels that mean nothing and it must find nothing. Shuffled, the rule collapses to 33.7% — chance. If it had stayed high, a column was spelling out the answer.');
    s.say(22.0, 8.2, 'Then check it against <b>what is known</b> — her own bar. Adélie 91.3%, chinstrap 90.5%, both under 98 to 99 percent per species. The overall number was hiding it.');
    s.say(30.2, 5.8, 'Two routes, and they disagree with the headline. That is the difference between a result and a checked one — go back, tell Pi what failed, and iterate.');
  })();

  /* ============================================================ 13 · hand in */
  (function () {
    var s = film.scene('handin', { title: 'What you hand in', kicker: 'Step 14', dur: 16 });
    var hero = el('div', 'hero');
    hero.innerHTML = '<h1>What you hand in.</h1>' +
      '<p>Not just the answer. The <b>record of how you got there</b> — because that is what we read.</p>';
    s.node.appendChild(hero);
    s.enter(hero.querySelector('h1'), 0.3, 0.5);
    s.enter(hero.querySelector('p'), 0.8, 0.5);

    var g = el('div');
    g.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px';
    [['send', 'The interview transcript', 'Your conversation with Agent A, downloaded from the portal.'],
    ['terminal', 'The analysis transcript', 'Pi saves every run under <span style="font-family:var(--mono);font-size:13px">~/.pi/agent/sessions/</span> — on Windows, <span style="font-family:var(--mono);font-size:13px">C:\\Users\\you\\.pi\\agent\\sessions\\</span>. Include all of them.'],
    ['file', 'The report, plus your two files', 'AI-written, checked by you — with <span style="font-family:var(--mono);font-size:13px">AGENTS.md</span> and <span style="font-family:var(--mono);font-size:13px">spec.md</span> alongside.']
    ].forEach(function (x) {
      var d = el('div', 'card fx');
      d.style.cssText = 'padding:20px 22px';
      d.innerHTML = '<div style="color:#0b62b4;margin-bottom:10px">' + icon(x[0], 22) + '</div>' +
        '<div class="h-display" style="font-size:21px;margin-bottom:7px">' + x[1] + '</div>' +
        '<div style="font-size:15px;color:#41505f;line-height:1.55">' + x[2] + '</div>';
      g.appendChild(d);
    });
    hero.appendChild(g);
    s.stagger(Array.prototype.slice.call(g.children), 1.8, 0.35, 0.5);

    var q = el('div', 'fx');
    q.style.cssText = 'margin-top:40px;font-family:var(--serif);font-size:26px;color:#141a24;line-height:1.45;max-width:1100px';
    q.innerHTML = 'We read the transcript for three things: did you find <b>the question behind the question</b>, ' +
      'where did you <b>refuse</b> what the agent handed you, and what did you actually <b>check</b>?';
    hero.appendChild(q);
    s.enter(q, 4.2, 0.7);

    s.say(0, 4.2, 'Three things go in, and they are graded pass/fail.', 'HAND IN');
    s.say(4.2, 5.4, 'A polished result on top of a transcript showing no steering and no scepticism is not a pass.');
    s.say(9.6, 6.4, 'A modest result with a transcript showing real interviewing, translation and verification is exactly what we are after. See you Wednesday.');
  })();

  film.finish();

  /* HyperFrames contract: a paused, seekable timeline the renderer can scrub
     frame-by-frame into an MP4. Same file, no changes. */
  // chapter ids in order, so a link can say ?c=folder instead of a brittle ?c=7
  window.__filmChapters = film.scenes.map(function (sc) { return sc.id; });

  window.__timelines = window.__timelines || {};
  window.__timelines['ddls-lab1-onboarding'] = {
    duration: film.dur,
    seek: function (t) { film.pause(); film.seek(t); },
    pause: function () { film.pause(); },
    play: function () { film.play(); }
  };
})();
