// node tools/test.mjs [URL]   drives every control in the gallery with real touch and key events at phone width. Exits 1 on a failure.
// Needs Node 22 or later and Chrome or Chromium (set CHROME if it is somewhere unusual), and the folder served over http.
import { spawn } from 'node:child_process';
import { rmSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const URL_ = process.argv[2] || 'http://localhost:8000/gallery/';
const CHROME = process.env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find(existsSync);
const PORT = 9800 + Math.floor(Math.random() * 150), PROFILE = mkdtempSync(join(tmpdir(), 'skv-'));
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--no-first-run', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 60; i++) { try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); if (Array.isArray(targets) && targets.some((t) => t.type === 'page')) break; } catch {} await sleep(200); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(), logs = [];
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text)); });
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result))); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.value;
let fails = 0;
const check = (name, ok, got) => { if (!ok) fails++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${got !== undefined ? `  ->  ${got}` : ''}`); };
async function finish() {
  if (logs.length) { console.log(logs.join('\n')); fails++; }
  ws.close(); chrome.kill(); await sleep(300); try { rmSync(PROFILE, { recursive: true, force: true }); } catch {}
  process.exit(fails ? 1 : 0);
}

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 2, mobile: true });
await send('Emulation.setTouchEmulationEnabled', { enabled: true });
await send('Page.enable');
const { errorText } = await send('Page.navigate', { url: URL_ });
const deadline = Date.now() + 15000;
let loaded = false;
while (!errorText && Date.now() < deadline) {
  loaded = await ev(`location.href !== 'about:blank' && document.readyState === 'complete'`);
  if (loaded) break;
  await sleep(100);
}
check('gallery finished loading', loaded, loaded ? undefined : (errorText || URL_));
if (!loaded) await finish();

const missing = await ev(`['button','toggle','slider','checkbox','radio','input','tabs','progress','rating','toast','tooltip'].filter((n) => !customElements.get('sakuga-' + n))`);
check('all eleven elements are defined', missing.length === 0, missing.length ? missing.join(', ') : undefined);
if (missing.length) await finish();

// "tag >>> selector" reaches into the element's shadow root
const find = (s) => { const [host, inner] = s.split(' >>> '); return inner ? `document.querySelector(${JSON.stringify(host)}).shadowRoot.querySelector(${JSON.stringify(inner)})` : `document.querySelector(${JSON.stringify(host)})`; };
const at = async (s, fx = 0.5, fy = 0.5) => JSON.parse(await ev(`(() => { const e = ${find(s)}; e.scrollIntoView({ block: 'center' }); const b = e.getBoundingClientRect(); return JSON.stringify([b.left + b.width * ${fx}, b.top + b.height * ${fy}]); })()`));
const touch = (type, x, y) => send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y }] });
const tap = async (s, fx, fy) => { const [x, y] = await at(s, fx, fy); await sleep(150); await touch('touchStart', x, y); await touch('touchEnd', x, y); };
const key = async (k, code) => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code: k, windowsVirtualKeyCode: code }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code: k, windowsVirtualKeyCode: code }); };
const type = async (text) => { for (const ch of text) { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: ch, text: ch }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ch }); await sleep(40); } };

check('one shared core', (await ev('window.SakugaFX.version')) === 1);
{ await tap('sakuga-button[data-demo=primary] >>> .btn'); await sleep(1200); check('button: tap fires click and done() lands the check', +(await ev(`${find('sakuga-button[data-demo=primary] >>> .btn')}.style.getPropertyValue('--ok')`)) > 0.5); }
{ await tap('sakuga-toggle >>> .tog'); await sleep(500); check('toggle: tap turns it on', await ev(`document.querySelector('sakuga-toggle').checked`));
  check('toggle: aria-checked follows', (await ev(`${find('sakuga-toggle >>> .tog')}.getAttribute('aria-checked')`)) === 'true'); }
{ const [x, y] = await at('sakuga-slider >>> .sld', 0.2); const [x1] = await at('sakuga-slider >>> .sld', 0.9); await sleep(200); await touch('touchStart', x, y);
  for (let i = 1; i <= 10; i++) { await touch('touchMove', x + (x1 - x) * i / 10, y); await sleep(25); } await touch('touchEnd', x1, y); await sleep(400);
  const v = +(await ev(`document.querySelector('sakuga-slider').value`)); check('slider: a drag moves it', v > 70, v);
  await ev(`${find('sakuga-slider >>> input')}.focus()`); await key('ArrowLeft', 37); await sleep(200); check('slider: arrow key steps it', +(await ev(`document.querySelector('sakuga-slider').value`)) === v - 1); }
{ await tap('sakuga-checkbox >>> .box'); await sleep(400); check('checkbox: tap ticks it', await ev(`document.querySelector('sakuga-checkbox').checked`)); }
{ await tap('sakuga-radio >>> label:nth-child(2) .dot'); await sleep(400); check('radio: tap selects B', (await ev(`document.querySelector('sakuga-radio').value`)) === 'b'); }
{ await tap('sakuga-input >>> input'); await sleep(200); await type('hey'); await sleep(300); check('input: typing sets the value', (await ev(`document.querySelector('sakuga-input').value`)) === 'hey'); }
{ await tap('sakuga-tabs >>> button:nth-of-type(3)'); await sleep(500); check('tabs: tap selects the third', (await ev(`document.querySelector('sakuga-tabs').selected`)) === 2);
  await ev(`${find('sakuga-tabs >>> button:nth-of-type(3)')}.focus()`); await key('ArrowLeft', 37); await sleep(300); check('tabs: arrow key moves back', (await ev(`document.querySelector('sakuga-tabs').selected`)) === 1); }
{ await tap('sakuga-rating >>> button:nth-child(4)'); await sleep(700); check('rating: tap sets four', (await ev(`document.querySelector('sakuga-rating').value`)) === 4);
  check('rating: four stars lit', (await ev(`${find('sakuga-rating >>> .stars')}.querySelectorAll('.lit').length`)) === 4); }
{ await at('sakuga-progress'); let done = false; for (let i = 0; i < 24 && !done; i++) { await sleep(500); done = await ev(`document.querySelector('sakuga-progress').done`); }
  check('progress: the demo load completes', done, await ev(`${find('sakuga-progress >>> .pct')}.textContent`)); }
{ await ev(`(() => { const p = document.querySelector('sakuga-progress'); p.removeAttribute('demo'); p.reset(); p.set(0.5); })()`); await sleep(1500);
  check('progress: set(0.5) eases to half', Math.abs((await ev(`+getComputedStyle(${find('sakuga-progress >>> .prog')}).getPropertyValue('--v')`)) - 0.5) < 0.02); }
{ await tap('[data-demo=save] >>> .btn'); await sleep(900); check('toast: it arrives', await ev(`document.querySelector('sakuga-toast').open`)); await sleep(3400); check('toast: it leaves', !(await ev(`document.querySelector('sakuga-toast').open`))); }
{ await tap('sakuga-tooltip >>> .help'); await sleep(600); check('tooltip: tap opens it', await ev(`document.querySelector('sakuga-tooltip').open`)); await key('Escape', 27); await sleep(300); check('tooltip: Escape closes it', !(await ev(`document.querySelector('sakuga-tooltip').open`))); }
{ await ev(`(() => { const f = document.createElement('form'); f.id = 'tf'; f.innerHTML = '<sakuga-checkbox name="c" checked></sakuga-checkbox><sakuga-slider name="s" value="42"></sakuga-slider><sakuga-rating name="r" value="3"></sakuga-rating><sakuga-toggle name="t" checked></sakuga-toggle>'; document.body.append(f); })()`); await sleep(300);
  check('forms: values are sent with a form', (await ev(`new URLSearchParams(new FormData(document.getElementById('tf'))).toString()`)) === 'c=on&s=42&r=3&t=on', await ev(`new URLSearchParams(new FormData(document.getElementById('tf'))).toString()`)); }
check('no horizontal scroll at 390', (await ev('document.documentElement.scrollWidth')) <= 390, await ev('document.documentElement.scrollWidth'));

// ---- language detection, switching and persistence ----
// The same tab is reused: navigator.languages is injected before each document, and the saved choice lives on this origin.
const pageUrl = (lang) => { const u = new URL(URL_); if (lang === null) u.searchParams.delete('lang'); else u.searchParams.set('lang', lang); return u.href; };
const waitFor = async (expr, ms = 12000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await ev(expr)) return true; await sleep(100); } return false; };
const go = async (url) => { await send('Page.navigate', { url }); return waitFor(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete'`); };
const htmlLang = () => ev('document.documentElement.lang');
const preference = () => ev(`localStorage.getItem('sakuga-lang')`);
const setPreference = (code) => ev(`(() => { try { ${code === null ? "localStorage.removeItem('sakuga-lang')" : `localStorage.setItem('sakuga-lang', ${JSON.stringify(code)})`}; } catch {} })()`);
let navScript;
const setBrowserLanguages = async (langs) => {
  if (navScript) { await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: navScript }); navScript = null; }
  const source = `Object.defineProperty(navigator, 'languages', { configurable: true, get: () => ${JSON.stringify(langs)} });`;
  navScript = (await send('Page.addScriptToEvaluateOnNewDocument', { source })).identifier;
};
const stubClipboard = () => ev(`(() => {
  window.__copied = null;
  const writeText = async (value) => { window.__copied = value; };
  try { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } }); }
  catch { Object.defineProperty(Clipboard.prototype, 'writeText', { configurable: true, value: writeText }); }
})()`);
const actionLabels = () => ev(`[...document.querySelectorAll('.card')[0].querySelectorAll('.acts .pill')].map((el) => el.textContent.trim())`);
const clickAction = async (card, selector) => {
  await stubClipboard();
  await ev(`document.querySelectorAll('.card')[${card}].querySelector(${JSON.stringify(selector)}).click()`);
  await sleep(120);
  return ev('window.__copied');
};
const toastState = () => ev(`(() => {
  const toast = document.getElementById('copy-toast');
  return { open: !!toast.open, message: toast.shadowRoot?.querySelector('.msg')?.textContent || '' };
})()`);
const failClipboard = () => ev(`(() => {
  window.__copied = null;
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Clipboard unavailable'); } } });
  document.execCommand = () => false;
})()`);

