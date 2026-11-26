# Manga sound-effect lettering

Each WebP lives at `art/words/<lang>/<id>.webp`. The six files in `ja/` are the original Japanese sprites and serve as both the style references and the runtime fallback.

| Asset ID | Simplified Chinese (`zh-CN`) | English (`en`) | Direction for GPT Image |
| --- | --- | --- | --- |
| `don` | 轰！ | BOOM! | Heavy, torn impact strokes rising to the right. Draw `轰` with `车` above the two `又` components. |
| `gogo` | 隆隆隆 | RUMBLE | Sharp strokes that grow in a stepped diagonal from left to right. |
| `kachi` | 咔哒 | CLICK! | Compact, angular strokes with sharply cut ends. Draw `咔` as `口` + `卡` and `哒` as `口` + `达`. |
| `pon` | 嘭！ | POP! | Thick, soft strokes with rounded terminals and a bouncy baseline. Draw `嘭` with `口` and `彭`. |
| `shu` | 咻！ | WHOOSH! | Long, tapering dry-brush strokes sweep upward to the right. Draw `咻` with `口` and `休`. |
| `zuza` | 唰！ | SKRR! | Blade-like strokes with straight cuts, pointed ends, and a forward lean. Draw `唰` with `口` and `刷`. |

Generate each replacement separately with GPT Image. Attach `ja/<id>.webp` as the style and composition reference, supply the exact lettering from the table, and use the direction for that asset. Match the original tilt, aspect ratio, visual weight, and hand-drawn edges. Request solid pure black ink on a truly transparent background. Canvas adds outlines and screentones, so the source image should contain only the requested glyphs. Leave enough space to keep every glyph and punctuation mark fully visible.

Inspect each image composited over white for spelling, silhouettes, and unwanted marks. Check the alpha channel separately for transparent background and solid filled strokes. Trim excess transparent margins, preserve the glyph proportions, and export a lossless WebP. Check the traced shapes in the actual effects at mobile width, where small strokes or punctuation can disappear.

From the repository root, run the tracer and stamp the generated paths into every standalone script and the skill.

```sh
uv run --with potracer --with pillow --with numpy python tools/trace.py
node tools/build.mjs
node tools/build.mjs --check
```

Potrace uses the alpha channel to generate SVG paths embedded in `core.js`. Canvas draws those paths at runtime.
