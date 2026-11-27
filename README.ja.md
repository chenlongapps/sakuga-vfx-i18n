<h1 align="center">Sakuga VFX</h1>

<p align="center"><em>おなじみの UI に、アニメのような手応えを。</em></p>

<p align="center">
  <a href="https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja"><img src="https://img.shields.io/badge/Live%20Demo-%E3%83%87%E3%83%A2%E3%82%92%E8%A9%A6%E3%81%99-ff5fa8?style=for-the-badge" alt="オンラインデモ"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live-0b7fc7?logo=github" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/License-MIT-1d1a4a" alt="MIT ライセンス">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?logo=javascript&amp;logoColor=1d1a4a" alt="バニラ JavaScript">
  <img src="https://img.shields.io/badge/Dependencies-None-2ea44f" alt="依存パッケージなし">
  <img src="https://img.shields.io/badge/Effects-Canvas%202D-8f8df7" alt="Canvas 2D エフェクト">
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20ZH%20%7C%20JA-ff5fa8" alt="3 言語対応">
</p>

<p align="center">
  <a href="README.md">English</a> · <a href="README.zh-CN.md">简体中文</a> · <strong>日本語</strong>
</p>

## プロジェクトについて

Sakuga VFX は、おなじみの UI コントロールにアニメのような反応を加えるコンポーネント集です。普段はシンプルな見た目ですが、押したりドラッグしたりすると、つぶれて跳ね返り、煙や衝撃波、結晶の破片、斬撃、水しぶき、煙の輪が重なります。「ドン！」「カチッ」「ズザッ」といった漫画風の描き文字は、英語・簡体字中国語・日本語に対応しています。

エフェクトは Canvas 2D でリアルタイムに描画します。描き文字は GPT Image で描き、パスに変換して各ファイルに埋め込みました。各コンポーネントは単一の JavaScript ファイルで、依存パッケージのインストールやビルドは不要です。MIT ライセンスで公開しています。

このフォークは Justin Finkelman の [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) を元に、ギャラリーと各コンポーネントのデモを日本語・英語・簡体字中国語で提供します。

## オンラインデモ

**[日本語デモを見る](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja)** · [English](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=en) · [简体中文](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN)

`?lang=` で画面の表示と描き文字の両方が切り替わります。`?lang` がない場合は、保存した選択、ブラウザーの言語、英語の順に適用されます。言語リンクをクリックすると選択が保存され、次回以降も引き継がれます。「ドキュメント」からコンポーネントのページを開いても、URL に選択した言語が引き継がれます。

## コンポーネントショーケース

11 種類のコンポーネント、12 のデモ（ボタンは 2 種類のバリエーションを含みます）。以下の Animated WebP はすべて、実際に動作しているコンポーネントをマウス・キーボード・タッチ操作で録画したものです。アニメーションをクリックすると対応するオンラインデモが開きます。

