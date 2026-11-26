# Sakuga VFX 多言語デモ

[English](README.md) · [简体中文](README.zh-CN.md) · 日本語

Sakuga VFX は、おなじみの UI にアニメのような手応えを加える Web コンポーネント集です。普段はシンプルな見た目ですが、押したりドラッグしたりすると、つぶれて跳ね返り、煙や衝撃波、水しぶきに「ドン！」「カチッ」「ズザッ」といった漫画風の描き文字が重なります。

エフェクトは Canvas 2D でリアルタイムに描画します。描き文字のパスはコンポーネントのファイルに含まれています。トグルスイッチのつまみや残像、液体は、ばねの動きに合わせてベクターパスで描きます。各コンポーネントは単一の JavaScript ファイルで、依存パッケージのインストールやビルドは不要です。

このフォークは Justin Finkelman の [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) を元に、ギャラリーと各コンポーネントのデモを日本語・英語・簡体字中国語で提供します。

## コンポーネント

ギャラリーには 11 種類のコンポーネントのデモが 12 個あります。ボタンはプライマリとセカンダリの 2 種類を試せます。

| コンポーネント | 要素 | 演出 |
|---|---|---|
| [ボタン](button/README.md) | `<sakuga-button>` | 押すとつぶれ、離すと煙や衝撃波が「ドン！」と広がります。`done()` でチェックマークが出ます。 |
| [トグルスイッチ](toggle/README.md) | `<sakuga-toggle>` | つまみが残像を引いて両端で跳ね返り、水しぶきと各言語の描き文字が出ます。オンで液体が満ち、オフで引いていきます。 |
| [スライダー](slider/README.md) | `<sakuga-slider>` | つまみがしずく形に伸び、すばやく動かすと背後に雲がわき上がります。 |
| [チェックボックス](checkbox/README.md) | `<sakuga-checkbox>` | 弧を描く斬撃と結晶のかけらに続き、チェックマークが描かれます。 |
| [ラジオボタン](radio/README.md) | `<sakuga-radio>` | 丸いマークが煙と「ポン」の描き文字を伴って現れます。 |
| [テキスト入力欄](input/README.md) | `<sakuga-input>` | 文字を入力するたびにカーソルの位置で砂ぼこりが舞います。 |
| [タブ](tabs/README.md) | `<sakuga-tabs>` | 浮き上がった選択枠が伸びながら滑り、着地するときに煙が上がります。 |
| [プログレスバー](progress/README.md) | `<sakuga-progress>` | 雷雲がバーの先端を進み、完了時に衝撃波とチェックマークが出ます。 |
| [星評価](rating/README.md) | `<sakuga-rating>` | 星が順に弾むように光り、5 つ星で衝撃波が広がります。 |
| [トースト通知](toast/README.md) | `<sakuga-toast>` | スピード線を引いて飛び込み、砂ぼこりを上げて止まります。閉じると縮んで消えます。 |
| [ツールチップ](tooltip/README.md) | `<sakuga-tooltip>` | ヒントが漫画の吹き出しのように飛び出します。 |

配色を変更するには、`--sk-*` の CSS 変数を上書きします。たとえばページの `:root` で `--sk-acc` を設定できます。`prefers-reduced-motion` が有効な場合、キャンバスのエフェクトは無効になります。

## デモ

GitHub Pages のギャラリーを **[日本語](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja)**、[英語](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=en)、[簡体字中国語](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN)で開けます。言語を切り替えると、画面の表示と描き文字の両方に反映されます。`?lang` がない場合は、保存した選択、ブラウザーの言語、英語の順に適用されます。言語リンクをクリックすると選択が保存され、次回以降も引き継がれます。「ドキュメントとデモ」からコンポーネントのページを開いても、URL に選択した言語が引き継がれます。

ローカルで試すには、リポジトリのルートで次を実行してください。

```sh
python3 -m http.server 8000
```

次に [http://localhost:8000/gallery/?lang=ja](http://localhost:8000/gallery/?lang=ja) を開いてください。

## 使い方

ギャラリーで「.js をダウンロード」か「ソースをコピー」を選びます。リポジトリから [`button/button.js`](button/button.js) のようなコンポーネントファイルを直接コピーすることもできます。ファイルをプロジェクトに置き、通常の `<script>` タグで読み込むと、カスタム要素が使えます。

```html
<script src="button.js"></script>
<sakuga-button>確定</sakuga-button>

<script src="toggle.js"></script>
<sakuga-toggle label="通知"></sakuga-toggle>

<script src="progress.js"></script>
<sakuga-progress label="アップロード中"></sakuga-progress> <!-- el.set(0.4) で進捗を更新 -->
```

属性・メソッド・イベントは、表からリンクしている各コンポーネントの README を参照してください。トグルスイッチ、スライダー、チェックボックス、ラジオボタン、テキスト入力欄、星評価は `<form>` の中で使えます。`name` を設定すると、値がフォームと一緒に送信されます。

各ファイルにはエフェクトの共通コードが含まれます。複数のコンポーネントを読み込むと、最初のファイルが作った `window.SakugaFX` が再利用され、キャンバスとアニメーションループが共有されます。

コンポーネントを単独で使う場合は、ページの `<html lang>` に `ja`、`en`、`zh-CN` のいずれかを指定します。エフェクトが始まるたびに現在の言語を参照します。言語が未指定の場合や対応する描き文字がない場合は、日本語の原版を使います。素材の生成、確認、パスへの変換手順は[素材ガイド](art/words/README.md)を参照してください。

## 謝辞とライセンス

元の [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) を制作した Justin Finkelman に感謝します。元のプロジェクトの描き文字とトグルスイッチのアニメーション素材は、Higgsfield 経由で GPT Image を使って生成されました。MIT ライセンスで公開しています。コンポーネントを再配布する際は [LICENSE](LICENSE) を同梱してください。
