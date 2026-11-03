# Thomson weds Amrutha

Digital wedding invitation · Sunday, 22 November 2026 · St George’s Church, Pallimukku.

Live: https://amaljithtr.github.io/thomson-weds-amrutha/

## Editing
| What | File |
|---|---|
| Names, wording, families | `index.html` |
| Calendar times, map link, phone, countdown, music, wishes backend | `js/config.js` |
| Photos (JPG) | `assets/img/` |
| Colours and fonts | top of `css/style.css` |

After changing CSS or JS, bump the `?v=` number on the `<link>` and `<script>` tags in `index.html` so browsers load the new files.

## Background music (optional)
Upload an MP3 you have rights to as `assets/audio/theme.mp3`, then set `music: "assets/audio/theme.mp3"` in `js/config.js`.

## Wishes wall
Wishes are saved in the Google Sheet and shown on the page once `wishesEndpoint` in `js/config.js` holds the Apps Script web app URL. Until then, “Send Wishes” opens WhatsApp to Thomson.

Setup: in the Google Sheet open **Extensions → Apps Script**, paste `apps-script/Code.gs`, save, then **Deploy → New deployment → Web app** (Execute as *Me*, access *Anyone*). Copy the `/exec` URL into `wishesEndpoint`.

To hide a wish, type `FALSE` in its `approved` cell in the sheet.
