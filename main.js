/* 첫 화면 동작 — 보안(CSP)을 위해 index.html 인라인에서 분리(11/17). 계절 사진 값은 index.html 의 seasons-data 에 있고 관리 화면이 그것만 고친다. */
/* ────────── 데이터 ────────── */
const BOOK='https://booking.ddnayo.com/booking-calendar?accommodationId=100751';

/* ───────────────────────────────────────────────────────────────
   객실 노출 범위 스위치
   false = 1~13호만 게시 (현재 제안 기준)
   true  = 14·15·17·18호까지 전 객실 게시
   대표님 확인 후 이 한 줄만 바꾸면 홈페이지·검색·AI 노출이 함께 바뀝니다.
   ─────────────────────────────────────────────────────────────── */
const SHOW_RESTRICTED_ROOMS=true;
const FAC=[
 {id:'seminar',t:'세미나실',big:true,img:'img/seminar-river.jpg',
  d:'계곡 바로 앞에 있습니다. 창 너머가 물이고 안은 에어컨이 나옵니다. 한여름 낮에 평상이 더울 때 이곳으로 들어오시면 됩니다. 강의도 단체 식사도 여기서 해결됩니다.',
  more:['img/seminar-hall.jpg','img/seminar-front.jpg'],
  specs:[['대관 시간','10:00 ~ 17:00'],['대관료','400,000원'],
         ['수용 인원','40명'],['위치','계곡 앞']],
  note:'세미나·학술 모임은 물론, 단체가 하루 종일 쉬는 공간으로 쓰셔도 됩니다. 실내 취식 가능.',
  yt:{id:'W1gyYMrIFs0',title:'미소가든펜션 세미나실 : 제천 워크샵 펜션 추천! 40인 수용 세미나실과 계곡을 한 번에 즐기는 미소가든 펜션'}},
 {id:'karaoke',t:'노래방',img:'img/karaoke-room.jpg',
  d:'7호 2층에 큰방 1개와 작은방 2개, 그리고 코인노래방 2대가 있습니다. 밤에 눈치 볼 이웃이 없습니다.',
  more:['img/karaoke.jpg'],
  specs:[['위치','7호 2층'],['방','3칸 (큰방 1 · 작은방 2)'],
         ['요금','시간당 30,000 ~ 50,000원'],['코인노래방','2대 · 1곡 500원']],
  note:'22:00까지 운영합니다.',
  yt:{id:'PONe2ZQIH-8',title:'미소펜션 노래방 제천 단체 펜션 추천, 회식 워크샵에 딱 좋은 미소가든 펜션 노래방 룸투어'}},
 {id:'pool',t:'수영장',img:'img/pool-cover.jpg',
  d:'성인풀과 유아풀이 따로 있습니다. 튜브는 보증금 5,000원에 빌려드리고 반납하시면 그대로 돌려드립니다.',
  specs:[['운영 기간','6/15 ~ 9/15'],['운영 시간','10:00 ~ 19:00'],
         ['수심','성인 1.2m · 유아 0.7m'],['튜브','보증금 5,000원']],
  note:'수영장이 도는 6월 중순 ~ 9월 중순이 미소가든펜션캠핑장 최성수기입니다. 수영복 또는 민소매티·반바지 착용.',
  yt:{id:'KHPsFKVSZCY',title:'미소가든펜션 수영장 : 뜨거운 햇빛 걱정 끝! 💦 제천 미소가든 펜션 대형 야외 수영장 랜선 투어'}},
 {id:'tunnel',t:'가로수길 산책로',big:true,img:'img/tunnel-walk.jpg',
  d:'펜션 안에 산책로가 있습니다. 캠핑장 잔디존 옆으로 나무가 양쪽에서 가지를 맞대 터널처럼 이어지는 가로수길이라, 단지 밖으로 나가지 않고 조용히 산책할 수 있습니다. 아침 산책이나 저녁 식사 뒤, 아이와 함께 가볍게 걷기 좋은 길입니다.',
  more:['img/tunnel-walk2.jpg'],
  specs:[['위치','캠핑장 잔디존 옆'],['길','흙길 · 나무 그늘'],['단풍','10월 중순 ~ 말'],['이용','투숙객 자유 산책']],
  yt:{id:'Dnyg-g1ciHE',title:'미소가든펜션 : 숲속 동화 같은 풍경, 아이와 함께 걷는 미소가든펜션 가로수길 힐링 여행'}},
 {id:'store',t:'단지 내 편의점',img:'img/store-night.jpg',
  d:'시내 편의점 규모. 고기·숯·아이스크림까지 있어 장 보러 나갔다 올 필요가 없습니다.',
  more:['img/store-lounge.jpg','img/store-in.jpg'],
  specs:[['운영 시간','09:00 ~ 22:00'],['규모','시내급'],['취급','식료 · 숯 · 생필품'],['위치','단지 중앙']],
  yt:{id:'hCNDBGGCuuU',title:'미소가든펜션 편의점 : 제천 미소가든 펜션 편의점 랜선 투어 (밤 10시까지 운영)'}},
 {id:'valley',t:'계곡',img:'img/valley2.jpg',
  d:'느티나무 그늘과 물소리. 여름에는 여기가 두 번째 거실이 됩니다.',
  more:['img/valley.jpg'],specs:[['위치','부지 옆'],['추천','6~8월'],['시설','평상'],['수심','확정 후 표기']],
  yt:{id:'quLNT9hHsq4',title:'미소가든펜션캠핑장 : 펜션 바로 앞 맑은 계곡! 제천 계곡 펜션 미소가든펜션캠핑장 랜선 투어'}},
 {id:'field',t:'족구장 · 풋살장',img:'img/field-court.jpg',
  d:'족구장과 풋살장이 따로 있습니다. 네트와 골대, 공까지 갖춰져 있어 몸만 오시면 됩니다.',
  more:['img/field-lawn.jpg'],
  specs:[['족구장','네트 · 공 구비'],['풋살장','골대 · 공 구비'],['용도','단체 체육대회'],['대상','투숙객']],
  yt:{id:'or4pFTNZb3I',title:'미소가든펜션 족구장, 풋살장 : 아이들이 맘껏 뛰어노는 넓은 잔디 풋살장! 제천 미소가든 펜션 체육시설 랜선 투어'}}
];

