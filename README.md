# Abraham Raphael: portfolio

HTML, CSS and a small vanilla JavaScript file. No build step, no framework, no tracking, no outside requests. Every page works with JavaScript switched off; the script only adds the phone menu, the light/dark/system theme switch, the section highlight, copy-email, back-to-top and a gentle reveal (skipped for anyone who asks for reduced motion).

Preview it through a local server so fonts load the way they will online: `python -m http.server 8000` in this folder, then open http://localhost:8000.

## Brand: "Measured"

| Element | Choice | Why |
|---|---|---|
| Line | Measured backend engineering | A physicist's habit, applied to systems: measure before you claim |
| Mark | A damped trace settling to a dot (`img/mark.svg`) | An oscilloscope reading: noise first, then a measured value. It nods to the Physics (Electronics) degree |
| Colour | Ink `#0E1A24`, paper `#F7F6F2`, signal green `#0A7A55` (light) / `#3DDC97` (dark) | One accent colour only, like a trace on a scope |
| Type | IBM Plex Sans and IBM Plex Mono, self-hosted | An engineering family; the mono carries labels and numbers |
| Texture | Graph paper behind the opening section | The physicist's notebook |
| Voice | Plain, numbers instead of adjectives, every claim checkable | The brand promise is that the site can be checked |

## Files

| Path | What it is |
|---|---|
| `index.html` | Home: readings, selected work, client work, leading, about, tools, certificates, contact |
| `work/*.html` | Two case studies and one note |
| `css/style.css` | All styling, light and dark mode |
| `js/site.js` | Menu, theme switch, section highlight, copy-email, back-to-top, reveal |
| `fonts/` | IBM Plex (SIL Open Font License, `fonts/OFL.txt`) |
| `img/mark.svg` | The logo mark and favicon |
| `404.html` | Not-found page for GitHub Pages |
| `CHECKLIST.md` | Private notes. Listed in `.gitignore`, never published |

## Publishing on GitHub Pages

This folder is its own git repository (branch `main`).

1. On github.com, signed in as `abraham-raphael`, create a **public** repository named exactly `abraham-raphael.github.io`, with no README.
2. Then, in this folder:
   ```
   git remote add origin https://github.com/abraham-raphael/abraham-raphael.github.io.git
   git push -u origin main
   ```
3. In the repository: Settings, Pages, "Deploy from a branch", `main`, `/ (root)`.
4. The site goes live at `https://abraham-raphael.github.io` within a few minutes.

To update: edit, commit, push.
