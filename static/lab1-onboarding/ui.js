/* DDLS 2026 — Lab 1 onboarding film: UI replicas.
 * Hand-built, deterministic DOM copies of the three surfaces a student actually
 * touches this lab: the course portal in a browser, a file manager, and a terminal.
 * Deliberately not screenshots — text stays crisp at any zoom and searchable.
 */
(function (global) {
  'use strict';
  var E = global.DDLSFilm, el = E.el, icon = E.icon;

  var OS = {
    win: {
      key: 'win', name: 'Windows', badge: 'monitor', shell: 'PowerShell',
      termTitle: 'Windows PowerShell',
      home: 'C:\\Users\\alex',
      prompt: 'PS C:\\Users\\alex\\Documents\\ddls-week1> ',
      promptHome: 'PS C:\\Users\\alex> ',
      fmName: 'File Explorer', fmPath: 'Documents',
      ctx: ['Open', 'Open in Terminal', 'Copy as path'],
      ctxPick: 'Open in Terminal',
      configPath: '%USERPROFILE%\\.pi\\agent\\models.json',
      configPathReal: 'C:\\Users\\alex\\.pi\\agent\\models.json',
      openTerm: 'Start ▸ type "PowerShell"'
    },
    mac: {
      key: 'mac', name: 'macOS', badge: 'apple', shell: 'zsh',
      termTitle: 'alex — -zsh — 92×24',
      home: '/Users/alex',
      prompt: 'alex@MacBook-Air ddls-week1 % ',
      promptHome: 'alex@MacBook-Air ~ % ',
      fmName: 'Finder', fmPath: 'Documents',
      ctx: ['Open', 'Get Info', 'Services ▸ New Terminal at Folder'],
      ctxPick: 'Services ▸ New Terminal at Folder',
      configPath: '~/.pi/agent/models.json',
      configPathReal: '/Users/alex/.pi/agent/models.json',
      openTerm: '⌘ Space ▸ "Terminal"'
    },
    lin: {
      key: 'lin', name: 'Linux', badge: 'terminal', shell: 'bash',
      termTitle: 'alex@thinkpad: ~/ddls-week1',
      home: '/home/alex',
      prompt: 'alex@thinkpad:~/ddls-week1$ ',
      promptHome: 'alex@thinkpad:~$ ',
      fmName: 'Files', fmPath: 'Home',
      ctx: ['Open With…', 'Open in Terminal', 'Properties'],
      ctxPick: 'Open in Terminal',
      configPath: '~/.pi/agent/models.json',
      configPathReal: '/home/alex/.pi/agent/models.json',
      openTerm: 'Ctrl + Alt + T'
    }
  };

  function pos(node, box) {
    node.style.left = box.x + 'px'; node.style.top = box.y + 'px';
    node.style.width = box.w + 'px'; if (box.h) node.style.height = box.h + 'px';
    return node;
  }

  /* ---------------- browser window ---------------- */
  function browser(url, box) {
    var n = el('div', 'browser');
    pos(n, box);
    var bar = el('div', 'browser-bar');
    bar.innerHTML = '<div class="dots"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span></div>';
    var u = el('div', 'urlbar', '<span class="lock">' + icon('lock', 12) + '</span><span class="u"></span>');
    bar.appendChild(u);
    var body = el('div', 'browser-body');
    n.appendChild(bar); n.appendChild(body);
    return { node: n, body: body, url: u.querySelector('.u'), setUrl: function (t) { u.querySelector('.u').textContent = t; } , _url:url};
  }

  /* ---------------- portal chrome ---------------- */
  function portalHeader(email) {
    var h = el('div', 'pt-head');
    h.innerHTML =
      '<div class="pt-brand"><span class="pt-logo">' + icon('dna', 16) + '</span>' +
      '<span class="nm">DDLS 2026</span><span class="sub">· Course Portal</span></div>' +
      '<div class="pt-nav">' + (email
        ? '<span>Dashboard</span><span style="color:#6b7a8a">' + email + '</span><span>Sign out</span>'
        : '') + '</div>';
    return h;
  }

  /* ---------------- portal: activate page ---------------- */
  function activatePage() {
    var wrap = el('div');
    wrap.appendChild(portalHeader(''));
    var body = el('div', 'pt-body');
    body.style.padding = '38px 0';
    var card = el('div', 'card');
    card.style.cssText = 'width:430px;margin:0 auto;padding:26px 28px';
    card.innerHTML =
      '<div style="text-align:center;margin-bottom:14px"><span style="display:inline-flex;width:40px;height:40px;border-radius:12px;background:#e4eef8;color:#0b62b4;align-items:center;justify-content:center">' + icon('sparkles', 20) + '</span></div>' +
      '<h2 class="h-display" style="font-size:23px;margin:0 0 5px">Activate your account</h2>' +
      '<p style="font-size:13.5px;color:#6b7a8a;margin:0 0 18px;line-height:1.5">Enter your registered email and the course code from the welcome email, then choose a password.</p>';
    var fields = {};
    [['email', 'Registered email', 'you@university.se'],
     ['code', 'Course code', ''],
     ['pw1', 'Choose a password', ''],
     ['pw2', 'Confirm password', '']].forEach(function (f) {
      var g = el('div'); g.style.marginBottom = '13px';
      g.innerHTML = '<div class="label">' + f[1] + '</div>';
      var inp = el('div', 'field', '<span class="v"></span>');
      g.appendChild(inp); card.appendChild(g);
      fields[f[0]] = { box: inp, val: inp.querySelector('.v') };
    });
    var btn = el('div', 'btn'); btn.style.width = '100%'; btn.textContent = 'Activate & sign in';
    card.appendChild(btn);
    body.appendChild(card);
    wrap.appendChild(body);
    return { node: wrap, fields: fields, button: btn, card: card };
  }

  /* ---------------- portal: dashboard ---------------- */
  function dashboardPage(opts) {
    opts = opts || {};
    var wrap = el('div');
    wrap.appendChild(portalHeader('alex.lindqvist@kth.se'));
    var body = el('div', 'pt-body');
    body.innerHTML =
      '<h2 class="h-display" style="font-size:30px;margin:0 0 4px">Welcome, Alex</h2>' +
      '<p style="font-size:14px;color:#6b7a8a;margin:0 0 20px">Your workspace for the DDLS 2026 labs — interview the data owner, get an API key for your analyst agent, and download what you need.</p>';

    var stats = el('div');
    stats.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px';
    var budgetVal = null;
    [['download', 'USAGE BUDGET', '$5.0000', 'left of $5.00 · $0.0000 used'],
     ['check', 'GATEWAY', 'Online', 'ddls-portal-…hypha.aicell.io/v1'],
     ['key', 'ACTIVE KEYS', opts.keys != null ? String(opts.keys) : '0', 'used by your analyst agent']].forEach(function (s) {
      var c = el('div', 'card'); c.style.padding = '13px 16px';
      c.innerHTML = '<div style="display:flex;align-items:center;gap:7px;font-size:11px;letter-spacing:.09em;color:#6b7a8a">' +
        '<span style="color:#0b62b4">' + icon(s[0], 14) + '</span>' + s[1] + '</div>' +
        '<div class="h-display v" style="font-size:26px;margin:5px 0 3px">' + s[2] + '</div>' +
        '<div style="font-size:11.5px;color:#6b7a8a;font-family:var(--mono)">' + s[3] + '</div>';
      stats.appendChild(c);
    });
    body.appendChild(stats);
    budgetVal = stats.children[0].querySelector('.v');
    var keysVal = stats.children[2].querySelector('.v');

    body.appendChild(el('h3', 'h-display', 'Weekly labs')).style.cssText = 'font-size:20px;margin:0 0 12px';
    var labs = el('div');
    labs.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px';
    var w1 = el('div', 'card'); w1.style.padding = '15px 17px';
    w1.innerHTML =
      '<span style="display:inline-block;background:#e4eef8;color:#0b62b4;border-radius:6px;padding:2px 8px;font-size:11.5px;font-weight:600">Week 1</span>' +
      '<div class="h-display" style="font-size:18px;margin:9px 0 6px">Become a Forward-Deployed AI Scientist</div>' +
      '<div style="font-size:12.5px;color:#6b7a8a;line-height:1.5">Parachute into a scientist\'s problem you\'ve never seen. Interview them until the real question is razor-sharp…</div>';
    var openBtn = el('div', 'btn'); openBtn.style.cssText = 'width:100%;margin-top:12px';
    openBtn.innerHTML = icon('send', 14) + ' Open lab';
    w1.appendChild(openBtn);
    var w2 = el('div', 'card'); w2.style.cssText = 'padding:15px 17px;opacity:.6';
    w2.innerHTML =
      '<span style="display:inline-block;background:#eceae6;color:#6b7a8a;border-radius:6px;padding:2px 8px;font-size:11.5px;font-weight:600">Week 2</span>' +
      '<div class="h-display" style="font-size:18px;margin:9px 0 6px">Image analysis &amp; microscopy</div>' +
      '<div style="font-size:12.5px;color:#6b7a8a">Opens in week 2.</div>';
    labs.appendChild(w1); labs.appendChild(w2);
    body.appendChild(labs);

    var keyH = el('h3', 'h-display', 'API keys for your analyst agent');
    keyH.style.cssText = 'font-size:20px;margin:0 0 12px';
    body.appendChild(keyH);
    var keyCard = el('div', 'card'); keyCard.style.padding = '15px 17px';
    keyCard.innerHTML = '<div style="font-size:13px;color:#41505f;line-height:1.55;margin-bottom:12px">Point your analyst agent <b>Pi</b> at <code style="font-family:var(--mono);background:#f2f1ee;padding:1px 5px;border-radius:4px">https://…hypha.aicell.io/v1</code> and use a key below as your <code style="font-family:var(--mono);background:#f2f1ee;padding:1px 5px;border-radius:4px">DDLS_API_KEY</code>.</div>';
    var row = el('div'); row.style.cssText = 'display:flex;gap:10px';
    var labelField = el('div', 'field'); labelField.style.flex = '1';
    labelField.innerHTML = '<span class="v"></span>';
    var genBtn = el('div', 'btn'); genBtn.innerHTML = icon('key', 14) + ' Generate API key';
    genBtn.style.flex = 'none';
    row.appendChild(labelField); row.appendChild(genBtn);
    keyCard.appendChild(row);

    var reveal = el('div', 'fx');
    reveal.style.cssText = 'margin-top:12px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:10px;padding:11px 13px';
    reveal.innerHTML =
      '<div style="font-size:12.5px;color:#065f46;font-weight:600;margin-bottom:7px">Your new key — copy it now, you will not see it again.</div>' +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<code class="kv" style="flex:1;background:#fff;border:1px solid #a7f3d0;border-radius:6px;padding:6px 9px;font-family:var(--mono);font-size:12.5px;color:#065f46"></code>' +
      '<span class="cp" style="border:1px solid #a7f3d0;border-radius:6px;padding:6px 10px;font-size:12.5px;color:#065f46;background:#fff">Copy</span></div>';
    keyCard.appendChild(reveal);
    body.appendChild(keyCard);
    wrap.appendChild(body);

    return {
      node: wrap, openBtn: openBtn, genBtn: genBtn, labelField: labelField,
      labelVal: labelField.querySelector('.v'), reveal: reveal,
      keyVal: reveal.querySelector('.kv'), copyBtn: reveal.querySelector('.cp'),
      budget: budgetVal, keysStat: keysVal, keyCard: keyCard
    };
  }

  /* ---------------- portal: week 1 lab page ---------------- */
  function weekPage() {
    var wrap = el('div');
    wrap.appendChild(portalHeader('alex.lindqvist@kth.se'));
    var body = el('div', 'pt-body');
    body.style.padding = '18px 26px';
    body.innerHTML =
      '<div style="font-size:11.5px;color:#0b62b4;font-weight:600">Module 1 · Introduction to Data-Driven Life Sciences · Week 1</div>' +
      '<h2 class="h-display" style="font-size:24px;margin:3px 0 10px">Become a Forward-Deployed AI Scientist</h2>';
    var actions = el('div');
    actions.style.cssText = 'display:flex;gap:9px;margin-bottom:14px';
    var dsBtn = el('div', 'btn-ghost', icon('download', 14) + ' Dataset');
    var trBtn = el('div', 'btn-ghost', icon('download', 14) + ' Transcript');
    var lbBtn = el('div', 'btn-ghost', icon('book', 14) + ' Lab instructions');
    actions.appendChild(dsBtn); actions.appendChild(trBtn); actions.appendChild(lbBtn);
    body.appendChild(actions);

    var grid = el('div');
    grid.style.cssText = 'display:grid;grid-template-columns:1fr 300px;gap:16px';
    var chat = el('div', 'card');
    chat.style.cssText = 'display:flex;flex-direction:column;height:430px;overflow:hidden';
    var chead = el('div');
    chead.style.cssText = 'padding:10px 14px;border-bottom:1px solid #e8e5de;display:flex;align-items:center;gap:10px';
    chead.innerHTML =
      '<span style="position:relative;display:inline-flex;width:32px;height:32px;border-radius:50%;background:#e4eef8;color:#0b62b4;align-items:center;justify-content:center">' + icon('bird', 17) +
      '<span style="position:absolute;right:-1px;bottom:-1px;width:9px;height:9px;border-radius:50%;background:#10b981;outline:2px solid #fff"></span></span>' +
      '<div style="line-height:1.25"><div style="font-size:13.5px;font-weight:600">Dr. Marisol Vega</div>' +
      '<div style="font-size:11.5px;color:#6b7a8a">Field ecologist, Pygoscelis penguin monitoring · IMAS, Hobart</div></div>';
    var thread = el('div');
    thread.style.cssText = 'flex:1;padding:14px;display:flex;flex-direction:column;gap:9px;overflow:hidden';
    var form = el('div');
    form.style.cssText = 'border-top:1px solid #e8e5de;padding:10px;display:flex;gap:8px';
    var input = el('div', 'field'); input.style.flex = '1';
    input.innerHTML = '<span class="v"></span>';
    var suggest = el('div', 'sugg-btn', icon('wand', 16));
    var send = el('div', 'btn', icon('send', 14) + ' Send');
    form.appendChild(input); form.appendChild(suggest); form.appendChild(send);
    chat.appendChild(chead); chat.appendChild(thread); chat.appendChild(form);

    var side = el('div');
    side.style.cssText = 'display:flex;flex-direction:column;gap:12px';
    var pb = el('div', 'card'); pb.style.padding = '13px 15px';
    pb.innerHTML =
      '<div style="display:flex;align-items:center;gap:7px;font-weight:600;font-size:14px;margin-bottom:9px"><span style="color:#0b62b4">' + icon('target', 15) + '</span>Interview playbook</div>' +
      ['<b>1 · Open wide.</b> Let them tell it their way.',
       '<b>2 · Ground the data.</b> One row = what? Units, ranges, how big.',
       '<b>3 · Hunt the traps.</b> Missing values, duplicates, what they trust least.',
       '<b>4 · Define done.</b> What a good answer looks like, what would make it useless.',
       '<b>5 · Play it back.</b> Restate it, then ask "what did I miss?"'
      ].map(function (x) { return '<div style="font-size:12.3px;color:#41505f;line-height:1.5;margin-bottom:6px">' + x + '</div>'; }).join('');
    var bud = el('div', 'card');
    bud.style.cssText = 'padding:11px 13px;background:#fffbeb;border-color:#fde68a';
    bud.innerHTML = '<div style="font-size:12.3px;color:#92400e;line-height:1.5">Budget left: <b class="bv">$5.0000</b>. The interview is cheap; your analyst agent spends more.</div>';
    side.appendChild(pb); side.appendChild(bud);

    grid.appendChild(chat); grid.appendChild(side);
    body.appendChild(grid);
    var foot = el('div');
    foot.style.cssText = 'font-size:11.5px;color:#6b7a8a;margin-top:8px';
    foot.textContent = 'Everything you type here is logged as your interview transcript — no separate submission needed.';
    body.appendChild(foot);
    wrap.appendChild(body);

    return {
      node: wrap, thread: thread, input: input, inputVal: input.querySelector('.v'),
      send: send, suggest: suggest, form: form, chatBox: chat, dsBtn: dsBtn, trBtn: trBtn, lbBtn: lbBtn,
      budget: bud.querySelector('.bv'), chat: chat, actions: actions
    };
  }

  /* a student message exactly as the portal renders it: hover toolbar (coach + delete)
     to the left of the bubble, and a coach panel that unfolds underneath. */
  function userMsg(text) {
    var wrap = el('div', 'umsg');
    var row = el('div', 'umsg-row');
    var acts = el('div', 'msg-actions');
    var wand = el('div', 'mact wand', icon('wand', 14));
    var edit = el('div', 'mact edit', icon('pen', 14));
    acts.appendChild(wand); acts.appendChild(edit);
    var b = el('div', 'bubble me');
    b.textContent = text;
    row.appendChild(acts); row.appendChild(b);
    var panel = el('div', 'coach');
    panel.innerHTML =
      '<div class="coach-h"><span class="t">' + icon('wand', 13) + 'Interview coach · hints, not answers</span>' +
      '<span class="x">' + icon('x', 13) + '</span></div><div class="coach-b"></div>';
    wrap.appendChild(row); wrap.appendChild(panel);
    return { node: wrap, row: row, actions: acts, wand: wand, edit: edit, bubble: b,
             panel: panel, body: panel.querySelector('.coach-b') };
  }

  /* "questions you could ask next" popover — sits just above the composer */
  function suggestPanel(items) {
    var n = el('div', 'sugg');
    n.innerHTML =
      '<div class="sugg-h"><span class="t">' + icon('wand', 13) +
      'Questions you could ask next · tap one to edit &amp; send</span>' +
      '<span class="x">' + icon('x', 13) + '</span></div><div class="sugg-b"></div>';
    var body = n.querySelector('.sugg-b');
    var loading = el('div');
    loading.style.cssText = 'font-style:italic;color:#6b7a8a;font-size:12.8px;padding:4px 8px';
    loading.textContent = 'Reading the interview so far…';
    body.appendChild(loading);
    var rows = (items || []).map(function (t) {
      var d = el('div', 'sugg-item', t);
      body.appendChild(d);
      return d;
    });
    return { node: n, body: body, loading: loading, items: rows };
  }

  /* the browser's confirm() sheet, drawn the way Chrome drops it from the top */
  function confirmSheet(host, message) {
    var n = el('div', 'confirm');
    n.innerHTML = '<div class="host">' + host + ' says</div><div class="msg">' + message + '</div>';
    var row = el('div', 'row');
    var cancel = el('div', 'b', 'Cancel');
    var ok = el('div', 'b p', 'OK');
    row.appendChild(cancel); row.appendChild(ok);
    n.appendChild(row);
    return { node: n, ok: ok, cancel: cancel };
  }

  function bubble(kind, html) {
    var b = el('div', 'bubble ' + kind, html);
    return b;
  }

  /* ---------------- download shelf ---------------- */
  function shelf(box) {
    var n = el('div', 'card');
    n.style.cssText = 'position:absolute;padding:9px 12px;display:flex;gap:14px;align-items:center;box-shadow:0 12px 30px -14px rgba(11,18,32,.4)';
    n.style.left = box.x + 'px'; n.style.top = box.y + 'px';
    return n;
  }
  function shelfItem(name, size) {
    var i = el('div');
    i.style.cssText = 'display:flex;gap:8px;align-items:center;font-size:12.5px';
    i.innerHTML = '<span style="color:#0b62b4">' + icon('file', 15) + '</span>' +
      '<span><span style="font-family:var(--mono);font-size:12px">' + name + '</span>' +
      '<span style="display:block;color:#6b7a8a;font-size:11px">' + size + '</span></span>';
    return i;
  }

  /* ---------------- terminal ---------------- */
  function terminal(osKey, box, opts) {
    opts = opts || {};
    var o = OS[osKey];
    var n = el('div', 'term ' + osKey);
    if (box) { n.style.position = 'absolute'; pos(n, box); }
    var bar = el('div', 'term-bar');
    bar.innerHTML = osKey === 'mac'
      ? '<span style="position:absolute;left:10px;display:flex;gap:6px"><span class="dot r" style="width:10px;height:10px"></span><span class="dot y" style="width:10px;height:10px"></span><span class="dot g" style="width:10px;height:10px"></span></span><span>' + (opts.title || o.termTitle) + '</span>'
      : '<span style="color:#0b62b4;display:flex">' + icon('terminal', 13) + '</span><span>' + (opts.title || o.termTitle) + '</span>';
    bar.style.position = 'relative';
    var body = el('div', 'term-body');
    if (opts.h) body.style.height = (opts.h - 30) + 'px';
    n.appendChild(bar); n.appendChild(body);

    var api = {
      node: n, body: body, os: o, bar: bar,
      cmd: function (text, promptOverride) {
        var d = el('div');
        var p = el('span', 'p'); p.textContent = promptOverride != null ? promptOverride : o.prompt;
        var t = el('span');
        d.appendChild(p); d.appendChild(t);
        body.appendChild(d);
        return { row: d, txt: t, text: text };
      },
      out: function (html, cls) {
        var d = el('div', cls || '');
        d.innerHTML = html;
        body.appendChild(d);
        return d;
      },
      gap: function () { var d = el('div'); d.innerHTML = '&nbsp;'; body.appendChild(d); return d; },
      idle: function (promptOverride) {
        var d = el('div');
        d.innerHTML = '<span class="p">' + (promptOverride != null ? promptOverride : o.prompt).replace(/</g, '&lt;') + '</span><span class="caret"></span>';
        body.appendChild(d); return d;
      }
    };
    return api;
  }

  /* ---------------- file manager ---------------- */
  function fileManager(osKey, box) {
    var o = OS[osKey];
    var n = el('div', 'fm ' + osKey);
    n.style.position = 'absolute'; pos(n, box);
    var bar = el('div', 'fm-bar');
    bar.innerHTML = osKey === 'mac'
      ? '<span style="position:absolute;left:10px;display:flex;gap:6px"><span class="dot r" style="width:10px;height:10px"></span><span class="dot y" style="width:10px;height:10px"></span><span class="dot g" style="width:10px;height:10px"></span></span><span>' + o.fmPath + '</span>'
      : '<span style="display:flex;color:#0b62b4">' + icon('folder', 13) + '</span><span>' + o.fmPath + '</span>';
    bar.style.position = 'relative';
    var body = el('div', 'fm-body');
    n.appendChild(bar); n.appendChild(body);
    return {
      node: n, body: body, os: o,
      file: function (name, kind) {
        var f = el('div', 'file');
        f.innerHTML = '<div class="ic">' + icon(kind === 'file' ? 'file' : 'folder', 32, 1.5) + '</div><div class="nm">' + name + '</div>';
        if (kind === 'file') f.querySelector('.ic').style.color = '#8fa0b3';
        body.appendChild(f);
        return f;
      },
      menu: function (items, pick, at) {
        var m = el('div', 'ctx');
        m.style.left = at.x + 'px'; m.style.top = at.y + 'px';
        items.forEach(function (t) {
          m.appendChild(el('div', t === pick ? 'hi' : '', t));
        });
        body.appendChild(m);
        return m;
      }
    };
  }

  /* ---------------- OS column wrapper ---------------- */
  /* three variants in one slot — only the viewer's own platform is shown, and the OS
     filter switches between them. Use once the three platforms stop differing visually. */
  function osSolo(box) {
    var n = el('div', 'os-solo');
    if (box) { n.style.position = 'absolute'; pos(n, box); }
    return {
      node: n,
      variant: function (osKey) {
        var c = el('div', 'os-col');
        c.dataset.os = osKey;
        n.appendChild(c);
        return c;
      }
    };
  }

  function osColumn(osKey, title) {
    var o = OS[osKey];
    var c = el('div', 'os-col');
    c.dataset.os = osKey;
    var tag = el('div', 'os-tag',
      '<span class="badge">' + icon(o.badge, 13) + '</span>' + (title || o.name));
    c.appendChild(tag);
    return c;
  }

  global.DDLSUI = {
    OS: OS, browser: browser, activatePage: activatePage, dashboardPage: dashboardPage,
    weekPage: weekPage, bubble: bubble, userMsg: userMsg, confirmSheet: confirmSheet, suggestPanel: suggestPanel, terminal: terminal, fileManager: fileManager,
    osColumn: osColumn, osSolo: osSolo, shelf: shelf, shelfItem: shelfItem, pos: pos
  };
})(window);
