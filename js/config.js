/* ==========================================================================
   ALPHA TEAM — Site configuration
   Edit contact details, links and the training schedule here.
   Everything on the page that shows these values reads from this file.
   ========================================================================== */

window.ALPHA_CONFIG = {
  name: 'ALPHA TEAM',
  legalName: 'Alpha de Développement Sportif',

  phone: {
    display: '06 28 35 82 12',
    tel: '+212628358212'
  },

  /* Uses the club phone number. Check that it is registered on WhatsApp. */
  whatsapp: {
    number: '212628358212'
  },

  instagram: {
    handle: '@alphateamfight',
    url: 'https://www.instagram.com/alphateamfight/',
    /* Snapshot values: update them manually now and then. */
    posts: 221,
    followers: 2665
  },

  maps: {
    url: 'https://g.co/kgs/H3vC1z',
    /* Embed iframe. For an exact pin, open Google Maps → Share → Embed a map and paste its src. */
    embed: 'https://maps.google.com/maps?q=ALPHA%20Taekwondo%20%26%20Kickboxing%2C%20Achouhadaa%2C%20Tanger&z=15&output=embed'
  },

  /* Training schedule. Days: 0 = Sunday … 6 = Saturday. Times use 24h format (Africa/Casablanca). */
  schedule: {
    taekwondo: {
      days: [2, 4, 6],
      sessions: [
        ['16:00', '17:00'],
        ['17:00', '18:00'],
        ['18:00', '19:00'],
        ['19:00', '20:00'],
        ['20:00', '21:30']
      ]
    },
    kickboxing: {
      days: [1, 3, 5],
      sessions: [
        ['19:00', '20:00'],
        ['20:00', '21:00'],
        ['21:00', '22:00'],
        ['22:00', '23:30']
      ]
    },
    /* No public timetable yet. Add `days` and `sessions` here when the club confirms them. */
    boxing: null
  }
};
