(function(){
  const canvas = document.querySelector('.background-field');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, points = [], mouse = { x:-1000, y:-1000, active:false };
    function resizeCanvas(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = width*dpr; canvas.height = height*dpr;
      canvas.style.width = width+'px'; canvas.style.height = height+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.max(34, Math.floor((width*height)/52000));
      points = Array.from({length:count}, (_,i)=>({
        x:Math.random()*width, y:Math.random()*height,
        baseX:Math.random()*width, baseY:Math.random()*height,
        r:Math.random()*0.85+0.35, phase:Math.random()*Math.PI*2,
        delay:Math.random()*8, drift:Math.random()*0.22+0.08,
        warm:Math.random()>0.72
      }));
    }
    function distance(a,b){ const dx=a.x-b.x, dy=a.y-b.y; return Math.sqrt(dx*dx+dy*dy); }
    function draw(){
      ctx.clearRect(0,0,width,height);
      const t = performance.now()/1000;
      for(const p of points){ p.x=p.baseX+Math.sin(t*p.drift+p.phase)*16; p.y=p.baseY+Math.cos(t*p.drift*.9+p.phase)*12; }
      for(let i=0;i<points.length;i++) for(let j=i+1;j<points.length;j++){
        const a=points[i], b=points[j], d=distance(a,b);
        if(d<120){ const opacity=(1-d/120)*0.055; ctx.strokeStyle=`rgba(250,247,242,${opacity})`; ctx.lineWidth=.55; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      }
      for(const p of points){
        const wave=Math.sin(t*1.25+p.phase+p.delay);
        const rareGlow=wave>.82 ? (wave-.82)/.18 : 0;
        const nearMouse=mouse.active ? Math.max(0,1-distance(p,mouse)/190) : 0;
        const opacity=.18+rareGlow*.48+nearMouse*.18;
        const radius=p.r+rareGlow*1.1+nearMouse*.45;
        ctx.beginPath();
        ctx.fillStyle=p.warm ? `rgba(216,180,106,${opacity})` : `rgba(250,247,242,${opacity*.72})`;
        ctx.shadowColor=p.warm ? 'rgba(216,180,106,.32)' : 'rgba(250,247,242,.18)';
        ctx.shadowBlur=2+rareGlow*12+nearMouse*5;
        ctx.arc(p.x,p.y,radius,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      }
      if(mouse.active) for(const p of points){
        const d=distance(p,mouse); if(d<170){ const opacity=(1-d/170)*.11; ctx.strokeStyle=`rgba(216,180,106,${opacity})`; ctx.lineWidth=.65; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); }
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', e=>{ mouse.x=e.clientX; mouse.y=e.clientY; mouse.active=true; });
    window.addEventListener('pointerleave', ()=>{ mouse.active=false; });
    resizeCanvas(); draw();
  }

  const joinForm = document.querySelector('[data-join-form]');
  if (joinForm) {
    const status = document.querySelector('[data-status]');
    joinForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      const profile = Object.fromEntries(new FormData(joinForm).entries());
      profile.createdAt = new Date().toISOString();
      profile.status = 'demo-profile-created';
      localStorage.setItem('professionalJewessProfile', JSON.stringify(profile));
      if(status) status.textContent = 'Demo profile created. In the real version, this would submit for approval and create a member account.';
      setTimeout(()=>{ window.location.href='dashboard.html'; }, 900);
    });
  }

  const signupForm = document.querySelector('[data-signup-form]');
  if (signupForm) {
    const status = document.querySelector('[data-status]');
    signupForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      const account = Object.fromEntries(new FormData(signupForm).entries());
      account.createdAt = new Date().toISOString();
      account.approved = true;
      localStorage.setItem('professionalJewessAccount', JSON.stringify(account));
      localStorage.setItem('professionalJewessLoggedIn', 'true');
      if(status) status.textContent = 'Demo account created. Redirecting to member dashboard.';
      setTimeout(()=>{ window.location.href='dashboard.html'; }, 700);
    });
  }

  const loginForm = document.querySelector('[data-login-form]');
  if (loginForm) {
    const status = document.querySelector('[data-status]');
    loginForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      localStorage.setItem('professionalJewessLoggedIn', 'true');
      if(status) status.textContent = 'Demo login successful. Redirecting.';
      setTimeout(()=>{ window.location.href='dashboard.html'; }, 500);
    });
  }

  const profileTarget = document.querySelector('[data-profile-output]');
  if (profileTarget) {
    const profile = JSON.parse(localStorage.getItem('professionalJewessProfile') || localStorage.getItem('professionalJewessAccount') || '{}');
    if (profile.firstName || profile.fullName) {
      const name = profile.fullName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
      profileTarget.innerHTML = `<div class="avatar">${(name || 'PJ').slice(0,1).toUpperCase()}</div><h3>${name || 'New Member'}</h3><p>${profile.role || profile.currentRole || 'Member'}${profile.city ? ' • '+profile.city : ''}</p><div class="tag-row"><span class="tag">${profile.connectionType || profile.memberType || 'Professional connection'}</span>${profile.industry ? `<span class="tag">${profile.industry}</span>` : ''}</div>`;
    }
  }

  const search = document.querySelector('[data-directory-search]');
  const filter = document.querySelector('[data-directory-filter]');
  const cards = Array.from(document.querySelectorAll('[data-member-card]'));
  function filterMembers(){
    const q = (search?.value || '').toLowerCase().trim();
    const f = (filter?.value || 'all').toLowerCase();
    cards.forEach(card=>{
      const text = card.textContent.toLowerCase();
      const type = (card.dataset.type || '').toLowerCase();
      const okQ = !q || text.includes(q);
      const okF = f === 'all' || type.includes(f);
      card.style.display = okQ && okF ? '' : 'none';
    });
  }
  search?.addEventListener('input', filterMembers); filter?.addEventListener('change', filterMembers);

  const scheduleForm = document.querySelector('[data-schedule-form]');
  if (scheduleForm) {
    const status = document.querySelector('[data-status]');
    scheduleForm.addEventListener('submit', (event)=>{
      event.preventDefault();
      const request = Object.fromEntries(new FormData(scheduleForm).entries());
      const requests = JSON.parse(localStorage.getItem('professionalJewessRequests') || '[]');
      requests.push({...request, createdAt:new Date().toISOString()});
      localStorage.setItem('professionalJewessRequests', JSON.stringify(requests));
      if(status) status.textContent = 'Request saved in demo mode. In the live platform, this would notify the mentor and create scheduling options.';
      scheduleForm.reset();
    });
  }
})();