await setPreference(null);
check('gallery actions: English page loads', await go(pageUrl('en')) && (await htmlLang()) === 'en');
const actions = await ev(`[...document.querySelectorAll('.card .acts')].map((acts) => [...acts.children].map((el) => el.tagName))`);
check('gallery actions: twelve cards show three actions', actions.length === 12 && actions.every((a) => a.length === 3), `${actions.length} cards`);
check('gallery actions: no download entry remains', await ev(`!document.querySelector('.card .acts a[download], .card .acts [download]')`));
check('gallery actions: English labels', (await actionLabels()).join('|') === 'Docs|Copy Source|Copy AI Prompt', (await actionLabels()).join('|'));
check('gallery actions: English layout has no sideways scroll', (await ev('document.documentElement.scrollWidth')) <= 390, await ev('document.documentElement.scrollWidth'));
const sourceCopy = await clickAction(0, '[data-copy-source]');
check('gallery actions: Copy Source still copies the component', typeof sourceCopy === 'string' && sourceCopy.includes("fx.define('sakuga-button'"), (sourceCopy || '').slice(0, 48));
check('gallery actions: Copy Source flashes a confirmation', (await actionLabels())[1] === 'Copied', (await actionLabels())[1]);
const sourceToast = await toastState();
check('gallery actions: source copy shows a Sakuga toast', sourceToast.open && sourceToast.message === 'Component source copied.', JSON.stringify(sourceToast));
const primaryPrompt = await clickAction(0, '[data-copy-prompt]');
check('gallery actions: prompt has the component and every link', typeof primaryPrompt === 'string' && primaryPrompt.includes('Sakuga VFX Button component') && primaryPrompt.includes('https://raw.githubusercontent.com/chenlongapps/sakuga-vfx-i18n/main/skills/sakuga-vfx/SKILL.md') && primaryPrompt.includes('/main/button/button.js') && primaryPrompt.includes('/main/button/README.md'));
check('gallery actions: primary prompt keeps the default variant', !primaryPrompt.includes('secondary'));
check('gallery actions: prompt button flashes the result', (await actionLabels())[2] === 'AI prompt copied', (await actionLabels())[2]);
const promptToast = await toastState();
check('gallery actions: prompt copy shows a Sakuga toast', promptToast.open && promptToast.message === 'AI prompt copied', JSON.stringify(promptToast));
await sleep(2100);
check('gallery actions: prompt button restores its label', (await actionLabels())[2] === 'Copy AI Prompt', (await actionLabels())[2]);
const secondaryPrompt = await clickAction(1, '[data-copy-prompt]');
check('gallery actions: secondary prompt names the variant', secondaryPrompt.includes('Sakuga VFX Button (secondary) component') && secondaryPrompt.includes('Use the secondary variant, not the primary button.'));
const PROMPT_IDS = ['button', 'button', 'toggle', 'slider', 'checkbox', 'radio', 'input', 'tabs', 'progress', 'rating', 'toast', 'tooltip'];
for (let i = 0; i < PROMPT_IDS.length; i++) {
  const prompt = i === 0 ? primaryPrompt : i === 1 ? secondaryPrompt : await clickAction(i, '[data-copy-prompt]');
  const id = PROMPT_IDS[i];
  const raw = `https://raw.githubusercontent.com/chenlongapps/sakuga-vfx-i18n/main/${id}/${id}.js`;
  const docs = `https://raw.githubusercontent.com/chenlongapps/sakuga-vfx-i18n/main/${id}/README.md`;
  check(`gallery actions: card ${i + 1} prompt links to ${id}`, prompt.includes(raw) && prompt.includes(docs));
}
await failClipboard();
await ev(`document.querySelectorAll('.card')[0].querySelector('[data-copy-prompt]').click()`);
await sleep(120);
const failedToast = await toastState();
check('gallery actions: failure flashes and shows a toast', (await actionLabels())[2] === 'Copy failed' && failedToast.open && failedToast.message === 'Copy failed', JSON.stringify(failedToast));

