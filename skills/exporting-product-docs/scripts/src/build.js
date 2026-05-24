// Converter for the exporting-product-docs skill.
// Renders a managing-product-docs markdown doc-set to an offline, deployable
// docs-site (left sidebar, light/dark, search, on-this-page TOC).
// Source file — bundle to ../build.mjs with `npm run build` (esbuild).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import GithubSlugger from 'github-slugger';
import hljs from 'highlight.js/lib/core';
import yaml from 'js-yaml';

// Register only the languages product docs realistically contain — keeps the
// bundle ~150KB instead of ~2MB (highlight.js ships ~190 languages by default).
// Unregistered fences fall back to escaped plain text (graceful).
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import yamlLang from 'highlight.js/lib/languages/yaml';
import sql from 'highlight.js/lib/languages/sql';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import go from 'highlight.js/lib/languages/go';
import xml from 'highlight.js/lib/languages/xml';
import http from 'highlight.js/lib/languages/http';
import markdown from 'highlight.js/lib/languages/markdown';
import diff from 'highlight.js/lib/languages/diff';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import ini from 'highlight.js/lib/languages/ini';

for (const [name, lang] of Object.entries({
  bash, json, yaml: yamlLang, sql, python, typescript, javascript,
  go, xml, http, markdown, diff, dockerfile, ini,
})) {
  hljs.registerLanguage(name, lang);
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.join(scriptDir, '..', 'assets');
const MERMAID_PATH = path.join(scriptDir, 'vendor', 'mermaid.min.js');

// Source-of-Truth Order (normalized keys) — drives ordering everywhere.
const ORDER = [
  'prd', 'techstack', 'architecture', 'businessrules', 'srs', 'userstories',
  'usecases', 'userflows', 'sitemap', 'design', 'database', 'apireference',
  'testcases', 'roadmap', 'externaldocs', 'reviewreport',
];

// Sidebar grouping by delivery phase.
const GROUPS = [
  ['Product', ['prd', 'businessrules']],
  ['Requirements', ['srs', 'userstories', 'usecases', 'userflows']],
  ['Engineering', ['techstack', 'architecture', 'database', 'apireference']],
  ['Design', ['sitemap', 'design']],
  ['Delivery', ['testcases', 'roadmap', 'externaldocs', 'reviewreport']],
];

const SHORT = {
  prd: 'PRD', techstack: 'Tech Stack', architecture: 'Architecture',
  businessrules: 'Business Rules', srs: 'SRS', userstories: 'User Stories',
  usecases: 'Use Cases', userflows: 'User Flows', sitemap: 'Sitemap',
  design: 'Design System', database: 'Database', apireference: 'API Reference',
  testcases: 'Test Cases', roadmap: 'Roadmap', externaldocs: 'External Docs',
  reviewreport: 'Review Report',
};

const KNOWN_GROUP_KEYS = new Set(GROUPS.flatMap(([, keys]) => keys));

function parseArgs(argv) {
  const args = { in: 'docs', out: 'docs/html', mode: 'both' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--in') args.in = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--mode') args.mode = argv[++i];
    else if (a === '-h' || a === '--help') args.help = true;
  }
  return args;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function normKey(file) {
  return path.basename(file)
    .replace(/\.md$/i, '')
    .replace(/[-_]?example$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function orderIndex(key) {
  const i = ORDER.indexOf(key);
  return i === -1 ? 999 : i;
}

function groupOf(key) {
  for (const [label, keys] of GROUPS) if (keys.includes(key)) return label;
  return 'Other';
}

function shortLabel(d) {
  return SHORT[d.key] || d.title.split(' — ')[0];
}

// Shared slugger reset per document so anchor IDs match GitHub-style cross-refs
// (e.g. "4.1 Functional Requirements" -> "41-functional-requirements").
const slugger = new GithubSlugger();
const md = new MarkdownIt({ html: true, linkify: false, typographer: false, highlight });
md.use(anchor, { slugify: (s) => slugger.slug(s), permalink: false, tabIndex: false });

function highlight(str, lang) {
  if (lang === 'mermaid') {
    // app.js stashes the source and runs mermaid (theme-aware) on load.
    return `<pre class="mermaid">${escapeHtml(str)}</pre>`;
  }
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
    } catch { /* fall through */ }
  }
  return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`;
}

function firstHeading(raw) {
  const m = raw.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}

function parseHeaderField(raw, field) {
  const re = new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+?)\\s*$`, 'm');
  const m = raw.match(re);
  return m ? m[1].trim() : null;
}

