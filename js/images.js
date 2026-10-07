/* ==========================================================================
   ALPHA TEAM — Image configuration (single source of truth)

   HOW TO ADD REAL PHOTOS
   1. Put the photo in /assets/images/ (or use a CDN, Cloudinary or any stable URL).
   2. Paste the path or URL into `src`. While `src` is empty, the site shows a
      designed placeholder labelled with the `file` name it expects.
   3. Optional: `srcset` for responsive sizes, e.g.
        srcset: 'assets/images/hero-800.jpg 800w, assets/images/hero-1600.jpg 1600w'
   4. Optional: `position` sets the crop focus (CSS object-position), e.g. '50% 20%'.
   5. `alt` takes plain text or { en, fr, ar }.

   Avoid hotlinking Instagram CDN URLs. They are signed and expire.
   Download the originals from the club account and host them yourself.
   ========================================================================== */

window.SITE_IMAGES = {
  hero: {
    src: '',
    file: 'hero.jpg',
    position: '50% 30%',
    alt: {
      en: 'Alpha Team athlete training at the club in Tangier',
      fr: 'Athlète de l’Alpha Team à l’entraînement au club, à Tanger',
      ar: 'رياضي من فريق ألفا أثناء التدريب في النادي بطنجة'
    }
  },

  disciplines: {
    taekwondo: {
      src: '',
      file: 'taekwondo.jpg',
      alt: { en: 'Taekwondo training at Alpha Team', fr: 'Entraînement de taekwondo à l’Alpha Team', ar: 'تدريب التايكواندو في فريق ألفا' }
    },
    kickboxing: {
      src: '',
      file: 'kickboxing.jpg',
      alt: { en: 'Kickboxing training at Alpha Team', fr: 'Entraînement de kickboxing à l’Alpha Team', ar: 'تدريب الكيك بوكسينغ في فريق ألفا' }
    },
    boxing: {
      src: '',
      file: 'boxing.jpg',
      alt: { en: 'Boxing training at Alpha Team', fr: 'Entraînement de boxe à l’Alpha Team', ar: 'تدريب الملاكمة في فريق ألفا' }
    }
  },

  coach: {
    src: '',
    file: 'coach-mohamed-elattari.jpg',
    position: '50% 20%',
    alt: {
      en: 'Coach Mohamed Elattari',
      fr: 'Le coach Mohamed Elattari',
      ar: 'المدرب محمد العطاري'
    }
  },

  /* Club life strip. `tag` is a translation key (see js/i18n.js → life.tags). */
  club: [
    { src: '', file: 'club-trip.jpg',      tag: 'trips',     alt: { en: 'Alpha Team members on a club trip', fr: 'Membres de l’Alpha Team en sortie club', ar: 'أعضاء فريق ألفا في رحلة النادي' } },
    { src: '', file: 'club-football.jpg',  tag: 'football',  alt: { en: 'Alpha Team football match', fr: 'Match de foot de l’Alpha Team', ar: 'مباراة كرة قدم لفريق ألفا' } },
    { src: '', file: 'club-outing.jpg',    tag: 'outings',   alt: { en: 'Alpha Team group outing', fr: 'Sortie de groupe de l’Alpha Team', ar: 'خرجة جماعية لفريق ألفا' } },
    { src: '', file: 'club-team.jpg',      tag: 'team',      alt: { en: 'Alpha Team members together', fr: 'Les membres de l’Alpha Team réunis', ar: 'أعضاء فريق ألفا معاً' } },
    { src: '', file: 'club-activity.jpg',  tag: 'activities',alt: { en: 'Alpha Team recreational activity', fr: 'Activité de loisirs de l’Alpha Team', ar: 'نشاط ترفيهي لفريق ألفا' } }
  ]
};

/* --------------------------------------------------------------------------
   GALLERY
   category: 'training' | 'competition' | 'club'
   size (optional layout hint): 'tall' | 'wide' | 'big' | '' (default square)
   -------------------------------------------------------------------------- */
window.galleryImages = [
  { src: '', file: 'gallery/training-01.jpg',    category: 'training',    size: 'big',  alt: 'Taekwondo class at Alpha Team' },
  { src: '', file: 'gallery/competition-01.jpg', category: 'competition', size: 'tall', alt: 'Alpha Team athlete at a competition' },
  { src: '', file: 'gallery/training-02.jpg',    category: 'training',    size: '',     alt: 'Kickboxing pad work' },
  { src: '', file: 'gallery/club-01.jpg',        category: 'club',        size: 'wide', alt: 'Alpha Team members on an outing' },
  { src: '', file: 'gallery/competition-02.jpg', category: 'competition', size: '',     alt: 'Competition day with the Alpha Team' },
  { src: '', file: 'gallery/training-03.jpg',    category: 'training',    size: 'tall', alt: 'Boxing session at Alpha Team' },
  { src: '', file: 'gallery/club-02.jpg',        category: 'club',        size: '',     alt: 'Alpha Team football game' },
  { src: '', file: 'gallery/competition-03.jpg', category: 'competition', size: 'wide', alt: 'Alpha Team athletes after a championship' },
  { src: '', file: 'gallery/training-04.jpg',    category: 'training',    size: '',     alt: 'Young athletes training taekwondo kicks' },
  { src: '', file: 'gallery/club-03.jpg',        category: 'club',        size: 'tall', alt: 'Alpha Team group trip' },
  { src: '', file: 'gallery/training-05.jpg',    category: 'training',    size: '',     alt: 'Coach correcting technique' },
  { src: '', file: 'gallery/competition-04.jpg', category: 'competition', size: '',     alt: 'Alpha Team on the podium' }
];
