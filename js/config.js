/* Event details used for links, calendar and countdown.
   Names and wording shown on the page are in index.html. */
window.WEDDING = {
  countdownTarget: "2026-11-22T15:00:00+05:30",
  weddingDayEnd:   "2026-11-22T23:59:59+05:30",

  venue: {
    name: "St George’s Roman Catholic Church",
    address: "Church Landing Rd, Pallimukku, Ernakulam, Kerala 682016",
    mapUrl: "https://maps.app.goo.gl/jL1tBFrxqbYLyV9b7"
  },

  // Calendar times in UTC (IST minus 5h30)
  events: {
    betrothal: {
      title: "Betrothal · Thomson & Amrutha",
      start: "20261107T053000Z", // 11:00 AM IST
      end:   "20261107T073000Z", // 1:00 PM IST (includes lunch)
      location: "St. Antony’s Church, Panangad, Ernakulam",
      details: "Betrothal ceremony at 11:00 AM, St. Antony’s Church, Panangad. Lunch at 12:00 PM, MPS Church Hall, Chathamma."
    },
    matrimony: {
      title: "Holy Matrimony · Thomson & Amrutha",
      start: "20261122T093000Z", // 3:00 PM IST
      end:   "20261122T113000Z", // 5:00 PM IST (estimate)
      details: "Holy Matrimony at 3:00 PM, followed by the reception at 6:00 PM."
    },
    reception: {
      title: "Wedding Reception · Thomson & Amrutha",
      start: "20261122T123000Z", // 6:00 PM IST
      end:   "20261122T153000Z", // 9:00 PM IST
      details: "Wedding reception, 6:00 PM to 9:00 PM."
    }
  },

  contact: { name: "Anson", phone: "+918714232361", whatsapp: "918714232361" },

  // Optional: "assets/audio/theme.mp3" (a track you have rights to). Empty hides the music button.
  music: "",

  // Background music from YouTube (used when "music" above is empty).
  // The ID is the part after "watch?v=" in the link. Leave empty for no music.
  youtubeId: "_TNwN92mw6E",

  // Optional: Google Apps Script web app URL (see apps-script/Code.gs).
  // While empty, the wishes form sends each wish to Anson on WhatsApp.
  wishesEndpoint: ""
};
