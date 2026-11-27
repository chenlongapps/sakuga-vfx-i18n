# ラジオボタン

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

ラジオグループです。選ばれた丸が跳ねて現れ、くさびの扇が広がり、2 つの煙が漂い、横に中空の「ポン」が浮かびます。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/radio/ を開く
```

## 使い方

選択肢は要素内に `<option>` として列挙します：

```html
<script src="radio.js"></script>
<sakuga-radio label="プラン" name="plan">
  <option value="free" selected>無料</option>
  <option value="pro">プロ</option>
</sakuga-radio>
```

```js
el.addEventListener('change', () => console.log(el.value));
el.value = 'pro';     // コードから設定：エフェクトなし
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `label` | スクリーンリーダーが読み上げるグループ名 | オプション |
| `value` | 選択中の値（option の `selected` を上書き） | `selected` の option |
| `name` | フォームと一緒に送信 | なし |
| `disabled` | 変更不可 | オフ |

- **option は最初に表示されたときに一度だけ読み込まれます。** 後から変更しても反映されないため、要素ごと置き換えてください。
- **土台は本物のラジオ input です。** 矢印キーで項目間を移動できます。

## 制限

- 1 列のみです。