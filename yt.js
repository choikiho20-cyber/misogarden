// 유튜브는 누를 때 불러온다 — 처음엔 썸네일만 보여 줘서 영상 하나당 플레이어 약 1~2MB를 아낀다 (휴대폰 첫 화면 속도).
// 표시: <a class="ytf" href="https://youtu.be/ID" data-yt="ID" data-title="제목">…썸네일…</a>  (스크립트가 없어도 유튜브로 열림)
document.addEventListener('click', function (e) {
  var a = e.target.closest('a.ytf[data-yt]');
  if (!a) return;
  e.preventDefault();
  var f = document.createElement('iframe');
  f.src = 'https://www.youtube-nocookie.com/embed/' + a.getAttribute('data-yt') + '?rel=0&playsinline=1&autoplay=1';
  f.title = a.getAttribute('data-title') || '영상';
  f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  f.allowFullscreen = true;
  a.replaceWith(f);
});
