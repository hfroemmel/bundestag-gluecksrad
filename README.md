# Glücksrad-Quiz – Deutscher Bundestag

Kleine Electron-App (React + Vite) auf Grundlage von `Gluecksradquiz.pdf`: Home-Screen mit Glücksrad, 19 Fragen, je eine Auflösung.
Läuft vollständig offline; alle Grafiken und Schriften sind im Paket enthalten.

## Bedienung

* Home: Zahl auf dem Glücksrad anklicken/antippen → Frage. (Die drei Adlerfelder sind nur Grafik.)
* Frage: magentafarbenen Zahlenkreis unten rechts anklicken → Auflösung.
* Auflösung: denselben Zahlenkreis nochmals anklicken → zurück zum Home-Screen.
* Seitenzuordnung der PDF: Home = Seite 1, Frage *n* = Seite 2*n*, Auflösung *n* = Seite 2*n*+1.
* `F11` = Vollbild, `Esc` = Vollbild verlassen.

## Entwicklung

Voraussetzung: Node.js ≥ 20.

```bash
npm install
npm run dev      # Vite-Dev-Server im Browser (http://localhost:5173)
npm start        # Produktions-Build und Start in Electron
```

## Paketierung

```bash
npm run dist:win   # Windows: release/Gluecksrad-Quiz.exe (portable, keine Installation nötig)
npm run dist:mac   # macOS: release/Gluecksrad-Quiz-<arch>.dmg (+ .zip mit der .app)
```

Windows-Pakete müssen unter Windows (oder mit Wine), macOS-Pakete unter macOS gebaut werden.
Der Workflow `.github/workflows/build.yml` erledigt beides auf GitHub (manuell starten oder Tag `v*` pushen;
Ergebnisse als Artefakte). Die macOS-App ist unsigniert – beim ersten Start Rechtsklick → „Öffnen“.

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `electron/main.cjs` | Electron-Hauptprozess (lädt `dist/index.html` per `file://`) |
| `src/Stage.jsx` | feste Fläche 960 × 540, gleichmäßig skaliert und zentriert (Rest schwarz) |
| `src/Home.jsx`, `src/QuestionPage.jsx` | Home-Screen bzw. Frage-/Auflösungsseite |
| `src/content.js` | alle Texte samt Position, Größe, Fettschrift und Balken je Seite (aus der PDF extrahiert) |
| `src/assets/` | Originalgrafiken: Adler/„Deutscher Bundestag“, Logo (SVG), Glücksrad (WebP), Bild zu Frage 5 |
| `src/fonts/` | Meliora Com Regular/Bold (WOFF2) |
| `tools/` | `pages.json`/`circles.json` (Rohdaten aus der PDF) und `build_content.py`, das `src/content.js` erzeugt |

Alle Koordinaten sind PDF-Punkte (960 × 540); Texte stehen mit festen Zeilenumbrüchen auf ihrer Grundlinie,
sodass Umbrüche der Frage- und Auflösungsseiten (die teils abweichen) exakt der PDF entsprechen.
Von den mitgelieferten Schriften wird nur Meliora verwendet (Noto Sans Display kommt in der PDF nicht vor und ist nicht enthalten).
