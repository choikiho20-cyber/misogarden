// 공유 버튼 — data-share 가 붙은 버튼을 누르면 휴대폰은 카톡 등 공유 창, PC는 링크 복사.
// data-share="" 이면 지금 페이지(canonical) 주소, "/rooms/7.html" 처럼 주면 그 주소.
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-share]');
  if (!b) return;
  var c = document.querySelector('link[rel=canonical]');
  var u = b.getAttribute('data-share') ? new URL(b.getAttribute('data-share'), location.href).href : (c ? c.href : location.href);
  var t = b.getAttribute('data-title') || document.title, label = b.textContent;
  if (navigator.share) { navigator.share({ title: t, url: u }).catch(function () {}); return; }
  (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function () {
    b.textContent = '링크가 복사되었습니다 ✓';
    setTimeout(function () { b.textContent = label; }, 2000);
  }, function () { prompt('링크를 길게 눌러 복사하세요', u); });
});
