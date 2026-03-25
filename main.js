/* ═══════════════════════════════════════════
   PLUGAI — Shared JavaScript
   ═══════════════════════════════════════════ */

// Scroll reveal
document.addEventListener('DOMContentLoaded', function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('vis');
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function(el) { observer.observe(el); });

  // Nav scroll
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  }

  // Tabs
  document.querySelectorAll('[data-tab-group]').forEach(function(group) {
    var gid = group.getAttribute('data-tab-group');
    group.querySelectorAll('.tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        var target = this.getAttribute('data-tab');
        group.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');
        document.querySelectorAll('[data-panel-group="' + gid + '"] .tab-panel').forEach(function(p) {
          p.classList.remove('active');
        });
        var panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('active');
      });
    });
  });

  // Pricing toggle
  var toggleEl = document.getElementById('priceToggle');
  if (toggleEl) {
    toggleEl.addEventListener('click', function() {
      this.classList.toggle('annual');
      var isAnnual = this.classList.contains('annual');
      document.querySelectorAll('[data-monthly]').forEach(function(el) {
        el.textContent = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      });
      document.querySelectorAll('[data-period]').forEach(function(el) {
        el.textContent = isAnnual ? 'per user / year' : 'per user / month';
      });
    });
  }

  // Animated counters
  document.querySelectorAll('[data-count]').forEach(function(el) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          animateCount(el);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
});