<table>
<tr>
<td width="50%" valign="top"><div align="center">
<b>プライマリボタン</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=ja"><img src="docs/webp/button.ja.webp" width="420" alt="プライマリボタンのインパクト演出"></a><br>
押すとつぶれ、離すと衝撃波と煙が広がり、最後に光るチェックが付きます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=ja">デモ</a> · <a href="button/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>セカンダリボタン</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=ja"><img src="docs/webp/button-secondary.ja.webp" width="420" alt="セカンダリボタンの演出"></a><br>
控えめなバリエーション：小さくつぶれ、角に 3 本のくさびが飛びます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=ja">デモ</a> · <a href="button/README.ja.md">ドキュメント</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>トグルスイッチ</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toggle/?lang=ja"><img src="docs/webp/toggle.ja.webp" width="420" alt="トグルスイッチの液体演出"></a><br>
つまみが残像を引いて両端で跳ね返り、水しぶきが上がります。液体はオンで満ち、オフで引きます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toggle/?lang=ja">デモ</a> · <a href="toggle/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>スライダー</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/slider/?lang=ja"><img src="docs/webp/slider.ja.webp" width="420" alt="スライダーのドラッグ演出"></a><br>
つまみがしずく形に伸びます。すばやく動かすと、背後に雲がわき上がります。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/slider/?lang=ja">デモ</a> · <a href="slider/README.ja.md">ドキュメント</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>チェックボックス</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/checkbox/?lang=ja"><img src="docs/webp/checkbox.ja.webp" width="420" alt="チェックボックスの演出"></a><br>
2 本の弧が枠を巡り、結晶が飛んでチェックマークが描かれます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/checkbox/?lang=ja">デモ</a> · <a href="checkbox/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>ラジオボタン</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/radio/?lang=ja"><img src="docs/webp/radio.ja.webp" width="420" alt="ラジオボタンの演出"></a><br>
丸いマークがくさびの扇と煙を伴って弾み、中空の「ポン」が弾けます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/radio/?lang=ja">デモ</a> · <a href="radio/README.ja.md">ドキュメント</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>テキスト入力欄</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/input/?lang=ja"><img src="docs/webp/input.ja.webp" width="420" alt="入力欄の砂ぼこり演出"></a><br>
文字を入力するたびにカーソルの位置で砂ぼこりが舞い、枠も少し縮みます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/input/?lang=ja">デモ</a> · <a href="input/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>タブ</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tabs/?lang=ja"><img src="docs/webp/tabs.ja.webp" width="420" alt="タブのスライド演出"></a><br>
浮き上がった選択枠が伸びながら滑り、着地時にくさびと煙が出ます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tabs/?lang=ja">デモ</a> · <a href="tabs/README.ja.md">ドキュメント</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>プログレスバー</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/progress/?lang=ja"><img src="docs/webp/progress.ja.webp" width="420" alt="プログレスバーの雷雲演出"></a><br>
雷雲が先端を進み、小石が舞い上がります。完了時は衝撃波とチェックマークが弾けます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/progress/?lang=ja">デモ</a> · <a href="progress/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>星評価</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/rating/?lang=ja"><img src="docs/webp/rating.ja.webp" width="420" alt="星評価の演出"></a><br>
星が順に弾むように光り、5 つ星で衝撃波が広がります。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/rating/?lang=ja">デモ</a> · <a href="rating/README.ja.md">ドキュメント</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>トースト通知</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toast/?lang=ja"><img src="docs/webp/toast.ja.webp" width="420" alt="トースト通知の登場演出"></a><br>
速度線を引いて飛び込み、砂ぼこりの中で止まります。閉じると縮んで消えます。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toast/?lang=ja">デモ</a> · <a href="toast/README.ja.md">ドキュメント</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>ツールチップ</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tooltip/?lang=ja"><img src="docs/webp/tooltip.ja.webp" width="420" alt="ツールチップの吹き出し演出"></a><br>
ヒントが漫画の吹き出しのように飛び出し、煙と輪が広がります。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tooltip/?lang=ja">デモ</a> · <a href="tooltip/README.ja.md">ドキュメント</a>
</div></td>
</tr>
</table>

## 主な特徴

- **ばねによる動き。** つぶれ、伸び、行き過ぎはあらかじめ決めた CSS アニメーションではなく、フレームごとに計算しています。
- **手描きのような物理演出。** 煙、衝撃波、結晶、くさび、斬撃、水しぶき、煙の輪を Canvas 2D で描画します。
- **ローカライズされた描き文字。** 「ドン！」「カチッ」「ズザッ」は `<html lang>` に従って切り替わり、訳がない場合は日本語原版を使います。
- **1 ファイル・設定不要。** 各コンポーネントは `<script>` タグ 1 つで読み込めます。npm のインストールもビルドも不要です。
- **AI コーディングツール対応。** ギャラリーの「AIプロンプトをコピー」で、スキル、ソース、ドキュメントの URL を含むローカライズ済みの導入プロンプトを取得でき、Codex、Claude Code、OpenCode、Cursor などにそのまま貼り付けられます。
- **本物のフォーム控件。** フォーカス、キーボード、タッチに対応し、`ElementInternals` を通じてネイティブなフォーム値を提供します。
- **テーマ変更が可能。** ページの `:root` で `--sk-*` 変数（例: `--sk-acc`）を上書きできます。`prefers-reduced-motion` が有効な場合、エフェクトは無効になりますが状態変化は残ります。

## Skill のインストール

