# チェックボックス

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

チェックを入れると、2 本の三日月が枠を巡り、結晶が飛び、チェックが描かれ、光が走ったあと、点線の描き文字「ズザッ」が落ちます。チェックを外すと、小さな煙とともに消えます。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/checkbox/ を開く
```

## 使い方

```html
<script src="checkbox.js"></script>
<sakuga-checkbox name="remember">ログイン情報を保存</sakuga-checkbox>
```

```js
el.addEventListener('change', () => console.log(el.checked));
el.checked = true;    // コードから設定：エフェクトなし
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `checked` | 初期状態でチェック済み | オフ |
| `name`、`value` | チェック時にフォームと一緒に送信 | 値 `on` |
| `disabled` | 変更不可 | オフ |

- **要素内のテキストがラベルです。** クリックするとチェックが入ります。土台は本物のチェックボックスです。
- **パーツ：** `::part(label)` と `::part(box)`。

## 制限

- 不確定状態（indeterminate）はありません。