/* =========================================================
   SOURAV KUMAR — COVER  |  telemetry engine
   Zero dependencies. Touch-first: every pointer interaction
   works with finger, mouse or keyboard.
   ========================================================= */
(() => {
'use strict';

const RM    = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE  = matchMedia('(hover:hover) and (pointer:fine)').matches;
const $     = s => document.querySelector(s);

/* ---------- data ---------- */
const CATS = {
  fe:'Frontend systems', be:'Backend / data',
  ml:'AI / ML / mathematics', pr:'Practice / tooling'
};
const COL = { fe:'#5B87FF', be:'#07CA6B', ml:'#E89558', pr:'#B79BFF' };

const SKILLS = [
  {n:'Angular',      c:'fe', p:.95, ev:['<strong>EY:</strong> fraud-detection app frontend, 2024–present','<strong>IDBI Bank:</strong> complete WBS platform, solo, 3 months','<strong>Infosys:</strong> reusable component library, +10% dev speed','Infosys Certified Angular Professional']},
  {n:'TypeScript',   c:'fe', p:.90, ev:['Primary language across the EY and IDBI builds','Typed component architecture and API layers']},
  {n:'React',        c:'fe', p:.70, ev:['<strong>MERN auth system</strong> — open source on GitHub','Client work at Infosys','Infosys Certified React Professional']},
  {n:'JavaScript',   c:'fe', p:.90, ev:['ES6+ daily since 2021, across every project']},
  {n:'HTML / CSS',   c:'fe', p:.90, ev:['Responsive, accessible UIs in every shipped product','Angular Material and PrimeNG design systems']},
  {n:'RBAC & Auth',  c:'fe', p:.85, ev:['<strong>IDBI:</strong> four-role access control with route guards','<strong>MERN auth:</strong> JWT sessions, password reset, bcrypt']},
  {n:'Node.js',      c:'be', p:.80, ev:['<strong>Infosys:</strong> Angular–Node/Express integration','API optimization: +15% system performance','Infosys Certified Node.js Professional']},
  {n:'Express.js',   c:'be', p:.75, ev:['REST backends for client projects and the MERN auth system']},
  {n:'FastAPI',      c:'be', p:.70, ev:['<strong>EY:</strong> Python services detecting tampering in PDFs, images and metadata']},
  {n:'MongoDB',      c:'be', p:.80, ev:['Data layer at EY and across MERN projects','Infosys Certified MongoDB Developer']},
  {n:'SQL',          c:'be', p:.80, ev:['<strong>IDBI:</strong> data manipulation and validation for reporting','Infosys Certified SQL Developer']},
  {n:'REST APIs',    c:'be', p:.85, ev:['Designed, integrated and optimized across all three roles']},
  {n:'Python',       c:'ml', p:.80, ev:['<strong>EY:</strong> FastAPI forensics services in production','All ML and GenAI project work']},
  {n:'LangChain',    c:'ml', p:.60, ev:['<strong>RAG assistant:</strong> LCEL runnable chain, parallel retrieval, structured output parsing']},
  {n:'RAG',          c:'ml', p:.60, ev:['<strong>Research-paper assistant:</strong> PDF parsing, chunking, embedding, semantic retrieval','Prompt design + Pydantic schema to keep answers grounded']},
  {n:'FAISS',        c:'ml', p:.55, ev:['Vector store powering similarity search in the RAG assistant']},
  {n:'scikit-learn', c:'ml', p:.70, ev:['<strong>House prices:</strong> Lasso/Ridge, Random Forest, Gradient Boosting, tuned ensembles','<strong>Movie recommender:</strong> content-based on IMDB data','Sparks Foundation data-science internship']},
  {n:'Pandas',       c:'ml', p:.70, ev:['EDA and data pipelines in every ML project']},
  {n:'Applied Math', c:'ml', p:.90, ev:['<strong>Integrated M.Sc., Gold Medalist</strong> — linear algebra, probability, statistics, optimization']},
  {n:'Git & GitHub', c:'pr', p:.90, ev:['Repo management, pull requests and conflict resolution in agile teams']},
  {n:'Agile / Scrum',c:'pr', p:.85, ev:['Five years of sprint-based delivery at Infosys and EY']},
  {n:'Code Review',  c:'pr', p:.80, ev:['Reviewer at Infosys; quality gate alongside QA teams']}
];

/* ---------- adaptive quality ----------
   Live backdrop blur is beautiful but costly. Sample the real frame rate for a
   moment after load; if the device can't hold ~35fps, switch to 'lite' mode
   (solid panels, no live blur) so the page stays smooth. */
(() => {
  if (RM) { document.body.classList.add('lite'); return; }
  let n = 0, t0 = 0;
  const sample = t => {
    if (!t0) t0 = t;
    n++;
    if (t - t0 < 1200) { requestAnimationFrame(sample); return; }
    const fps = n / ((t - t0) / 1000);
    if (fps < 35) document.body.classList.add('lite');
  };
  requestAnimationFrame(sample);
})();

/* ---------- clock ---------- */
const clock = $('#clock');
const tickClock = () => {
  const t = new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour12:false});
  clock.textContent = t + ' IST';
};
tickClock(); setInterval(tickClock, 1000);

