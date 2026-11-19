"""Turn a generated picture into an engine-ready three-ink silhouette.

The film loads assets/character/<key>.png and splits each one into three ink plates at load time
(src/engine/art.js -> art.inks()). It expects the art to be flat, in the film's three inks, on a
transparent ground; anything else (gradients, background, white hair) reads as mush.

This script does that normalisation and then prints a check sheet so the result can be judged:
on a dark ground (the interface), on cream paper (the proof sheets) and at 20 % scale.

    <bundled python> tools/prep_silhouette.py assets/source/xxx.png --key f_bust
    ... --dry      only write the check sheet, do not touch assets/character/

Rules it enforces
  * background removed: uses the alpha channel if there is one, else floods the border colour away
  * every pixel snapped to one of three inks (near-black / me / cream); no gradients survive
  * alpha below 16 cleared (otherwise keylines and glow pick up dirty pixels)
  * trimmed, then scaled to a fixed height and centred on a transparent canvas of the same aspect
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INK_BLACK = np.array([29, 27, 25], dtype=np.float32)     # near-black plate
INK_ME = np.array([217, 119, 87], dtype=np.float32)      # "her" plate
INK_CREAM = np.array([250, 249, 245], dtype=np.float32)  # "you" plate
INK_NAMES = ['black', 'me', 'cream']
TARGET_HEIGHT = 1449      # the height of the original f_bust, the registration base


def load_with_alpha(path, forced_bg=None):
    im = Image.open(path)
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA')
    a = np.asarray(im).astype(np.float32)
    if has_alpha and a[..., 3].min() < 250:
        return a[..., :3], a[..., 3] / 255.0
    # no usable alpha: remove the background that is CONNECTED to the border, so that black
    # shadows *inside* the figure survive (a global colour mask would eat them)
    rgb = a[..., :3]
    border = np.concatenate([rgb[0, :], rgb[-1, :], rgb[:, 0], rgb[:, -1]], axis=0)
    bg = np.array(forced_bg, dtype=np.float32) if forced_bg is not None else np.median(border, axis=0)
    same = np.linalg.norm(rgb - bg, axis=2) <= 24
    seed = np.zeros(same.shape, dtype=bool)
    seed[0, :] = seed[-1, :] = True
    seed[:, 0] = seed[:, -1] = True
    seed &= same
    for _ in range(4000):
        grown = seed.copy()
        grown[1:, :] |= seed[:-1, :]
        grown[:-1, :] |= seed[1:, :]
        grown[:, 1:] |= seed[:, :-1]
        grown[:, :-1] |= seed[:, 1:]
        grown &= same
        if grown.sum() == seed.sum():
            break
        seed = grown
    mask = (~seed).astype(np.float32)
    return rgb, mask


def snap_to_inks(rgb, remap=None, cream_sat=40):
    """Nearest ink in RGB, with luminance deciding first so white stay cream and shadows go black."""
    lum = (0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]) / 255.0
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    out = np.zeros_like(rgb)
    black = lum < 0.34
    cream = (lum > 0.74) & (sat < cream_sat)
    me = ~(black | cream)
    table = {'black': INK_BLACK, 'me': INK_ME, 'cream': INK_CREAM}
    if remap:
        for src, dst in remap.items():
            table[src] = {'black': INK_BLACK, 'me': INK_ME, 'cream': INK_CREAM}[dst]
    out[black] = table['black']
    out[me] = table['me']
    out[cream] = table['cream']
    return out


def parse_bg(s):
    if not s:
        return None
    s = s.strip().lstrip('#')
    return [int(s[i:i+2], 16) for i in (0, 2, 4)]


def trim(rgb, alpha):
    ys, xs = np.nonzero(alpha > 0.02)
    if len(ys) == 0:
        raise SystemExit('nothing left after background removal')
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    return rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1]


def to_image(rgb, alpha):
    out = np.zeros((rgb.shape[0], rgb.shape[1], 4), dtype=np.uint8)
    out[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    hard = (alpha > 16 / 255.0)
    out[..., 3] = np.where(hard, 255, 0).astype(np.uint8)
    out[~hard, :3] = 0
    return Image.fromarray(out, 'RGBA')


def check_sheet(im, key, out_path, panel=480):
    h = panel
    w = max(1, round(im.width * h / im.height))
    fig = im.resize((w, h), Image.LANCZOS)
    sheet = Image.new('RGB', (panel * 3 + 24, h + 28), (48, 46, 44))
    grounds = [(38, 36, 35), (245, 243, 236), (38, 36, 35)]
    labels = ['on dark ground', 'on cream paper', 'thumb 20%']
    from PIL import ImageDraw
    d = ImageDraw.Draw(sheet)
    for i, (bg, label) in enumerate(zip(grounds, labels)):
        x = i * (panel + 12)
        ImageDraw.Draw(sheet).rectangle([x, 0, x + panel - 1, h + 27], fill=bg)
        if i < 2:
            sheet.paste(fig, (x + (panel - w) // 2, 14), fig)
        else:
            small = fig.resize((max(1, w // 5), h // 5), Image.LANCZOS)
            sheet.paste(small, (x + (panel - small.width) // 2, 14 + (h - small.height) // 2), small)
        d.text((x + 8, h + 8), label, fill=(150, 148, 140) if bg[0] < 128 else (60, 58, 54))
    sheet.save(out_path)
    return out_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src')
    ap.add_argument('--key', default=None, help='asset name, e.g. f_bust (default: file stem)')
    ap.add_argument('--height', type=int, default=TARGET_HEIGHT)
    ap.add_argument('--dry', action='store_true')
    ap.add_argument('--remap', default=None,
                    help='swap ink roles after snapping, e.g. "cream=me" (white body printed in her ink)')
    ap.add_argument('--cream-sat', type=float, default=40.0,
                    help='saturation tolerance for the cream ink (raise it when a pale tinted highlight must not fall into me)')
    ap.add_argument('--bg', default=None,
                    help='background colour to remove, e.g. "#ff00ff" (default: sampled from the border)')
    a = ap.parse_args()

    remap = None
    if a.remap:
        remap = {}
        for pair in a.remap.split(','):
            k, _, v = pair.partition('=')
            remap[k.strip()] = v.strip()

    src = Path(a.src)
    key = a.key or src.stem
    rgb, alpha = load_with_alpha(src, parse_bg(a.bg))
    rgb = snap_to_inks(rgb, remap, a.cream_sat)
    rgb, alpha = trim(rgb, alpha)

    im = to_image(rgb, alpha)
    scale = a.height / im.height
    im = im.resize((max(1, round(im.width * scale)), a.height), Image.LANCZOS)

    out_dir = ROOT / 'out/mine'
    out_dir.mkdir(parents=True, exist_ok=True)
    sheet = check_sheet(im, key, out_dir / f'art_check_{key}.png')
    print(f'[art] {key}: {im.width}x{im.height}  check sheet -> {sheet.relative_to(ROOT)}')

    if a.dry:
        print('[art] --dry: assets/character untouched')
        return
    dst = ROOT / 'assets/character' / f'{key}.png'
    im.save(dst)
    print(f'[art] wrote {dst.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