const won=n=>n?n.toLocaleString('ko-KR')+'원':null;
const kindOf=r=>r.feat.includes('독채')?'독채':(r.ty==='거실+객실'?'거실+객실':'원룸형');

const CAMP=[
 ['img/easycamp.jpg','이지캠핑장 — 장비 제공',['img/easycamp-in.jpg'],
  {id:'N50XAvqf9cg',title:'미소가든펜션캠핑장 : 텐트 설치 없이 즐기는 제천 캠핑｜미소가든 이지캠핑 둘러보기'}],
 ['img/valleycamp.jpg','일반 캠핑장 — 계곡존⁠·⁠잔디존',['img/valleycamp-sink.jpg','img/lawn.jpg','img/field.jpg'],
  {id:'dy1U_8ga9s0',title:'미소가든펜션캠핑장 : 푸른 나무 그늘과 맑은 계곡이 있는 곳, 제천 미소가든캠핑장 계곡존 둘러보기'}],
 ['img/hero-tunnel.jpg','가로수길 산책로',['img/deck-tunnel.jpg','img/tunnel-deck.jpg']]
];

// 계절 카드 — 누르면 그 계절 사진을 넘겨 본다. 4번째 칸은 창 아래 작은 안내 (겨울 = 실제 사진에 눈을 입힌 그림 — 첫눈 실사 생기면 교체)
const SEASONS=JSON.parse(document.getElementById('seasons-data').textContent.replace(/\/\*\/?ED:seasons\*\//g,''));

/* ────────── 렌더 ────────── */
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const vbadge=y=>y?`<span class="qr play" data-play>▶ 영상<span class="vlab"> 보기</span></span>`:'';
document.querySelectorAll('[data-season]').forEach(el=>{
  const s=SEASONS[+el.dataset.season];
  el.insertAdjacentHTML('beforeend',`<div class="cnt">사진 ${s[2].length}</div>${vbadge(s[4])}`);
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click()}});
});