/* ---------- copy email ---------- */
const copyBtn = $('#copyBtn');
copyBtn.addEventListener('click', async () => {
  const mail = copyBtn.dataset.mail;
  try {
    await navigator.clipboard.writeText(mail);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = mail; ta.setAttribute('readonly','');
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch {}
    ta.remove();
  }
  $('#copyLabel').textContent = 'Copied';
  $('#copyStatus').textContent = mail + ' copied to clipboard';
  setTimeout(() => { $('#copyLabel').textContent = 'Copy address'; $('#copyStatus').textContent=''; }, 2600);
});

/* ---------- reveal + counters + meters ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.dataset.count) {
      const to = +el.dataset.count, sfx = el.dataset.suffix || '', t0 = performance.now();
      const step = t => {
        const p = RM ? 1 : Math.min(1, (t - t0) / 1200);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + sfx;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    if (el.classList.contains('meter')) el.classList.add('in');
    io.unobserve(el);
  });
}, { threshold:.3 });
document.querySelectorAll('[data-count],.meter').forEach(el => io.observe(el));

/* ---------- glass sheen follows pointer (fine pointers only) ---------- */
if (FINE && !RM) {
  document.querySelectorAll('.glass').forEach(g => {
    g.addEventListener('pointermove', e => {
      const r = g.getBoundingClientRect();
      g.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100) + '%');
      g.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });
}

/* ---------- aurora backdrop ---------- */
(() => {
  const c = $('#aurora'), x = c.getContext('2d');
  let W, H, DPR;
  const fit = () => {
    DPR = Math.min(devicePixelRatio || 1, 2);
    W = c.width = innerWidth * DPR; H = c.height = innerHeight * DPR;
    c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
  };
  fit(); addEventListener('resize', fit);

  let mx = .5, my = .35;
  if (FINE) addEventListener('pointermove', e => { mx = e.clientX / innerWidth; my = e.clientY / innerHeight; });

  const blobs = [
    {a:0.0, b:1.2, r:.42, col:[24,86,255],  z:.9},
    {a:2.1, b:3.4, r:.34, col:[91,135,255], z:.6},
    {a:4.3, b:0.7, r:.30, col:[7,202,107],  z:.45},
    {a:5.5, b:2.2, r:.26, col:[232,149,88], z:.35}
  ];
  let last = 0;
  const draw = t => {
    requestAnimationFrame(draw);
    if (RM && last) return;
    if (document.hidden) return;        // don't burn battery in a background tab
    if (t - last < 50) return;          // ~20fps: a slow drift needs no more, and every
                                        // aurora frame forces glass panels to re-blur
    last = t;
    x.clearRect(0, 0, W, H);
    const S = Math.max(W, H);
    for (const b of blobs) {
      const bx = (Math.sin(t * 0.00007 + b.a) * .30 + .5) * W + (mx - .5) * 90 * b.z * DPR;
      const by = (Math.cos(t * 0.00009 + b.b) * .30 + .45) * H + (my - .5) * 90 * b.z * DPR;
      const R  = S * b.r;
      const g  = x.createRadialGradient(bx, by, 0, bx, by, R);
      g.addColorStop(0,   `rgba(${b.col},${.30 * b.z})`);
      g.addColorStop(.55, `rgba(${b.col},${.08 * b.z})`);
      g.addColorStop(1,   'rgba(0,0,0,0)');
      x.fillStyle = g; x.beginPath(); x.arc(bx, by, R, 0, 7); x.fill();
    }
  };
  requestAnimationFrame(draw);
})();

