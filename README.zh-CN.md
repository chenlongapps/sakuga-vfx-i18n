<h1 align="center">Sakuga VFX</h1>

<p align="center"><em>普通控件，动画般的回应。</em></p>

<p align="center">
  <a href="https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN"><img src="https://img.shields.io/badge/Live%20Demo-%E5%9C%A8%E7%BA%BF%E4%BD%93%E9%AA%8C-ff5fa8?style=for-the-badge" alt="在线演示"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/GitHub%20Pages-Live-0b7fc7?logo=github" alt="GitHub Pages">
  <img src="https://img.shields.io/badge/License-MIT-1d1a4a" alt="MIT 许可证">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?logo=javascript&amp;logoColor=1d1a4a" alt="原生 JavaScript">
  <img src="https://img.shields.io/badge/Dependencies-None-2ea44f" alt="零依赖">
  <img src="https://img.shields.io/badge/Effects-Canvas%202D-8f8df7" alt="Canvas 2D 特效">
  <img src="https://img.shields.io/badge/i18n-EN%20%7C%20ZH%20%7C%20JA-ff5fa8" alt="三种语言">
</p>

<p align="center">
  <a href="README.md">English</a> · <strong>简体中文</strong> · <a href="README.ja.md">日本語</a>
</p>

## 项目介绍

Sakuga VFX 为日常网页控件加上动画般的反馈。控件静止时保持简洁；按压、拖动或切换时会变形、回弹，并带起烟雾、冲击波、碎晶、斩击、水花与烟圈。「轰！」「咔哒」「唰！」等漫画拟声字提供英文、简体和日文版本。

特效由 Canvas 2D 实时绘制；拟声字用 GPT Image 绘制、矢量化后内嵌在每个文件里。每个组件都是独立的 JavaScript 文件，无需依赖，也不需要构建步骤，采用 MIT 许可证。

本项目基于 Justin Finkelman 的 [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx)，为图库及组件的独立演示页提供英文、简体和日文版本。

## 在线演示

**[进入简体中文图库](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN)** · [English](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=en) · [日本語](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja)

`?lang=` 参数同时切换界面文案与画布拟声字。未指定语言时，依次采用已保存的选择、浏览器语言，最后回退英文；点击语言链接会记住选择，下次访问自动恢复。从「文档与演示」进入组件页面时，地址会保留当前语言。

## 组件动效展示

11 个组件共 12 个演示，包含按钮的两种样式。下面的 Animated WebP 动效均由运行中的真实组件录制，交互来自鼠标、键盘和触摸事件；点击动效图可直接打开对应的在线演示。

<table>
<tr>
<td width="50%" valign="top"><div align="center">
<b>主按钮</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=zh-CN"><img src="docs/webp/button.zh-CN.webp" width="420" alt="主按钮压扁与冲击特效"></a><br>
按下压扁，松手迸发冲击波与烟雾，随后出现闪光的对勾。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=zh-CN">在线演示</a> · <a href="button/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>次要按钮</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=zh-CN"><img src="docs/webp/button-secondary.zh-CN.webp" width="420" alt="次要按钮动效"></a><br>
更克制的变体：轻微压扁，角落飞出三道楔形。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/button/?lang=zh-CN">在线演示</a> · <a href="button/README.md">组件文档</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>开关</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toggle/?lang=zh-CN"><img src="docs/webp/toggle.zh-CN.webp" width="420" alt="开关注水与回弹动效"></a><br>
拨钮拉出拖尾并在两端溅起水花，液体随开启涌入、关闭回抽。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toggle/?lang=zh-CN">在线演示</a> · <a href="toggle/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>滑块</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/slider/?lang=zh-CN"><img src="docs/webp/slider.zh-CN.webp" width="420" alt="滑块拖动动效"></a><br>
滑块拉成长水滴状；快速拖动时，云雾在身后翻卷。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/slider/?lang=zh-CN">在线演示</a> · <a href="slider/README.md">组件文档</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>复选框</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/checkbox/?lang=zh-CN"><img src="docs/webp/checkbox.zh-CN.webp" width="420" alt="复选框勾选动效"></a><br>
两道弧光绕框挥出，碎晶飞散，对勾随之绘出。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/checkbox/?lang=zh-CN">在线演示</a> · <a href="checkbox/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>单选框</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/radio/?lang=zh-CN"><img src="docs/webp/radio.zh-CN.webp" width="420" alt="单选框动效"></a><br>
圆点弹入，伴随扇形楔形、烟雾与空心拟声字。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/radio/?lang=zh-CN">在线演示</a> · <a href="radio/README.md">组件文档</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>文本输入框</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/input/?lang=zh-CN"><img src="docs/webp/input.zh-CN.webp" width="420" alt="输入框打字扬尘动效"></a><br>
每次按键都会在光标处扬起一小团尘雾，输入框也会轻轻收缩。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/input/?lang=zh-CN">在线演示</a> · <a href="input/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>选项卡</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tabs/?lang=zh-CN"><img src="docs/webp/tabs.zh-CN.webp" width="420" alt="选项卡滑动动效"></a><br>
凸起的选中框拉伸滑行，落定时带起楔形与烟尘。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tabs/?lang=zh-CN">在线演示</a> · <a href="tabs/README.md">组件文档</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>进度条</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/progress/?lang=zh-CN"><img src="docs/webp/progress.zh-CN.webp" width="420" alt="进度条风暴云动效"></a><br>
风暴云随进度推进，石子被带起，完成时迸发冲击波与对勾。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/progress/?lang=zh-CN">在线演示</a> · <a href="progress/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>星级评分</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/rating/?lang=zh-CN"><img src="docs/webp/rating.zh-CN.webp" width="420" alt="星级评分动效"></a><br>
星星逐颗弹亮，点亮五星时还会触发冲击特效。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/rating/?lang=zh-CN">在线演示</a> · <a href="rating/README.md">组件文档</a>
</div></td>
</tr>
<tr>
<td width="50%" valign="top"><div align="center">
<b>轻提示</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toast/?lang=zh-CN"><img src="docs/webp/toast.zh-CN.webp" width="420" alt="轻提示飞入动效"></a><br>
通知拖着速度线飞入，在尘雾中落定，关闭时缩小消失。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/toast/?lang=zh-CN">在线演示</a> · <a href="toast/README.md">组件文档</a>
</div></td>
<td width="50%" valign="top"><div align="center">
<b>工具提示</b><br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tooltip/?lang=zh-CN"><img src="docs/webp/tooltip.zh-CN.webp" width="420" alt="工具提示气泡动效"></a><br>
提示像漫画对话气泡一样弹出，带起烟尘与圆环。<br>
<a href="https://chenlongapps.github.io/sakuga-vfx-i18n/tooltip/?lang=zh-CN">在线演示</a> · <a href="tooltip/README.md">组件文档</a>
</div></td>
</tr>
</table>

