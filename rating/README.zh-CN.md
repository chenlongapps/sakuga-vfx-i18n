# 星级评分

[English](README.md) · **简体中文** · [日本語](README.ja.md)

五颗星星依次弹入。最后点亮的那颗会获得扇形楔形、闪光和空心「ポン」；点亮五颗时，背后还会炸开冲击波。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/rating/
```

## 使用

```html
<script src="rating.js"></script>
<sakuga-rating label="给这道菜评分" name="stars"></sakuga-rating>
```

```js
el.addEventListener('change', () => console.log(el.value));   // 0 到 5
el.value = 3;   // 通过代码设置：无特效
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `label` | 屏幕阅读器读取的组名 | 评分 |
| `star-label` | 每颗星的无障碍标签模板；`{n}` 会替换为 1–5（例如 `{n} 星`） | 1 星、2 星…… |
| `value` | 0 到 5 | 0 |
| `name` | 随表单提交（0 时不提交） | 无 |
| `disabled` | 无法更改 | 关闭 |

- **再次点击已点亮的星会清零** 到 0。
- **它是包含五个按钮的单选组，** 方向键可以调整评分。

## 限制

- 始终五颗星。没有半星。