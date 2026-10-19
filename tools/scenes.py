# Generates the Himalaya-over-Kathmandu scenes used by index.html, by night and by day:
#   profile-banner-{night,day}.svg  the About card banner (1200x220, with a terminal line)
#   bg-{night,day}.svg              the full-page background (1600x1000, softer colours)
# Day and night share the same mountains because every random draw happens before the mode is applied.
# Run: python3 tools/scenes.py assets
import random, sys

BANNER = dict(W=1200, H=220, k=1.0, seed=7)
PAGE = dict(W=1600, H=1000, k=1.9, seed=11)

# Peaks in banner coordinates: (x, height, half-width); bases are pixels above the bottom edge.
FAR = (48, [(150, 62, 120), (330, 48, 90), (470, 78, 130), (640, 92, 150), (820, 58, 110), (1000, 74, 130), (1150, 50, 90)], 4, 10)
MID = (30, [(60, 34, 140), (300, 40, 160), (720, 44, 180), (1040, 36, 150)], 3, 16)
NEAR = (14, [(250, 16, 200), (620, 20, 240), (960, 14, 180)], 2, 24)

PALETTE = {
    ("banner", "night"): dict(sky=("#070b1a", "#16204a", "#3d2f6b"), far=("#3a4785", "#232c5c"), mid="#18204a", near="#0c1230", snow=("#e0e7ff", .55, 1.5), text=("#c7d2fe", .55)),
    ("banner", "day"):   dict(sky=("#3b82c4", "#8ec5ec", "#e6f3fb"), far=("#c9d6ea", "#7690b5"), mid="#6a86ad", near=("#5f9a6b", "#3f7550"), snow=("#ffffff", .95, 3), text=("#1e3a5f", .45)),
    # page colours stay close to the theme background so chat text keeps its contrast
    ("page", "night"):   dict(sky=("#0a0d18", "#0f1428", "#181a33"), far=("#1d2445", "#151a33"), mid="#121731", near="#0d1122", snow=("#c7d2fe", .22, 2), text=None),
    ("page", "day"):     dict(sky=("#cfe3f7", "#e9f2fb", "#f6f8fa"), far=("#dbe4f0", "#c3d0e2"), mid="#c9d6e6", near=("#cfe0d2", "#bcd3c1"), snow=("#ffffff", .9, 3), text=None),
}