[skills](https://skills.sh/) CLI でインストールします：

```sh
npx skills add chenlongapps/sakuga-vfx-i18n
```

検出された AI コーディングツール（Claude Code、Codex、OpenCode、Cursor など）に `sakuga-vfx` スキルをインストールします。`-g` を付けるとグローバルにインストールできます。リポジトリのクローンや手動コピーは不要です。

インストールは任意です。ギャラリーの「AIプロンプトをコピー」には生の `SKILL.md` URL がすでに含まれています。

## コンポーネント一覧

| コンポーネント | 要素 | 演出 | ドキュメント |
|---|---|---|---|
| ボタン（プライマリ／セカンダリ） | `<sakuga-button>` | 押すとつぶれ、離すとインパクトフレーム、煙、衝撃波、描き文字が弾けます。`done()` でチェックが付きます。セカンダリは小さなつぶれと 3 本のくさびです。 | [README](button/README.ja.md) |
| トグルスイッチ | `<sakuga-toggle>` | つまみが残像を引いて両端で跳ね返り、水しぶきと各言語の描き文字が出ます。オンで液体が満ち、オフで引いていきます。 | [README](toggle/README.ja.md) |
| スライダー | `<sakuga-slider>` | つまみがしずく形に伸び、ばねで遅れて追従します。速く動かすと雲がわき、離すと三日月が先へ飛びます。 | [README](slider/README.ja.md) |
| チェックボックス | `<sakuga-checkbox>` | 2 本の弧が枠を巡り、結晶が飛んでチェックが描かれ、点線の描き文字が弾けます。 | [README](checkbox/README.ja.md) |
| ラジオボタン | `<sakuga-radio>` | 丸いマークがくさびの扇、2 つの煙、中空の「ポン」とともに現れます。 | [README](radio/README.ja.md) |
| テキスト入力欄 | `<sakuga-input>` | 文字を入力するたびにカーソルの位置で砂ぼこりが舞います。 | [README](input/README.ja.md) |
| タブ | `<sakuga-tabs>` | 浮き上がった選択枠が伸びながら滑り、着地時にくさびと煙が出ます。 | [README](tabs/README.ja.md) |
| プログレスバー | `<sakuga-progress>` | 雷雲が先端を進み、小石が舞い上がって「ゴゴゴゴ」が現れます。完了時は衝撃波、描き文字、チェックで締めくくります。 | [README](progress/README.ja.md) |
| 星評価 | `<sakuga-rating>` | 星が順に弾むように光り、5 つ星で衝撃波が広がります。 | [README](rating/README.ja.md) |
| トースト通知 | `<sakuga-toast>` | スピード線を引いて飛び込み、砂ぼこりを上げて止まります。閉じると縮んで消えます。 | [README](toast/README.ja.md) |
| ツールチップ | `<sakuga-tooltip>` | ヒントが漫画の吹き出しのように煙と描き文字を伴って飛び出します。 | [README](tooltip/README.ja.md) |

## 国際化

ギャラリーと各コンポーネントのデモは `?lang=en`、`?lang=zh-CN`、`?lang=ja` に対応しています。切り替えると画面の文案と Canvas の描き文字の両方が変わり、選択は次回以降も保存されます。単独で使う場合は、ページの `<html lang>` に `en`、`zh-CN`、`ja` のいずれかを指定してください。エフェクトが始まるたびに言語を参照し、未指定や訳がない場合は日本語原版を使います。

描き文字自体が言語によって変わるため、ショーケースでは言語ごとに別の Animated WebP を録画しています。コンポーネントの動作とタイミングは同一です。字形素材は [`art/words/<lang>/`](art/words/) にあり、ビルドスクリプトがパスを各コンポーネントに埋め込みます。

## 既知の制限

- **ヘッドレス Chromium で確認済み**です。実際のタッチ・キーイベントとフレーム単位の撮影を使いましたが、Safari、Firefox、実機、スクリーンリーダーでは未検証です。
- **エフェクトキャンバスは最前面にあり、ポインタ events を無視します。** そのためモーダルや固定ヘッダーの上をエフェクトが通り抜けることがあります。
- **控件の背後にあるエフェクトは控件内部に描かれる**ため（ボタンとプログレスバーの衝撃波、星 5 つの破裂）、`overflow: hidden` の親要素で切り取られます。
- **モーション低減**を有効にするとすべてのエフェクトが止まりますが、ばねの動きと状態変化は残ります。

## ライセンス

Justin Finkelman の [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) を元にしています。MIT ライセンスです。コンポーネントを再配布する際は [LICENSE](LICENSE) を同梱してください。原プロジェクトの日本語の描き文字とトグルスイッチのフレームは、Higgsfield 経由で GPT Image を使って生成されました。