await setPreference(null);
for (const [browsers, expected, expectedTitle] of [
  [['ja-JP', 'en-US'], 'ja', 'Sakuga VFX コンポーネントギャラリー'],
  [['zh-Hans'], 'zh-CN', 'Sakuga VFX 组件图库'],
  [['zh-TW'], 'zh-CN', 'Sakuga VFX 组件图库'],
  [['en-US'], 'en', 'Sakuga VFX'],
]) {
  await setBrowserLanguages(browsers);
  check(`browser ${browsers[0]} selects ${expected}`, await go(pageUrl(null)) && (await htmlLang()) === expected, await htmlLang());
  check(`browser ${browsers[0]} localizes the page`, (await ev('document.title')) === expectedTitle, await ev('document.title'));
  check('interface and Canvas lettering share one language', (await ev('sakugaSite.lang')) === (await htmlLang()));
}

await setBrowserLanguages(['fr-FR']);   // an unsupported browser language falls through to the default
await setPreference(null);
check('invalid lang: the page still loads', await go(pageUrl('xx')));
check('invalid lang: falls back to English', (await htmlLang()) === 'en', await htmlLang());
check('invalid lang: the URL is left alone', new URL(await ev('location.href')).searchParams.get('lang') === 'xx', await ev('location.search'));
await setPreference('ja');
check('invalid lang: falls back to the saved choice', await go(pageUrl('nope')) && (await htmlLang()) === 'ja', await htmlLang());

