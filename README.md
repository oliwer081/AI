# 🧩 KUBGUIDE — Rubik's Cube Lösningsguide

En interaktiv webbplats för att lära sig lösa Rubik's Cube — både 2×2 och 3×3. Byggd med ren HTML, CSS och JavaScript utan beroenden.

## ✨ Funktioner

- **Interaktiv 3D-kub** — Roterbar 3D-visualisering på varje sida (dra med musen/pekskärm)
- **3×3 Nybörjarmetoden** — 7 steg, lager-för-lager med alla algoritmer
- **3×3 CFOP/Fridrich** — Cross, F2L, OLL (vanligaste fallen), PLL (12 fall)
- **2×2 Nybörjarmetoden** — 4 steg med Sune-algoritmen
- **2×2 OLL** — Alla 7 orienteringsfall med diagram
- **2×2 PBL** — Alla 5 permutationsfall (Permutation of Both Layers)
- **Notationsreferens** — Komplett guide till Singmaster-notation
- **Mobilanpassad** — Fungerar på alla skärmstorlekar
- **Mörkt tema** — Stylad med ett distinkt mörkt, minimalistiskt utseende

## 📁 Struktur

```
rubiks-cube-solver/
├── index.html              # Startsida
├── css/
│   └── style.css           # All styling
├── js/
│   ├── cube3d.js           # 3D canvas-renderer
│   └── main.js             # UI-logik, tabs, nav
└── pages/
    ├── 3x3.html            # 3×3 guide (nybörjare + CFOP)
    ├── 2x2.html            # 2×2 guide (nybörjare + OLL + PBL)
    └── notation.html       # Notationsreferens
```

## 🚀 Kom igång

### Lokalt
Klona repot och öppna `index.html` direkt i webbläsaren — inga beroenden!

```bash
git clone https://github.com/DITTNAMN/rubiks-cube-solver.git
cd rubiks-cube-solver
open index.html
```

### GitHub Pages
1. Gå till **Settings → Pages** i ditt GitHub-repo
2. Välj branch `main` och mappen `/ (root)`
3. Spara — sidan är live på `https://DITTNAMN.github.io/rubiks-cube-solver`

## 📚 Innehåll

### 3×3 Nybörjarmetoden
| Steg | Beskrivning |
|------|-------------|
| 1 | Vita korset |
| 2 | Vita hörnen |
| 3 | Mellanlagret (F2L nybörjare) |
| 4 | Gult kors (OLL kors) |
| 5 | Gula kanter |
| 6 | Gula hörnen — placering |
| 7 | Gula hörnen — orientering |

### 3×3 CFOP
- **Cross** — Intuitivt kors på bottenlagret
- **F2L** — Grundläggande insättningar
- **OLL** — Sune, Anti-Sune, T-form, Fish m.fl.
- **PLL** — T, Y, U, J, A, Z, H, F, E-perm

### 2×2 OLL (7 fall)
Sune, Anti-Sune, Headlights, Bowtie, Double Sune, Double Anti-Sune, Ingen gul

### 2×2 PBL (5 fall)
U-perm (a/b), A-perm (a/b), E-perm, Solved

## 🛠️ Teknologi

- **Ren HTML5/CSS3/JavaScript** — Inga frameworks
- **Canvas 2D API** — Egenutvecklad isometrisk 3D-renderer
- **Google Fonts** — Bebas Neue, Space Mono, DM Sans
- **Responsiv design** — CSS Grid + Flexbox

## 📄 Licens

MIT — Fri att använda och modifiera.
