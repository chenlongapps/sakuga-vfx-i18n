# タブ

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

浮き上がった選択タブが、選んだタブへ伸びながらスライドし、着地時に上へくさび、元の側に煙、後ろにスピード線が出ます。

## 実行

```sh
python3 -m http.server 8000     # リポジトリのフォルダで実行
# http://localhost:8000/tabs/ を開く
```

## 使い方

選択肢は要素内に `<option>` として列挙します：

```html
<script src="tabs.js"></script>
<sakuga-tabs label="アカウント">
  <option value="home">ホーム</option>
  <option value="profile">プロフィール</option>
  <option value="settings">設定</option>
</sakuga-tabs>
```

```js
el.addEventListener('change', (e) => showPanel(e.detail.value));   // e.detail: { index, value, label }
el.selected = 2;     // コードから設定：着地エフェクトなしで移動
el.value;            // 選択中の option の値
```

| 属性 | 設定内容 | 既定値 |
|---|---|---|
| `label` | スクリーンリーダーが読み上げるタブリスト名 | タブ |
| `selected` | 初期選択のインデックス | 0 |

- **描画するのはタブだけです。** パネルの表示・非表示は `change` で自分で行います。
- **キーボード：** 矢印キーで移動し端で折り返します。Home と End で両端へ移動します。

## 制限

- **パネルも `aria-controls` もありません。** パネルは Shadow DOM の外にあるためです。各パネルに `role="tabpanel"` とラベルを自分で設定してください。
- **スクロールしません。** 幅に対してタブが多すぎるとはみ出します。