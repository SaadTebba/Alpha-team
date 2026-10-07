/* ==========================================================================
   ALPHA TEAM — Media renderer
   Fills every [data-media="path.in.SITE_IMAGES"] slot from js/images.js.
   Empty or broken sources fall back to a designed placeholder.
   ========================================================================== */

(function () {
  const resolve = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  function altText(cfg) {
    if (!cfg || !cfg.alt) return '';
    if (typeof cfg.alt === 'string') return cfg.alt;
    const lang = window.I18N ? I18N.lang : 'en';
    return cfg.alt[lang] || cfg.alt.en || '';
  }

  function placeholder(el, cfg) {
    el.classList.add('media--empty');
    el.classList.remove('is-loaded');
    const label = window.I18N ? I18N.t('media.slot') : 'Photo slot';
    el.innerHTML =
      '<div class="media__ph" role="img" aria-label="' + escapeAttr(altText(cfg)) + '">' +
        '<svg class="media__ph-mark" aria-hidden="true"><use href="#i-mark"/></svg>' +
        '<span class="media__ph-label">' + label + '</span>' +
        (cfg && cfg.file ? '<span class="media__ph-file" dir="ltr">' + cfg.file + '</span>' : '') +
      '</div>';
  }

  function escapeAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  /**
   * Render an image config into a container.
   * @param {HTMLElement} el
   * @param {Object} cfg  { src, srcset?, sizes?, alt, position?, width?, height?, file? }
   * @param {Object} opts { eager?: boolean, sizes?: string }
   */
  function render(el, cfg, opts = {}) {
    if (!el) return;
    el._mediaCfg = cfg;
    if (!cfg || !cfg.src) return placeholder(el, cfg);

    el.classList.remove('media--empty');
    const img = new Image();
    img.alt = altText(cfg);
    img.decoding = 'async';
    img.loading = opts.eager ? 'eager' : 'lazy';
    if (opts.eager) img.fetchPriority = 'high';
    if (cfg.width) img.width = cfg.width;
    if (cfg.height) img.height = cfg.height;
    if (cfg.srcset) {
      img.srcset = cfg.srcset;
      img.sizes = cfg.sizes || opts.sizes || '100vw';
    }
    if (cfg.position) img.style.objectPosition = cfg.position;
    img.addEventListener('load', () => el.classList.add('is-loaded'), { once: true });
    img.addEventListener('error', () => placeholder(el, cfg), { once: true });
    img.src = cfg.src;
    el.innerHTML = '';
    el.appendChild(img);
  }

  function renderAll() {
    document.querySelectorAll('[data-media]').forEach((el) => {
      const cfg = resolve(window.SITE_IMAGES || {}, el.dataset.media);
      render(el, cfg, { eager: el.dataset.media === 'hero', sizes: el.dataset.sizes });
    });
  }

  /* Update alt text / placeholder labels when the language changes */
  function relabel() {
    document.querySelectorAll('.media').forEach((el) => {
      const cfg = el._mediaCfg;
      if (!cfg) return;
      const img = el.querySelector('img');
      if (img) img.alt = altText(cfg);
      else if (el.classList.contains('media--empty')) placeholder(el, cfg);
    });
  }

  document.addEventListener('langchange', relabel);

  window.Media = { render, renderAll, altText };
})();
