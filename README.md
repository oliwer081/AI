# 🧩 KUBGUIDE — Rubik's Cube Lösningsguide

Interaktiv webbplats för att lära sig lösa Rubik's Cube — 2×2 och 3×3. Ren HTML/CSS/JS, inga beroenden.

## Funktioner

- **Roterbar 3D-kub** — Canvas-baserad renderer, drag för att rotera. Korrekt 4 rutor per sida på 2×2, 9 på 3×3.
- **3×3 Nybörjare** — 7 steg lager-för-lager med alla algoritmer och face-diagram
- **3×3 CFOP** — F2L, OLL (flikar: vanligaste / linje / hörn), PLL (flikar: kant / hörn / mix)
- **2×2 Nybörjare** — 4 steg med Sune-algoritmen
- **2×2 OLL** — Alla 7 fall med 2×2-diagram (4 rutor per sida)
- **2×2 PBL** — Alla 5 fall med headlights-förklaring och flödesschema
- **Notationsreferens** — Komplett: basdrag, prime, 2, wide, M/S/E, rotationer, färger, exempel

## Struktur

```
rubiks-cube-solver/
├── index.html
├── css/style.css
├── js/
│   ├── cube3d.js     ← 3D-renderer (fixad 2×2)
│   └── main.js
└── pages/
    ├── 3x3.html
    ├── 2x2.html
    └── notation.html
```

## GitHub Pages

1. Ladda upp hela mappen till ett GitHub-repo
2. Settings → Pages → Branch: main → / (root) → Save
3. Live på `https://DITTNAMN.github.io/REPONAMN`

## Lokalt

```bash
git clone https://github.com/DITTNAMN/rubiks-cube-solver.git
cd rubiks-cube-solver
open index.html   # Öppna direkt — inga beroenden
```

## Teknologi

- Ren HTML5 / CSS3 / JavaScript — inga frameworks
- Canvas 2D API — egenutvecklad isometrisk 3D-renderer
- Google Fonts — Instrument Serif + IBM Plex Mono + Outfit
- MIT-licens
