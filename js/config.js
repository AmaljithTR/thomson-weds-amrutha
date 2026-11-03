/* All event details live here. Edit this file for links, times and numbers.
   Names and wording shown on the page are written directly in index.html. */
window.WEDDING = {
  couple: "Amrutha & Thomson",

  // Countdown target: the start of Holy Matrimony, Indian Standard Time
  countdownTarget: "2026-11-22T15:00:00+05:30",
  weddingDayEnd:   "2026-11-22T23:59:59+05:30",

  venue: {
    name: "St George’s Roman Catholic Church",
    address: "Church Landing Rd, Pallimukku, Ernakulam, Kerala 682016",
    mapUrl: "https://maps.app.goo.gl/jL1tBFrxqbYLyV9b7"
  },

  // Calendar times are in UTC (IST minus 5h30)
  events: {
    matrimony: {
      title: "Holy Matrimony of Amrutha & Thomson",
      start: "20261122T093000Z", // 3:00 PM IST
      end:   "20261122T113000Z", // 5:00 PM IST (estimated)
      details: "Holy Matrimony at 3:00 PM, followed by the reception at 6:00 PM."
    },
    reception: {
      title: "Wedding Reception of Amrutha & Thomson",
      start: "20261122T123000Z", // 6:00 PM IST
      end:   "20261122T153000Z", // 9:00 PM IST
      details: "Wedding reception, 6:00 PM to 9:00 PM."
    }
  },

  contact: {
    name: "Anson",
    phone: "+918714232361",
    whatsapp: "918714232361"
  },

  // Optional: path to a licensed or royalty-free MP3, e.g. "assets/audio/theme.mp3".
  // Leave empty to hide the music button.
  music: "",

  // Optional: Google Apps Script web app URL (see apps-script/Code.gs and README).
  // While empty, the wishes form sends each blessing to the contact on WhatsApp.
  wishesEndpoint: ""
};