document.getElementById('fgrid').innerHTML=FAC.map((f,i)=>`
  <button class="fcard rv${f.big?' big':''}" data-fac="${i}">
    <div class="ph"><img src="${f.img}" alt="${esc(f.t)}" loading="lazy">${vbadge(f.yt)}</div>
    <div class="body"><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p>${f.note?`<p class="fnote">${esc(f.note)}</p>`:''}</div>
  </button>`).join('');

document.getElementById('rgrid').innerHTML=ROOMS.map(r=>`
  <a class="room rv" href="rooms/${r.num}.html" data-room="${r.num}">
    <div class="ph"><img src="${r.img[0]}" alt="${esc(r.n)}" loading="lazy">
      <div class="no">${esc(r.n)}</div><div class="cnt">사진 ${r.img.length}</div>${vbadge(r.yt)}</div>
    <div class="body">
      <div class="kind">${esc(kindOf(r))} · ${r.sp}평</div>
      <p style="color:var(--paper);font-family:var(--serif);margin-top:6px">${esc(r.nm)}</p>
      <p>기준 ${r.std}명 · 최대 ${r.max}명</p>
      <p style="color:var(--gold);font-weight:600;margin-top:8px">${won(r.price)?won(r.price)+'<span style="color:var(--paper-dim);font-weight:400"> / 1박~</span>':'<span style="color:var(--paper-dim);font-weight:400">날짜별 요금 확인</span>'}</p>
    </div>
  </a>`).join('');

document.getElementById('cstrip').innerHTML=CAMP.map((c,i)=>`
  <button class="rv" data-camp="${i}"><img src="${c[0]}" alt="${esc(c[1])}" loading="lazy">
    <div class="cap">${esc(c[1])}</div>${vbadge(c[3])}</button>`).join('');

/* ────────── 히어로 슬라이드 ────────── */
const slides=[...document.querySelectorAll('.hero .slide')];
const dots=document.getElementById('dots');
let si=0,timer;
dots.innerHTML=slides.map((_,i)=>`<button aria-label="${i+1}번째 사진"${i?'':' aria-current="true"'}></button>`).join('');
const dotBtns=[...dots.children];
// 2~5번째 사진은 처음에 받지 않고, 다음 차례가 오기 전에 받는다 (휴대폰 첫 화면 무게)
function need(i){slides[i].querySelectorAll('[data-src],[data-srcset]').forEach(n=>{
  if(n.dataset.srcset){n.srcset=n.dataset.srcset;n.removeAttribute('data-srcset')}
  if(n.dataset.src){n.src=n.dataset.src;n.removeAttribute('data-src')}})}
addEventListener('load',()=>setTimeout(()=>need(1),1500));
function go(i){
  slides[si].classList.remove('on');dotBtns[si].removeAttribute('aria-current');
  si=(i+slides.length)%slides.length;
  need(si);need((si+1)%slides.length);
  slides[si].classList.add('on');dotBtns[si].setAttribute('aria-current','true');
  const im=slides[si].querySelector('img');im.style.animation='none';im.offsetHeight;im.style.animation='';
}
function cycle(){clearInterval(timer);timer=setInterval(()=>go(si+1),6500)}
dotBtns.forEach((b,i)=>b.onclick=()=>{go(i);cycle()});
cycle();

/* ────────── 모달 (객실 · 시설 · 캠핑 공용) ────────── */
const modal=document.getElementById('modal'),stage=document.getElementById('mstage'),
      thumbs=document.getElementById('mthumbs'),mbody=document.getElementById('mbody'),
      mcount=document.getElementById('mcount');
let gal=[],gi=0,lastFocus=null;

