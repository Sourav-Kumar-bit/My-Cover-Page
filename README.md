# Sourav Kumar — Portfolio

Two pages, no build step, no dependencies.

```
index.html        Cover — glass instrument panel + live skill telemetry
casefile.html     Full case file (exhibits, record, credentials)
css/style.css     Cover styles (design tokens in :root)
css/casefile.css  Case-file styles
js/main.js        Cover: aurora, 3D constellation, telemetry, filters
js/casefile.js    Case-file interactions
favicon.svg
.nojekyll         serve files as-is on GitHub Pages
```

## Deploy to GitHub Pages
1. Push these files to the repo root of `Sourav-Kumar-bit.github.io` (branch `main`).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. Live at `https://sourav-kumar-bit.github.io` in about a minute.
   Leave the **Custom domain** field empty.

## Editing
- **Skills + evidence:** the `SKILLS` array at the top of `js/main.js`.
  Add an entry and it joins the 3D sphere and the keyboard list automatically.
- **Colours / spacing / blur:** CSS custom properties in `:root` of `css/style.css`.
- **Copy:** plain HTML in `index.html`.

## Notes
- **Adaptive quality:** the page samples its own frame rate for the first
  1.2 s. Below ~35 fps it adds `body.lite`, which swaps live backdrop-blur for
  solid panels so weak devices stay smooth.
- **Accessibility:** every node in the 3D map is also a real focusable button in
  the list beneath it; 44 px minimum touch targets; visible focus rings; honours
  `prefers-reduced-motion` and `prefers-reduced-transparency`.
- **Touch:** one finger rotates, two fingers pinch to zoom, tap selects.