await setBrowserLanguages(['zh-CN']);
check('URL lang beats the saved choice and browser', await go(pageUrl('en')) && (await htmlLang()) === 'en', await htmlLang());
check('regional URL tag maps to zh-CN', await go(pageUrl('zh-TW')) && (await htmlLang()) === 'zh-CN', await htmlLang());
check('regional URL tag is not rewritten', new URL(await ev('location.href')).searchParams.get('lang') === 'zh-TW', await ev('location.search'));

await setBrowserLanguages(['en-US']);
await setPreference(null);
check('switch: starts in English', await go(pageUrl('en')) && (await htmlLang()) === 'en');
await ev(`[...document.querySelectorAll('[data-language-switch] a')].find((a) => a.dataset.language === 'ja').click()`);
check('switch: the link navigates to Japanese', await waitFor(`location.href === ${JSON.stringify(pageUrl('ja'))} && document.readyState === 'complete'`, 15000));
check('switch: saves the choice', (await preference()) === 'ja', await preference());
check('switch: the page is Japanese', (await htmlLang()) === 'ja', await htmlLang());
check('gallery: Japanese action labels', (await actionLabels()).join('|') === 'ドキュメント|ソースをコピー|AIプロンプトをコピー', (await actionLabels()).join('|'));
check('gallery: Japanese layout has no sideways scroll', (await ev('document.documentElement.scrollWidth')) <= 390, await ev('document.documentElement.scrollWidth'));
const jaPrompt = await clickAction(0, '[data-copy-prompt]');
check('gallery: Japanese prompt is localized', jaPrompt.startsWith('Sakuga VFX Button コンポーネントを現在のプロジェクトに統合してください。') && jaPrompt.includes('スキル：') && jaPrompt.includes('実装要件：'));
check('gallery: Japanese prompt links to Japanese docs', jaPrompt.includes('/main/button/README.ja.md'));
const jaToast = await toastState();
check('gallery: Japanese toast is localized', jaToast.open && jaToast.message === 'AIプロンプトをコピーしました', JSON.stringify(jaToast));
check('switch: marks the current language', (await ev(`document.querySelector('[data-language-switch] [aria-current=page]').dataset.language`)) === 'ja');
check('preference: restored on a later visit', await go(pageUrl(null)) && (await htmlLang()) === 'ja', await htmlLang());

