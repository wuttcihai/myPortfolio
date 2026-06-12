/* ===== PIXELCRAFT — interactions ===== */

/* Preloader counter */
(function(){
  const count = document.getElementById('count');
  const bar = document.getElementById('bar');
  const pre = document.getElementById('preloader');
  if(!pre) return;
  let n = 0;
  const t = setInterval(()=>{
    n += Math.floor(Math.random()*8)+3;
    if(n>=100){n=100;clearInterval(t);
      setTimeout(()=>{pre.classList.add('done');document.body.style.overflow='';},450);
    }
    count.textContent = n;
    bar.style.width = n+'%';
  },90);
  document.body.style.overflow='hidden';
})();

/* Custom cursor */
(function(){
  const c = document.getElementById('cursor');
  const d = document.getElementById('cursorDot');
  if(!c) return;
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px';});
  (function loop(){cx+=(mx-cx)*.18;cy+=(my-cy)*.18;c.style.left=cx+'px';c.style.top=cy+'px';requestAnimationFrame(loop);})();
  const hov='a,button,.work,.magnetic,.serv';
  document.querySelectorAll(hov).forEach(el=>{
    el.addEventListener('mouseenter',()=>c.classList.add('hover'));
    el.addEventListener('mouseleave',()=>c.classList.remove('hover'));
  });
})();

/* Reveal on scroll */
(function(){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* Count up stats */
(function(){
  const io = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target, target=+el.dataset.count;
      let v=0; const step=Math.max(1,Math.ceil(target/40));
      const t=setInterval(()=>{v+=step;if(v>=target){v=target;clearInterval(t);}el.textContent=v;},28);
      io.unobserve(el);
    });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(el=>io.observe(el));
})();

/* Hide nav on scroll down */
(function(){
  const nav=document.getElementById('nav');let last=0;
  addEventListener('scroll',()=>{
    const y=scrollY;
    if(y>last && y>200) nav.classList.add('hide'); else nav.classList.remove('hide');
    last=y;
  });
})();

/* Magnetic buttons */
(function(){
  document.querySelectorAll('.magnetic').forEach(b=>{
    b.addEventListener('mousemove',e=>{
      const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.3}px,${(e.clientY-r.top-r.height/2)*.4}px)`;
    });
    b.addEventListener('mouseleave',()=>b.style.transform='');
  });
})();
