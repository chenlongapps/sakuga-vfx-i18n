# 工具提示

[English](README.md) · **简体中文** · [日本語](README.ja.md)

一个帮助按钮，提示会像对话气泡一样从中弹出，两侧带烟团，按钮顶部飞出一个圆环，角落出现楔形，并伴随空心「カチッ」。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/tooltip/
```

## 使用

```html
<script src="tooltip.js"></script>
<sakuga-tooltip text="我们只会用它发送收据。" label="为什么需要这个"></sakuga-tooltip>
<sakuga-tooltip text="键盘快捷键">i</sakuga-tooltip>
```

```js
el.show(); el.hide(); el.open;
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `text` | 提示内容 | 有用的提示！ |
| `label` | 屏幕阅读器读取的按钮名称 | 帮助 |

- **鼠标悬停、聚焦和轻触时打开，** Escape 可关闭。提示通过 `aria-describedby` 与按钮关联。
- **元素内的内容会替换按钮上的「?」。**
- **提示最宽 220 像素** 并会自动换行。它从按钮上方打开；元素上方保留 60 像素给提示。

## 限制

- **始终在上方。** 空间不足时不会翻到下方。
- **不能指向其他元素。** 按钮本身就是触发点。