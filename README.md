# Sakuga VFX — Multilingual Demos

English · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

Ordinary UI controls that react like anime. At rest they are plain. Use one and it squashes and overshoots on springs, surrounded by smoke puffs, impact bursts, crystal chips, slashes, splashes and smoke rings. Manga sound-effect lettering such as `BOOM!`, `CLICK!`, and `SKRR!` is available in English, Simplified Chinese, and Japanese.

Every effect is drawn in code on one canvas over the page. The lettering was painted with GPT Image and traced to paths, and the toggle is 43 painted frames; both live inside the component files, so there is nothing else to fetch. No dependencies, no build step for you, MIT licensed.

This fork of Justin Finkelman's [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) provides the gallery and standalone demos in English, Simplified Chinese, and Japanese.

## Components

The gallery has 12 demos of 11 components, including two button variants.

| Component | Element | What happens |
|---|---|---|
| [Button](button/README.md) | `<sakuga-button>` | Press and it squashes flat. Let go and it inverts for one frame, a burst goes off behind it, clouds roll off the corners and `BOOM!` lands. `done()` puts a check on it. The secondary variant is a small squash and three wedges. |
| [Toggle](toggle/README.md) | `<sakuga-toggle>` | A drawn animation: the knob smears across, slams into the end and throws up a splash, and the track floods and settles. |
| [Slider](slider/README.md) | `<sakuga-slider>` | The thumb stretches into a teardrop and lags on a spring. Drag fast and cumulus rolls up behind it; let go and a crescent flies on ahead. |
| [Checkbox](checkbox/README.md) | `<sakuga-checkbox>` | Two crescents swing round the box, crystals fly, the tick draws itself, `SKRR!` in dotted letters. |
| [Radio](radio/README.md) | `<sakuga-radio>` | The dot springs in with a fan of wedges, two puffs and a hollow `POP!`. |
| [Input](input/README.md) | `<sakuga-input>` | Every key kicks up dust where the caret is. |
| [Tabs](tabs/README.md) | `<sakuga-tabs>` | The raised tab slides, stretching, and lands with wedges and a puff. |
| [Progress](progress/README.md) | `<sakuga-progress>` | A storm cloud rides the leading edge, pebbles lift off the ground and `RUMBLE` appears. It ends with a burst, `BOOM!` and a check. |
| [Rating](rating/README.md) | `<sakuga-rating>` | Stars pop in one after another; five gets a burst. |
| [Toast](toast/README.md) | `<sakuga-toast>` | Streaks in as a smear, lands in dust with `SKRR!`, leaves by shrinking. |
| [Tooltip](tooltip/README.md) | `<sakuga-tooltip>` | The hint springs out like a speech bubble with puffs and `CLICK!`. |

## The look

White paper, two-tone effects (white, lavender and a violet line), pink accents, and an impact burst on every confirm. The controls' colours are `--sk-*` CSS variables (`--sk-ink`, `--sk-card`, `--sk-pri`, `--sk-acc` and so on), and a page's own `:root { --sk-acc: ... }` wins over the defaults.

## Demos

Open the GitHub Pages gallery in **[English](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=en)**, [Simplified Chinese](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=zh-CN), or [Japanese](https://chenlongapps.github.io/sakuga-vfx-i18n/gallery/?lang=ja). The language switch sets the language for the interface and sound-effect lettering. Each **Docs and demo** link keeps the selected language in its URL.

To try the gallery locally, run this from the repository root:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000/gallery/](http://localhost:8000/gallery/).

## Use one

Each component is a single JavaScript file. In the gallery, choose **Download .js** or **Copy source**. You can also copy the file from its folder in this repository, for example [`button/button.js`](button/button.js). Put it in your project, load it with a plain script tag, and use its element:

```html
<script src="button.js"></script>
<sakuga-button>Confirm</sakuga-button>

<script src="toggle.js"></script>
<sakuga-toggle label="Notifications"></sakuga-toggle>

<script src="progress.js"></script>
<sakuga-progress label="Uploading"></sakuga-progress>   <!-- then el.set(0.4) -->
```

Each folder's README lists the attributes, properties and events. The value controls (toggle, slider, checkbox, radio, input, rating) work inside a `<form>` like the native ones.

For standalone use, set the page’s `<html lang>` to `en`, `zh-CN`, or `ja`. Each effect reads the language when triggered. If the language is unset or its lettering is unavailable for that effect, the original Japanese lettering is used.

**How the files share.** Each file carries its own copy of the core, including the springs, effects layer, and all lettering paths. The first one loaded sets `window.SakugaFX` and the others reuse it, so any mix of them on a page shares one canvas and one animation loop. The toggle also embeds its animation frames.

## Working on this repo

- `core.js` is the source of the shared core. After editing it, run `node tools/build.mjs`, which copies it into every component file (between the `// >>> sakuga core` markers) and into the skill. `node tools/build.mjs --check` exits 1 if any file is out of date.
- `art/words/<lang>/` contains the lettering sprites used at build time. See the [asset generation and tracing guide](art/words/README.md).
- `toggle/frames.webp` is the toggle's sprite sheet (43 frames, 8 across, 300 by 325 each). The build writes it into `toggle.js`.
- `node tools/test.mjs http://localhost:8000/gallery/` drives every control with real touch and key events at phone width, checks form values and sideways scroll, and exits 1 on a failure. `node tools/shot.mjs URL OUT W H SCALE` takes a full-page screenshot. Both need Chrome or Chromium (`CHROME=...` if it is somewhere unusual).

## Limits

- **Checked in headless Chromium,** with real touch and key events and frame-by-frame sheets. Not yet tried in Safari or Firefox, on a real phone, or with a screen reader.
- **The effects canvas sits on top of everything,** at the highest z-index, and ignores the pointer. Effects can fly over a modal or a sticky header.
- **Effects behind a control are drawn inside it** (the button's and the progress bar's bursts, the five-star burst) and are cut off by a parent with `overflow: hidden`.
- **Reduced motion** turns every effect off; the springs and the state changes stay.

## License

Based on [Sakuga VFX](https://github.com/finktheartist/sakuga-vfx) by Justin Finkelman. The project is MIT licensed. Include [LICENSE](LICENSE) with any component files you redistribute. The original Japanese lettering and toggle frames were generated with GPT Image through Higgsfield for the upstream project.
