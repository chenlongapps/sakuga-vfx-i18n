# 选项卡

[English](README.md) · **简体中文** · [日本語](README.ja.md)

凸起的选中选项卡会滑向你选择的那一个，滑动时拉伸，落定时上方出现楔形，原位置一侧扬起烟团，后方带起速度线。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/tabs/
```

## 使用

将选项卡作为 `<option>` 列在元素内：

```html
<script src="tabs.js"></script>
<sakuga-tabs label="账户">
  <option value="home">首页</option>
  <option value="profile">个人资料</option>
  <option value="settings">设置</option>
</sakuga-tabs>
```

```js
el.addEventListener('change', (e) => showPanel(e.detail.value));   // e.detail: { index, value, label }
el.selected = 2;     // 通过代码设置：移动时不播放落地特效
el.value;            // 当前选中项的 value
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `label` | 屏幕阅读器读取的选项卡列表名称 | 选项卡 |
| `selected` | 初始选中的索引 | 0 |

- **它只绘制选项卡。** 请在 `change` 中自行显示和隐藏面板。
- **键盘：** 方向键移动并循环，Home 和 End 跳到两端。

## 限制

- **没有面板，也没有 `aria-controls`，** 因为面板位于 Shadow DOM 之外。请自行给每个面板设置 `role="tabpanel"` 和标签。
- **选项卡不会滚动。** 数量超过宽度时会溢出。