await setPreference(null);
check('gallery: starts in Chinese', await go(pageUrl('zh-CN')) && (await htmlLang()) === 'zh-CN');
check('gallery: Chinese action labels', (await actionLabels()).join('|') === '文档|复制源码|复制 AI 提示词', (await actionLabels()).join('|'));
check('gallery: Chinese layout has no sideways scroll', (await ev('document.documentElement.scrollWidth')) <= 390, await ev('document.documentElement.scrollWidth'));
const zhPrompt = await clickAction(1, '[data-copy-prompt]');
check('gallery: Chinese prompt is localized', zhPrompt.startsWith('请将 Sakuga VFX Button (secondary) 组件集成到当前项目中。') && zhPrompt.includes('请使用 secondary 变体，而不是主按钮。') && zhPrompt.includes('组件源码：') && zhPrompt.includes('实现要求：'));
check('gallery: Chinese prompt links to Chinese docs', zhPrompt.includes('/main/button/README.zh-CN.md'));
const zhToast = await toastState();
check('gallery: Chinese toast is localized', zhToast.open && zhToast.message === '已复制 AI 提示词', JSON.stringify(zhToast));
const demoUrl = await ev(`document.querySelector('.card .acts a.pill').href`);
check('gallery: demo link keeps the language', new URL(demoUrl).searchParams.get('lang') === 'zh-CN', demoUrl);
check('demo: follows the gallery language', await go(demoUrl) && (await htmlLang()) === 'zh-CN', await htmlLang());
check('demo: UI text is localized', (await ev('document.title')) === 'Sakuga 按钮', await ev('document.title'));

const rootUrl = new URL('../', URL_).href;
await setBrowserLanguages(['ja-JP']);
await setPreference(null);
await send('Page.navigate', { url: `${rootUrl}?i18n-root-check=1` });
check('root: redirects once to the gallery', await waitFor(`location.pathname.endsWith('/gallery/') && location.search.includes('i18n-root-check=1') && document.readyState === 'complete'`, 15000), await ev('location.href'));
check('root: detected language reaches the gallery', (await htmlLang()) === 'ja', await htmlLang());
check('root: no redirect loop', !(await ev('location.pathname')).includes('gallery/gallery'), await ev('location.pathname'));
if (navScript) await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: navScript });
await finish();