## 核心特性

- **弹簧驱动的运动。** 压扁、拉伸与回弹都按帧积分计算，不是预设的 CSS 关键帧。
- **手绘质感的物理特效。** 烟雾、冲击波、碎晶、楔形、斩击、水花与烟圈均由 Canvas 2D 绘制。
- **本地化拟声字。** 「轰！」「咔哒」「唰！」跟随 `<html lang>` 切换；缺少译版时回退到日文原版。
- **单文件、零配置。** 每个组件都只需一个 `<script>` 标签加载，无需安装依赖或执行构建。
- **真正的表单控件。** 支持焦点、键盘、触摸，并通过 `ElementInternals` 提供原生表单值。
- **可定制配色。** 在自己的 `:root` 中覆盖 `--sk-*` 变量（如 `--sk-acc`）即可；开启 `prefers-reduced-motion` 时会关闭画布特效，但保留状态变化。

## 快速开始

在本地启动仓库并访问图库，或直接把某个组件文件放进项目：

```sh
python3 -m http.server 8000
# 打开 http://localhost:8000/gallery/?lang=zh-CN
```

```html
<script src="button.js"></script>
<sakuga-button>确认</sakuga-button>

<script src="toggle.js"></script>
<sakuga-toggle label="通知"></sakuga-toggle>

<script src="progress.js"></script>
<sakuga-progress label="正在上传"></sakuga-progress>   <!-- 用 el.set(0.4) 更新进度 -->
```

## 安装与使用

无需安装包。在图库中选择「下载 .js」或「复制源码」，也可以直接从仓库复制文件，例如 [`button/button.js`](button/button.js)。用 `<script>` 标签加载后即可使用对应的自定义元素。

上表链接的组件文档列出了属性、方法和事件。开关、滑块、复选框、单选框、输入框和星级评分都可在 `<form>` 中使用；设置 `name` 后，值会随表单提交。

```js
const el = document.querySelector('sakuga-button');
el.addEventListener('click', async () => {
  await save();
  el.done();          // 对勾带着闪光落上去，1.8 秒后消失
});
el.done(0);           // 也可以让对勾保留到下次点击
el.impact();          // 不点击也播放一次反馈动效
```

每个文件都内嵌一份共享核心（弹簧、特效层和拟声字路径）。页面最先加载的脚本会设置 `window.SakugaFX`，后加载的组件复用同一张画布和动画循环。开关还会在自身内部的小画布上绘制外壳、拨钮和液体。

视觉风格：白色纸张质感，白／淡紫特效配紫色描线，粉色点缀，每次确认都有冲击帧。控件颜色来自 `--sk-*` 变量（`--sk-ink`、`--sk-card`、`--sk-pri`、`--sk-acc` 等），页面自己的 `:root { --sk-acc: ... }` 优先于默认值。

## 组件文档

