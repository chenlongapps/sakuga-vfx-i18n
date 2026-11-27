# 星評価

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

5 つの星が順に弾むように現れます。最後に点灯した星にはくさびの扇、光、中空の「ポン」が付き、5 つすべて点灯すると背後で衝撃波も弾けます。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/rating/ を開く
```

## 使い方

```html
<script src="rating.js"></script>
<sakuga-rating label="このレシピを評価" name="stars"></sakuga-rating>
```

```js
el.addEventListener('change', () => console.log(el.value));   // 0〜5
el.value = 3;   // コードから設定：エフェクトなし
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `label` | スクリーンリーダーが読み上げるグループ名 | 評価 |
| `star-label` | 各星のアクセシブルラベルテンプレート。`{n}` が 1〜5 に置換されます（例：`{n} つ星`） | 1 つ星、2 つ星…… |
| `value` | 0〜5 | 0 |
| `name` | フォームと一緒に送信（0 のときは送信なし） | なし |
| `disabled` | 変更不可 | オフ |

- **点灯している星をもう一度クリックすると 0 に戻ります。**
- **5 つのボタンからなるラジオグループです。** 矢印キーで評価を移動できます。

## 制限

- 常に 5 つ星で、半分の星はありません。