// DESIGN.md uses a YAML token block instead of the markdown header block.
function extractDesignTokens(raw) {
  const lines = raw.split('\n');
  let start = -1, end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (start === -1) start = i;
      else { end = i; break; }
    }
  }
  if (start === -1 || end === -1) return { raw, tokensHtml: '', data: null };
  let data;
  try {
    data = yaml.load(lines.slice(start + 1, end).join('\n'));
  } catch {
    return { raw, tokensHtml: '', data: null };
  }
  if (!data || typeof data !== 'object') return { raw, tokensHtml: '', data: null };
  const newRaw = [...lines.slice(0, start), ...lines.slice(end + 1)].join('\n');
  return { raw: newRaw, tokensHtml: renderTokens(data), data };
}

function flatten(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out.push([key, Array.isArray(v) ? v.join(', ') : String(v)]);
  }
  return out;
}

function renderTokens(data) {
  const rows = flatten(data).map(([k, v]) => {
    const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v);
    const swatch = isColor ? `<span class="swatch" style="background:${v}"></span>` : '';
    return `<tr><td><code>${escapeHtml(k)}</code></td><td>${swatch}${escapeHtml(v)}</td></tr>`;
  }).join('\n');
  return `<div class="design-tokens"><h2 id="design-tokens">Design Tokens</h2><table><thead><tr><th>Token</th><th>Value</th></tr></thead><tbody>\n${rows}\n</tbody></table></div>`;
}

function rewriteForPerDoc(html) {
  return html.replace(/href="(?!https?:|mailto:|#)([^"]+?)\.md(#[^"]*)?"/g,
    (_, p, hash) => `href="${p}.html${hash || ''}"`);
}

function rewriteForCombined(html, ds, dsByKey) {
  html = html.replace(/\bid="([^"]+)"/g, (_, id) => `id="${ds}--${id}"`);
  html = html.replace(/href="#([^"]+)"/g, (_, id) => `href="#${ds}--${id}"`);
  html = html.replace(/href="(?!https?:|mailto:)([^"]+?)\.md(#([^"]*))?"/g, (m, file, _h, frag) => {
    const targetKey = normKey(file);
    const targetDs = dsByKey.get(targetKey);
    if (!targetDs) return m;
    return frag ? `href="#${targetDs}--${frag}"` : `href="#${targetDs}"`;
  });
  return html;
}

function statusBadge(status) {
  if (!status) return '<span class="badge">—</span>';
  const cls = status.toLowerCase().replace(/[^a-z]/g, '');
  return `<span class="badge badge-${cls}">${escapeHtml(status)}</span>`;
}

