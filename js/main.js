/* CASE FILE - entry sequence, scroll systems, 3D ink constellation (hand-built, zero libraries) */
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover: hover) and (pointer: fine)').matches;
/* entry sequence */
const pre=document.getElementById('pre');
const startAll=()=>{document.body.classList.add('loaded');pre.classList.add('done');setTimeout(()=>pre.remove(),1000)};
if(RM){pre.remove();document.body.classList.add('loaded')}else addEventListener('load',()=>setTimeout(startAll,500));
/* headline letters */
const build=(id,txt)=>{document.getElementById(id).innerHTML=txt.split('').map((ch,i)=>'<span class="l" style="animation-delay:'+(0.55+i*0.045)+'s">'+ch+'</span>').join('')};
build('ln1','SOURAV');build('ln2','KUMAR');
document.getElementById('ln2').insertAdjacentHTML('afterbegin','<span class="l red" style="animation-delay:.5s">/</span>');
/* crosshair cursor */
const cur=document.getElementById('cur');
if(FINE&&!RM)addEventListener('pointermove',e=>{cur.style.left=e.clientX+'px';cur.style.top=e.clientY+'px'});
/* progress + nav hide */
const prog=document.getElementById('prog'),nav=document.getElementById('nav');let lastY=0;
addEventListener('scroll',()=>{
  const y=scrollY,max=document.body.scrollHeight-innerHeight;
  prog.style.width=(y/max*100)+'%';
  nav.classList.toggle('hide',y>120&&y>lastY);lastY=y;
},{passive:true});
/* reveals + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  e.target.classList.add('in');
  if(e.target.dataset.count){const to=+e.target.dataset.count,sfx=e.target.dataset.suffix,t0=performance.now();
    const tick=t=>{const p=RM?1:Math.min(1,(t-t0)/1100);e.target.textContent=Math.round(to*(1-Math.pow(1-p,3)))+sfx;if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);}
  io.unobserve(e.target);}),{threshold:.2});
document.querySelectorAll('.ex,.rrow,[data-count]').forEach((el,i)=>{el.style.animationDelay=(i%4*90)+'ms';io.observe(el)});
/* 3D tilt on exhibits */
if(FINE&&!RM)document.querySelectorAll('.tilt').forEach(card=>{
  card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();
    card.style.transform='perspective(900px) rotateY('+(((e.clientX-r.left)/r.width-.5)*5)+'deg) rotateX('+(-((e.clientY-r.top)/r.height-.5)*5)+'deg)'});
  card.addEventListener('pointerleave',()=>card.style.transform='');
});
/* magnetic CTAs */
if(FINE&&!RM)document.querySelectorAll('.mag').forEach(mg=>{
  mg.addEventListener('pointermove',e=>{const r=mg.getBoundingClientRect();
    mg.style.transition='transform .1s';mg.style.transform='translate('+((e.clientX-r.left-r.width/2)*.22)+'px,'+((e.clientY-r.top-r.height/2)*.22)+'px)'});
  mg.addEventListener('pointerleave',()=>{mg.style.transition='transform .4s cubic-bezier(.22,1,.36,1)';mg.style.transform=''});
});
/* ============ 3D INK CONSTELLATION ============ */
const CATS={fe:'FRONTEND SYSTEMS',be:'BACKEND / DATA',ml:'ML / MATHEMATICS',pr:'PRACTICE / TOOLING'};
const SKILLS=[
 {n:'Angular',c:'fe',p:.95,ev:['<b>EY:</b> fraud-detection app frontend, 2024–present','<b>IDBI Bank:</b> complete WBS platform, solo, 3 months','<b>Infosys:</b> reusable component library, +10% dev speed','Infosys Certified Angular Professional']},
 {n:'TypeScript',c:'fe',p:.9,ev:['Primary language across EY and IDBI builds']},
 {n:'React',c:'fe',p:.7,ev:['<b>MERN auth system</b> — open source on GitHub','Client work at Infosys','Infosys Certified React Professional']},
 {n:'JavaScript',c:'fe',p:.9,ev:['ES6+ daily since 2021, across every project']},
 {n:'HTML/CSS',c:'fe',p:.9,ev:['Responsive, accessible UIs in every shipped product']},
 {n:'RBAC & Auth',c:'fe',p:.85,ev:['<b>IDBI:</b> four-role access control, route guards','<b>MERN auth:</b> JWT sessions, password reset, bcrypt']},
 {n:'Node.js',c:'be',p:.8,ev:['<b>Infosys:</b> Angular–Node/Express integration','API optimization: +15% system performance','Infosys Certified Node.js Professional']},
 {n:'Express.js',c:'be',p:.75,ev:['REST backends for client projects and MERN auth']},
 {n:'FastAPI',c:'be',p:.7,ev:['<b>EY:</b> Python services detecting document tampering']},
 {n:'MongoDB',c:'be',p:.8,ev:['Data layer at EY and in MERN projects','Infosys Certified MongoDB Developer']},
 {n:'SQL',c:'be',p:.8,ev:['<b>IDBI:</b> data manipulation and validation for reporting','Infosys Certified SQL Developer']},
 {n:'REST APIs',c:'be',p:.85,ev:['Designed, integrated and optimized across all roles']},
 {n:'Python',c:'ml',p:.8,ev:['<b>EY:</b> FastAPI forensics services in production','All ML project work']},
 {n:'scikit-learn',c:'ml',p:.7,ev:['<b>House Price Prediction:</b> Lasso/Ridge, RF, Gradient Boosting','<b>Movie Recommender:</b> content-based, IMDB dataset','Sparks Foundation DS internship']},
 {n:'Pandas',c:'ml',p:.7,ev:['EDA and pipelines in every ML project']},
 {n:'Regression',c:'ml',p:.75,ev:['Linear, Lasso (L1), Ridge (L2) — compared and tuned']},
 {n:'Ensembles',c:'ml',p:.65,ev:['Random Forest, Gradient Boosting, tuned stacks']},
 {n:'Applied Math',c:'ml',p:.9,ev:['<b>Integrated M.Sc., Gold Medalist</b> — linear algebra, probability, statistics, optimization']},
 {n:'Git & GitHub',c:'pr',p:.9,ev:['Repo management, PRs, conflict resolution in agile teams']},
 {n:'Agile/Scrum',c:'pr',p:.85,ev:['5 years of sprint-based delivery at Infosys and EY']},
 {n:'TDD',c:'pr',p:.6,ev:['Test-driven workflows on Infosys client projects']},
 {n:'Code Review',c:'pr',p:.8,ev:['Reviewer at Infosys; quality gate with QA teams']}];
