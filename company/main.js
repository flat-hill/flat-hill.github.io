'use strict';
const $=(s,root=document)=>root.querySelector(s),$$=(s,root=document)=>[...root.querySelectorAll(s)];
const menu=$('.menu-toggle'), mobile=$('#mobile-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');mobile.hidden=true;}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobile.hidden=!open;});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){closeMenu();menu.focus();}});$$('a',mobile).forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu()});
const films={
 'hand-motion':{title:'Dexterous hand · coordinated motion',kind:'Prototype demonstration'},
 'hand-fingers':{title:'Dexterous hand · finger articulation',kind:'Prototype demonstration'},
 'joint-bench':{title:'Micro drive · bench motion',kind:'Prototype test'},
 'joint-load':{title:'Micro drive · load fixture',kind:'Prototype test'},
 'sim-cube':{title:'In-hand manipulation',kind:'Simulation'},
 'sim-batch':{title:'Parallel manipulation environments',kind:'Simulation'},
 "groundwise-demo-1":{"title": "GROUNDWISE \u00b7 Indoor mobility", "kind": "Prototype demonstration"},
 "groundwise-demo-2":{"title": "GROUNDWISE \u00b7 Wheel-legged motion \u00b7 extended demo", "kind": "Prototype demonstration"},
 "groundwise-demo-3":{"title": "GROUNDWISE \u00b7 Mobility and balance", "kind": "Prototype demonstration"},
 "groundwise-demo-4":{"title": "GROUNDWISE \u00b7 Ride-on prototype demonstration", "kind": "Prototype demonstration"},
 "flathill-demo":{"title": "FlatHill \u00b7 Finger articulation \u00b7 new prototype demo", "kind": "Prototype demonstration"},
 "groundwise-highlights-1":{"title": "Indoor mobility \u00b7 highlights", "kind": "Edited prototype highlights"},
 "groundwise-highlights-2":{"title": "Wheel-legged motion \u00b7 highlights", "kind": "Edited prototype highlights"},
 "groundwise-highlights-3":{"title": "Mobility and balance \u00b7 highlights", "kind": "Edited prototype highlights"},
 "groundwise-highlights-4":{"title": "Ride-on prototype \u00b7 highlights", "kind": "Edited prototype highlights"},
 "flathill-highlights":{"title": "Finger articulation \u00b7 highlights", "kind": "Edited prototype highlights"},
 "groundwise-motion-reel":{"title": "GROUNDWISE \u00b7 motion highlights", "kind": "Edited prototype highlights"}
};
const dialog=$('.film-dialog'),video=$('video',dialog);let filmTrigger;
$$('[data-film]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.film,f=films[id];if(!f)return;filmTrigger=b;$('#film-title').textContent=f.title;$('.film-caption').textContent=f.kind+' · Company-supplied footage. '+(f.kind==='Simulation'?'A simulated environment, not a real-world robot demonstration.':'A qualitative demonstration, not a performance specification or independent validation.');video.poster='/company/assets/'+id+'.jpg';video.src='/company/assets/'+id+'.mp4';dialog.showModal();document.body.style.overflow='hidden';video.play().catch(()=>{});}));
$('.close-film').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();document.body.style.overflow='';filmTrigger?.focus();});
const form=$('#contact-form');if(form){const interest=new URLSearchParams(location.search).get('interest');if([...form.elements.interest.options].some(o=>o.value===interest))form.elements.interest.value=interest;form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form),topic=form.elements.interest.selectedOptions[0].textContent,subject='MATTER POISE inquiry — '+topic,body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nOrganization: '+d.get('company')+'\nInterest: '+topic+'\n\n'+d.get('message');$('#email-draft').value='To: info@matterpoise.com\nSubject: '+subject+'\n\n'+body;$('#email-fallback').hidden=false;location.href='mailto:info@matterpoise.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);});$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#email-draft').value);$('#copy-result').textContent='Email draft copied.'}catch{$('#email-draft').select();$('#copy-result').textContent='Select and copy the draft above.'}});}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('will-reveal');observer.unobserve(e.target)}}),{threshold:.06});$$('.section-heading,.statement>div,.joint-copy,.rose-copy,.process-list>a,.three-columns article').forEach(el=>{el.classList.add('reveal','will-reveal');observer.observe(el)});}
