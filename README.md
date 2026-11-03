# Amrutha & Thomson · Wedding Invitation

A single-page Christian wedding invitation. Plain HTML, CSS and JavaScript with no build step, hosted free on GitHub Pages.

## Put it online (GitHub Pages)

1. Create a free account at github.com and a new **public** repository, e.g. `amrutha-weds-thomson`.
2. Click **Add file → Upload files** and drag in everything from this folder (keep the folder structure). Commit.
3. Go to **Settings → Pages**. Under *Build and deployment* choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After 1–2 minutes the site is live at `https://USERNAME.github.io/amrutha-weds-thomson/`.
5. In `index.html`, replace the username and repository name in the two `og:` lines with your real values so WhatsApp shows the photo preview. Commit again.

When you re-share after changes, add `?v=2` to the link so phones load the new version.

## What to edit

| What | Where |
|---|---|
| Names, wording, families | `index.html` |
| Times for calendar, venue link, phone, countdown | `js/config.js` |
| Photos | `assets/img/` (WebP, about 1000 px wide) |
| Colours and fonts | top of `css/style.css` |

## Optional: background music
Add an MP3 you have the rights to (royalty-free or a family recording) as `assets/audio/theme.mp3`, then set `music: "assets/audio/theme.mp3"` in `js/config.js`. The music button appears automatically and music starts when guests open the doors.

## Optional: blessings wall
Out of the box, the blessing form opens WhatsApp with the guest's message addressed to Anson, so it works with no setup.

To show blessings on the page instead:
1. Create a Google Sheet, rename the tab to `Wishes`, and add headers in row 1: `id | name | message | likes | time | approved`.
2. **Extensions → Apps Script**, paste `apps-script/Code.gs`, save.
3. **Deploy → New deployment → Web app**. Execute as *Me*, access *Anyone*. Authorise it.
4. Paste the web app URL into `wishesEndpoint` in `js/config.js`.
5. To hide a message, type `FALSE` in its `approved` cell.

## Notes
- Calendar end time for Holy Matrimony is set to 5:00 PM as an estimate. Change it in `js/config.js` and `assets/ics/holy-matrimony.ics` if needed.
- Have both families proofread every name before sharing.