| 组件 | 元素 | 动效 | 文档 |
|---|---|---|---|
| 按钮（主／次） | `<sakuga-button>` | 按下压扁，松手闪现冲击帧、烟雾和「轰！」。调用 `done()` 出现对勾；次要样式是轻微压扁与三道楔形。 | [README](button/README.md) |
| 开关 | `<sakuga-toggle>` | 拨钮拉出拖尾，在两端溅起水花并弹回，伴随本地化拟声字；开启时液体涌入，关闭时回抽。 | [README](toggle/README.md) |
| 滑块 | `<sakuga-slider>` | 滑块拉成长水滴并在弹簧上滞后；快速拖动带起云雾，松手甩出一道弧线。 | [README](slider/README.md) |
| 复选框 | `<sakuga-checkbox>` | 两道弧光绕框挥出，碎晶飞散，对勾绘出 dotted 拟声字。 | [README](checkbox/README.md) |
| 单选框 | `<sakuga-radio>` | 圆点弹入，伴随扇形楔形、两团烟雾与空心拟声字。 | [README](radio/README.md) |
| 文本输入框 | `<sakuga-input>` | 每次按键都会在光标处扬起尘雾。 | [README](input/README.md) |
| 选项卡 | `<sakuga-tabs>` | 凸起的选中框拉伸滑行，落定时带起楔形和烟尘。 | [README](tabs/README.md) |
| 进度条 | `<sakuga-progress>` | 风暴云随进度前进，石子被带起并出现拟声字；完成时触发冲击波与对勾。 | [README](progress/README.md) |
| 星级评分 | `<sakuga-rating>` | 星星逐颗弹亮，五星触发冲击特效。 | [README](rating/README.md) |
| 轻提示 | `<sakuga-toast>` | 通知带速度线飞入，在尘雾中落定，关闭时缩小消失。 | [README](toast/README.md) |
| 工具提示 | `<sakuga-tooltip>` | 提示像对话气泡一样弹出，带起烟尘与拟声字。 | [README](tooltip/README.md) |

## 国际化支持

图库和每个组件演示都支持 `?lang=en`、`?lang=zh-CN` 和 `?lang=ja`。语言切换同时作用于界面文案和画布拟声字，选择会被记住，便于下次访问。独立使用组件时，把页面的 `<html lang>` 设为 `en`、`zh-CN` 或 `ja`；特效触发时会读取当前语言。若未设置语言或该特效缺少译版，则使用日文原版。

由于拟声字本身会随语言变化，展示区为每种语言分别录制了 Animated WebP；组件行为和节奏完全一致。字形素材位于 [`art/words/<lang>/`](art/words/)，构建脚本会把矢量化路径嵌入每个组件文件。

## 本地开发

```sh
python3 -m http.server 8000                            # 在仓库根目录启动
node tools/build.mjs                                   # 把 core.js 写入每个组件
node tools/build.mjs --check                           # 检查各副本是否最新
node tools/test.mjs http://localhost:8000/gallery/     # 在无头 Chrome 中驱动全部控件
node tools/shot.mjs URL OUT W H SCALE                  # 整页截图
```

`core.js` 是共享核心的源文件。修改后运行 `node tools/build.mjs`，脚本会把它复制到每个组件文件的 `// >>> sakuga core` 标记之间以及技能目录中。`tools/test.mjs` 会在手机宽度下用真实触摸和按键事件驱动每个控件，检查表单值、横向滚动以及语言检测／切换／记忆，失败时退出码为 1。`tools/shot.mjs` 用于整页截图。两者都需要 Chrome 或 Chromium（路径特殊时设置 `CHROME=...`）。素材生成与矢量化步骤见[素材说明](art/words/README.md)。

重新生成展示区动效（需要 Node 22+、ffmpeg，以及 libwebp 的 `img2webp` 或 Python Pillow）：

```sh
node tools/record-webp.mjs                                      # 全部 12 个演示 × 3 种语言
node tools/record-webp.mjs --only toggle,slider --lang ja        # 指定组件／语言
node tools/record-webp.mjs --fps 30 --duration 5 --image-width 480 # 自定义参数
node tools/record-webp.mjs --base-url http://localhost:8000      # 连接已有服务
```

录制脚本会提供真实组件文件、用真实鼠标／键盘事件播放交互、按固定帧率推进共享核心，并输出 `docs/webp/<demo>.<lang>.webp` 与 `manifest.json`。`--crop auto` 可自动裁剪组件区域，`--keep-frames` 保留源 PNG 便于重新编码。

## 已知限制

- **已在无头 Chromium 中验证，**使用真实触摸和按键事件及逐帧截图；尚未在 Safari、Firefox、真机或屏幕阅读器中测试。
- **特效画布位于最顶层，且忽略指针事件。** 特效可能覆盖弹窗或吸顶导航。
- **控件背后的特效绘制在控件内部**（按钮、进度条的冲击波和五星爆发），会被 `overflow: hidden` 的父元素裁掉。
- **减少动态效果**会关闭所有特效，但弹簧运动与状态变化仍然保留。

## 致谢与许可

基于 Justin Finkelman 的 [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx)，采用 MIT 许可证；重新分发组件文件时请附上 [LICENSE](LICENSE)。原项目的日文拟声字与开关动画帧通过 Higgsfield 使用 GPT Image 生成。
