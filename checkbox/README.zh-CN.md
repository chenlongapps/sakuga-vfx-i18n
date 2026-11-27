# 复选框

[English](README.md) · **简体中文** · [日本語](README.ja.md)

勾选时，两道月牙绕着方框挥出，碎晶飞出，对勾自行绘出，随后闪过一道光，「ズザッ」以点状字落下。取消勾选时，它在一小团烟中消失。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/checkbox/
```

## 使用

```html
<script src="checkbox.js"></script>
<sakuga-checkbox name="remember">记住我</sakuga-checkbox>
```

```js
el.addEventListener('change', () => console.log(el.checked));
el.checked = true;    // 通过代码设置：无特效
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `checked` | 初始是否勾选 | 关闭 |
| `name`、`value` | 勾选时随表单提交 | 值 `on` |
| `disabled` | 无法更改 | 关闭 |

- **元素内的文本就是标签，** 点击它即可勾选。底层是真正的复选框。
- **部件：** `::part(label)` 和 `::part(box)`。

## 限制

- 没有不确定状态（indeterminate）。