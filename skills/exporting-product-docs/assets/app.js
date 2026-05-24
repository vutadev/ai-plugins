/* exporting-product-docs — docs-site runtime (vanilla, no deps).
   Theme toggle, theme-aware Mermaid, on-this-page TOC + scrollspy,
   copy-code buttons, client-side search, mobile nav drawer. */
(function () {
  var root = document.documentElement;
  var theme = function () { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; };

  // ---------- Mermaid (theme-aware, re-render on toggle) ----------
  var diagrams = [].slice.call(document.querySelectorAll('pre.mermaid'));
  diagrams.forEach(function (d) { d.dataset.src = d.textContent; });
  function renderMermaid() {
    if (!window.mermaid || !diagrams.length) return;
    diagrams.forEach(function (d) { d.textContent = d.dataset.src; d.removeAttribute('data-processed'); });
    try {
      window.mermaid.initialize({ startOnLoad: false, theme: theme() === 'dark' ? 'dark' : 'default', securityLevel: 'loose' });
      window.mermaid.run({ nodes: diagrams });
    } catch (e) { /* leave source visible */ }
  }
  renderMermaid();

  // ---------- Theme toggle ----------
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('docs-theme', t); } catch (e) {}
    renderMermaid();
  }
  var themeBtn = document.getElementById('themebtn');
  if (themeBtn) themeBtn.addEventListener('click', function () { setTheme(theme() === 'dark' ? 'light' : 'dark'); });

  // ---------- Mobile drawer ----------
  var menuBtn = document.getElementById('menubtn');
  var scrim = document.getElementById('scrim');
  function closeNav() { document.body.classList.remove('nav-open'); if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); }
  if (menuBtn) menuBtn.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (scrim) scrim.addEventListener('click', closeNav);
  [].slice.call(document.querySelectorAll('.sidebar a')).forEach(function (a) { a.addEventListener('click', closeNav); });

  // ---------- Copy code ----------
  [].slice.call(document.querySelectorAll('pre.hljs')).forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = 'Copy';
    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.textContent : pre.textContent;
      var done = function () { btn.textContent = 'Copied'; btn.classList.add('copied'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1400); };
      var manual = function () { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); done(); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, manual);
      else manual();
    });
    pre.appendChild(btn);
  });

  // ---------- On-this-page TOC (per-doc) ----------
  var spyTargets = [];
  var tocNav = document.getElementById('toc');
  var article = document.querySelector('article.doc:not([data-combined])');
  if (tocNav && article) {
    var hs = [].slice.call(article.querySelectorAll('h2[id], h3[id]'));
    if (hs.length) {
      hs.forEach(function (h) {
        var a = document.createElement('a');
        a.href = '#' + h.id; a.textContent = h.textContent;
        a.className = h.tagName === 'H3' ? 'lvl-3' : 'lvl-2';
        tocNav.appendChild(a);
        spyTargets.push({ el: h, link: a });
      });
    } else {
      var rail = document.getElementById('tocrail'); if (rail) rail.style.display = 'none';
    }
  }

  // ---------- Combined sidebar scrollspy ----------
  if (document.querySelector('article.doc[data-combined]')) {
    [].slice.call(document.querySelectorAll('.sidebar a[href^="#"]')).forEach(function (a) {
      var el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      if (el) spyTargets.push({ el: el, link: a });
    });
  }

  // ---------- Scrollspy (last heading above the fold) ----------
  if (spyTargets.length) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var threshold = 100, active = spyTargets[0];
      for (var i = 0; i < spyTargets.length; i++) {
        if (spyTargets[i].el.getBoundingClientRect().top <= threshold) active = spyTargets[i];
        else break;
      }
      spyTargets.forEach(function (t) { t.link.classList.toggle('active', t === active); });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // ---------- Search ----------
  var input = document.getElementById('docsearch');
  var box = document.getElementById('searchresults');
  var index = window.__DOCS_SEARCH__ || [];
  if (input && box && index.length) {
    var esc = function (s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); };
    var render = function (items) {
      box.innerHTML = items.length
        ? items.map(function (it, i) { return '<a class="sr-item' + (i === 0 ? ' active' : '') + '" href="' + it.url + '"><span class="sr-title">' + esc(it.title) + '</span><span class="sr-sub">' + esc(it.sub) + '</span></a>'; }).join('')
        : '<div class="sr-empty">No matches</div>';
      box.hidden = false;
    };
    var search = function (q) {
      q = q.trim().toLowerCase();
      if (!q) { box.hidden = true; return; }
      var out = [];
      index.forEach(function (doc) {
        var label = doc.short || doc.title;
        if (doc.title.toLowerCase().indexOf(q) >= 0 || label.toLowerCase().indexOf(q) >= 0)
          out.push({ title: label, sub: doc.group + ' · document', url: doc.url });
        (doc.headings || []).forEach(function (h) {
          if (h.text.toLowerCase().indexOf(q) >= 0) out.push({ title: h.text, sub: label, url: doc.url + '#' + h.anchor });
        });
      });
      render(out.slice(0, 12));
    };
    input.addEventListener('input', function () { search(input.value); });
    input.addEventListener('focus', function () { if (input.value) search(input.value); });
    input.addEventListener('keydown', function (e) {
      var items = [].slice.call(box.querySelectorAll('.sr-item'));
      if (e.key === 'Enter') { var a = box.querySelector('.sr-item.active') || items[0]; if (a) window.location.href = a.getAttribute('href'); }
      else if (e.key === 'Escape') { box.hidden = true; input.blur(); }
      else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && items.length) {
        e.preventDefault();
        var cur = box.querySelector('.sr-item.active'), idx = items.indexOf(cur);
        idx = e.key === 'ArrowDown' ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1);
        items.forEach(function (x) { x.classList.remove('active'); });
        items[idx].classList.add('active'); items[idx].scrollIntoView({ block: 'nearest' });
      }
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target) && e.target !== input) box.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); } });
  }
})();