function deriveBrand(docs) {
  const suffixes = docs
    .map((d) => (d.title.includes(' — ') ? d.title.split(' — ').pop().trim() : null))
    .filter(Boolean);
  if (!suffixes.length) return 'Documentation';
  const freq = {};
  for (const s of suffixes) freq[s] = (freq[s] || 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

function navLinks(docs, hrefFor, activeHtmlName) {
  let out = '';
  const render = (label, list) => {
    if (!list.length) return '';
    const items = list.map((d) => {
      const active = d.htmlName === activeHtmlName ? ' class="active"' : '';
      return `<li><a href="${hrefFor(d)}"${active}>${escapeHtml(shortLabel(d))}</a></li>`;
    }).join('');
    return `<div class="nav-group"><p class="nav-group-label">${label}</p><ul>${items}</ul></div>`;
  };
  for (const [label, keys] of GROUPS) {
    out += render(label, docs.filter((d) => keys.includes(d.key)));
  }
  out += render('Other', docs.filter((d) => !KNOWN_GROUP_KEYS.has(d.key)));
  return out;
}

function headingsOf(bodyHtml) {
  return [...bodyHtml.matchAll(/<h([1-6])[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g)]
    .map((m) => ({ level: +m[1], anchor: m[2], text: stripTags(m[3]) }));
}

function pageShell({ title, brand, brandHref = 'index.html', showSearch, sidebar, main, tocRail = '', headExtra, footScript }) {
  const search = showSearch
    ? `<div class="search"><input id="docsearch" type="search" placeholder="Search documentation…" autocomplete="off" spellcheck="false" aria-label="Search"><div class="search-results" id="searchresults" hidden></div></div>`
    : '<div class="search-spacer"></div>';
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<script>(function(){try{var t=localStorage.getItem('docs-theme')||((window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>
${headExtra}
</head>
<body>
<header class="topbar">
  <button class="menu-btn" id="menubtn" aria-label="Toggle navigation" aria-expanded="false">≡</button>
  <a class="brand" href="${brandHref}">${escapeHtml(brand)}</a>
  ${search}
  <button class="theme-btn" id="themebtn" aria-label="Toggle theme" title="Toggle light / dark"></button>
</header>
<div class="scrim" id="scrim"></div>
<div class="layout">
  <aside class="sidebar" id="sidebar">${sidebar}</aside>
  <main class="content">
${main}
  </main>
  ${tocRail}
</div>
${footScript}
</body>
</html>
`;
}

function build() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('Usage: node build.mjs [--in docs] [--out docs/html] [--mode per-doc|combined|both]');
    return;
  }
  const inDir = path.resolve(args.in);
  const outDir = path.resolve(args.out);
  if (!fs.existsSync(inDir)) {
    console.error(`Input dir not found: ${inDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(inDir)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .map((f) => ({ file: f, key: normKey(f), abs: path.join(inDir, f) }))
    .sort((a, b) => orderIndex(a.key) - orderIndex(b.key) || a.file.localeCompare(b.file));

  if (files.length === 0) {
    console.error(`No .md files in ${inDir}`);
    process.exit(1);
  }

  const dsByKey = new Map(files.map((f) => [f.key, f.key]));
  const docCss = fs.readFileSync(path.join(ASSETS_DIR, 'doc.css'), 'utf8');
  const hlCss = fs.readFileSync(path.join(ASSETS_DIR, 'highlight.css'), 'utf8');
  const appJs = fs.readFileSync(path.join(ASSETS_DIR, 'app.js'), 'utf8');
  const mermaidJs = fs.readFileSync(MERMAID_PATH, 'utf8');

  const docs = files.map(({ file, key, abs }) => {
    let raw = fs.readFileSync(abs, 'utf8');
    const title = firstHeading(raw) || file;
    let tokensHtml = '';
    let designData = null;
    if (key === 'design') {
      const d = extractDesignTokens(raw);
      raw = d.raw;
      tokensHtml = d.tokensHtml;
      designData = d.data;
    }
    const version = parseHeaderField(raw, 'Version') || designData?.version || null;
    const status = parseHeaderField(raw, 'Status') || designData?.status || null;
    slugger.reset();
    const bodyHtml = (tokensHtml ? tokensHtml + '\n' : '') + md.render(raw);
    return { file, key, title, version, status, bodyHtml, htmlName: file.replace(/\.md$/i, '.html') };
  });

  const brand = deriveBrand(docs);

  // Search index (inlined as JS so it works offline, even over file://).
  const searchData = docs.map((d) => ({
    title: d.title,
    short: shortLabel(d),
    url: d.htmlName,
    group: groupOf(d.key),
    headings: headingsOf(d.bodyHtml),
  }));
  const searchJs = `window.__DOCS_SEARCH__=${JSON.stringify(searchData)};`;

  fs.mkdirSync(outDir, { recursive: true });
  const wantPerDoc = args.mode === 'per-doc' || args.mode === 'both';
  const wantCombined = args.mode === 'combined' || args.mode === 'both';

  if (wantPerDoc) {
    const assetsOut = path.join(outDir, 'assets');
    fs.mkdirSync(assetsOut, { recursive: true });
    fs.writeFileSync(path.join(assetsOut, 'doc.css'), docCss);
    fs.writeFileSync(path.join(assetsOut, 'highlight.css'), hlCss);
    fs.writeFileSync(path.join(assetsOut, 'app.js'), appJs);
    fs.writeFileSync(path.join(assetsOut, 'search-index.js'), searchJs);
    fs.writeFileSync(path.join(assetsOut, 'mermaid.min.js'), mermaidJs);

    const headExtra = `<link rel="stylesheet" href="assets/doc.css">\n<link rel="stylesheet" href="assets/highlight.css">`;
    const footScript = `<script src="assets/mermaid.min.js"></script>\n<script src="assets/search-index.js"></script>\n<script src="assets/app.js"></script>`;
    const tocRail = `<aside class="toc-rail" id="tocrail"><p class="toc-title">On this page</p><nav id="toc"></nav></aside>`;
    const sidebar = (active) => navLinks(docs, (d) => d.htmlName, active);

    docs.forEach((d, i) => {
      const body = rewriteForPerDoc(d.bodyHtml);
      const prev = docs[i - 1];
      const next = docs[i + 1];
      const breadcrumb = `<nav class="breadcrumb"><a href="index.html">Docs</a><span>/</span><span>${escapeHtml(groupOf(d.key))}</span><span>/</span><span class="current">${escapeHtml(shortLabel(d))}</span></nav>`;
      const pager = `<nav class="pager">` +
        (prev ? `<a class="pager-prev" href="${prev.htmlName}"><span>Previous</span><strong>${escapeHtml(shortLabel(prev))}</strong></a>` : `<span></span>`) +
        (next ? `<a class="pager-next" href="${next.htmlName}"><span>Next</span><strong>${escapeHtml(shortLabel(next))}</strong></a>` : `<span></span>`) +
        `</nav>`;
      const main = `${breadcrumb}\n<article class="doc">\n${body}\n</article>\n${pager}`;
      fs.writeFileSync(
        path.join(outDir, d.htmlName),
        pageShell({ title: `${shortLabel(d)} · ${brand}`, brand, showSearch: true, sidebar: sidebar(d.htmlName), main, tocRail, headExtra, footScript })
      );
    });

    // Home (landing) with doc cards.
    const cards = docs.map((d) =>
      `<a class="doc-card" href="${d.htmlName}"><span class="doc-card-group">${escapeHtml(groupOf(d.key))}</span><span class="doc-card-title">${escapeHtml(shortLabel(d))}</span><span class="doc-card-meta"><span class="ver">v${escapeHtml(d.version || '—')}</span> ${statusBadge(d.status)}</span></a>`
    ).join('\n');
    const homeMain = `<article class="doc home">
<h1>${escapeHtml(brand)} Documentation</h1>
<p class="lead">Complete product documentation set, exported as a browsable static site.</p>
<div class="card-grid">\n${cards}\n</div>
</article>`;
    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      pageShell({ title: `${brand} Documentation`, brand, showSearch: true, sidebar: sidebar('index.html'), main: homeMain, headExtra, footScript })
    );
  }

  if (wantCombined) {
    const sections = docs.map((d) => {
      const body = rewriteForCombined(d.bodyHtml, d.key, dsByKey);
      return `<section id="${d.key}" class="combined-section">\n${body}\n</section>`;
    }).join('\n');
    const sidebar = navLinks(docs, (d) => `#${d.key}`, null);
    const main = `<article class="doc" data-combined>\n${sections}\n</article>`;
    const headExtra = `<style>\n${docCss}\n${hlCss}\n</style>`;
    const footScript = `<script>${mermaidJs}</script>\n<script>${appJs}</script>`;
    fs.writeFileSync(
      path.join(outDir, 'combined.html'),
      pageShell({ title: `${brand} Documentation (combined)`, brand, brandHref: '#', showSearch: false, sidebar, main, headExtra, footScript })
    );
  }

  console.log(`Exported ${docs.length} doc(s) to ${outDir} (mode: ${args.mode})`);
}

build();
