# テキスト入力欄

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

砂ぼこりを舞わせるテキスト入力欄です。フォーカスすると、角から 3 本のくさびが飛び出します。キーを押すたびにカーソルの位置から砂ぼこりが舞い、ときどき欠片も飛び、枠が少し沈みます。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/input/ を開く
```

## 使い方

```html
<script src="input.js"></script>
<sakuga-input label="メール" type="email" placeholder="you@example.com" name="email"></sakuga-input>
```

```js
el.addEventListener('input', () => console.log(el.value));
el.value = 'hello';
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `label` | スクリーンリーダーが読み上げる名前 | テキスト |
| `placeholder`、`value` | input と同じ | 空 |
| `type` | text、email、search、url、tel、password | text |
| `autocomplete` | input と同じ | オフ |
| `name` | フォームと一緒に送信 | なし |
| `disabled` | 入力不可 | オフ |

- **サイズ：** 幅 230 ピクセル。`--sk-input-width` で変更できます。`::part(input)` で内部の input にアクセスできます。
- パスワード欄でも砂ぼこりはカーソルに追従しますが、位置はドットを基準に測ります。

## 制限

- **検証スタイルはありません。** `required`、`pattern` などは渡されず、無効状態の見た目もありません。
- 1 行のみで、textarea はありません。