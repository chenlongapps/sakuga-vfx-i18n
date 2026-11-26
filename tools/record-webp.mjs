#!/usr/bin/env node
// Record real component interactions in headless Chrome and encode them as looping Animated WebP.
//
//   node tools/record-webp.mjs                         # all 12 demos x 3 languages
//   node tools/record-webp.mjs --only toggle,toast     # selected demos
//   node tools/record-webp.mjs --lang ja --only input
//   node tools/record-webp.mjs --fps 30 --duration 5 --width 640 --height 400
//   node tools/record-webp.mjs --base-url http://localhost:8000
//
// Options: --only <ids> --lang <codes> --fps <n> --duration <seconds> --width <px>
//          --height <px> --scale <n> --image-width <px> --padding <px> --crop auto|none
//          --out <dir> --base-url <url> --chrome <path> --ffmpeg <path> --img2webp <path>
//          --keep-frames --dry-run
// Env: CHROME, FFMPEG, IMG2WEBP. Needs Node 22+, ffmpeg (frame scaling) and libwebp's
// img2webp, or Python 3 with Pillow as a fallback WebP encoder. No npm install.
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { readFile, mkdir, writeFile, cp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const IDS = ['button', 'button-secondary', 'toggle', 'slider', 'checkbox', 'radio', 'input', 'tabs', 'progress', 'rating', 'toast', 'tooltip'];
const LANGS = ['en', 'zh-CN', 'ja'];

// ───────── command line ─────────
const args = process.argv.slice(2);
const USAGE = `Usage: node tools/record-webp.mjs [options]
  --only <ids>          comma-separated demos: ${IDS.join(', ')}
  --lang <codes>        comma-separated languages: ${LANGS.join(', ')}
  --fps <n> --duration <s> --width <px> --height <px> --scale <n> --image-width <px>
  --crop auto|none --padding <px> --out <dir> --base-url <url>
  --chrome <path> --ffmpeg <path> --img2webp <path> --keep-frames --dry-run
`;
if (args.includes('--help') || args.includes('-h')) { console.log(USAGE); process.exit(0); }
const flags = { crop: 'none' };
const take = (key) => { const i = args.indexOf(`--${key}`); if (i === -1) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
for (const key of ['only', 'lang', 'fps', 'duration', 'width', 'height', 'scale', 'image-width', 'padding', 'crop', 'out', 'base-url', 'chrome', 'ffmpeg', 'img2webp']) {
  const inline = args.find((a) => a.startsWith(`--${key}=`));
  if (inline) { flags[key] = inline.slice(key.length + 3); args.splice(args.indexOf(inline), 1); }
  else { const v = take(key); if (v !== undefined) flags[key] = v; }
}
for (const key of ['keep-frames', 'dry-run']) if (args.includes(`--${key}`)) { flags[key] = true; args.splice(args.indexOf(`--${key}`), 1); }
if (args.length) fail(`Unknown arguments: ${args.join(' ')}`);

function fail(message) { console.error(`record-webp: ${message}`); process.exit(2); }
const list = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : null);
const only = list(flags.only) || IDS;
const langs = list(flags.lang) || LANGS;
for (const id of only) if (!IDS.includes(id)) fail(`Unknown demo "${id}". Valid: ${IDS.join(', ')}`);
for (const lang of langs) if (!LANGS.includes(lang)) fail(`Unknown language "${lang}". Valid: ${LANGS.join(', ')}`);

const cfg = {
  fps: Math.max(8, Math.min(60, +(flags.fps || 24))),
  duration: Math.max(1, Math.min(20, +(flags.duration || 4.5))),
  width: Math.max(200, +(flags.width || 560)),
  height: Math.max(200, +(flags.height || 360)),
  scale: Math.max(1, Math.min(3, +(flags.scale || 1))),
  imageWidth: Math.max(120, +(flags['image-width'] || 480)),
  padding: Math.max(0, +(flags.padding || 12)),
  crop: flags.crop === 'auto' ? 'auto' : 'none',
  out: resolve(ROOT, flags.out || 'docs/webp'),
};

// ───────── what each stage shows, and how it is played ─────────
// Every entry loads the real component source file. Timings are seconds from the first frame.
const COMPONENTS = {
  button: {
    file: 'button/button.js',
    html: '<sakuga-button id="el" data-i18n="confirm">Confirm</sakuga-button>',
    play: (k) => [
      k.move('sakuga-button#el >>> .btn', 0.15), k.down(0.5), k.up(0.66),
      k.call(1.3, 'document.querySelector("#el").done()'),
    ],
  },
  'button-secondary': {
    file: 'button/button.js',
    html: '<sakuga-button id="el" variant="secondary" data-i18n="cancel">Cancel</sakuga-button>',
    play: (k) => [k.move('sakuga-button#el >>> .btn', 0.15), k.down(0.5), k.up(0.66), k.down(2.4), k.up(2.56)],
  },
  toggle: {
    file: 'toggle/toggle.js',
    html: '<sakuga-toggle id="el" label="Notifications" data-i18n-label="notifications"></sakuga-toggle>',
    play: (k) => [k.move('sakuga-toggle#el >>> .tog', 0.15), k.down(0.55), k.up(0.7), k.down(2.35), k.up(2.5)],
  },
  slider: {
    file: 'slider/slider.js',
    html: '<sakuga-slider id="el" value="20" label="Volume" data-i18n-label="volume"></sakuga-slider>',
    play: (k) => [
      k.move('sakuga-slider#el >>> input', 0.15, 0.2),
      k.down(0.45, 'sakuga-slider#el >>> input', 0.2),
      ...k.drag(0.5, 0.92, 'sakuga-slider#el >>> input', 0.2, 0.94, 10),
      k.up(0.96),
      k.down(2.3, 'sakuga-slider#el >>> input', 0.94),
      ...k.drag(2.35, 2.78, 'sakuga-slider#el >>> input', 0.94, 0.2, 10),
      k.up(2.82),
    ],
  },
  checkbox: {
    file: 'checkbox/checkbox.js',
    html: '<sakuga-checkbox id="el" data-i18n="rememberMe">Remember me</sakuga-checkbox>',
    play: (k) => [k.move('sakuga-checkbox#el >>> .box', 0.15), k.down(0.5), k.up(0.65), k.down(2.55), k.up(2.7)],
  },
  radio: {
    file: 'radio/radio.js',
    html: '<sakuga-radio id="el" label="Plan" data-i18n-label="plan"><option value="a" selected data-i18n="optionA">Option A</option><option value="b" data-i18n="optionB">Option B</option></sakuga-radio>',
    play: (k) => [k.move('sakuga-radio#el >>> label:nth-child(2) .dot', 0.15), k.down(0.55, 'sakuga-radio#el >>> label:nth-child(2) .dot'), k.up(0.7), k.down(2.6, 'sakuga-radio#el >>> label:first-child .dot'), k.up(2.75)],
  },
  input: {
    file: 'input/input.js',
    html: '<sakuga-input id="el" label="Text" placeholder="Type something" data-i18n-label="inputText" data-i18n-placeholder="inputPlaceholder"></sakuga-input>',
    play: (k) => [
      k.move('sakuga-input#el >>> input', 0.15),
      k.down(0.4, 'sakuga-input#el >>> input'), k.up(0.5),
      ...k.type(0.7, 2.15, (lang) => ({ en: 'sketch', 'zh-CN': '作画', ja: 'さくが' }[lang] || 'sketch')),
      k.selectAll(3.15),
    ],
  },
  tabs: {
    file: 'tabs/tabs.js',
    html: '<sakuga-tabs id="el" label="Sections" data-i18n-label="sections"><option value="Home" data-i18n="home">Home</option><option value="Profile" data-i18n="profile">Profile</option><option value="Settings" data-i18n="settings">Settings</option></sakuga-tabs>',
    play: (k) => [k.move('sakuga-tabs#el >>> button:nth-of-type(2)', 0.15), k.down(0.55, 'sakuga-tabs#el >>> button:nth-of-type(2)'), k.up(0.7), k.down(2.55, 'sakuga-tabs#el >>> button:nth-of-type(1)'), k.up(2.7)],
  },
  progress: {
    file: 'progress/progress.js',
    html: '<sakuga-progress id="el" label="Loading" data-i18n-label="loading" data-i18n-done-label="complete"></sakuga-progress>',
    // set() is the documented API; each call rides the bar on springs and draws the storm cloud.
    play: (k) => [
      k.call(0.35, 'document.querySelector("#el").set(0.12)'),
      k.call(1.1, 'document.querySelector("#el").set(0.38)'),
      k.call(1.85, 'document.querySelector("#el").set(0.68)'),
      k.call(2.6, 'document.querySelector("#el").set(1)'),
      k.call(4.05, 'document.querySelector("#el").reset()'),
    ],
  },
  rating: {
    file: 'rating/rating.js',
    html: '<sakuga-rating id="el" label="Rating" data-i18n-label="rating" data-i18n-star-label="starLabel"></sakuga-rating>',
    play: (k) => [
      ...[1, 2, 3, 4, 5].map((n, i) => k.down(0.45 + i * 0.34, `sakuga-rating#el >>> button:nth-child(${n})`)),
      ...[1, 2, 3, 4, 5].map((n, i) => k.up(0.6 + i * 0.34, `sakuga-rating#el >>> button:nth-child(${n})`)),
      k.down(3.45, 'sakuga-rating#el >>> button:nth-child(5)'), k.up(3.6),
    ],
  },
  toast: {
    files: ['button/button.js', 'toast/toast.js'],
    html: '<div class="toastrow"><sakuga-button id="save" variant="secondary" data-i18n="save">Save</sakuga-button><sakuga-toast id="el" duration="1.7" data-i18n-dismiss-label="dismiss"></sakuga-toast></div>',
    extra: 'document.querySelector("#save").addEventListener("click", () => document.querySelector("#el").show(sakugaSite.t("saved")));',
    play: (k) => [k.move('#save >>> .btn', 0.15), k.down(0.5, '#save >>> .btn'), k.up(0.65)],
  },
  tooltip: {
    file: 'tooltip/tooltip.js',
    html: '<sakuga-tooltip id="el" text="Helpful hint!" data-i18n-text="helpfulHint" data-i18n-label="help"></sakuga-tooltip>',
    play: (k) => [
      k.move('sakuga-tooltip#el >>> .help', 0.4),
      k.down(1.85, 'sakuga-tooltip#el >>> .help'), k.up(1.95),
      k.down(2.65, 'sakuga-tooltip#el >>> .help'), k.up(2.75),
      k.move('body', 3.75),
    ],
  },
};

function stageHtml(id, lang) {
  const c = COMPONENTS[id];
  const files = (c.files || [c.file]).map((f) => `<script src="/${f}"></script>`).join('\n');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>Sakuga VFX — ${id}</title>
<script src="/i18n.js"></script>
<style>
  :where(:root){--sk-card:#fff;--sk-ink:#1d1a4a;--sk-dim:#8580b0;--sk-soft:#b8b3ff;--sk-pri:#8f8df7;--sk-pri-ink:#1d1a4a;--sk-acc:#ff5fa8;--sk-track:#c9cbe0;--sk-r:15px;--sk-bw:3.2px;--sk-sh:6px 7px 0 var(--sk-soft);--sk-btn-sh:var(--sk-sh);--sk-btn-line:var(--sk-ink);--sk-alt-sh:var(--sk-sh);--sk-alt-line:var(--sk-ink);--sk-tick:var(--sk-ink);--sk-fill:var(--sk-acc);--sk-on-pri:#fff;}
  html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff;color:#1d1a4a;-webkit-font-smoothing:antialiased;}
  body{display:grid;place-items:center;font:500 15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;}
  .stage{display:flex;align-items:center;justify-content:center;width:100vw;height:100vh;}
  .toastrow{display:flex;align-items:center;gap:24px;}
</style>
</head>
<body>
<main class="stage">${c.html}</main>
<script>sakugaSite.localize();</script>
${files}
${c.extra ? `<script>${c.extra}</script>` : ''}
</body>
</html>`;
}

// ───────── static server (only created when not connecting to an existing one) ─────────
const MIME = { '.js': 'text/javascript; charset=utf-8', '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.png': 'image/png' };
async function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://127.0.0.1');
      if (url.pathname === '/__record__' || url.pathname === '/__record__/') {
        const id = url.searchParams.get('c') || '';
        if (!COMPONENTS[id]) { res.writeHead(404); res.end('unknown demo'); return; }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(stageHtml(id, url.searchParams.get('lang') || 'en'));
        return;
      }
      const path = resolve(ROOT, decodeURIComponent(url.pathname).slice(1));
      if (path !== ROOT && !path.startsWith(ROOT + sep)) { res.writeHead(403); res.end('forbidden'); return; }
      const body = await readFile(path);
      res.writeHead(200, { 'Content-Type': MIME[path.slice(path.lastIndexOf('.'))] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end('not found'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}

// ───────── CDP ─────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function chromePath() {
  const candidates = [
    flags.chrome, process.env.CHROME,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const home = process.env.HOME || '';
  for (const rev of ['1248', '1234', '1228', '1208']) candidates.push(join(home, `Library/Caches/ms-playwright/chromium-${rev}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`));
  return candidates.find((p) => existsSync(p)) || fail('No Chrome found. Install Chrome or pass --chrome /path/to/chrome');
}
async function cdpConnect(port) {
  let targets;
  for (let i = 0; i < 80; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets?.some((t) => t.type === 'page')) break; } catch {}
    await sleep(150);
  }
  if (!targets?.some((t) => t.type === 'page')) fail('Chrome did not expose a debugging target');
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(new Error(m.error.message)) : p.resolve(m.result); }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const i = ++id; pending.set(i, { resolve, reject }); ws.send(JSON.stringify({ id: i, method, params })); });
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  return { ws, send, evaluate };
}

// ───────── timeline helpers ─────────
function makeKit(cdp, lang) {
  const events = [];
  let last = null;
  const at = async (sel, fx = 0.5, fy = 0.5) => {
    const [host, inner] = sel.split(' >>> ');
    const expr = `(() => { const h = document.querySelector(${JSON.stringify(host)}); const el = ${inner ? `(h?.shadowRoot?.querySelector(${JSON.stringify(inner)}))` : '(h || document.querySelector("body"))'}; if (!el) return null; const b = el.getBoundingClientRect(); return [b.left + b.width * ${fx}, b.top + b.height * ${fy}]; })()`;
    const xy = await cdp.evaluate(expr);
    if (!xy) throw new Error(`Target not found: ${sel}`);
    return xy;
  };
  const mouse = (type, sel, fx, fy, button = 'none', buttons = 0) => events.push({ fn: async () => { const [x, y] = await at(sel, fx, fy); await cdp.send('Input.dispatchMouseEvent', { type, x, y, button, buttons, clickCount: 1, pointerType: 'mouse' }); } });
  const kit = {
    move: (sel, t, fx = 0.5, fy = 0.5, buttons = 0) => { mouse('mouseMoved', sel, fx, fy, buttons ? 'left' : 'none', buttons); const e = events.pop(); last = { sel, fx, fy }; return { t, fn: e.fn }; },
    down: (t, sel, fx, fy) => { const s = sel || last?.sel || 'body'; mouse('mousePressed', s, fx ?? last?.fx ?? 0.5, fy ?? last?.fy ?? 0.5, 'left', 1); return { t, fn: events.pop().fn }; },
    up: (t, sel, fx, fy) => { const s = sel || last?.sel || 'body'; mouse('mouseReleased', s, fx ?? last?.fx ?? 0.5, fy ?? last?.fy ?? 0.5, 'left', 0); return { t, fn: events.pop().fn }; },
    drag: (t0, t1, sel, fx0, fx1, steps = 14) => Array.from({ length: steps }, (_, i) => {
      const f = (i + 1) / steps;
      return kit.move(sel, t0 + (t1 - t0) * f, fx0 + (fx1 - fx0) * f, 0.5, 1);
    }),
    call: (t, expression) => ({ t, fn: () => cdp.evaluate(expression) }),
    type: (t0, t1, textForLang) => {
      const text = textForLang(lang);
      const step = (t1 - t0) / (text.length + 1);
      return [...text].map((ch, i) => ({
        t: t0 + i * step,
        fn: async () => {
          await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: ch, text: ch });
          await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: ch });
        },
      }));
    },
    selectAll: (t) => ({ t, fn: async () => {
      await cdp.evaluate(`(() => { const inp = document.querySelector('sakuga-input#el')?.shadowRoot?.querySelector('input'); if (inp) { inp.focus(); inp.select(); } })()`);
      await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
      await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 });
    } }),
  };
  return kit;
}

// ───────── WebP encoder ─────────
let encoderCache;
function webpEncoder() {
  if (encoderCache) return encoderCache;
  const cmd = flags.img2webp || process.env.IMG2WEBP || 'img2webp';
  try { execFileSync(cmd, ['-version'], { stdio: 'ignore' }); encoderCache = { kind: 'img2webp', cmd }; return encoderCache; } catch {}
  try {
    execFileSync('python3', ['-c', 'from PIL import features; assert features.check("webp_anim")'], { stdio: 'ignore' });
    encoderCache = { kind: 'pillow' };
    return encoderCache;
  } catch {}
  fail('No WebP encoder found. Install libwebp (img2webp) or Pillow with WebP animation support, or pass --img2webp /path/to/img2webp');
}

// ───────── record one demo ─────────
async function record(cdp, id, lang, baseUrl, tempRoot) {
  const url = `${baseUrl}/__record__/?c=${id}&lang=${encodeURIComponent(lang)}`;
  await cdp.send('Page.navigate', { url });
  const deadline = Date.now() + 15000;
  let ready = false;
  while (Date.now() < deadline) {
    ready = await cdp.evaluate(`document.readyState === 'complete' && location.href.startsWith(${JSON.stringify(`${baseUrl}/__record__`)})
      && !!window.SakugaFX && !!customElements.get('sakuga-${id === 'button-secondary' ? 'button' : id}')`);
    if (ready) break;
    await sleep(80);
  }
  if (!ready) throw new Error(`stage did not load: ${url}`);
  await sleep(250); // let the custom element finish its first paint

  const isDynamic = await cdp.evaluate(`(() => { const el = document.querySelector('#el') || document.querySelector('#save'); return !!el && !!el.shadowRoot; })()`);
  if (!isDynamic) throw new Error('component did not upgrade');

  await cdp.evaluate('window.SakugaFX.paused = false');
  await sleep(120);
  await cdp.evaluate('window.SakugaFX.paused = true');

  const kit = makeKit(cdp, lang);
  const events = COMPONENTS[id].play(kit).sort((a, b) => a.t - b.t);
  const frames = Math.round(cfg.duration * cfg.fps);
  const frameDir = join(tempRoot, `${id}-${lang}`);
  await mkdir(frameDir, { recursive: true });

  let next = 0;
  for (let i = 0; i < frames; i++) {
    const t = i / cfg.fps;
    while (next < events.length && events[next].t <= t) await events[next++].fn();
    // Advance the real core clock by exactly one frame, then let Chrome composite it.
    await cdp.evaluate(`(() => { window.SakugaFX.advance(${1 / cfg.fps}); return new Promise(r => requestAnimationFrame(() => r(true))); })()`);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    await writeFile(join(frameDir, `f${String(i).padStart(4, '0')}.png`), Buffer.from(data, 'base64'));
  }

  // Optional crop and output scaling are applied to the PNG frames with ffmpeg (no WebP encoder needed there).
  const filters = [];
  if (cfg.crop === 'auto') {
    const r = await cdp.evaluate(`(() => { const el = document.querySelector('#el'); const b = el.getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; })()`);
    const W = Math.min(cfg.width, Math.ceil(r[2] + cfg.padding * 2));
    const H = Math.min(cfg.height, Math.ceil(r[3] + cfg.padding * 2));
    const x = Math.max(0, Math.min(cfg.width - W, Math.round(r[0] + r[2] / 2 - W / 2)));
    const y = Math.max(0, Math.min(cfg.height - H, Math.round(r[1] + r[3] / 2 - H / 2)));
    filters.push(`crop=${W}:${H}:${x}:${y}`);
  }
  if (cfg.imageWidth !== cfg.width) filters.push(`scale=${cfg.imageWidth}:-2:flags=lanczos`);
  const procDir = join(frameDir, 'proc');
  await mkdir(procDir, { recursive: true });
  execFileSync(flags.ffmpeg || process.env.FFMPEG || 'ffmpeg', [
    '-y', '-loglevel', 'error', '-framerate', String(cfg.fps), '-i', join(frameDir, 'f%04d.png'),
    '-vf', filters.length ? filters.join(',') : 'null', join(procDir, 'p%04d.png'),
  ], { stdio: 'pipe' });

  const out = join(cfg.out, `${id}.${lang}.webp`);
  const encoder = webpEncoder();
  const frameFiles = (await readdir(procDir)).filter((f) => /^p\d+\.png$/.test(f)).sort().map((f) => join(procDir, f));
  const duration = Math.round(1000 / cfg.fps);
  if (encoder.kind === 'img2webp') {
    const cmd = ['-loop', '0', '-mixed', '-m', '6'];
    for (const f of frameFiles) cmd.push('-d', String(duration), f);
    cmd.push('-o', out);
    execFileSync(encoder.cmd, cmd, { stdio: 'pipe' });
  } else {
    const python = `import sys\nfrom PIL import Image\nsrc, out, dur, n = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])\nframes = [Image.open(f"{src}/p{i:04d}.png").convert("RGB") for i in range(n)]\nframes[0].save(out, format="WEBP", save_all=True, append_images=frames[1:], duration=dur, loop=0, quality=82, method=6)\n`;
    execFileSync('python3', ['-c', python, procDir, out, String(duration), String(frameFiles.length)], { stdio: 'pipe' });
  }
  if (flags['keep-frames']) {
    const kept = join(cfg.out, 'frames', `${id}-${lang}`);
    await mkdir(kept, { recursive: true });
    await cp(frameDir, kept, { recursive: true, force: true });
  }
  await rmSync(frameDir, { recursive: true, force: true });
  return out;
}

// ───────── main ─────────
const local = flags['base-url'] ? null : await startServer();
const baseUrl = flags['base-url'] || local.url;
const port = 9400 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), 'skv-webp-'));
const chrome = spawn(chromePath(), [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
  '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb', `--window-size=${cfg.width},${cfg.height}`, 'about:blank',
], { stdio: 'ignore' });
const cdp = await cdpConnect(port);
await cdp.send('Runtime.enable');
await cdp.send('Page.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', { width: cfg.width, height: cfg.height, deviceScaleFactor: cfg.scale, mobile: false });
await mkdir(cfg.out, { recursive: true });
const tempRoot = mkdtempSync(join(tmpdir(), 'skv-frames-'));
const results = [];
let failed = 0;

async function finish() {
  try { cdp.ws.close(); } catch {}
  chrome.kill('SIGTERM');
  await sleep(300);
  for (const dir of [profile, tempRoot]) { try { rmSync(dir, { recursive: true, force: true }); } catch {} }
  local?.server.close();
  process.exit(failed ? 1 : 0);
}

if (flags['dry-run']) {
  console.log(`dry run: ${only.length} demos x ${langs.length} languages -> ${cfg.out}`);
  console.log(`fps=${cfg.fps} duration=${cfg.duration}s stage=${cfg.width}x${cfg.height} imageWidth=${cfg.imageWidth} base=${baseUrl}`);
  console.log(only.flatMap((id) => langs.map((lang) => `${id}.${lang}.webp`)).join('\n'));
  await finish();
}

console.log(`Recording ${only.length * langs.length} Animated WebP files from ${baseUrl} (${cfg.fps} fps, ${cfg.duration}s).`);
for (const id of only) {
  for (const lang of langs) {
    const label = `${id}.${lang}`;
    try {
      if (flags['dry-run']) continue;
      const file = await record(cdp, id, lang, baseUrl, tempRoot);
      const { size } = await import('node:fs').then((fs) => fs.statSync(file));
      results.push({ id, lang, file, bytes: size });
      console.log(`ok   ${label.padEnd(24)} ${(size / 1024).toFixed(1).padStart(7)} KB  ${file}`);
    } catch (err) {
      failed++;
      console.error(`FAIL ${label}: ${err.message}`);
    }
  }
}

const manifest = { generated: new Date().toISOString(), format: 'animated WebP', fps: cfg.fps, duration: cfg.duration, width: cfg.imageWidth, height: Math.round(cfg.imageWidth * cfg.height / cfg.width / 2) * 2, languages: langs, demos: only, files: results.map((r) => ({ id: r.id, lang: r.lang, path: `docs/webp/${r.id}.${r.lang}.webp`, bytes: r.bytes })) };
await writeFile(join(cfg.out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${results.length} Animated WebP files written to ${cfg.out}; ${failed} failed.`);
await finish();
