// Zach Mair portfolio: small bits of behaviour, nothing required for the content to work.
document.documentElement.classList.add('js');

// 1. Missing images: show a neat placeholder with the expected file name
//    instead of a broken-image icon. Upload the file and it appears automatically.
document.querySelectorAll('img[data-placeholder]').forEach(function (img) {
  function showPlaceholder() {
    var box = document.createElement('div');
    box.className = 'img-missing';
    box.innerHTML = '<span>' + img.getAttribute('data-placeholder') + '</span>';
    img.replaceWith(box);
  }
  if (img.complete && img.naturalWidth === 0) showPlaceholder();
  else img.addEventListener('error', showPlaceholder);
});

// 2. Mobile menu
var toggle = document.querySelector('.menu-toggle');
var nav = document.getElementById('site-nav');
toggle.addEventListener('click', function () {
  var open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'Close' : 'Menu';
});
nav.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  });
});

// 3. Gentle fade-in as sections scroll into view (runs once per element)
var targets = document.querySelectorAll('.reveal, .section-head');
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function (el) { io.observe(el); });
} else {
  targets.forEach(function (el) { el.classList.add('is-in'); });
}
