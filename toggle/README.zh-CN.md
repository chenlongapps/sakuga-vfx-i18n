# 开关

[English](README.md) · **简体中文** · [日本語](README.ja.md)

按下时开关会压扁，随后拨钮拉伸并留下墨迹拖尾。开启时，一卷水在拨钮后方升起并甩出圆润的水滴；随着液体填满，浪尖折回轨道。关闭时，液体退去，另一端扬起更低的浪，并带出更尖锐的横向碎片。两次撞击都会显示本地化的「カチッ」，最后以闪光收尾。

## 运行

```sh
python3 -m http.server 8000     # 在仓库目录中运行
# 打开 http://localhost:8000/toggle/
```

## 使用

```html
<script src="toggle.js"></script>
<sakuga-toggle label="通知"></sakuga-toggle>
<sakuga-toggle label="深色模式" checked name="dark"></sakuga-toggle>
```

```js
el.addEventListener('change', () => console.log(el.checked));
el.checked = true;    // 通过代码设置：直接跳到终点，无动画
el.flip();            // 通过代码切换，带完整动画
```

| 属性 | 作用 | 默认值 |
|---|---|---|
| `label` | 屏幕阅读器读取的名称 | 开关 |
| `checked` | 开启 | 关闭 |
| `name`、`value` | 开启时随表单提交，类似复选框 | 值 `on` |
| `disabled` | 无法切换 | 关闭 |

- 影子按钮带有 `role="switch"`。空格和回车可以切换，`aria-checked` 反映当前值。
- 点击区域为 108 × 54 CSS 像素，位于 108 × 182 的宿主元素中央，以便与其他控件对齐。上下各约 64 像素（左右各 21 像素）留给特效。
- 用户操作或调用 `flip()` 会播放动画并派发冒泡的 `change` 事件。直接设置 `checked` 会立即呈现目标状态。
- 表单重置会恢复开关初始的选中状态。禁用的开关或 fieldset 会阻止该控件的激活和表单提交。

## 渲染与主题

- 外壳、拨盘、拖尾和液体都由 Canvas 2D 路径绘制。弹簧使用公共 `requestAnimationFrame` 时钟的经过时间，因此快速切换会保留当前位置和动量。
- 将 `<html lang>` 设为 `en`、`zh-CN` 或 `ja` 可选择冲击拟声字。
- 使用 `--sk-ink` 控制描边，`--sk-card` 和 `--sk-soft` 控制拨盘，`--sk-track` 控制空轨道，`--sk-pri` 控制液体，`--sk-acc` 控制冲击拟声字和焦点环。共享粒子使用项目的特效调色板。
- 开启减少动态效果后，开关会立即更新并跳过特效。
- 独立脚本约 100 KiB，包含共享核心和拟声字。