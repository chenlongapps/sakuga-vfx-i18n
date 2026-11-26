# Trace the lettering sprites in art/words/<lang>/ into SVG paths and write them into core.js between the WORDS markers.
# The sprites are solid shapes on transparency, so tracing them loses nothing and the components carry no image files.
#
#   uv run --with potracer --with pillow --with numpy python tools/trace.py
import json, re, sys
from pathlib import Path
import numpy as np, potrace
from PIL import Image

def trace(file):
    with Image.open(file) as sprite:
        w, h = sprite.size
        alpha = np.array(sprite.convert('RGBA').getchannel('A'))
    m = alpha <= 128                        # potracer traces the False pixels
    path = potrace.Bitmap(m).trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=0.5)
    n = lambda v: str(int(round(v)))
    p = lambda q: n(q.x) + ' ' + n(q.y)
    d = []
    for c in path:
        d.append('M' + p(c.start_point))
        for s in c.segments:
            d.append(('L' + p(s.c) + 'L' + p(s.end_point)) if s.is_corner else ('C' + p(s.c1) + ' ' + p(s.c2) + ' ' + p(s.end_point)))
        d.append('Z')
    return [w, h, re.sub(r' -', '-', ''.join(d))]


root = Path(__file__).resolve().parent.parent
words = {}
for folder in sorted((root / 'art/words').glob('*/')):
    for file in sorted(folder.glob('*.webp')):
        w, h, path = trace(file)
        words.setdefault(folder.name, {})[file.stem] = [w, h, path]
        print(f'{folder.name}/{file.stem}', w, h, len(path), file=sys.stderr)
if 'ja' not in words:
    sys.exit('no Japanese fallback sprites in art/words/ja/')

core = root / 'core.js'
src = core.read_text()
locales = []
for lang, entries in words.items():
    rows = [f'    {json.dumps(name)}: {json.dumps(data, separators=(",", ":"))}' for name, data in entries.items()]
    locales.append(f'  {json.dumps(lang)}: {{\n' + ',\n'.join(rows) + '\n  }')
block = 'const WORDS = {\n' + ',\n'.join(locales) + '\n};'
src, k = re.subn(r'(// >>> words.*?\n).*?(\n\s*// <<< words)', lambda m: m.group(1) + block + m.group(2), src, flags=re.S)
if not k: sys.exit('no WORDS markers in core.js')
core.write_text(src)
