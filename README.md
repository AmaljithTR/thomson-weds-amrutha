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

## Wishes wall (optional)
By default, “Send Wishes” opens WhatsApp addressed to Anson KJ. To show wishes on the page:
1. Create a Google Sheet, rename the tab `Wishes`, headers in row 1: `id | name | message | likes | time | approved`.
2. Extensions → Apps Script → paste `apps-script/Code.gs` → save.
3. Deploy → New deployment → Web app → Execute as *Me*, access *Anyone*.
4. Paste the URL into `wishesEndpoint` in `js/config.js`.
5. To hide a wish, type `FALSE` in its `approved` cell.
