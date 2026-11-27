# 文本输入框

[English](README.md) · **简体中文** · [日本語](README.ja.md)

一个会扬起尘雾的文本输入框。聚焦时，三道楔形从角落飞出。每次按键都会从光标位置扬起一团尘雾，偶尔还有碎屑，输入框也会轻微下沉。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/input/
```

## 使用

```html
<script src="input.js"></script>
<sakuga-input label="邮箱" type="email" placeholder="you@example.com" name="email"></sakuga-input>
```

```js
el.addEventListener('input', () => console.log(el.value));
el.value = 'hello';
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `label` | 屏幕阅读器读取的名称 | 文本 |
| `placeholder`、`value` | 与输入框相同 | 空 |
| `type` | text、email、search、url、tel 或 password | text |
| `autocomplete` | 与输入框相同 | 关闭 |
| `name` | 随表单提交 | 无 |
| `disabled` | 无法输入 | 关闭 |

- **尺寸：** 宽 230 像素；设置 `--sk-input-width` 可修改。`::part(input)` 可以访问内部输入框。
- 在密码框中，尘雾仍会跟随光标，只是按圆点位置测量。

## 限制

- **没有校验样式。** `required`、`pattern` 等不会传递，也没有无效状态外观。
- 仅单行；没有 textarea。