function paint(){
  [...stage.querySelectorAll('img')].forEach((im,i)=>im.classList.toggle('on',i===gi));
  [...thumbs.children].forEach((b,i)=>b.setAttribute('aria-current',i===gi?'true':'false'));
  mcount.textContent=`${gi+1} / ${gal.length}`;
  const on=thumbs.children[gi];if(on)on.scrollIntoView({block:'nearest',inline:'nearest'});
}
function open(photos,html,url){
  photos=photos.map(p=>new URL(p,location.href).href);   // 주소를 /rooms/N.html 로 바꾸기 전에 사진 경로를 절대 경로로 고정
  gal=photos;gi=0;lastFocus=document.activeElement;
  stage.querySelectorAll('img').forEach(n=>n.remove());
  const first=stage.firstChild;
  photos.forEach(p=>{const im=new Image();im.src=p;im.alt='';stage.insertBefore(im,first)});
  thumbs.innerHTML=photos.map((p,i)=>`<button data-i="${i}"><img src="${p}" alt="" loading="lazy"></button>`).join('');
  thumbs.style.display=photos.length>1?'flex':'none';
  document.getElementById('mprev').style.display=document.getElementById('mnext').style.display=photos.length>1?'':'none';
  mbody.innerHTML=html;
  // 창을 열 때 기록 한 칸을 남겨, 폰·브라우저 뒤로가기가 사이트를 나가지 않고 창만 닫게 한다.
  // 객실 창은 주소창도 그 방 주소(/rooms/7.html)로 — 브라우저 「공유」로 보내도 그 방이 열린다 (10/25)
  if(!modal.classList.contains('open')){try{history.pushState({modal:1},'',url)}catch(_){history.pushState({modal:1},'')}}
  modal.classList.add('open');document.body.style.overflow='hidden';
  paint();document.getElementById('mclose').focus();
}
function hide(){modal.classList.remove('open');mbody.innerHTML='';document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
function close(){if(history.state&&history.state.modal)history.back();else hide()}
addEventListener('popstate',()=>{if(modal.classList.contains('open'))hide()});
if(history.state&&history.state.modal)history.replaceState(null,'');
// 계좌번호 복사 — 은행 앱에 바로 붙여 넣기 (복사가 막힌 브라우저는 선택 가능한 창으로 보여 줌)
document.getElementById('acctCopy').onclick=e=>{const b=e.currentTarget;
  navigator.clipboard.writeText(b.dataset.copy).then(()=>{b.textContent='복사되었습니다 ✓';setTimeout(()=>b.textContent='계좌번호 복사',2000)},
    ()=>prompt('계좌번호를 길게 눌러 복사하세요',b.dataset.copy))};
const step=d=>{gi=(gi+d+gal.length)%gal.length;paint()};

document.getElementById('mclose').onclick=close;
document.getElementById('mprev').onclick=e=>{e.stopPropagation();step(-1)};
document.getElementById('mnext').onclick=e=>{e.stopPropagation();step(1)};
thumbs.onclick=e=>{const b=e.target.closest('button');if(b){gi=+b.dataset.i;paint()}};
modal.onclick=e=>{if(e.target===modal)close()};
addEventListener('keydown',e=>{
  if(!modal.classList.contains('open'))return;
  if(e.key==='Escape')close();
  if(e.key==='ArrowLeft')step(-1);
  if(e.key==='ArrowRight')step(1);
});
let tx=0;
stage.addEventListener('touchstart',e=>tx=e.touches[0].clientX,{passive:true});
stage.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>45)step(d<0?1:-1)},{passive:true});

const ytHTML=(y,auto)=>auto?`<div class="vembed mvid"><iframe src="https://www.youtube-nocookie.com/embed/${esc(y.id)}?rel=0&amp;playsinline=1&amp;autoplay=1"
  title="${esc(y.title)}" referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen></iframe></div>`
  :`<div class="vembed mvid"><a class="ytf" href="https://youtu.be/${esc(y.id)}" data-yt="${esc(y.id)}" data-title="${esc(y.title)}" target="_blank" rel="noopener">
  <img src="https://i.ytimg.com/vi/${esc(y.id)}/hqdefault.jpg" alt="${esc(y.title)}" loading="lazy"></a></div>`;