def scene(kind, mode):
    cfg = BANNER if kind == "banner" else PAGE
    W, H, k = cfg["W"], cfg["H"], cfg["k"]
    sx = W / 1200
    random.seed(cfg["seed"])
    pal = PALETTE[(kind, mode)]

    def ridge(spec):
        base_up, peaks, jitter, step = spec
        base = H - base_up * k
        pts = []
        for x in range(-20, W + 40, round(step * sx)):
            y = base
            for px, ph, pw in peaks:
                t = max(0.0, 1 - abs(x - px * sx) / (pw * sx))  # sharp, tent-shaped peak
                y -= ph * k * t ** 1.6
            y += random.uniform(-jitter, jitter) * k
            pts.append((x, round(y, 1)))
        return pts, base

    def fill(pts):
        return "M" + " L".join(f"{x},{y}" for x, y in pts) + f" L{W + 40},{H} L-20,{H} Z"

    far, far_base = ridge(FAR)
    mid, _ = ridge(MID)
    near, _ = ridge(NEAR)

    # snow caps: runs of high far-ridge points, so separate peaks are not joined across a valley
    runs, run = [], []
    for p in far:
        if p[1] < far_base - 60 * k: run.append(p)
        elif run: runs.append(run); run = []
    if run: runs.append(run)
    snow = " ".join("M" + " L".join(f"{x},{y}" for x, y in r) for r in runs if len(r) > 1)

    sky_h = H - 100 * k  # stars stay above the mountains
    stars = []
    for i in range(70 if kind == "banner" else 170):
        x, y = random.uniform(0, W), random.uniform(0, sky_h)
        r = random.choice([0.6, 0.8, 0.8, 1.0, 1.3])
        o = round(random.uniform(0.35, 0.95) * (1 if kind == "banner" else .75), 2)
        tw = ' class="tw"' if i % 9 == 0 else ""
        d = f' style="animation-delay:{round(random.uniform(0, 4), 1)}s"' if tw else ""
        stars.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" opacity="{o}"{tw}{d}/>')

    lights = []
    for i in range(55 if kind == "banner" else 120):
        x = random.gauss(W / 2, W / 5)
        if not 0 < x < W: continue
        y = random.uniform(H - 16 * k, H - 4 * k)
        lights.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{random.choice([0.8, 1, 1.2])}" opacity="{round(random.uniform(.4, .9) * (1 if kind == "banner" else .6), 2)}"/>')

    cx, cy, cr = (1010, 52, 1) if kind == "banner" else (W * .8, H * .14, 1.5)  # moon / sun
    text = ""
    if pal["text"]:
        text = (f'<text x="{W / 2}" y="44" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="15" '
                f'fill="{pal["text"][0]}" opacity="{pal["text"][1]}">~/kathmandu $ php artisan serve --env=production</text>')

    def grad(id, stops):
        s = "".join(f'<stop offset="{i / (len(stops) - 1):.2f}" stop-color="{c}"/>' for i, c in enumerate(stops))
        return f'<linearGradient id="{id}" x1="0" y1="0" x2="0" y2="1">{s}</linearGradient>'

    near_fill = "url(#nearG)" if isinstance(pal["near"], tuple) else pal["near"]
    defs = grad("sky", pal["sky"]) + grad("farG", pal["far"]) + (grad("nearG", pal["near"]) if near_fill.startswith("url") else "")
    snow_path = f'<path d="{snow}" fill="none" stroke="{pal["snow"][0]}" stroke-opacity="{pal["snow"][1]}" stroke-width="{pal["snow"][2]}" stroke-linejoin="round"/>'
    land = (f'<path d="{fill(far)}" fill="url(#farG)"/>{snow_path}'
            f'<path d="{fill(mid)}" fill="{pal["mid"]}"/><path d="{fill(near)}" fill="{near_fill}"/>')
    head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice">\n'
            '  <!-- Generated by tools/scenes.py; edit that script, not this file. -->\n')

    if mode == "night":
        glow = .45 if kind == "banner" else .18
        return head + f'''  <style>
    .tw {{ animation: tw 4s ease-in-out infinite; }}
    .shoot {{ animation: shoot 9s ease-in 2s infinite; opacity: 0; }}
    @keyframes tw {{ 50% {{ opacity: .15; }} }}
    @keyframes shoot {{ 0% {{ opacity: 0; transform: translate(0,0); }} 3% {{ opacity: 1; }} 10%, 100% {{ opacity: 0; transform: translate(-260px,110px); }} }}
    @media (prefers-reduced-motion: reduce) {{ .tw, .shoot {{ animation: none; }} }}
  </style>
  <defs>
    <filter id="blur" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="{18 * k}"/></filter>
    {defs}
    <radialGradient id="glow" cx=".5" cy="1" r=".6"><stop offset="0" stop-color="#f59e0b" stop-opacity="{glow}"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>
    <radialGradient id="moonGlow"><stop offset="0" stop-color="#fef3c7" stop-opacity=".35"/><stop offset="1" stop-color="#fef3c7" stop-opacity="0"/></radialGradient>
    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#sky)"/>
  <g filter="url(#blur)" opacity="{.55 if kind == "banner" else .3}">
    <ellipse cx="{420 * sx}" cy="{70 * k}" rx="{380 * sx}" ry="{26 * k}" fill="#7c3aed" transform="rotate(-12 {420 * sx} {70 * k})" opacity=".5"/>
    <ellipse cx="{520 * sx}" cy="{60 * k}" rx="{260 * sx}" ry="{14 * k}" fill="#22d3ee" transform="rotate(-12 {520 * sx} {60 * k})" opacity=".35"/>
  </g>
  <g fill="#fff">{"".join(stars)}</g>
  <circle cx="{cx}" cy="{cy}" r="{46 * cr}" fill="url(#moonGlow)"/>
  <mask id="crescent"><circle cx="{cx}" cy="{cy}" r="{15 * cr}" fill="#fff"/><circle cx="{cx + 7 * cr}" cy="{cy - 5 * cr}" r="{13.5 * cr}" fill="#000"/></mask>
  <circle cx="{cx}" cy="{cy}" r="{15 * cr}" fill="#fef3c7" mask="url(#crescent)"/>
  <g class="shoot"><line x1="{cx - 130}" y1="{cy - 30}" x2="{cx - 70}" y2="{cy - 52}" stroke="url(#streak)" stroke-width="1.4" transform="rotate(180 {cx - 100} {cy - 41})"/></g>
  {text}
  <ellipse cx="{W / 2}" cy="{H}" rx="{700 * sx}" ry="{90 * k}" fill="url(#glow)"/>
  {land}
  <g fill="#fcd34d">{"".join(lights)}</g>
</svg>
'''

    cloud = lambda x, y, s: (f'<g transform="translate({x * sx:.0f} {y * k:.0f}) scale({s * k:.2f})"><ellipse cx="0" cy="0" rx="46" ry="12"/>'
                             '<ellipse cx="-16" cy="-8" rx="22" ry="12"/><ellipse cx="14" cy="-11" rx="26" ry="15"/></g>')
    bird = lambda x, y, s: f'<path transform="translate({x * sx:.0f} {y * k:.0f}) scale({s * k:.2f})" d="M0,0 q5,-5 10,0 q5,-5 10,0"/>'
    # birds only in the banner; on the page they would sit behind the chat text
    birds = ('<g class="fly" fill="none" stroke="#1e3a5f" stroke-width="1.6" stroke-linecap="round" opacity=".6">'
             + bird(300, 92, .8) + bird(324, 82, .6) + bird(342, 96, .5) + "</g>") if kind == "banner" else ""
    return head + f'''  <style>
    .drift {{ animation: drift 40s ease-in-out infinite alternate; }}
    .drift.slow {{ animation-duration: 60s; }}
    .fly {{ animation: fly 6s ease-in-out infinite alternate; }}
    @keyframes drift {{ to {{ transform: translateX({60 * k:.0f}px); }} }}
    @keyframes fly {{ to {{ transform: translate(14px, -5px); }} }}
    @media (prefers-reduced-motion: reduce) {{ .drift, .fly {{ animation: none; }} }}
  </style>
  <defs>
    <filter id="soft"><feGaussianBlur stdDeviation="{3 * k}"/></filter>
    {defs}
    <radialGradient id="sunGlow"><stop offset="0" stop-color="#fff7d6" stop-opacity=".9"/><stop offset=".35" stop-color="#fde68a" stop-opacity="{.45 if kind == "banner" else .3}"/><stop offset="1" stop-color="#fde68a" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#sky)"/>
  <circle cx="{cx}" cy="{cy}" r="{70 * cr}" fill="url(#sunGlow)"/>
  <circle cx="{cx}" cy="{cy}" r="{17 * cr}" fill="#fffbeb"/>
  <g fill="#fff" filter="url(#soft)">
    <g class="drift" opacity=".9">{cloud(180, 52, 1)}{cloud(760, 80, .8)}</g>
    <g class="drift slow" opacity=".75">{cloud(470, 34, .7)}{cloud(1120, 96, .6)}</g>
  </g>
  {birds}
  {text}
  {land}
</svg>
'''


if __name__ == "__main__":
    out = sys.argv[1]
    for kind, name in (("banner", "profile-banner"), ("page", "bg")):
        for mode in ("night", "day"):
            svg = scene(kind, mode)
            path = f"{out}/{name}-{mode}.svg"
            open(path, "w").write(svg)
            print(path, len(svg), "bytes")
