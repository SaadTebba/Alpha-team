/* ==========================================================================
   ALPHA TEAM — Gallery (editorial grid + filters + fullscreen viewer)
   Image data lives in js/images.js → window.galleryImages
   ========================================================================== */

(function () {
  const t = (k) => window.I18N.t(k);
  const reduced = () => document.documentElement.classList.contains('reduced-motion');
  let items = [];
  let visible = [];
  let index = 0;
  let lastFocus = null;
  let grid, lb;

  function build() {
    grid = document.getElementById('galleryGrid');
    if (!grid) return;
    const data = window.galleryImages || [];
    grid.innerHTML = '';
    items = data.map((img, i) => {
      const li = document.createElement('li');
      li.className = 'g-item' + (img.size ? ' g-item--' + img.size : '');
      li.dataset.cat = img.category || 'training';
      li.innerHTML =
        '<button type="button" class="g-item__btn" data-cursor="view">' +
          '<figure class="media g-item__media"></figure>' +
          '<span class="g-item__meta"><span class="g-item__cat"></span><span class="g-item__n" dir="ltr">' + String(i + 1).padStart(2, '0') + '</span></span>' +
        '</button>';
      grid.appendChild(li);
      Media.render(li.querySelector('.media'), img, { sizes: '(min-width: 992px) 33vw, (min-width: 576px) 50vw, 100vw' });
      li.querySelector('button').addEventListener('click', () => open(visible.indexOf(li)));
      return { el: li, data: img };
    });
    visible = items.map((i) => i.el);
    label();
    counts();
  }

  function label() {
    items.forEach(({ el, data }) => {
      el.querySelector('.g-item__cat').textContent = t('gallery.' + el.dataset.cat);
      el.querySelector('button').setAttribute('aria-label', t('gallery.view') + ': ' + Media.altText(data));
    });
  }

  function counts() {
    const c = { all: items.length };
    items.forEach(({ el }) => { c[el.dataset.cat] = (c[el.dataset.cat] || 0) + 1; });
    document.querySelectorAll('[data-count-for]').forEach((s) => { s.textContent = c[s.dataset.countFor] || 0; });
  }

  function filter(cat) {
    document.querySelectorAll('.filter').forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const apply = () => {
      visible = [];
      items.forEach(({ el }) => {
        const show = cat === 'all' || el.dataset.cat === cat;
        el.hidden = !show;
        if (show) visible.push(el);
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    };
    if (!window.gsap || reduced()) return apply();
    gsap.to(grid, {
      autoAlpha: 0, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        apply();
        gsap.set(grid, { y: 0 });
        gsap.to(grid, { autoAlpha: 1, duration: 0.2 });
        gsap.fromTo(visible, { autoAlpha: 0, y: 60, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'transform' });
      }
    });
  }

  /* ---------------- Lightbox ---------------- */
  function show(i) {
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    const item = items.find((it) => it.el === visible[index]);
    const media = lb.querySelector('[data-lb-media]');
    Media.render(media, item.data, { eager: true, sizes: '100vw' });
    lb.querySelector('[data-lb-cat]').textContent = t('gallery.' + item.el.dataset.cat);
    lb.querySelector('[data-lb-alt]').textContent = Media.altText(item.data);
    lb.querySelector('[data-lb-count]').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(visible.length).padStart(2, '0');
    if (window.gsap && !reduced()) {
      gsap.fromTo(media, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'expo.out' });
    }
  }

  function open(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.documentElement.classList.add('is-locked');
    show(i);
    if (window.gsap && !reduced()) {
      gsap.fromTo(lb, { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: 0.7, ease: 'expo.inOut' });
    }
    lb.querySelector('.lightbox__close').focus();
    document.addEventListener('keydown', onKey);
  }

  function close() {
    const done = () => {
      lb.hidden = true;
      document.documentElement.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      if (lastFocus) lastFocus.focus();
    };
    if (window.gsap && !reduced()) {
      gsap.to(lb, { clipPath: 'inset(50% 0 50% 0)', duration: 0.5, ease: 'expo.in', onComplete: done });
    } else done();
  }

  function onKey(e) {
    const rtl = window.I18N.isRTL;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(index + (rtl ? -1 : 1));
    else if (e.key === 'ArrowLeft') show(index + (rtl ? 1 : -1));
    else if (e.key === 'Tab') {
      /* Focus trap */
      const f = Array.from(lb.querySelectorAll('button'));
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function initLightbox() {
    lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.querySelectorAll('[data-lb-close]').forEach((b) => b.addEventListener('click', close));
    lb.querySelector('[data-lb-prev]').addEventListener('click', () => show(index - 1));
    lb.querySelector('[data-lb-next]').addEventListener('click', () => show(index + 1));
    /* Touch swipe */
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1) * (window.I18N.isRTL ? -1 : 1));
      x0 = null;
    });
  }

  function init() {
    build();
    initLightbox();
    document.querySelectorAll('.filter').forEach((b) => b.addEventListener('click', () => filter(b.dataset.filter)));
    document.addEventListener('langchange', label);
  }

  window.Gallery = { init, filter, open, close };
})();
