# SOURAV KUMAR — CASE FILE

Personal portfolio. Swiss Industrial Print design system with a hand-built, zero-dependency
interactive 3D "skill telemetry" constellation (drag to rotate, click a node for its evidence dossier).

## Structure
```
index.html      — markup
css/style.css   — full design system (tokens at the top of the file)
js/main.js      — entry sequence, scroll systems, 3D constellation (custom canvas 3D, no libraries)
favicon.svg     — site icon
.nojekyll       — tells GitHub Pages to serve files as-is
```

## Deploy to GitHub Pages
1. Create a repo (e.g. `sourav-kumar.github.io` for a root domain, or any repo name for a project page).
2. Push these files to the `main` branch (index.html at the repo root).
3. Repo → Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save.
4. Live in ~1 minute at `https://<username>.github.io/<repo>/`.

## Editing
- Colors & type: CSS custom properties in `:root` at the top of `css/style.css`.
- Skills & evidence: the `SKILLS` array near the top of the constellation section in `js/main.js`.
- Content: plain HTML in `index.html`, sectioned as 01 Exhibits / 02 Telemetry / 03 Record / 04 Credentials.

Hand-built. No frameworks, no build step, no dependencies.
