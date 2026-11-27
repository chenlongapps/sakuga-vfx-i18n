# Toggle

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

The switch squashes under a press, then the knob stretches and leaves an inked trail. On opening, a curled sheet of water rises behind the knob and throws off rounded drops. The crest folds back into the track as it fills. On closing, the liquid recedes and the opposite end throws a lower wave with sharper, sideways fragments. Both impacts show a localized `kachi` and end with a glint.

## Run it

```sh
python3 -m http.server 8000     # from the repo folder
# open http://localhost:8000/toggle/
```

## Use it

```html
<script src="toggle.js"></script>
<sakuga-toggle label="Notifications"></sakuga-toggle>
<sakuga-toggle label="Dark mode" checked name="dark"></sakuga-toggle>
```

```js
el.addEventListener('change', () => console.log(el.checked));
el.checked = true;    // from code: jumps to the end, no animation
el.flip();            // from code, with the animation
```

| attribute | what it sets | default |
|---|---|---|
| `label` | what a screen reader calls it | Toggle |
| `checked` | on | off |
| `name`, `value` | sent with its form when on, like a checkbox | value `on` |
| `disabled` | can't be flipped | off |

- The shadow button has `role="switch"`. Space and Enter flip it, and `aria-checked` reflects the current value.
- The hit area is 108 × 54 CSS pixels, centred in a 108 × 182 host so the switch lines up with other controls. About 64 pixels above and below (plus 21 on each side) are left for the effects.
- A user activation or `flip()` animates the switch and dispatches a bubbling `change` event. Setting `checked` renders the requested state immediately.
- A form reset restores the switch's initial checked state. A disabled switch or fieldset blocks activation and form submission for the control.

## Rendering and theming

- Canvas 2D paths draw the housing, dial, smear, and liquid. Springs use elapsed time from the common `requestAnimationFrame` clock, so quick flips preserve the current position and momentum.
- Set `<html lang>` to `en`, `zh-CN`, or `ja` to choose the impact lettering.
- Theme the drawing with `--sk-ink` for outlines, `--sk-card` and `--sk-soft` for the dial, `--sk-track` for the empty track, `--sk-pri` for the liquid, and `--sk-acc` for the impact lettering and focus ring. Shared particles use the project's effects palette.
- With reduced motion enabled, the switch updates immediately and skips the effects.
- The standalone script is about 100 KiB, including the shared core and lettering.