// 「▶ 영상 보기」로 열면 창 안의 영상으로 바로 내려가 재생 (폰은 자동재생이 막히면 재생 버튼만 보임)
const toVideo=()=>{const v=mbody.querySelector('.vembed');if(v)v.scrollIntoView({block:'center'})};

document.addEventListener('click',e=>{
  const jump=!!e.target.closest('[data-play]');
  const rb=e.target.closest('[data-room]');
  if(rb){
    e.preventDefault();
    const r=ROOMS.find(x=>x.num===+rb.dataset.room);
    open(r.img,`
      <div class="kind">${esc(kindOf(r))} · ${r.sp}평 (약 ${(r.sp*3.3058).toFixed(1)}㎡)</div>
      <h3>${esc(r.n)} — ${esc(r.nm)}</h3>
      <p>${esc(r.st)}</p>
      <div class="mspecs">
        <div><div class="k">기준 인원</div><div class="v">${r.std}명</div></div>
        <div><div class="k">최대 인원</div><div class="v">${r.max}명</div></div>
        <div><div class="k">1박 요금</div><div class="v">${won(r.price)||"날짜별"}</div></div>
        <div><div class="k">인원 추가</div><div class="v">1인 ${won(r.ex)||"-"}</div></div>
      </div>
      ${r.feat.length?`<div class="chips">${r.feat.map(f=>`<span class="chip gold">${esc(f)}</span>`).join('')}</div>`:''}
      <div class="chips">${r.am.map(a=>`<span class="chip">${esc(a)}</span>`).join('')}</div>
      ${r.yt?ytHTML(r.yt,jump):''}
      <div class="btns" style="justify-content:flex-start;margin-top:0">
        <a class="btn fill" href="${BOOK}" target="_blank" rel="noopener">실시간 예약하기</a>
        <a class="btn" href="tel:043-653-2885">전화 문의</a>
        <a class="btn" href="/rooms/${r.num}.html">객실 상세 페이지</a>
        <button class="btn" type="button" data-share="/rooms/${r.num}.html" data-title="미소가든펜션캠핑장 ${esc(r.n)}">🔗 이 방 공유하기</button>
      </div>`,`/rooms/${r.num}.html`);
    if(jump)toVideo();
    return;
  }
  const fb=e.target.closest('[data-fac]');
  if(fb){
    const f=FAC[+fb.dataset.fac];
    open([f.img,...(f.more||[])],`
      <div class="kind">공용시설</div><h3>${esc(f.t)}</h3><p>${esc(f.d)}</p>
      ${f.note?`<p class="fnote">${esc(f.note)}</p>`:''}
      <div class="mspecs">${f.specs.map(([k,v])=>`<div><div class="k">${esc(k)}</div><div class="v">${esc(v)}</div></div>`).join('')}</div>
      ${f.yt?ytHTML(f.yt,jump):''}`);
    if(jump)toVideo();
    return;
  }
  const cb=e.target.closest('[data-camp]');
  if(cb){
    const c=CAMP[+cb.dataset.camp];
    open([c[0],...c[2]],`<div class="kind">캠핑 · 야영</div><h3>${esc(c[1])}</h3>${c[3]?ytHTML(c[3],jump):''}`);
    if(jump)toVideo();
    return;
  }
  const sb=e.target.closest('[data-season]');
  if(sb){
    const s=SEASONS[+sb.dataset.season];
    open(s[2],`<div class="kind">사계절</div><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p>${s[3]?`<p class="fnote">${esc(s[3])}</p>`:''}${s[4]?ytHTML(s[4],jump):''}`);
    if(jump)toVideo();
  }
});

/* ────────── nav · progress · reveal ────────── */
const nav=document.getElementById('nav'),prog=document.getElementById('prog');
addEventListener('scroll',()=>{
  nav.classList.toggle('solid',scrollY>60);
  const h=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(h>0?scrollY/h*100:0)+'%';
},{passive:true});
const io=new IntersectionObserver((es,o)=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}
}),{rootMargin:'0px 0px -8% 0px',threshold:0});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
