/* TEMPRALL — miglioramenti progressivi: il sito funziona anche senza questo file. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function () {
    /* Ombra dell'header allo scroll */
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* Comparsa progressiva dei contenuti */
    var targets = document.querySelectorAll([
      '.section-heading', '.gallery-heading', '.split > *', '.service-card', '.number-card', '.sector-grid > div',
      '.timeline-item', '.directory-card', '.person-card', '.fleet-card', '.estimate-goal-card', '.thermal-note-card',
      '.qc-test-card', '.partner-card', '.partner-grid > div', '.machine-card', '.gallery-card', '.qc-figure',
      '.furnace-btn', '.map-legend-card', '.quality-box', '.map-layout', '.map-box', '.transport-process-box',
      '.estimate-process-box', '.qc-doc-box', '.qc-cert-grid > *', '.qc-policy-box', '.estimate-cta',
      '.work-feature-grid > *', '.work-process-box', '.thermal-card', '.furnaces-card', '.production-map-photo',
      '.contact-card', '.furnace-compact-photo', '.furnace-compact-info', '.furnace-meta li'
    ].join(','));

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (el) {
      /* scaglionamento tra elementi fratelli visibili insieme */
      var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(siblings, 8) * 70 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  });
})();
