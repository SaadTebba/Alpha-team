/* ==========================================================================
   ALPHA TEAM — Schedule
   Builds the custom timetable from ALPHA_CONFIG.schedule and computes the
   live "next session" (Africa/Casablanca time).
   ========================================================================== */

(function () {
  const CFG = () => window.ALPHA_CONFIG.schedule;
  const t = (k) => window.I18N.t(k);
  const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first
  const reduced = () => document.documentElement.classList.contains('reduced-motion');

  let current = 'taekwondo';
  let els = {};

  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const fmtHour = (min) => { const h = Math.floor(min / 60) % 24; const m = min % 60; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0'); };

  /* Current day/minutes in Tangier, independent of the visitor's timezone */
  function nowInTangier() {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Casablanca', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      const get = (type) => parts.find((p) => p.type === type).value;
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      return { day, min: Number(get('hour')) * 60 + Number(get('minute')) };
    } catch (e) {
      const d = new Date();
      return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  /** Next (or ongoing) session among the given disciplines */
  function nextSession(keys) {
    const sched = CFG();
    const now = nowInTangier();
    keys = (keys || Object.keys(sched)).filter((k) => sched[k]);
    for (let offset = 0; offset < 8; offset++) {
      const day = (now.day + offset) % 7;
      let best = null;
      keys.forEach((key) => {
        const d = sched[key];
        if (!d.days.includes(day)) return;
        d.sessions.forEach(([s, e]) => {
          const sm = toMin(s), em = toMin(e);
          if (offset === 0 && em <= now.min) return;
          if (!best || sm < best.sm) best = { key, day, start: s, end: e, sm, offset, isNow: offset === 0 && sm <= now.min };
        });
      });
      if (best) return best;
    }
    return null;
  }

  function dayLabel(ns) {
    if (ns.offset === 0) return t('sched.today');
    if (ns.offset === 1) return t('sched.tomorrow');
    return t('days.long')[ns.day];
  }

  function updateNextSession() {
    document.querySelectorAll('[data-next-session]').forEach((el) => {
      const inline = el.classList.contains('next-session--inline');
      const keys = inline ? [current] : null;
      const labelEl = el.querySelector('[data-ns-label]');
      const valEl = el.querySelector('[data-ns-value]');
      if (inline && !CFG()[current]) { el.hidden = true; return; }
      el.hidden = false;
      const ns = nextSession(keys);
      if (!ns) { el.hidden = true; return; }
      el.classList.toggle('is-now', ns.isNow);
      labelEl.textContent = ns.isNow ? t('sched.now') : t('sched.next');
      const name = t('d.' + ns.key);
      valEl.textContent = ns.isNow
        ? name + ' · ' + ns.start + '–' + ns.end
        : (inline ? '' : name + ' · ') + dayLabel(ns) + ' ' + ns.start;
    });
  }

  /** Mon→Sun strip; `days` uses 0=Sunday */
  function weekHTML(days, opts = {}) {
    const today = nowInTangier().day;
    const names = t('days.short');
    return WEEK_ORDER.map((d) => {
      const on = days && days.includes(d);
      const cls = ['week__day', on ? 'is-on' : '', d === today ? 'is-today' : ''].join(' ').trim();
      return '<span class="' + cls + '"' + (opts.aria === false ? '' : ' aria-label="' + t('days.long')[d] + (on ? ' ✓' : '') + '"') + '><b>' + names[d] + '</b></span>';
    }).join('');
  }

  function render(key, animate) {
    const data = CFG()[key];
    const board = els.board;
    els.name.textContent = t('d.' + key);
    board.dataset.disc = key;

    if (!data) {
      els.week.innerHTML = weekHTML([]);
      els.count.textContent = '—';
      els.range.textContent = t('disc.onRequest');
      els.timeline.hidden = true;
      els.onrequest.hidden = false;
      updateNextSession();
      if (animate && window.gsap && !reduced()) {
        gsap.fromTo(els.onrequest, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out' });
      }
      return;
    }

    els.timeline.hidden = false;
    els.onrequest.hidden = true;
    els.week.innerHTML = weekHTML(data.days);
    els.count.textContent = data.sessions.length;

    const starts = data.sessions.map((s) => toMin(s[0]));
    const ends = data.sessions.map((s) => toMin(s[1]));
    const axisStart = Math.floor(Math.min(...starts) / 60) * 60;
    const axisEnd = Math.ceil(Math.max(...ends) / 60) * 60;
    const span = axisEnd - axisStart;
    els.range.textContent = fmtHour(axisStart).replace(':00', '') + '–' + data.sessions[data.sessions.length - 1][1];

    /* Axis ticks */
    let ticks = '';
    for (let m = axisStart; m <= axisEnd; m += 60) {
      ticks += '<span style="--p:' + ((m - axisStart) / span * 100).toFixed(3) + '%">' + fmtHour(m) + '</span>';
    }

    /* "Now" marker when today is a training day and we're inside the window */
    const now = nowInTangier();
    const live = data.days.includes(now.day) && now.min >= axisStart && now.min <= axisEnd;
    if (live) ticks += '<i class="timeline__now" style="--p:' + ((now.min - axisStart) / span * 100).toFixed(3) + '%"></i>';
    els.axis.innerHTML = ticks;

    const maxDur = Math.max(...data.sessions.map(([s, e]) => toMin(e) - toMin(s)));
    els.slots.innerHTML = data.sessions.map(([s, e], i) => {
      const sm = toMin(s), em = toMin(e), dur = em - sm;
      const isNow = data.days.includes(now.day) && now.min >= sm && now.min < em;
      return '<li class="slot' + (isNow ? ' is-now' : '') + '" style="--l:' + ((sm - axisStart) / span * 100).toFixed(3) + '%;--w:' + (dur / span * 100).toFixed(3) + '%;--r:' + (dur / maxDur).toFixed(3) + '">' +
        '<span class="slot__n">' + t('sched.session') + ' ' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="slot__time" dir="ltr"><b>' + s + '</b><i>' + e + '</i></span>' +
        '<span class="slot__dur"><span class="slot__bar"></span>' + dur + ' ' + t('sched.min') + '</span>' +
      '</li>';
    }).join('');

    updateNextSession();

    if (animate && window.gsap && !reduced()) {
      const slots = els.slots.children;
      gsap.fromTo(slots, { autoAlpha: 0, y: 40, clipPath: 'inset(100% 0 0 0)' }, {
        autoAlpha: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.8, ease: 'expo.out', stagger: 0.06
      });
      gsap.fromTo(els.week.children, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.03 });
      gsap.fromTo(els.name, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'expo.out' });
    }
  }

  function moveInk() {
    const active = els.tabs.find((b) => b.dataset.sched === current);
    if (!active || !els.ink) return;
    els.ink.style.width = active.offsetWidth + 'px';
    els.ink.style.transform = 'translateX(' + active.offsetLeft + 'px)';
  }

  function select(key, opts = {}) {
    if (!(key in CFG())) return;
    current = key;
    els.tabs.forEach((b) => {
      const on = b.dataset.sched === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on) els.board.setAttribute('aria-labelledby', b.id);
    });
    moveInk();
    render(key, opts.animate !== false);
  }

  function init() {
    const root = document.getElementById('schedule');
    if (!root) return;
    els = {
      root,
      board: root.querySelector('.sched__board'),
      tabs: Array.from(root.querySelectorAll('.sched__tab')),
      ink: root.querySelector('.sched__ink'),
      name: root.querySelector('[data-sched-name]'),
      week: root.querySelector('[data-sched-week]'),
      count: root.querySelector('[data-sched-count]'),
      range: root.querySelector('[data-sched-range]'),
      timeline: root.querySelector('[data-timeline]'),
      axis: root.querySelector('[data-axis]'),
      slots: root.querySelector('[data-slots]'),
      onrequest: root.querySelector('[data-onrequest]')
    };

    els.tabs.forEach((b, i) => {
      b.addEventListener('click', () => select(b.dataset.sched));
      /* Arrow-key navigation between tabs (WAI-ARIA tabs pattern) */
      b.addEventListener('keydown', (e) => {
        const dir = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 }[e.key];
        if (!dir) return;
        e.preventDefault();
        const rtl = window.I18N.isRTL && Math.abs(dir) === 1 ? -1 : 1;
        let n = Math.abs(dir) === 99 ? (dir < 0 ? 0 : els.tabs.length - 1) : (i + dir * rtl + els.tabs.length) % els.tabs.length;
        els.tabs[n].focus();
        select(els.tabs[n].dataset.sched);
      });
    });

    select(current, { animate: false });
    window.addEventListener('resize', moveInk, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
    document.addEventListener('langchange', () => { render(current, false); requestAnimationFrame(moveInk); });
    setInterval(() => { updateNextSession(); }, 60 * 1000);
  }

  window.Schedule = {
    init, select, weekHTML, nextSession, updateNextSession,
    get current() { return current; }
  };
})();
