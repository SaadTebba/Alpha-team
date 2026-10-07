/* ==========================================================================
   ALPHA TEAM — Main App Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core modules initialization
  if (window.I18N) window.I18N.setLang(document.documentElement.lang || 'en', { initial: true });
  if (window.Schedule) window.Schedule.init();
  if (window.Gallery) window.Gallery.init();
  if (window.Media) window.Media.renderAll();

  // 2. Discipline tabs logic
  const items = document.querySelectorAll('.disc__item');
  const panels = document.querySelectorAll('.disc__panel');
  if (items.length && panels.length) {
    items.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        const targetId = item.dataset.target;
        if (!targetId) return;

        items.forEach((i) => i.classList.remove('is-active'));
        item.classList.add('is-active');

        panels.forEach((p) => p.classList.remove('is-active'));
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('is-active');
          if (window.Animations) window.Animations.discSwap(targetPanel);
        }
      });
    });
    // Set initial active state if missing
    if (!document.querySelector('.disc__item.is-active') && items[0]) {
      items[0].classList.add('is-active');
      const targetPanel = document.getElementById(items[0].dataset.target);
      if (targetPanel) targetPanel.classList.add('is-active');
    }
  }

  // 3. Rebuild animations on language change
  document.addEventListener('langchange', (e) => {
    // Media render on lang change if new assets are loaded (optional)
    if (window.Media) window.Media.renderAll();
    
    if (window.Animations && window.Animations.ready && !e.detail.initial) {
      // Small timeout to allow DOM to finish updating texts before recalculating heights
      setTimeout(() => {
        window.Animations.rebuild();
      }, 50);
    }
  });

  // 4. Start motion and loader
  if (window.Animations) {
    window.Animations.init().catch((err) => {
      console.error('[Alpha] Motion init failed:', err);
      fallbackUnlock();
    });
  } else {
    fallbackUnlock();
  }

  function fallbackUnlock() {
    document.body.classList.remove('is-loading');
    document.documentElement.classList.remove('is-locked');
    const loader = document.getElementById('loader');
    if (loader) loader.remove();
  }

  // 5. Mobile Navigation
  // (Assuming we might need a mobile nav toggle if implemented)
  const navBtn = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (navBtn && navLinks) {
    navBtn.addEventListener('click', () => {
      const expanded = navBtn.getAttribute('aria-expanded') === 'true';
      navBtn.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('is-open');
    });
  }
});
