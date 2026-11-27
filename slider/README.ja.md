# スライダー

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

つまみの後ろに雲が付いたレンジスライダーです。値はドラッグに合わせて傾く吹き出しの中に表示されます。つまみはしずく形に伸び、ばねで指より遅れて追従します。速くドラッグすると、積雲の列がスピード線と欠片を伴って後ろから盛り上がり、「シュッ」が出ます。まだ動いているうちに離すと、三日月が小さな衝撃波を伴って前方へ飛び、元の位置には 2 つの煙が残ります。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/slider/ を開く
```

## 使い方

```html
<script src="slider.js"></script>
<sakuga-slider value="30" label="音量"></sakuga-slider>
<sakuga-slider min="0" max="10" step="0.5" value="4" unit="" label="辛さ" name="spice"></sakuga-slider>
```

```js
el.addEventListener('input', () => console.log(el.value));    // 移動中
el.addEventListener('change', () => console.log(el.value));   // 離したとき
el.value = 80;
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `value`、`min`、`max`、`step` | `<input type="range">` と同じ | 50、0、100、1 |
| `label` | スクリーンリーダーが読み上げる名前 | スライダー |
| `unit` | 吹き出し内の数値の後に表示 | `%` |
| `name` | フォームと一緒に送信 | なし |
| `disabled` | 移動不可 | オフ |

- **土台は本物の range input です。** トラック全体に重ねて透明にしてあるため、キーボード、タッチ、スクリーンリーダーはネイティブのコントロールを使えます。`value` は input と同じく文字列で、`valueAsNumber` が数値です。
- **サイズ：** 幅 230 ピクセル。`--sk-slider-width` で変更できます。上に 30 ピクセルを吹き出し用に空けています。

## 制限

- **エフェクトには速度が必要です。** ゆっくりしたドラッグではつまみが動くだけです。雲は 1 秒あたりトラックの約 3 分の 1 を超える速度から出ます。
- **横方向のみです。**