/* ---------- 3D skill constellation ---------- */
(() => {
  const c = $('#space'), x = c.getContext('2d');
  const oxEl = $('#ox'), oyEl = $('#oy'), ozEl = $('#oz'), fpsEl = $('#fps');
  const nodeList = $('#nodeList');

  /* fibonacci sphere */
  const N = SKILLS.length;
  const nodes = SKILLS.map((s, i) => {
    const phi = Math.acos(1 - 2 * (i + .5) / N), th = Math.PI * (1 + Math.sqrt(5)) * i;
    return Object.assign({}, s, {
      x: Math.cos(th) * Math.sin(phi), y: Math.cos(phi), z: Math.sin(th) * Math.sin(phi),
      on: true, sx:0, sy:0, sz:0, sr:0
    });
  });

  let W, H, DPR;
  const fit = () => {
    DPR = Math.min(devicePixelRatio || 1, 2);
    const r = c.getBoundingClientRect();
    W = c.width = Math.round(r.width * DPR);
    H = c.height = Math.round(r.height * DPR);
  };
  fit();
  addEventListener('resize', fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(c.parentElement);

  /* pre-rendered glow sprites: building a radialGradient per node per frame
     is the single biggest cost on mobile, so bake one sprite per category. */
  const SPRITE = 96;
  const glowOf = {};
  for (const k in COL) {
    const s = document.createElement('canvas');
    s.width = s.height = SPRITE;
    const sx2 = s.getContext('2d');
    const g = sx2.createRadialGradient(SPRITE/2, SPRITE/2, 0, SPRITE/2, SPRITE/2, SPRITE/2);
    g.addColorStop(0, COL[k] + 'AA');
    g.addColorStop(.45, COL[k] + '33');
    g.addColorStop(1, COL[k] + '00');
    sx2.fillStyle = g; sx2.fillRect(0, 0, SPRITE, SPRITE);
    glowOf[k] = s;
  }

  let rx = -.18, ry = .4, vx = 0, vy = RM ? 0 : .0024;
  let zoom = 1, drag = false, moved = 0, px = 0, py = 0, hover = -1, active = -1;
  const HOME = { rx:-.18, ry:.4, zoom:1 };

  const project = n => {
    const cy = Math.cos(ry), sy = Math.sin(ry);
    const a  = n.x * cy + n.z * sy, d = -n.x * sy + n.z * cy;
    const cx = Math.cos(rx), sx = Math.sin(rx);
    const b  = n.y * cx - d * sx, e = n.y * sx + d * cx;
    const fill = (W / DPR) < 420 ? .46 : .40;      /* fill more of a small frame */
    const f  = (Math.min(W, H) * fill) / (2.6 / zoom - e);
    return [W / 2 + a * f, H / 2 + b * f, e];
  };

  /* --- pointer: drag to rotate, tap to select (works with touch) --- */
  const pointers = new Map();
  let pinchStart = 0, zoomStart = 1;

  c.addEventListener('pointerdown', e => {
    c.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});
    if (pointers.size === 1) { drag = true; moved = 0; px = e.clientX; py = e.clientY; }
    if (pointers.size === 2) {
      const [p1, p2] = [...pointers.values()];
      pinchStart = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      zoomStart = zoom;
    }
  });

  c.addEventListener('pointermove', e => {
    if (pointers.has(e.pointerId)) pointers.set(e.pointerId, {x:e.clientX, y:e.clientY});

    /* pinch zoom */
    if (pointers.size === 2 && pinchStart) {
      const [p1, p2] = [...pointers.values()];
      const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
      zoom = Math.min(1.9, Math.max(.6, zoomStart * d / pinchStart));
      return;
    }

    /* hover highlight (pointer devices) */
    const r = c.getBoundingClientRect();
    const mx = (e.clientX - r.left) * DPR, my = (e.clientY - r.top) * DPR;
    hover = -1; let best = 30 * DPR;
    nodes.forEach((n, i) => {
      if (!n.on) return;
      const d = Math.hypot(n.sx - mx, n.sy - my);
      if (d < best) { best = d; hover = i; }
    });
    c.style.cursor = hover > -1 ? 'pointer' : (drag ? 'grabbing' : 'grab');

    if (!drag || pointers.size !== 1) return;
    const dx = e.clientX - px, dy = e.clientY - py;
    moved += Math.abs(dx) + Math.abs(dy);
    vy = dx * .0035; vx = dy * .0035;
    ry += vy; rx += vx;
    px = e.clientX; py = e.clientY;
  });

  const endPointer = e => {
    if (drag && moved < 8 && pointers.size === 1) {
      /* treat as a tap: pick nearest node to the release point */
      const r = c.getBoundingClientRect();
      const mx = (e.clientX - r.left) * DPR, my = (e.clientY - r.top) * DPR;
      let pick = -1, best = 36 * DPR;      /* generous radius for fingers */
      nodes.forEach((n, i) => {
        if (!n.on) return;
        const d = Math.hypot(n.sx - mx, n.sy - my);
        if (d < best) { best = d; pick = i; }
      });
      if (pick > -1) select(pick);
    }
    pointers.delete(e.pointerId);
    if (pointers.size === 0) { drag = false; pinchStart = 0; }
  };
  c.addEventListener('pointerup', endPointer);
  c.addEventListener('pointercancel', e => { pointers.delete(e.pointerId); drag = false; pinchStart = 0; });

  c.addEventListener('wheel', e => {
    e.preventDefault();
    zoom = Math.min(1.9, Math.max(.6, zoom - e.deltaY * .0012));
  }, { passive:false });

  $('#resetBtn').addEventListener('click', () => {
    rx = HOME.rx; ry = HOME.ry; zoom = HOME.zoom; vx = 0; vy = RM ? 0 : .0024;
  });

  /* --- dossier --- */
  const dCat = $('#dCat'), dName = $('#dName'), dBar = $('#dBar'), dEv = $('#dEv');
  function select(i) {
    active = i;
    const n = nodes[i];
    dCat.textContent  = CATS[n.c];
    dName.textContent = n.n;
    dName.style.color = COL[n.c];
    dBar.style.setProperty('--p', n.p);
    dBar.parentElement.classList.add('in');
    dEv.innerHTML = n.ev.map(t => `<li>${t}</li>`).join('');
    nodeList.querySelectorAll('.node').forEach((b, j) => {
      b.classList.toggle('is-active', j === i);
    });
  }

  /* --- keyboard-accessible node list (canvas alternative) --- */
  nodes.forEach((n, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'node'; b.textContent = n.n;
    b.dataset.cat = n.c;
    b.addEventListener('click', () => { select(i); spin(i); });
    nodeList.appendChild(b);
  });

  /* rotate the sphere so a chosen node faces front */
  function spin(i) {
    const n = nodes[i];
    const targetRy = Math.atan2(n.x, n.z);
    const targetRx = -Math.asin(Math.max(-1, Math.min(1, n.y)));
    if (RM) { ry = targetRy; rx = targetRx; return; }
    const r0 = { rx, ry }, t0 = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const step = t => {
      const p = Math.min(1, (t - t0) / 700);
      rx = r0.rx + (targetRx - r0.rx) * ease(p);
      ry = r0.ry + (targetRy - r0.ry) * ease(p);
      if (p < 1) requestAnimationFrame(step); else { vx = 0; vy = .0024; }
    };
    vx = vy = 0;
    requestAnimationFrame(step);
  }

  /* --- category filter --- */
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(x2 => x2.classList.remove('is-on'));
      chip.classList.add('is-on');
      const cat = chip.dataset.cat;
      nodes.forEach((n, i) => {
        n.on = (cat === 'all' || n.c === cat);
        nodeList.children[i].hidden = !n.on;
      });
    });
  });

  /* --- render loop --- */
  /* only render while the telemetry panel is actually on screen */
  let onScreen = true;
  if (window.IntersectionObserver) {
    new IntersectionObserver(es => { onScreen = es[0].isIntersecting; }, { threshold:0 })
      .observe(c);
  }

  let last = performance.now(), frames = 0, fpsAcc = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    const dt = t - last; last = t;
    if (!onScreen || document.hidden) return;

    /* fps readout, averaged over ~0.5s */
    frames++; fpsAcc += dt;
    if (fpsAcc > 500) { fpsEl.value = Math.round(1000 / (fpsAcc / frames)); frames = 0; fpsAcc = 0; }
    oxEl.value = (rx >= 0 ? '+' : '') + (rx % 6.283).toFixed(2);
    oyEl.value = (ry >= 0 ? '+' : '') + (ry % 6.283).toFixed(2);
    ozEl.value = zoom.toFixed(2);

    if (RM) { drawScene(); return; }
    if (!drag) {
      ry += vy; rx += vx; vx *= .965; vy *= .965;
      if (Math.abs(vy) < .0024) vy = .0024 * Math.sign(vy || 1);
      rx = Math.max(-1.35, Math.min(1.35, rx));      /* keep poles readable */
    }
    drawScene();
  }

  function drawScene() {
    x.clearRect(0, 0, W, H);
    const vis = [];
    nodes.forEach((n, i) => {
      const p = project(n);
      n.sx = p[0]; n.sy = p[1]; n.sz = p[2];
      n.sr = (3 + n.p * 6) * (.5 + ((p[2] + 1) / 2) * .9) * DPR;
      if (n.on) vis.push(i);
    });

    /* links within a category */
    x.lineWidth = 1 * DPR;
    for (let a = 0; a < vis.length; a++) {
      for (let b = a + 1; b < vis.length; b++) {
        const i = vis[a], j = vis[b];
        if (nodes[i].c !== nodes[j].c) continue;
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y, dz = nodes[i].z - nodes[j].z;
        if (dx*dx + dy*dy + dz*dz > 1.15) continue;
        const depth = ((nodes[i].sz + nodes[j].sz) / 2 + 1) / 2;
        x.strokeStyle = `rgba(255,255,255,${.04 + depth * .13})`;
        x.beginPath(); x.moveTo(nodes[i].sx, nodes[i].sy); x.lineTo(nodes[j].sx, nodes[j].sy); x.stroke();
      }
    }

    /* nodes, painter's algorithm back-to-front */
    vis.sort((a, b) => nodes[a].sz - nodes[b].sz);
    x.textAlign = 'center';
    for (const i of vis) {
      const n = nodes[i], depth = (n.sz + 1) / 2, col = COL[n.c];
      const isSel = i === active, isHov = i === hover;

      /* glow — baked sprite, drawn scaled (cheap on mobile) */
      const R = n.sr * 3.4;
      x.globalAlpha = (isSel ? .95 : .30 + depth * .38);
      x.drawImage(glowOf[n.c], n.sx - R, n.sy - R, R * 2, R * 2);
      x.globalAlpha = 1;

      if (isSel || isHov) {
        x.beginPath(); x.arc(n.sx, n.sy, n.sr + 7 * DPR, 0, 7);
        x.strokeStyle = col; x.lineWidth = 1.6 * DPR; x.stroke(); x.lineWidth = 1 * DPR;
      }
      x.beginPath(); x.arc(n.sx, n.sy, n.sr, 0, 7);
      x.globalAlpha = .40 + depth * .60; x.fillStyle = col; x.fill(); x.globalAlpha = 1;

      /* label: only when legible, always for selection.
         Narrow canvases get a stricter threshold so labels don't collide. */
      const labelCut = (W / DPR) < 420 ? .60 : .42;
      if (depth > labelCut || isSel || isHov) {
        x.font = `500 ${(10.5 * (.78 + depth * .5) * DPR).toFixed(1)}px "JetBrains Mono", monospace`;
        x.fillStyle = `rgba(242,245,255,${isSel ? 1 : .32 + depth * .62})`;
        x.fillText(n.n, n.sx, n.sy - n.sr - 7 * DPR);
      }
    }
  }
  requestAnimationFrame(frame);
})();
})();
