# 滑块

[English](README.md) · **简体中文** · [日本語](README.ja.md)

一个带云朵的滑块，云朵跟在滑块手柄后面。数值显示在一个会随拖动倾斜的气泡中。手柄拉伸成水滴形，并在弹簧上滞后于手指。快速拖动时，一排积云带着速度线和碎屑从后方滚起，并出现「シュッ」。在仍然移动时松手，一道月牙会向前飞出，伴随小型冲击波，原处留下两团烟。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/slider/
```

## 使用

```html
<script src="slider.js"></script>
<sakuga-slider value="30" label="音量"></sakuga-slider>
<sakuga-slider min="0" max="10" step="0.5" value="4" unit="" label="辣度" name="spice"></sakuga-slider>
```

```js
el.addEventListener('input', () => console.log(el.value));    // 移动过程中
el.addEventListener('change', () => console.log(el.value));   // 松手时
el.value = 80;
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `value`、`min`、`max`、`step` | 与 `<input type="range">` 相同 | 50、0、100、1 |
| `label` | 屏幕阅读器读取的名称 | 滑块 |
| `unit` | 显示在气泡中数字之后 | `%` |
| `name` | 随表单提交 | 无 |
| `disabled` | 无法移动 | 关闭 |

- **底层是真正的 range 输入框，** 它铺在轨道上并保持透明，因此键盘、触摸和屏幕阅读器都能使用原生控件。`value` 和输入框一样是字符串；`valueAsNumber` 是数字。
- **尺寸：** 宽 230 像素；设置 `--sk-slider-width` 可修改。上方保留 30 像素给气泡。

## 限制

- **特效需要速度。** 缓慢拖动只会移动手柄；当速度超过约每秒轨道的三分之一时，云朵才会出现。
- **仅支持水平方向。**