const N=SKILLS.length, nodes=SKILLS.map((s,i)=>{
  const phi=Math.acos(1-2*(i+.5)/N), th=Math.PI*(1+Math.sqrt(5))*i;
  return Object.assign({},s,{x:Math.cos(th)*Math.sin(phi),y:Math.cos(phi),z:Math.sin(th)*Math.sin(phi)});
});
const c=document.getElementById('space'),x=c.getContext('2d');
let W,H,DPR;
const fit=()=>{DPR=Math.min(devicePixelRatio||1,2);const r=c.getBoundingClientRect();W=c.width=r.width*DPR;H=c.height=r.height*DPR};
fit();addEventListener('resize',fit);
let rx=-.2,ry=.4,vx=0,vy=RM?0:.0022,drag=false,moved=0,px=0,py=0,zoom=1,hover=-1;
const proj=n=>{
  const cy=Math.cos(ry),sy=Math.sin(ry),a2=n.x*cy+n.z*sy,d2=-n.x*sy+n.z*cy;
  const cx=Math.cos(rx),sx=Math.sin(rx),b2=n.y*cx-d2*sx,d3=n.y*sx+d2*cx;
  const f=(Math.min(W,H)*.4)/(2.6/zoom-d3);
  return [W/2+a2*f,H/2+b2*f,d3];
};
c.addEventListener('pointerdown',e=>{drag=true;moved=0;px=e.clientX;py=e.clientY;c.setPointerCapture(e.pointerId)});
c.addEventListener('pointermove',e=>{
  const r=c.getBoundingClientRect(),mx=(e.clientX-r.left)*DPR,my=(e.clientY-r.top)*DPR;
  hover=-1;let best=26*DPR;
  nodes.forEach((n,i)=>{const p=proj(n),d=Math.hypot(p[0]-mx,p[1]-my);if(d<best){best=d;hover=i}});
  c.style.cursor=hover>-1?'pointer':(drag?'grabbing':'grab');
  if(!drag)return;
  const dx=e.clientX-px,dy=e.clientY-py;moved+=Math.abs(dx)+Math.abs(dy);
  vy=dx*.0035;vx=dy*.0035;ry+=vy;rx+=vx;px=e.clientX;py=e.clientY;
});
c.addEventListener('pointerup',()=>{if(drag&&moved<6&&hover>-1)openD(nodes[hover]);drag=false});
c.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.min(1.8,Math.max(.6,zoom-e.deltaY*.0012))},{passive:false});
function openD(n){
  document.getElementById('d-cat').textContent=CATS[n.c];
  document.getElementById('d-name').textContent=n.n.toUpperCase();
  document.getElementById('d-bar').style.setProperty('--p',n.p);
  document.getElementById('d-ev').innerHTML=n.ev.map(e=>'<li>'+e+'</li>').join('');
}
const oxEl=document.getElementById('ox'),oyEl=document.getElementById('oy'),ozEl=document.getElementById('oz');
const fmt=v=>(v>=0?'+':'')+v.toFixed(2);
let t0=0;
function frame(t){
  requestAnimationFrame(frame);
  oxEl.value=fmt(rx%6.28);oyEl.value=fmt(ry%6.28);ozEl.value=zoom.toFixed(2);
  if(RM&&t0)return;t0=t;
  x.clearRect(0,0,W,H);
  if(!drag&&!RM){ry+=vy;rx+=vx;vx*=.97;vy*=.97;if(Math.abs(vy)<.0022)vy=.0022*Math.sign(vy||1)}
  const ps=nodes.map(proj);
  x.lineWidth=1*DPR;
  for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
    if(nodes[i].c!==nodes[j].c)continue;
    const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,dz=nodes[i].z-nodes[j].z;
    if(dx*dx+dy*dy+dz*dz>1.05)continue;
    const depth=((ps[i][2]+ps[j][2])/2+1)/2;
    x.strokeStyle='rgba(10,10,10,'+(.05+depth*.2)+')';
    x.beginPath();x.moveTo(ps[i][0],ps[i][1]);x.lineTo(ps[j][0],ps[j][1]);x.stroke();
  }
  const order=[...Array(N).keys()].sort((a,b)=>ps[a][2]-ps[b][2]);
  x.textAlign='center';
  for(const i of order){
    const p=ps[i],depth=(p[2]+1)/2,n=nodes[i];
    const R=(3+n.p*6)*(.5+depth*.9)*DPR;
    if(i===hover){x.beginPath();x.arc(p[0],p[1],R+6*DPR,0,7);x.strokeStyle='#E61919';x.lineWidth=2*DPR;x.stroke();x.lineWidth=1*DPR}
    x.beginPath();x.arc(p[0],p[1],R,0,7);
    x.fillStyle=i===hover?'#E61919':'rgba(10,10,10,'+(.28+depth*.72)+')';x.fill();
    x.font='500 '+(10*(.7+depth*.6)*DPR)+'px "JetBrains Mono"';
    x.fillStyle='rgba(10,10,10,'+(.3+depth*.7)+')';
    x.fillText(n.n.toUpperCase(),p[0],p[1]-R-6*DPR);
  }
}
requestAnimationFrame(frame);
})();

