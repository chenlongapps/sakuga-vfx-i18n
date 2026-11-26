# Sakuga VFX 多语言演示

[English](README.md) · 简体中文 · [日本語](README.ja.md)

Sakuga VFX 为日常网页控件加上动画般的反馈。控件静止时保持简洁。按压、拖动或切换时会变形、回弹，带起烟雾、冲击波、碎晶、水花等特效，并配上「轰！」「咔哒」「唰！」等漫画拟声字。

所有特效由代码绘制在页面共用的画布上。拟声字路径和开关的 43 帧动画都内嵌在组件文件中。每个组件都是独立的 JavaScript 文件，无需安装依赖或执行构建，采用 MIT 许可证。

本项目基于 Justin Finkelman 的 [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx)，为图库和组件独立演示提供简体中文、英文和日文。

## 组件

图库有 11 个组件、12 个演示，其中按钮有主按钮和次要按钮两种样式。

| 组件 | 元素 | 动效 |
|---|---|---|
| [按钮](button/README.md) | `<sakuga-button>` | 按下时压扁，松手时闪现冲击波、烟雾和「ドン!」。调用 `done()` 后会出现对勾。 |
| [开关](toggle/README.md) | `<sakuga-toggle>` | 拨钮快速滑向另一侧，撞到边缘时溅起水花，轨道随后填满颜色。 |
| [滑块](slider/README.md) | `<sakuga-slider>` | 滑块被拉成长水滴状；快速拖动会带起云雾，松手则甩出一道弧线。 |
| [复选框](checkbox/README.md) | `<sakuga-checkbox>` | 勾选时划出弧光，带起碎晶，对勾随之绘出。 |
| [单选框](radio/README.md) | `<sakuga-radio>` | 选中的圆点弹入，带起烟雾和「ポン」。 |
| [文本输入框](input/README.md) | `<sakuga-input>` | 打字时，光标处会扬起一小团尘雾。 |
| [选项卡](tabs/README.md) | `<sakuga-tabs>` | 凸起的选中框拉伸并滑向新位置，落定时带起烟雾。 |
| [进度条](progress/README.md) | `<sakuga-progress>` | 风暴云随进度前进，完成时出现冲击波和对勾。 |
| [星级评分](rating/README.md) | `<sakuga-rating>` | 星星逐颗弹亮，五星还会触发冲击特效。 |
| [轻提示](toast/README.md) | `<sakuga-toast>` | 通知带着速度线飞入，在尘雾中落定，关闭时缩小消失。 |
| [工具提示](tooltip/README.md) | `<sakuga-tooltip>` | 提示像漫画里的对话气泡一样弹出。 |

配色可通过 `--sk-*` CSS 变量调整，例如在页面的 `:root` 中设置 `--sk-acc`。如果用户开启了 `prefers-reduced-motion`，页面会关闭画布特效。

## 演示

在 GitHub Pages 打开 **[简体中文图库](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN)**、[英文图库](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=en)或[日文图库](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja)。语言切换同时应用于界面与拟声字。从「文档与演示」进入组件页时，地址会保留当前语言。

如需在本地试用，在仓库根目录运行：

```sh
python3 -m http.server 8000
```

然后打开 [http://localhost:8000/gallery/?lang=zh-CN](http://localhost:8000/gallery/?lang=zh-CN)。

## 使用组件

在图库中选择「下载 .js」或「复制源码」，也可以直接从仓库复制对应文件，例如 [`button/button.js`](button/button.js)。把文件放入项目，通过普通 `<script>` 标签加载，即可使用组件元素：

```html
<script src="button.js"></script>
<sakuga-button>确认</sakuga-button>

<script src="toggle.js"></script>
<sakuga-toggle label="通知"></sakuga-toggle>

<script src="progress.js"></script>
<sakuga-progress label="正在上传"></sakuga-progress> <!-- 用 el.set(0.4) 更新进度 -->
```

上表链接的组件文档列出了属性、方法和事件。开关、滑块、复选框、单选框、输入框和星级评分都可在 `<form>` 中使用；设置 `name` 后，它们的值会随表单提交。

每个文件内嵌一份共享核心。页面加载多个组件时，后加载的组件会复用首个脚本创建的 `window.SakugaFX`，共用一张画布和一个动画循环。

独立使用组件时，将页面的 `<html lang>` 设置为 `zh-CN`、`en` 或 `ja`。特效触发时读取当前语言。未设置语言或当前语言缺少对应字形时，使用日文原版。素材生成、检查与矢量化步骤见[素材说明](art/words/README.md)。

## 致谢与许可

感谢 Justin Finkelman 创作原版 [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx)。原项目的拟声字和开关动画帧通过 Higgsfield 使用 GPT Image 生成。项目采用 MIT 许可证；重新分发组件时请附上 [LICENSE](LICENSE)。
