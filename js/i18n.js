/* ==========================================================================
   ALPHA TEAM — Translations (EN default · FR · AR/RTL)

   Edit any text here. Keys match the `data-i18n` attributes in index.html.
   - data-i18n="key"             → sets textContent
   - data-i18n-html="key"        → sets innerHTML (only for trusted strings below)
   - data-i18n-attr="attr:key;…" → sets attributes (aria-label, title, placeholder…)
   ========================================================================== */

(function () {
  const translations = {
    /* ------------------------------------------------------------------ EN */
    en: {
      meta: {
        title: 'ALPHA TEAM — Taekwondo, Kickboxing & Boxing in Tangier',
        description: 'Alpha Team (Alpha de Développement Sportif) — taekwondo, kickboxing and boxing club in Achouhadaa, Tangier. Led by Moroccan champion Mohamed Elattari. See the schedule and join the team.'
      },
      skip: 'Skip to content',
      nav: { club: 'Club', disciplines: 'Disciplines', schedule: 'Schedule', coach: 'Coach', life: 'Club life', gallery: 'Gallery', location: 'Location' },
      menu: { open: 'Open menu', close: 'Close menu' },
      cta: { join: 'Join the team', schedule: 'View schedule' },
      d: { taekwondo: 'Taekwondo', kickboxing: 'Kickboxing', boxing: 'Boxing' },
      days: {
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      },
      hero: {
        place: 'Tangier — Morocco',
        h1: 'ALPHA TEAM — Taekwondo, kickboxing and boxing club in Tangier',
        s1: 'Discipline',
        s2: 'in motion.',
        lead: 'Taekwondo, kickboxing and boxing in Tangier. Athletic development and competition preparation, led by Moroccan champion Mohamed Elattari.',
        scroll: 'Scroll'
      },
      band: { city: 'Tangier' },
      manifesto: {
        label: 'The Alpha code',
        text: 'Not a gym you visit. A <em>team</em> you belong to. Technique first, <em>discipline</em> every session, <em>competition</em> when you\u2019re ready — and people behind you every step of the way.'
      },
      p: {
        '1t': 'Training', '1d': 'Structured sessions, six days a week.',
        '2t': 'Discipline', '2d': 'Respect, punctuality, consistency. On the mat and off it.',
        '3t': 'Technique', '3d': 'Fundamentals, repeated until they become instinct.',
        '4t': 'Competition', '4d': 'Championship preparation, with additional sessions in competition season.',
        '5t': 'Growth', '5d': 'Athletic development you can see, session after session.',
        '6t': 'Community', '6d': 'Trips, outings, football — a team beyond training.'
      },
      disc: {
        label: 'Disciplines',
        title: 'Three disciplines. One standard.',
        days: 'Training days',
        perDay: 'Sessions per day',
        schedule: 'Schedule',
        onRequest: 'On request',
        cta: 'See the timetable',
        ctaBox: 'Ask for the schedule',
        desc: {
          taekwondo: 'The Olympic kicking art and the foundation of Coach Elattari\u2019s career. Speed, range, precision and control — from first class to competition mat.',
          kickboxing: 'Punches and kicks, combined. Timing, conditioning and composure under pressure. Evening sessions that run late, made for those who train after school or work.',
          boxing: 'Hands, footwork, head movement. Boxing is part of the Alpha programme — contact the club for the current schedule.'
        }
      },
      sched: {
        label: 'Timetable',
        title: 'Six days a week on the mat.',
        intro: 'Taekwondo on Tuesdays, Thursdays and Saturdays. Kickboxing on Mondays, Wednesdays and Fridays. Pick your slot.',
        daily: 'Daily sessions',
        window: 'Training window',
        session: 'Session',
        min: 'min',
        boxTitle: 'Schedule on request',
        boxText: 'Boxing is part of the Alpha programme. Call or message the club for the current timetable.',
        seasonT: 'Competition season',
        seasonD: 'Additional sessions may be organised during championship preparation.',
        tz: 'All times are local (Tangier).',
        next: 'Next session',
        now: 'On the mat now',
        today: 'Today',
        tomorrow: 'Tomorrow',
        contact: 'Contact the club'
      },
      coach: {
        label: 'Head coach',
        first: 'Mohamed',
        last: 'Elattari',
        r1: 'Head coach', r2: 'Athlete', r3: 'Competitor', r4: 'Mentor',
        bio: 'Mohamed Elattari is a Moroccan athlete and experienced martial artist — Moroccan championship titles, multiple competitive titles throughout his career, and 6th place at the Junior Olympics in taekwondo.',
        th: 'th',
        f1: 'Junior Olympics · Taekwondo',
        f2big: 'Champion',
        f2: 'Moroccan championship titles',
        f3big: 'Titles',
        f3: 'Multiple competitive titles throughout his career',
        line: 'Experience from the competition mat — passed on, session by session.',
        cta: 'Train with the coach'
      },
      life: {
        label: 'Club life',
        l1: 'Train together.',
        l2: 'Compete together.',
        l3: 'Stay together.',
        lead: 'Alpha doesn\u2019t stop at the gym door. Trips, outings, football matches and group activities — the people you train with become the people you spend your time with.',
        hint: 'Keep scrolling',
        word: 'Together',
        end: 'Your team is waiting.',
        tags: { trips: 'Trips', football: 'Football', outings: 'Outings', team: 'One team', activities: 'Activities' }
      },
      gallery: {
        label: 'Gallery',
        title: 'Straight from the mat.',
        all: 'All', training: 'Training', competition: 'Competition', club: 'Club life',
        view: 'View image'
      },
      ig: {
        title: 'Every round. Posted.',
        text: 'Training, fight days and club life — follow the team.',
        posts: 'Posts', followers: 'Followers',
        cta: 'Follow @alphateamfight'
      },
      loc: {
        city: 'Tangier',
        label: 'Location',
        title: 'Find us in Tangier.',
        address: 'Address',
        cityLine: 'Tangier, Morocco',
        phone: 'Phone',
        dir: 'Get directions',
        call: 'Call',
        open: 'Open in Google Maps',
        mapTitle: 'Map: ALPHA TEAM, Achouhadaa, Tangier'
      },
      join: {
        label: 'Join',
        kicker: 'Ready to train?',
        t1: 'Join',
        t2: 'Alpha.',
        lead: 'Call, message or walk in. Tell us which discipline you\u2019re interested in — we\u2019ll tell you when to show up.',
        waSub: 'Message the club',
        visit: 'Visit',
        waText: 'Hello Alpha Team! I would like information about training.'
      },
      form: {
        title: 'Send a message',
        name: 'Your name',
        phone: 'Phone (optional)',
        discipline: 'Discipline',
        unsure: 'Not sure yet',
        message: 'Message — age, experience, goals',
        error: 'Please enter your name.',
        submit: 'Send via WhatsApp',
        note: 'Opens WhatsApp with your message ready to send. Nothing is stored on this site.',
        tpl: { hello: 'Hello Alpha Team!', name: 'Name', phone: 'Phone', discipline: 'Discipline', message: 'Message' }
      },
      footer: {
        tag: 'Taekwondo · Kickboxing · Boxing — Tangier',
        explore: 'Explore', contact: 'Contact',
        rights: 'All rights reserved.', top: 'Back to top'
      },
      lb: { close: 'Close', prev: 'Previous image', next: 'Next image' },
      media: { slot: 'Photo slot' },
      cursor: { view: 'View', drag: 'Drag', open: 'Open' }
    },

    /* ------------------------------------------------------------------ FR */
    fr: {
      meta: {
        title: 'ALPHA TEAM — Taekwondo, Kickboxing & Boxe à Tanger',
        description: 'Alpha Team (Alpha de Développement Sportif) — club de taekwondo, kickboxing et boxe à Achouhadaa, Tanger. Encadré par le champion du Maroc Mohamed Elattari. Consultez les horaires et rejoignez l’équipe.'
      },
      skip: 'Aller au contenu',
      nav: { club: 'Le club', disciplines: 'Disciplines', schedule: 'Horaires', coach: 'Coach', life: 'Vie du club', gallery: 'Galerie', location: 'Accès' },
      menu: { open: 'Ouvrir le menu', close: 'Fermer le menu' },
      cta: { join: 'Rejoindre l’équipe', schedule: 'Voir les horaires' },
      d: { taekwondo: 'Taekwondo', kickboxing: 'Kickboxing', boxing: 'Boxe' },
      days: {
        short: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        long: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
      },
      hero: {
        place: 'Tanger — Maroc',
        h1: 'ALPHA TEAM — Club de taekwondo, kickboxing et boxe à Tanger',
        s1: 'La discipline',
        s2: 'en mouvement.',
        lead: 'Taekwondo, kickboxing et boxe à Tanger. Développement athlétique et préparation à la compétition, sous la direction du champion du Maroc Mohamed Elattari.',
        scroll: 'Défiler'
      },
      band: { city: 'Tanger' },
      manifesto: {
        label: 'Le code Alpha',
        text: 'Pas une salle où l’on passe. Une <em>équipe</em> à laquelle on appartient. La technique d’abord, la <em>discipline</em> à chaque séance, la <em>compétition</em> quand vous êtes prêt — et des gens derrière vous à chaque étape.'
      },
      p: {
        '1t': 'Entraînement', '1d': 'Des séances structurées, six jours par semaine.',
        '2t': 'Discipline', '2d': 'Respect, ponctualité, régularité. Sur le tapis comme en dehors.',
        '3t': 'Technique', '3d': 'Les fondamentaux, répétés jusqu’à devenir des réflexes.',
        '4t': 'Compétition', '4d': 'Préparation aux championnats, avec des séances supplémentaires en saison.',
        '5t': 'Progression', '5d': 'Un développement athlétique qui se voit, séance après séance.',
        '6t': 'Communauté', '6d': 'Sorties, voyages, foot — une équipe au-delà de l’entraînement.'
      },
      disc: {
        label: 'Disciplines',
        title: 'Trois disciplines. Une exigence.',
        days: 'Jours d’entraînement',
        perDay: 'Séances par jour',
        schedule: 'Horaires',
        onRequest: 'Sur demande',
        cta: 'Voir les horaires',
        ctaBox: 'Demander les horaires',
        desc: {
          taekwondo: 'L’art olympique des coups de pied, au cœur de la carrière du coach Elattari. Vitesse, distance, précision et contrôle — du premier cours jusqu’au tapis de compétition.',
          kickboxing: 'Poings et pieds, combinés. Timing, condition physique et sang-froid sous pression. Des séances tard le soir, pensées pour ceux qui s’entraînent après les cours ou le travail.',
          boxing: 'Les poings, les appuis, le travail de tête. La boxe fait partie du programme Alpha — contactez le club pour connaître les horaires actuels.'
        }
      },
      sched: {
        label: 'Planning',
        title: 'Six jours par semaine sur le tapis.',
        intro: 'Taekwondo les mardis, jeudis et samedis. Kickboxing les lundis, mercredis et vendredis. Choisissez votre créneau.',
        daily: 'Séances par jour',
        window: 'Plage horaire',
        session: 'Séance',
        min: 'min',
        boxTitle: 'Horaires sur demande',
        boxText: 'La boxe fait partie du programme Alpha. Appelez ou écrivez au club pour connaître le planning actuel.',
        seasonT: 'Saison de compétition',
        seasonD: 'Des séances supplémentaires peuvent être organisées pendant la préparation aux championnats.',
        tz: 'Horaires à l’heure locale (Tanger).',
        next: 'Prochaine séance',
        now: 'Séance en cours',
        today: 'Aujourd’hui',
        tomorrow: 'Demain',
        contact: 'Contactez le club'
      },
      coach: {
        label: 'Entraîneur principal',
        first: 'Mohamed',
        last: 'Elattari',
        r1: 'Entraîneur', r2: 'Athlète', r3: 'Compétiteur', r4: 'Mentor',
        bio: 'Mohamed Elattari est un athlète marocain et un pratiquant d’arts martiaux expérimenté — titres de champion du Maroc, plusieurs titres en compétition tout au long de sa carrière, et une 6e place aux Jeux olympiques juniors en taekwondo.',
        th: 'e',
        f1: 'Jeux olympiques juniors · Taekwondo',
        f2big: 'Champion',
        f2: 'Titres de champion du Maroc',
        f3big: 'Titres',
        f3: 'Plusieurs titres en compétition au cours de sa carrière',
        line: 'L’expérience du tapis de compétition — transmise, séance après séance.',
        cta: 'S’entraîner avec le coach'
      },
      life: {
        label: 'Vie du club',
        l1: 'On s’entraîne ensemble.',
        l2: 'On combat ensemble.',
        l3: 'On reste ensemble.',
        lead: 'Chez Alpha, tout ne s’arrête pas à la porte de la salle. Voyages, sorties, matchs de foot et activités de groupe — ceux avec qui vous vous entraînez deviennent ceux avec qui vous passez votre temps.',
        hint: 'Continuez à défiler',
        word: 'Ensemble',
        end: 'Votre équipe vous attend.',
        tags: { trips: 'Voyages', football: 'Football', outings: 'Sorties', team: 'Une équipe', activities: 'Activités' }
      },
      gallery: {
        label: 'Galerie',
        title: 'Directement du tapis.',
        all: 'Tout', training: 'Entraînement', competition: 'Compétition', club: 'Vie du club',
        view: 'Voir l’image'
      },
      ig: {
        title: 'Chaque round. En ligne.',
        text: 'Entraînements, jours de combat et vie du club — suivez l’équipe.',
        posts: 'Publications', followers: 'Abonnés',
        cta: 'Suivre @alphateamfight'
      },
      loc: {
        city: 'Tanger',
        label: 'Accès',
        title: 'Retrouvez-nous à Tanger.',
        address: 'Adresse',
        cityLine: 'Tanger, Maroc',
        phone: 'Téléphone',
        dir: 'Itinéraire',
        call: 'Appeler',
        open: 'Ouvrir dans Google Maps',
        mapTitle: 'Carte : ALPHA TEAM, Achouhadaa, Tanger'
      },
      join: {
        label: 'Inscription',
        kicker: 'Prêt à t’entraîner ?',
        t1: 'Rejoins',
        t2: 'Alpha.',
        lead: 'Appelez, écrivez-nous ou passez au club. Dites-nous quelle discipline vous intéresse — on vous dira quand venir.',
        waSub: 'Écrire au club',
        visit: 'Venir',
        waText: 'Bonjour Alpha Team ! J’aimerais avoir des informations sur les entraînements.'
      },
      form: {
        title: 'Envoyer un message',
        name: 'Votre nom',
        phone: 'Téléphone (facultatif)',
        discipline: 'Discipline',
        unsure: 'Je ne sais pas encore',
        message: 'Message — âge, expérience, objectifs',
        error: 'Merci d’indiquer votre nom.',
        submit: 'Envoyer via WhatsApp',
        note: 'Ouvre WhatsApp avec votre message prêt à envoyer. Aucune donnée n’est enregistrée sur ce site.',
        tpl: { hello: 'Bonjour Alpha Team !', name: 'Nom', phone: 'Téléphone', discipline: 'Discipline', message: 'Message' }
      },
      footer: {
        tag: 'Taekwondo · Kickboxing · Boxe — Tanger',
        explore: 'Explorer', contact: 'Contact',
        rights: 'Tous droits réservés.', top: 'Haut de page'
      },
      lb: { close: 'Fermer', prev: 'Image précédente', next: 'Image suivante' },
      media: { slot: 'Emplacement photo' },
      cursor: { view: 'Voir', drag: 'Glisser', open: 'Ouvrir' }
    },

    /* ------------------------------------------------------------------ AR */
    ar: {
      meta: {
        title: 'ALPHA TEAM — تايكواندو، كيك بوكسينغ وملاكمة في طنجة',
        description: 'فريق ألفا (ألفا للتنمية الرياضية) — نادي للتايكواندو والكيك بوكسينغ والملاكمة بحي الشهداء في طنجة، بإشراف بطل المغرب محمد العطاري. اطّلع على المواعيد وانضم إلى الفريق.'
      },
      skip: 'انتقل إلى المحتوى',
      nav: { club: 'النادي', disciplines: 'الرياضات', schedule: 'المواعيد', coach: 'المدرب', life: 'حياة النادي', gallery: 'الصور', location: 'الموقع' },
      menu: { open: 'فتح القائمة', close: 'إغلاق القائمة' },
      cta: { join: 'انضم إلى الفريق', schedule: 'المواعيد' },
      d: { taekwondo: 'تايكواندو', kickboxing: 'كيك بوكسينغ', boxing: 'ملاكمة' },
      days: {
        short: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
        long: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
      },
      hero: {
        place: 'طنجة — المغرب',
        h1: 'فريق ألفا — نادي التايكواندو والكيك بوكسينغ والملاكمة في طنجة',
        s1: 'انضباطٌ',
        s2: 'في كل حركة.',
        lead: 'تايكواندو، كيك بوكسينغ وملاكمة في طنجة. تنمية بدنية وإعداد للمنافسات بإشراف بطل المغرب محمد العطاري.',
        scroll: 'مرّر'
      },
      band: { city: 'طنجة' },
      manifesto: {
        label: 'ميثاق ألفا',
        text: 'لسنا قاعة تزورها ثم ترحل، بل <em>فريق</em> تنتمي إليه. التقنية أولاً، و<em>الانضباط</em> في كل حصة، و<em>المنافسة</em> حين تكون مستعداً — وأناسٌ يقفون إلى جانبك في كل خطوة.'
      },
      p: {
        '1t': 'التدريب', '1d': 'حصص منظّمة، ستة أيام في الأسبوع.',
        '2t': 'الانضباط', '2d': 'احترام، دقة في المواعيد، ومواظبة. داخل البساط وخارجه.',
        '3t': 'التقنية', '3d': 'الأساسيات، نكرّرها حتى تصبح ردّ فعل طبيعي.',
        '4t': 'المنافسة', '4d': 'إعداد للبطولات، مع حصص إضافية في موسم المنافسات.',
        '5t': 'التطوّر', '5d': 'تطوّر بدني ملموس، حصة بعد حصة.',
        '6t': 'الجماعة', '6d': 'رحلات، خرجات، كرة قدم — فريق يتجاوز التدريب.'
      },
      disc: {
        label: 'الرياضات',
        title: 'ثلاث رياضات. معيار واحد.',
        days: 'أيام التدريب',
        perDay: 'حصص في اليوم',
        schedule: 'المواعيد',
        onRequest: 'عند الطلب',
        cta: 'اطّلع على المواعيد',
        ctaBox: 'اسأل عن المواعيد',
        desc: {
          taekwondo: 'فن الركلات الأولمبي، وأساس المسيرة الرياضية للمدرب العطاري. سرعة، مسافة، دقة وتحكّم — من الحصة الأولى إلى بساط المنافسة.',
          kickboxing: 'لكمات وركلات في آنٍ واحد. توقيت، لياقة بدنية وهدوء تحت الضغط. حصص مسائية تمتد إلى وقت متأخر، تناسب من يتدرّب بعد الدراسة أو العمل.',
          boxing: 'اليدان، حركة القدمين، وتفادي الضربات. الملاكمة جزء من برنامج ألفا — تواصل مع النادي لمعرفة المواعيد الحالية.'
        }
      },
      sched: {
        label: 'جدول الحصص',
        title: 'ستة أيام في الأسبوع على البساط.',
        intro: 'التايكواندو أيام الثلاثاء والخميس والسبت. الكيك بوكسينغ أيام الإثنين والأربعاء والجمعة. اختر الحصة التي تناسبك.',
        daily: 'حصص يومية',
        window: 'فترة التدريب',
        session: 'حصة',
        min: 'د',
        boxTitle: 'المواعيد عند الطلب',
        boxText: 'الملاكمة جزء من برنامج ألفا. اتصل بالنادي أو راسله لمعرفة الجدول الحالي.',
        seasonT: 'موسم المنافسات',
        seasonD: 'قد تُنظَّم حصص إضافية خلال فترة الإعداد للبطولات.',
        tz: 'جميع المواعيد بالتوقيت المحلي (طنجة).',
        next: 'الحصة القادمة',
        now: 'حصة جارية الآن',
        today: 'اليوم',
        tomorrow: 'غداً',
        contact: 'تواصل مع النادي'
      },
      coach: {
        label: 'المدرب الرئيسي',
        first: 'محمد',
        last: 'العطاري',
        r1: 'مدرب رئيسي', r2: 'رياضي', r3: 'منافس', r4: 'مُرشد',
        bio: 'محمد العطاري رياضي مغربي وممارس متمرّس لفنون القتال — حائز على ألقاب بطولة المغرب، وعدة ألقاب في المنافسات طوال مسيرته، والمركز السادس في الألعاب الأولمبية للناشئين في التايكواندو.',
        th: '',
        f1: 'الألعاب الأولمبية للناشئين · تايكواندو',
        f2big: 'بطل',
        f2: 'ألقاب بطولة المغرب',
        f3big: 'ألقاب',
        f3: 'عدة ألقاب في المنافسات طوال مسيرته',
        line: 'خبرة بساط المنافسة — تنتقل إليك حصة بعد حصة.',
        cta: 'تدرّب مع المدرب'
      },
      life: {
        label: 'حياة النادي',
        l1: 'نتدرّب معاً.',
        l2: 'ننافس معاً.',
        l3: 'نبقى معاً.',
        lead: 'ألفا لا تتوقف عند باب القاعة. رحلات، خرجات، مباريات كرة قدم وأنشطة جماعية — من تتدرّب معهم يصبحون من تقضي وقتك معهم.',
        hint: 'واصل التمرير',
        word: 'معاً',
        end: 'فريقك في انتظارك.',
        tags: { trips: 'رحلات', football: 'كرة القدم', outings: 'خرجات', team: 'فريق واحد', activities: 'أنشطة' }
      },
      gallery: {
        label: 'الصور',
        title: 'مباشرة من البساط.',
        all: 'الكل', training: 'التدريب', competition: 'المنافسات', club: 'حياة النادي',
        view: 'عرض الصورة'
      },
      ig: {
        title: 'كل جولة. على إنستغرام.',
        text: 'التدريبات، أيام النزال وحياة النادي — تابع الفريق.',
        posts: 'منشور', followers: 'متابع',
        cta: 'تابع @alphateamfight'
      },
      loc: {
        city: 'طنجة',
        label: 'الموقع',
        title: 'تجدنا في طنجة.',
        address: 'العنوان',
        cityLine: 'طنجة، المغرب',
        phone: 'الهاتف',
        dir: 'الاتجاهات',
        call: 'اتصل',
        open: 'افتح في خرائط Google',
        mapTitle: 'خريطة: فريق ألفا، حي الشهداء، طنجة'
      },
      join: {
        label: 'انضم',
        kicker: 'مستعد للتدريب؟',
        t1: 'انضم إلى',
        t2: 'ألفا.',
        lead: 'اتصل، راسلنا أو زُرنا مباشرة. أخبرنا بالرياضة التي تهمّك — وسنخبرك متى تبدأ.',
        waSub: 'راسل النادي',
        visit: 'زيارة',
        waText: 'مرحباً فريق ألفا! أودّ الحصول على معلومات حول التدريبات.'
      },
      form: {
        title: 'أرسل رسالة',
        name: 'الاسم',
        phone: 'الهاتف (اختياري)',
        discipline: 'الرياضة',
        unsure: 'لم أقرّر بعد',
        message: 'الرسالة — العمر، الخبرة، الأهداف',
        error: 'المرجو إدخال اسمك.',
        submit: 'أرسل عبر واتساب',
        note: 'يفتح واتساب ورسالتك جاهزة للإرسال. لا يتم حفظ أي بيانات على هذا الموقع.',
        tpl: { hello: 'مرحباً فريق ألفا!', name: 'الاسم', phone: 'الهاتف', discipline: 'الرياضة', message: 'الرسالة' }
      },
      footer: {
        tag: 'تايكواندو · كيك بوكسينغ · ملاكمة — طنجة',
        explore: 'تصفّح', contact: 'تواصل',
        rights: 'جميع الحقوق محفوظة.', top: 'العودة إلى الأعلى'
      },
      lb: { close: 'إغلاق', prev: 'الصورة السابقة', next: 'الصورة التالية' },
      media: { slot: 'مكان الصورة' },
      cursor: { view: 'عرض', drag: 'اسحب', open: 'افتح' }
    }
  };

  const SUPPORTED = ['en', 'fr', 'ar'];
  const ARABIC_FONTS = 'https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap';
  let current = document.documentElement.lang || 'en';
  if (!SUPPORTED.includes(current)) current = 'en';

  const resolve = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  function t(key, lang) {
    const val = resolve(translations[lang || current], key);
    return val == null ? resolve(translations.en, key) : val;
  }

  /* Arabic fonts load only when Arabic is selected */
  function ensureArabicFonts() {
    if (document.getElementById('font-ar')) return;
    const link = document.createElement('link');
    link.id = 'font-ar';
    link.rel = 'stylesheet';
    link.href = ARABIC_FONTS;
    document.head.appendChild(link);
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = t(el.dataset.i18n);
      if (typeof v === 'string') el.textContent = v;
    });
    scope.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const v = t(el.dataset.i18nHtml);
      if (typeof v === 'string') el.innerHTML = v;
    });
    scope.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        const v = t(key);
        if (attr && typeof v === 'string') el.setAttribute(attr, v);
      });
    });
  }

  function setLang(lang, opts = {}) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const changed = lang !== current;
    current = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'ar') ensureArabicFonts();

    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));

    apply();

    document.querySelectorAll('.lang__btn').forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    try { localStorage.setItem('alpha-lang', lang); } catch (e) {}
    if (changed || opts.force) {
      document.dispatchEvent(new CustomEvent('langchange', { detail: { lang, initial: !!opts.initial } }));
    }
  }

  window.I18N = {
    translations,
    t,
    apply,
    setLang,
    get lang() { return current; },
    get isRTL() { return current === 'ar'; }
  };
})();
