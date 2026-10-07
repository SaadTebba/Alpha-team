/* ==========================================================================
   ALPHA TEAM — Motion system (GSAP + ScrollTrigger)

   Motion language:
   - Fast in, hard stop (expo.out / expo.inOut).
   - Diagonal cuts echoing the Alpha triangle (clip-path polygons).
   - Typography rises from masks; images open like shutters.
   Everything is skipped under prefers-reduced-motion. Content is visible
   by default and only hidden by JS right before it animates in.
   ========================================================================== */

(function () {
  const html = document.documentElement;
  const reduced = () => html.classList.contains('reduced-motion');
  const isRTL = () => html.dir === 'rtl';
  const dir = () => (isRTL() ? -1 : 1);
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  let mm = null;
  let heroDone = false;
  let marquees = [];

  /* ---------------- Text splitting (word level → safe for Arabic shaping) ---------------- */
  function splitWords(el, mask) {
    const existing = el.querySelectorAll('.w');
    if (existing.length) return Array.from(existing);
    const out = [];
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            w.textContent = part;
            if (mask) {
              const m = document.createElement('span');
              m.className = 'wm';
              m.appendChild(w);
              frag.appendChild(m);
            } else frag.appendChild(w);
            out.push(w);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) walk(child);
      });
    };
    walk(el);
    return out;
  }

  /* ---------------- Hero geometry ---------------- */
  const FULL = [[0, 0], [100, 0], [100, 100], [0, 100]];
  const poly = (pts) => 'polygon(' + pts.map((p) => p[0] + '% ' + p[1] + '%').join(', ') + ')';
  const isMobile = () => window.matchMedia('(max-width: 767.98px)').matches;

  function heroShape() {
    if (isMobile()) return [[0, 10], [100, 10], [100, 50], [0, 58]];
    return isRTL() ? [[4, 14], [44, 14], [56, 82], [4, 82]] : [[56, 14], [96, 14], [96, 82], [44, 82]];
  }
  /* Collapsed to the leading slanted edge, so the frame "slices" open */
  function heroCollapsed() {
    const s = heroShape();
    if (isMobile()) return [s[0], s[1], s[1], s[0]];
    return isRTL() ? [s[1], s[1], s[2], s[2]] : [s[0], s[0], s[3], s[3]];
  }
  function syncHeroClipVar() {
    html.style.setProperty('--hero-clip', poly(heroShape()));
  }

  /* ---------------- Loader ---------------- */
  function loader() {
    return new Promise((resolve) => {
      const el = $('#loader');
      const finish = () => { document.body.classList.remove('is-loading'); resolve(); };
      if (!el || reduced() || !window.gsap) { if (el) el.remove(); finish(); return; }

      let repeat = false;
      try { repeat = sessionStorage.getItem('alpha-seen') === '1'; sessionStorage.setItem('alpha-seen', '1'); } catch (e) {}
      const dur = repeat ? 0.55 : 1.4;
      const count = $('#loaderCount');
      const paths = $$('.loader__mark path', el);
      const counter = { v: 0 };
      const OPEN = 'polygon(0% 0%, 100% 0%, 100% 115%, 0% 100%)';
      const SHUT = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% -15%)';

      gsap.set($$('.loader__panel', el), { clipPath: OPEN });
      gsap.timeline()
        .from('.loader__word', { yPercent: 110, duration: 0.9, ease: 'expo.out' }, 0)
        .from('.loader__sub', { autoAlpha: 0, y: 10, duration: 0.6 }, 0.2)
        .to(paths, { strokeDashoffset: 0, duration: dur, ease: 'power2.inOut', stagger: 0.1 }, 0)
        .to(counter, {
          v: 100, duration: dur, ease: 'power3.inOut',
          onUpdate: () => { count.textContent = String(Math.round(counter.v)).padStart(3, '0'); }
        }, 0)
        .to('#loaderBar', { scaleX: 1, duration: dur, ease: 'power3.inOut' }, 0)
        .to(paths, { fill: '#40D5EA', duration: 0.25 }, '>-0.1')
        .to('.loader__inner, .loader__foot, .loader__bar', { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, '+=0.05')
        .add(finish, '<0.2')
        .to('.loader__panel--b', { clipPath: SHUT, duration: 0.85, ease: 'expo.inOut' }, '<')
        .to('.loader__panel--a', { clipPath: SHUT, duration: 0.85, ease: 'expo.inOut' }, '<0.1')
        .add(() => el.remove());
    });
  }

  /* ---------------- Hero intro ---------------- */
  function prepareHero() {
    if (reduced()) return;
    gsap.set('.hero__frame', { clipPath: poly(heroCollapsed()) });
    gsap.set('.hero__word span', { yPercent: 105 });
    gsap.set('.hero__statement .line__in', { yPercent: 110 });
    gsap.set('.hero__top, .hero__eyebrow, .hero__lead, .hero__ctas, .hero__next, .hero__scroll', { autoAlpha: 0, y: 24 });
  }

  function heroIntro() {
    return new Promise((resolve) => {
      if (reduced()) { heroDone = true; resolve(); return; }
      gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => { heroDone = true; resolve(); } })
        .to('.hero__frame', { clipPath: poly(heroShape()), duration: 1.5, ease: 'expo.inOut' }, 0)
        .fromTo('.hero__frame .media', { scale: 1.35 }, { scale: 1, duration: 2 }, 0)
        .to('.hero__word span', { yPercent: 0, duration: 1.3, stagger: 0.07 }, 0.25)
        .to('.hero__statement .line__in', { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.5)
        .to('.hero__top, .hero__eyebrow, .hero__lead, .hero__ctas, .hero__next, .hero__scroll', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0.65);
    });
  }

  /* Mouse depth on the hero (desktop only) */
  function heroParallax() {
    if (!finePointer || reduced()) return;
    const media = $('.hero__frame .media');
    const ghost = $('.hero__ghost');
    const word = $('.hero__word');
    if (!media) return;
    const mx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3' });
    const my = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3' });
    const gx = gsap.quickTo(ghost, 'x', { duration: 1.6, ease: 'power3' });
    const wx = gsap.quickTo(word, 'x', { duration: 1.4, ease: 'power3' });
    $('.hero').addEventListener('pointermove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx(nx * -28); my(ny * -18); gx(nx * 40); wx(nx * -12);
    });
  }

  /* ---------------- Marquees ---------------- */
  function buildMarquees() {
    marquees.forEach((m) => m.tween.kill());
    marquees = [];
    $$('[data-marquee]').forEach((track) => {
      let group = track.querySelector(':scope > .mq-group');
      if (!group) {
        group = document.createElement('div');
        group.className = 'mq-group';
        while (track.firstChild) group.appendChild(track.firstChild);
        track.appendChild(group);
      }
      $$(':scope > [data-clone]', track).forEach((n) => n.remove());
      gsap.set(track, { x: 0 });
      const gw = group.getBoundingClientRect().width || 1;
      const half = Math.max(1, Math.ceil(window.innerWidth / gw));
      for (let i = 0; i < half * 2 - 1; i++) {
        const c = group.cloneNode(true);
        c.setAttribute('data-clone', '');
        track.appendChild(c);
      }
      if (reduced()) return;
      const speed = Number(track.dataset.speed || 90); // px per second
      const dist = gw * half;
      const tween = gsap.to(track, { x: dist * -dir(), duration: dist / speed, ease: 'none', repeat: -1 });
      marquees.push({ track, tween });
    });

    /* Scroll velocity briefly accelerates every marquee */
    if (!reduced() && !buildMarquees._st) {
      buildMarquees._st = ScrollTrigger.create({
        onUpdate(self) {
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 500, 5);
          marquees.forEach((m) => {
            gsap.to(m.tween, { timeScale: boost, duration: 0.15, overwrite: true });
            gsap.to(m.tween, { timeScale: 1, duration: 0.9, delay: 0.15, ease: 'power2.out' });
          });
        }
      });
    }

    const ig = $('.ig');
    if (ig && !ig._mq) {
      ig._mq = true;
      ig.addEventListener('mouseenter', () => marquees.forEach((m) => { if (ig.contains(m.track)) gsap.to(m.tween, { timeScale: 3, duration: 0.5 }); }));
      ig.addEventListener('mouseleave', () => marquees.forEach((m) => { if (ig.contains(m.track)) gsap.to(m.tween, { timeScale: 1, duration: 0.8 }); }));
    }
  }

  /* ---------------- Scroll scenes ---------------- */
  function buildScenes() {
    mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 992px)', mobile: '(max-width: 991.98px)' }, (ctx) => {
      if (reduced()) return;
      const { desktop } = ctx.conditions;
      const enter = (trigger, start) => ({ trigger, start: start || 'top 85%', toggleActions: 'play none none none' });

      /* HERO → the frame expands to full bleed while the type disperses */
      const letters = $$('.hero__word span');
      gsap.timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=85%', pin: true, scrub: 0.6, invalidateOnRefresh: true }
      })
        .fromTo('.hero__frame', { clipPath: () => poly(heroShape()) }, { clipPath: poly(FULL), ease: 'none', duration: 1 }, 0)
        .to('.hero__content, .hero__top, .hero__next, .hero__scroll', { y: -90, autoAlpha: 0, ease: 'power1.in', duration: 0.5 }, 0)
        .to(letters, { yPercent: (i) => -30 - i * 8, x: (i) => (i - 2) * 7 + 'vw', autoAlpha: 0, ease: 'power1.in', duration: 0.8 }, 0)
        .to('.hero__shade', { opacity: 0.35, duration: 1 }, 0)
        .to('.hero__ghost', { yPercent: -40, duration: 1 }, 0);

      /* Section heads */
      $$('.sec-head').forEach((h) => {
        gsap.timeline({ scrollTrigger: enter(h, 'top 90%') })
          .from(h.querySelector('.sec-head__line'), { scaleX: 0, duration: 1, ease: 'expo.out' }, 0)
          .from(h.querySelectorAll('.sec-head__idx, .sec-head__label'), { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.08, ease: 'expo.out' }, 0.1);
      });

      /* Titles rise word by word from masks */
      $$('[data-reveal-lines]').forEach((el) => {
        const words = splitWords(el, true);
        gsap.from(words, { yPercent: 115, duration: 1.1, ease: 'expo.out', stagger: 0.05, scrollTrigger: enter(el) });
      });

      /* Masked line groups (coach name, club life, join) */
      const groups = new Set($$('.line__in').filter((l) => !l.closest('.hero')).map((l) => l.closest('h2, p, div')));
      groups.forEach((g) => {
        gsap.from(g.querySelectorAll('.line__in'), {
          yPercent: 115, duration: 1.2, ease: 'expo.out', stagger: 0.1,
          scrollTrigger: g.closest('.life') && desktop ? enter('.life', 'top 70%') : enter(g)
        });
      });

      /* MANIFESTO — words light up as you read */
      const mText = $('.manifesto__text');
      if (mText) {
        const words = splitWords(mText, false);
        gsap.fromTo(words, { opacity: 0.12 }, {
          opacity: 1, ease: 'none', stagger: 0.1,
          scrollTrigger: { trigger: mText, start: 'top 80%', end: 'bottom 45%', scrub: true }
        });
      }
      gsap.set('.pillar', { autoAlpha: 0, y: 60 });
      ScrollTrigger.batch('.pillar', {
        start: 'top 90%', once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true })
      });

      /* DISCIPLINES */
      gsap.timeline({ scrollTrigger: enter('.disc__grid', 'top 80%') })
        .from('.disc__item', { x: -60 * dir(), autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.1 }, 0)
        .from('.disc__shape', { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.1)
        .from('.disc__panel > *', { y: 40, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, 0.4);
      gsap.fromTo('.disc__bg', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.disc', start: 'top bottom', end: 'bottom top', scrub: true } });

      /* SCHEDULE */
      gsap.timeline({ scrollTrigger: enter('.sched__board', 'top 85%') })
        .from('.sched__board', { y: 80, autoAlpha: 0, duration: 1.1, ease: 'expo.out' }, 0)
        .from('[data-slots] .slot', { y: 50, autoAlpha: 0, clipPath: 'inset(100% 0 0 0)', duration: 0.9, ease: 'expo.out', stagger: 0.07, clearProps: 'clipPath' }, 0.25)
        .from('.season', { autoAlpha: 0, y: 20, duration: 0.8, ease: 'expo.out' }, 0.6);

      /* COACH */
      const cMedia = $('.coach__frame .media');
      gsap.timeline({ scrollTrigger: enter('.coach__portrait', 'top 80%') })
        .from(cMedia, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath' }, 0)
        .from('.coach__badge', { scale: 0, rotate: -90, duration: 1, ease: 'back.out(1.6)' }, 0.8);
      gsap.fromTo(cMedia, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.coach', start: 'top bottom', end: 'center center', scrub: true } });
      gsap.fromTo('.coach__vertical', { yPercent: 15 }, { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.coach', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.roles > *', { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.06, ease: 'expo.out', scrollTrigger: enter('.roles') });
      gsap.from('.feat', { autoAlpha: 0, y: 40, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: enter('.feats') });
      $$('[data-count]').forEach((el) => {
        const obj = { v: 0 };
        const target = Number(el.dataset.count);
        gsap.to(obj, { v: target, duration: 1.6, ease: 'power3.out', scrollTrigger: enter(el, 'top 90%'), onUpdate: () => { el.textContent = Math.round(obj.v); } });
      });

      /* CLUB LIFE — pinned horizontal sequence (desktop) */
      const track = $('[data-life-track]');
      if (track && desktop) {
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const progress = $('[data-life-progress]');
        const h = gsap.to(track, {
          x: () => dist() * -dir(), ease: 'none',
          scrollTrigger: {
            trigger: '.life', start: 'top top', end: () => '+=' + dist(), pin: '.life__pin', scrub: 0.8,
            invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (self) => gsap.set(progress, { scaleX: self.progress })
          }
        });
        $$('.lcard').forEach((card) => {
          gsap.fromTo(card.querySelector('.lcard__frame .media'), { xPercent: -7 * dir() }, {
            xPercent: 7 * dir(), ease: 'none',
            scrollTrigger: { trigger: card, containerAnimation: h, start: 'left right', end: 'right left', scrub: true }
          });
          gsap.from(card.querySelector('.lcard__n'), {
            yPercent: 60, autoAlpha: 0, duration: 0.9, ease: 'expo.out',
            scrollTrigger: { trigger: card, containerAnimation: h, start: 'left 85%', toggleActions: 'play none none reverse' }
          });
        });
        gsap.from('.life__end-word', {
          xPercent: 20 * dir(), autoAlpha: 0, ease: 'none',
          scrollTrigger: { trigger: '.life__end', containerAnimation: h, start: 'left right', end: 'left 40%', scrub: true }
        });
      } else if (track) {
        gsap.from('.lcard', { autoAlpha: 0, x: 60 * dir(), duration: 1, ease: 'expo.out', stagger: 0.08, scrollTrigger: enter('.life__cards') });
      }

      /* GALLERY */
      gsap.set('.g-item', { autoAlpha: 0, y: 80 });
      ScrollTrigger.batch('.g-item', {
        start: 'top 92%', once: true,
        onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true })
      });
      gsap.from('.ig__row > *', { autoAlpha: 0, y: 40, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: enter('.ig', 'top 80%') });

      /* LOCATION */
      gsap.fromTo('.loc__city', { xPercent: 8 * dir() }, { xPercent: -8 * dir(), ease: 'none', scrollTrigger: { trigger: '.loc', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.from('.map', { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: enter('.map', 'top 85%') });

      /* JOIN */
      gsap.fromTo('.join__glow', { scale: 0.6, opacity: 0.4 }, { scale: 1.2, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.join', start: 'top bottom', end: 'bottom bottom', scrub: true } });
      gsap.from('.join__kicker', { autoAlpha: 0, y: 20, duration: 0.8, ease: 'expo.out', scrollTrigger: enter('.join__kicker') });
      gsap.from('.crow', { autoAlpha: 0, x: -50 * dir(), duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: enter('.contact-rows') });
      gsap.from('.form', { autoAlpha: 0, y: 60, duration: 1.1, ease: 'expo.out', scrollTrigger: enter('.form') });

      /* FOOTER word rises into place */
      gsap.fromTo('.footer__word', { yPercent: 45 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });

      return () => {};
    });
  }

  /* ---------------- Discipline image swap (called by main.js) ---------------- */
  function discSwap(next) {
    if (!window.gsap || reduced() || !next) return;
    gsap.fromTo(next,
      { clipPath: isRTL() ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut', overwrite: true });
    const img = next.querySelector('img, .media__ph');
    if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'expo.out', overwrite: true });
    gsap.fromTo('.disc__panel > *', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'expo.out', stagger: 0.05, overwrite: true });
  }

  /* ---------------- Cursor ---------------- */
  function cursor() {
    if (!finePointer) return;
    const cur = $('.cursor');
    if (!cur) return;
    html.classList.add('has-cursor');
    const ring = $('.cursor__ring', cur), dot = $('.cursor__dot', cur), label = $('.cursor__label', cur);
    const rDur = reduced() ? 0 : 0.45;
    const rx = gsap.quickTo(ring, 'x', { duration: rDur, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: rDur, ease: 'power3' });
    const dx = gsap.quickTo(dot, 'x', { duration: reduced() ? 0 : 0.08 });
    const dy = gsap.quickTo(dot, 'y', { duration: reduced() ? 0 : 0.08 });
    gsap.set([ring, dot], { x: -100, y: -100 });

    window.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY);
    }, { passive: true });

    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor], a, button, label, input, textarea, select, iframe');
      cur.classList.remove('is-hover', 'is-label', 'is-hidden');
      if (!t) return;
      if (t.matches('input:not([type=radio]), textarea, select, iframe')) { cur.classList.add('is-hidden'); return; }
      const type = t.dataset.cursor;
      if (type && type !== 'hover') {
        label.textContent = window.I18N.t('cursor.' + type);
        cur.classList.add('is-label');
      } else cur.classList.add('is-hover');
    });
    document.documentElement.addEventListener('pointerleave', () => cur.classList.add('is-hidden'));
    document.documentElement.addEventListener('pointerenter', () => cur.classList.remove('is-hidden'));
  }

  /* ---------------- Magnetic buttons ---------------- */
  function magnetic() {
    if (!finePointer || reduced()) return;
    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.32);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ---------------- Public API ---------------- */
  async function init() {
    if (!window.gsap || !window.ScrollTrigger) {
      document.body.classList.remove('is-loading');
      const l = $('#loader'); if (l) l.remove();
      return;
    }
    gsap.registerPlugin(ScrollTrigger, window.ScrollToPlugin);
    ScrollTrigger.config({ ignoreMobileResize: true });
    syncHeroClipVar();
    prepareHero();
    cursor();
    magnetic();

    await loader();
    buildMarquees();
    await heroIntro();
    heroParallax();
    buildScenes();
    ScrollTrigger.refresh();
    document.dispatchEvent(new CustomEvent('motionready'));

    let w = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth === w) return; // ignore mobile URL-bar height changes
      w = window.innerWidth;
      syncHeroClipVar();
      clearTimeout(init._t);
      init._t = setTimeout(buildMarquees, 200);
    });
  }

  /* Rebuild after a language switch (text and direction changed) */
  function rebuild() {
    if (!window.gsap) return;
    syncHeroClipVar();
    if (heroDone && !reduced()) gsap.set('.hero__frame', { clipPath: poly(heroShape()) });
    buildMarquees();
    if (mm) {
      mm.revert();
      buildScenes();
    }
    ScrollTrigger.refresh();
  }

  window.Animations = { init, rebuild, discSwap, splitWords, get ready() { return heroDone; } };
})();
