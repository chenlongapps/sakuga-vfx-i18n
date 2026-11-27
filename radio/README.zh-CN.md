# 单选框

[English](README.md) · **简体中文** · [日本語](README.ja.md)

一个单选组。被选中的圆点弹入，扇形楔形从它散开，两团烟飘走，旁边弹出空心的「ポン」。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/radio/
```

## 使用

将选项作为 `<option>` 列在元素内：

```html
<script src="radio.js"></script>
<sakuga-radio label="方案" name="plan">
  <option value="free" selected>免费</option>
  <option value="pro">专业版</option>
</sakuga-radio>
```

```js
el.addEventListener('change', () => console.log(el.value));
el.value = 'pro';     // 通过代码设置：无特效
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `label` | 屏幕阅读器读取的组名 | 选项 |
| `value` | 当前选中的值（覆盖选项上的 `selected`） | `selected` 的选项 |
| `name` | 随表单提交 | 无 |
| `disabled` | 无法更改 | 关闭 |

- **选项只在首次出现时读取一次，** 之后再修改不会生效；请替换整个元素。
- **底层是真正的单选输入框，** 因此方向键可以在选项间移动。

## 限制

- 仅支持单列。