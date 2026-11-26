// The gallery and demo pages share labels and feedback. Component scripts work on their own.
const sakugaSite = (() => {
  const query = new URLSearchParams(location.search);
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-CN', name: '简体中文', copyAttribute: 'data-zh' },
    { code: 'ja', name: '日本語', copyAttribute: 'data-ja' },
  ];
  const STORAGE_KEY = 'sakuga-lang';

  // Collapse regional tags onto the one edition shipped per language. Unsupported tags return null so callers can fall through.
  // `zh-Hans`, `zh-TW`, `zh-HK`... use the Simplified Chinese edition; `ja-JP` -> ja; `en-US` -> en.
  function normalize(tag) {
    if (typeof tag !== 'string') return null;
    const primary = tag.trim().toLowerCase().split(/[-_]/)[0];
    return primary === 'zh' ? 'zh-CN' : primary === 'ja' ? 'ja' : primary === 'en' ? 'en' : null;
  }

  function readPreference() {
    try { return normalize(localStorage.getItem(STORAGE_KEY)); } catch { return null; }   // storage may be disabled
  }
  function savePreference(code) {
    const value = normalize(code);
    if (!value) return;
    try { localStorage.setItem(STORAGE_KEY, value); } catch {}
  }

  // Priority: explicit URL parameter > saved choice > browser languages > English. Invalid tags are simply ignored.
  const browserLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
  const fromBrowser = browserLangs.map(normalize).find(Boolean);
  const lang = normalize(query.get('lang')) || readPreference() || fromBrowser || 'en';
  const languageIndex = Math.max(0, languages.findIndex(({ code }) => code === lang));
  const { copyAttribute } = languages[languageIndex];
  const text = (...translations) => translations[languageIndex] ?? translations[0];
  document.documentElement.lang = lang;   // keeps the Canvas lettering in step with the interface
  if (query.get('embed') === '1') document.documentElement.classList.add('embed');

  // Translations use the same order as languages above.
  const messages = {
    confirm: ['Confirm', '确认', '確定'],
    cancel: ['Cancel', '取消', 'キャンセル'],
    notifications: ['Notifications', '通知', '通知'],
    volume: ['Volume', '音量', '音量'],
    rememberMe: ['Remember me', '记住我', 'ログイン情報を保存'],
    plan: ['Plan', '方案', 'プラン'],
    optionA: ['Option A', '选项 A', '選択肢 A'],
    optionB: ['Option B', '选项 B', '選択肢 B'],
    inputText: ['Text', '文本', 'テキスト'],
    inputName: ['Name', '姓名', '名前'],
    inputPlaceholder: ['Type something', '请输入文字', '文字を入力してください'],
    sections: ['Sections', '栏目', 'セクション'],
    home: ['Home', '首页', 'ホーム'],
    profile: ['Profile', '个人资料', 'プロフィール'],
    settings: ['Settings', '设置', '設定'],
    loading: ['Loading', '正在加载', '読み込み中'],
    progress: ['Progress', '进度', '進捗'],
    complete: ['Complete ✓', '已完成 ✓', '完了 ✓'],
    rating: ['Rating', '评分', '評価'],
    starLabel: ['', '{n} 星', '{n}つ星'],
    save: ['Save', '保存', '保存'],
    saved: ['Saved successfully!', '保存成功！', '保存しました！'],
    dismiss: ['Dismiss', '关闭通知', '通知を閉じる'],
    help: ['Help', '帮助', 'ヘルプ'],
    helpfulHint: ['Helpful hint!', '这是一条小提示！', '操作のヒントです！'],
    clicked: ['Clicked', '已点击', 'ボタンが押されました'],
    canceled: ['Canceled', '已取消', 'キャンセルしました'],
    on: ['On', '已开启', 'オンにしました'],
    off: ['Off', '已关闭', 'オフにしました'],
    checked: ['Checked', '已勾选', 'チェックしました'],
    unchecked: ['Unchecked', '已取消勾选', 'チェックを外しました'],
    valueChanged: ['Value: {value}', '当前值：{value}', '現在の値：{value}'],
    optionChanged: ['Selected: {value}', '已选择：{value}', '選択中：{value}'],
    tabChanged: ['Tab: {value}', '当前选项卡：{value}', '現在のタブ：{value}'],
    ratingChanged: ['Rating: {value} / 5', '评分：{value} / 5', '評価：{value} / 5'],
    loadingDone: ['Loading complete', '加载完成', '読み込みが完了しました'],
  };

  function t(key, value) {
    const message = text(...messages[key]);
    return value === undefined ? message : message.replace('{value}', () => value);
  }

  function link(href, language = lang) {
    const url = new URL(href, location.href);
    url.searchParams.set('lang', language);
    return url.href;
  }

  // Run before loading the components so they read localized attributes and options on upgrade.
  function localize() {
    if (copyAttribute) {
      for (const el of document.querySelectorAll(`[${copyAttribute}]`)) el.textContent = el.getAttribute(copyAttribute);
      for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
      for (const attr of ['label', 'placeholder', 'text', 'done-label', 'star-label', 'dismiss-label']) {
        const key = `data-i18n-${attr}`;
        for (const el of document.querySelectorAll(`[${key}]`)) el.setAttribute(attr, t(el.getAttribute(key)));
      }
    }

    for (const nav of document.querySelectorAll('[data-language-switch]')) {
      nav.setAttribute('aria-label', text('Language', '语言', '言語'));
      nav.textContent = '';
      for (const { code, name } of languages) {
        const anchor = document.createElement('a');
        anchor.href = link(location.href, code);
        anchor.lang = anchor.hreflang = code;
        anchor.dataset.language = code;
        anchor.textContent = name;
        if (code === lang) anchor.setAttribute('aria-current', 'page');
        nav.append(anchor);
      }
      // Remember a deliberate click before the browser leaves, so the choice survives a later visit without ?lang.
      nav.addEventListener('click', (event) => {
        const anchor = event.target.closest?.('a[data-language]');
        if (!anchor || !nav.contains(anchor) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        savePreference(anchor.dataset.language);
      });
    }
  }

  return { text, t, link, localize, normalize, savePreference, get lang() { return lang; } };
})();
