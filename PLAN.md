# Amrutha & Thomson — Digital Wedding Invitation

Build plan for a single-page, mobile-first Christian wedding invitation, hosted free on GitHub Pages.

---

## 1. Event Details (source of truth)

| Field | Value |
|---|---|
| Bride | **Amrutha Merin Byju** |
| Bride's parents | Mrs. Linda Byju & Mr. Byju Antony |
| Bride's home | Chembakassery House, Panangad |
| Groom | **Thomson K J** |
| Groom's parents | Mrs. Sheeba Antony & Mr. Jose Thomas |
| Groom's home | Kalathilparambil House, Valanjambalam |
| Wedding date | **Sunday, 22 November 2026** |
| Holy Matrimony | **3:00 PM**, St George’s Roman Catholic Church, Pallimukku |
| Reception | **6:00 PM**, venue **TBD** ⚠️ |
| Betrothal (already planned) | Saturday, 7 November 2026, 11:00 AM, St. Antony's Church, Panangad |
| Sharing the happiness | Aleena, Amala, Tharun & Nathalia |
| RSVP phone | **TBD** ⚠️ |

> Keep every one of these values in `js/config.js` so that later edits never touch the layout code. See Section 6.

### Open items to confirm before launch
- [ ] Reception venue name and Google Maps link
- [ ] Reception end time (plan assumes 9:00 PM)
- [ ] Ceremony end time (plan assumes 4:30 PM)
- [ ] RSVP / enquiry phone number(s) and WhatsApp number
- [ ] Photos (6–10) and one hero photo
- [ ] Background music file (must be licensed or royalty-free; see Section 9)
- [ ] Whether the betrothal appears on the site (recommended: as a small "Our Journey" milestone)
- [ ] Whether a Malayalam language toggle is wanted

---

## 2. Design Direction: "Olive & Ivory Chapel"

### 2.1 How this differs from the reference invite
The reference site uses dark maroon, gold, a wax-seal envelope, and a cross in the header. This design deliberately goes the other way.

| Reference (avoid) | This design |
|---|---|
| Dark maroon background | Light ivory / parchment background |
| Wax-seal envelope opener | **Chapel doors** that swing open |
| Song of Solomon 3:4 | **Ecclesiastes 4:12**, "a cord of three strands" |
| Cross fixed in header | Cross only in the opener and closing blessing; **dove + olive branch** as the main motif |
| Gold-on-maroon cards | Sage-green-on-ivory cards with thin gold hairlines |
| Plain line dividers | **Three-strand braided divider**, drawn in SVG, tying back to the verse |

The palette carries on from the family's own betrothal card (ivory, sage, white florals), so the two invitations feel related without being copies.

### 2.2 Colour tokens

```css
:root {
  --ivory:        #FAF7EF;  /* page background */
  --parchment:    #F2ECDD;  /* card background */
  --sage-900:     #23402F;  /* headings, names */
  --sage-700:     #3F6B4F;  /* body accents */
  --sage-400:     #8FAF92;  /* leaves, borders */
  --sage-100:     #E4ECE1;  /* soft fills */
  --gold:         #B8954A;  /* hairlines, icons, buttons */
  --gold-soft:    #D9C38E;
  --ink:          #2E2A24;  /* body text */
  --ink-muted:    #6B6457;
  --evening:      #1F2E3A;  /* reception section only (night blue) */
}
```

The reception section switches to a deep **evening blue** background with gold text. This marks the change from the afternoon ceremony to the night celebration and is a signature moment of the page.

### 2.3 Typography (Google Fonts, free)

| Use | Font | Fallback |
|---|---|---|
| Couple names, section titles | **Pinyon Script** | `"Snell Roundhand", cursive` |
| Headings, dates | **Cormorant Garamond** 500/600 | `Georgia, serif` |
| Body, labels | **Jost** 300/400 | `system-ui, sans-serif` |
| Optional Malayalam | **Noto Serif Malayalam** | `serif` |

Small-caps labels use letter-spacing `0.25em` with uppercase Jost at 11–12px.

### 2.4 Motifs and assets
- **Dove with olive sprig**: SVG used in the opener and as the monogram crest
- **Olive branches**: SVG corner decorations (keep them light, never covering text)
- **Three-strand braid**: SVG divider, repeated between sections
- **Small Latin cross**: opener and closing blessing only
- **Monogram**: "A ✦ T" set in Pinyon Script inside an olive wreath

All decoration should be inline SVG (crisp on phones, tiny file size). Avoid watercolour PNGs except an optional single hero floral.

---

## 3. Page Structure (top to bottom)

### 0. Opener: Chapel Doors
- Full-screen ivory overlay with two arched wooden-door panels, drawn with CSS gradients and SVG trim
- A small cross and the dove crest sit above the door arch
- Text: "Amrutha & Thomson · 22 · XI · MMXXVI", then **"Tap to enter"**
- On tap: the doors swing open with `rotateY` on each half (1.2s), the overlay fades, and music starts
- Respect `prefers-reduced-motion`: replace the swing with a simple fade

### 1. Hero
- Full-height hero photo with a soft ivory gradient at the bottom for legibility
- "With joyful hearts, together with their families"
- Names: **Amrutha** / *&* / **Thomson** (large Pinyon Script)
- "Sunday · 22 November 2026"
- "Holy Matrimony 3:00 PM · Reception 6:00 PM"
- "St George’s Roman Catholic Church, Pallimukku"
- A scroll cue (small animated olive leaf)

### 2. Scripture
> "A cord of three strands is not quickly broken."
> — Ecclesiastes 4:12

Below it, one line: *"Him, her, and God."* The three-strand braid SVG animates, its strands drawing in as they scroll into view.

Alternatives if the family prefers: Ruth 1:16, 1 Corinthians 13:7, or Genesis 2:24.

### 3. Countdown
- Target: `2026-11-22T15:00:00+05:30`
- Days · Hours · Minutes · Seconds in four small parchment tiles
- Once the date passes, switch the text to "Today we celebrate" on the wedding day, then "Happily married since 22.11.2026" afterwards

### 4. Invitation Text (formal wording)
> Mrs. Linda Byju & Mr. Byju Antony, Chembakassery House, Panangad
> and
> Mrs. Sheeba Antony & Mr. Jose Thomas, Kalathilparambil House, Valanjambalam
>
> request the honour of your presence at the Holy Matrimony of their children
>
> **Amrutha Merin Byju** & **Thomson K J**

Confirm this wording with both families, since the betrothal card was issued by the bride's parents only.

### 5. Our Journey (optional, small timeline)
Three dots on a vertical olive vine:
1. *How we met* (optional text, ask the couple)
2. **Betrothal**: 7 November 2026, St. Antony's Church, Panangad
3. **Holy Matrimony**: 22 November 2026, St George’s Roman Catholic Church, Pallimukku

### 6. Events
Two cards side by side on desktop, stacked on mobile.

**Card A: Holy Matrimony** (ivory card, sage text)
- Sunday, 22 November 2026
- 3:00 PM
- St George’s Roman Catholic Church, Pallimukku
- Buttons: `Directions` · `Google Calendar` · `Apple / Outlook (.ics)`

**Card B: Wedding Reception** (evening-blue card, gold text, faint star specks)
- Sunday, 22 November 2026
- 6:00 PM onwards
- Venue TBD
- Same three buttons

### 7. Gallery
- Horizontal scroll-snap carousel (`scroll-snap-type: x mandatory`) with no library
- Dots indicator; tapping an image opens a simple full-screen lightbox
- Photos get arched tops (`border-radius: 50% 50% 8px 8px / 30% 30% 8px 8px`), echoing the chapel doors
- Lazy-load with `loading="lazy"`

### 8. The Families
Two facing cards with an olive-wreath divider between them.

- **The Bride**: Amrutha Merin Byju, daughter of Mrs. Linda Byju & Mr. Byju Antony, Chembakassery House, Panangad
- **The Groom**: Thomson K J, son of Mrs. Sheeba Antony & Mr. Jose Thomas, Kalathilparambil House, Valanjambalam

Then: **"Sharing the happiness"**: Aleena, Amala, Tharun & Nathalia

### 9. Wishes & Blessings
- Form: Name, Message (max 300 chars), "Send Blessing" button
- Live list below, newest first, each with a heart/like count
- Counter: "✦ N blessings received"
- Backend: see Section 7

### 10. RSVP & Enquiries
- Phone number with **Call** (`tel:`) and **WhatsApp** (`https://wa.me/91XXXXXXXXXX?text=...`) buttons
- Optional "Will you attend?" quick buttons that open WhatsApp with prefilled text, e.g. "Hi, we'll be attending Amrutha & Thomson's wedding — 2 guests"

### 11. Closing Blessing
- Small cross, then the dove crest
- *"What God has joined together, let no one separate."* (Mark 10:9)
- "With love, the families of Amrutha & Thomson"
- Share button using the Web Share API with a copy-link fallback
- Small credit line (optional)

### Floating controls (all sections)
- Bottom-right: music play/pause (sage circle with gold icon)
- Bottom-left: "Directions" quick button (map pin) that opens the church location
- Both stay clear of the iOS home indicator via `env(safe-area-inset-bottom)`

---

## 4. Tech Stack

- Plain **HTML + CSS + vanilla JavaScript**, with no framework and no build step
- Google Fonts via `<link>`
- Backend for wishes only: **Google Sheets + Apps Script** (recommended) or **Firebase Firestore** (free Spark plan)
- Hosting: **GitHub Pages** (free, HTTPS included)

Why no framework: it loads fast on mobile data, there's nothing to build, and any future edit is just a text change.

---

## 5. Repository Structure

```
amrutha-weds-thomson/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js        # all names, dates, venues, links
│   ├── main.js          # opener, countdown, scroll reveals, music
│   ├── gallery.js       # carousel + lightbox
│   └── wishes.js        # wishes form + list
├── assets/
│   ├── img/
│   │   ├── hero.webp
│   │   ├── og-cover.jpg     # 1200×630 WhatsApp preview image
│   │   └── gallery/01.webp …
│   ├── svg/
│   │   ├── dove.svg
│   │   ├── olive-corner.svg
│   │   ├── braid-divider.svg
│   │   └── cross.svg
│   ├── audio/
│   │   └── theme.mp3
│   └── ics/
│       ├── holy-matrimony.ics
│       └── reception.ics
├── apps-script/
│   └── Code.gs          # copy into Google Apps Script (not served)
├── favicon.png
├── README.md
└── PLAN.md              # this file
```

---

## 6. Configuration File (`js/config.js`)

```js
window.WEDDING = {
  bride: { first: "Amrutha", full: "Amrutha Merin Byju",
           parents: "Mrs. Linda Byju & Mr. Byju Antony",
           home: "Chembakassery House, Panangad" },
  groom: { first: "Thomson", full: "Thomson K J",
           parents: "Mrs. Sheeba Antony & Mr. Jose Thomas",
           home: "Kalathilparambil House, Valanjambalam" },
  countdownTarget: "2026-11-22T15:00:00+05:30",
  events: [
    {
      id: "matrimony",
      title: "Holy Matrimony",
      dateLabel: "Sunday, 22 November 2026",
      timeLabel: "3:00 PM",
      start: "20261122T093000Z",   // 3:00 PM IST in UTC
      end:   "20261122T110000Z",   // 4:30 PM IST (confirm)
      venue: "St George’s Church",
      place: "Pallimukku, Ernakulam, Kerala 682016",
      mapUrl: "https://maps.google.com/?q=St+Georges+Church+Pallimukku",
      ics: "assets/ics/holy-matrimony.ics"
    },
    {
      id: "reception",
      title: "Wedding Reception",
      dateLabel: "Sunday, 22 November 2026",
      timeLabel: "6:00 PM onwards",
      start: "20261122T123000Z",   // 6:00 PM IST
      end:   "20261122T153000Z",   // 9:00 PM IST (confirm)
      venue: "TBD",
      place: "TBD",
      mapUrl: "",
      ics: "assets/ics/reception.ics"
    }
  ],
  siblings: "Aleena, Amala, Tharun & Nathalia",
  phone: "+91XXXXXXXXXX",
  whatsapp: "91XXXXXXXXXX",
  wishesEndpoint: "https://script.google.com/macros/s/XXXX/exec"
};
```

Replace the map URLs with the exact "Share → Copy link" from Google Maps once confirmed.

### Google Calendar link format
```
https://calendar.google.com/calendar/render?action=TEMPLATE
  &text=Holy%20Matrimony%20%E2%80%94%20Amrutha%20%26%20Thomson
  &dates=20261122T093000Z/20261122T110000Z
  &location=St%20George%E2%80%99s%20Church%2C%20Pallimukku
  &details=We%20joyfully%20invite%20you...
```
Build this string in JS from `config.js` using `encodeURIComponent`.

### `.ics` file template
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AmruthaThomson//Wedding//EN
BEGIN:VEVENT
UID:matrimony-20261122@amrutha-thomson
DTSTAMP:20261101T000000Z
DTSTART:20261122T093000Z
DTEND:20261122T110000Z
SUMMARY:Holy Matrimony — Amrutha & Thomson
LOCATION:St George’s Roman Catholic Church, Pallimukku
DESCRIPTION:We joyfully invite you to celebrate with us.
BEGIN:VALARM
TRIGGER:-PT3H
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR
```
Link it with `<a href="assets/ics/holy-matrimony.ics" download>`. iPhones open it straight into Calendar.

---

## 7. Wishes Wall Backend

### Option A (recommended): Google Sheets + Apps Script
It's free, needs no account other than Google, and the family can read and moderate wishes in a spreadsheet.

1. Create a Google Sheet named `Wishes` with columns `id | name | message | likes | time | approved`.
2. Open Extensions → Apps Script and paste `apps-script/Code.gs`:

```js
const SHEET = SpreadsheetApp.getActive().getSheetByName('Wishes');

function doGet() {
  const rows = SHEET.getDataRange().getValues().slice(1)
    .filter(r => r[5] !== false)                 // hide rows marked FALSE
    .map(r => ({ id: r[0], name: r[1], message: r[2], likes: r[3], time: r[4] }))
    .reverse();
  return json({ wishes: rows });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.action === 'like') {
    const data = SHEET.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === body.id) {
        SHEET.getRange(i + 1, 4).setValue(Number(data[i][3]) + 1);
        break;
      }
    }
    return json({ ok: true });
  }
  const name = String(body.name || '').slice(0, 60).trim();
  const message = String(body.message || '').slice(0, 300).trim();
  if (!name || !message) return json({ ok: false });
  SHEET.appendRow([Utilities.getUuid(), name, message, 0, new Date(), true]);
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone**. Copy the URL into `wishesEndpoint`.
4. In `wishes.js`, POST with `Content-Type: text/plain` (this avoids a CORS preflight, which Apps Script doesn't handle):

```js
fetch(WEDDING.wishesEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify({ name, message })
});
```

5. **Moderation**: to hide a message, set its `approved` cell to `FALSE` in the sheet.
6. Remember likes per device in `localStorage` (key `liked:<id>`) so one person can't like the same wish repeatedly.
7. **Always escape user text** before inserting it into the page (use `textContent`, never `innerHTML`).

### Option B: Firebase Firestore (Spark plan, free)
Use this if real-time updates are wanted. Create a `wishes` collection and write security rules that only allow `create` with `name` ≤ 60 and `message` ≤ 300 characters, and `update` that changes only `likes` by +1. It needs more setup, so only choose it if real-time matters.

---

## 8. Animations & Interactions

| Element | Effect | Implementation |
|---|---|---|
| Chapel doors | Swing open | CSS `transform: rotateY(-110deg)` on each half, `perspective: 1200px` |
| Section reveal | Fade up 20px | `IntersectionObserver` adds `.is-visible` |
| Braid divider | Strands draw in | SVG `stroke-dasharray` / `stroke-dashoffset` transition |
| Olive leaves | Gentle sway | `@keyframes` rotate ±3° over 6s |
| Reception card | Twinkling specks | A few absolutely positioned dots with opacity keyframes |
| Countdown | Digit flip | Short `translateY` on value change |

Wrap all motion in `@media (prefers-reduced-motion: no-preference)`.

---

## 9. Music

- Browsers block autoplay, so start playback **inside the door-tap handler**
- Use a short loop (≤ 3 MB, 128 kbps MP3)
- **Copyright**: use a track you have rights to, such as a royalty-free instrumental (Pixabay Music, YouTube Audio Library), a family recording, or a hymn in the public domain played by a friend. Good public-domain hymns include *Here Comes the Bride* (Wagner, Lohengrin), Pachelbel's *Canon in D*, and *Jesu, Joy of Man's Desiring* (Bach). The composition is public domain, but any specific recording may not be, so check its licence.
- Fade the volume in over 2 seconds; pause automatically when the tab is hidden (`visibilitychange`)

---

## 10. Images

- Hero: 1600px wide, WebP, under 250 KB
- Gallery: 1200px on the long edge, WebP, under 200 KB each
- Convert free with **Squoosh** (squoosh.app)
- Always set `width`, `height`, and `alt` text on every image
- Keep total page weight under **3 MB** excluding music

---

## 11. WhatsApp / Social Preview

Most guests will open the link from WhatsApp, so the preview card matters. Put this in `<head>`:

```html
<title>Amrutha & Thomson · 22 November 2026</title>
<meta name="description" content="Join us for the Holy Matrimony of Amrutha & Thomson at St George’s Roman Catholic Church, Pallimukku.">
<meta property="og:title" content="Amrutha & Thomson — Wedding Invitation">
<meta property="og:description" content="Sunday, 22 November 2026 · St George’s Roman Catholic Church, Pallimukku">
<meta property="og:image" content="https://<username>.github.io/amrutha-weds-thomson/assets/img/og-cover.jpg">
<meta property="og:url" content="https://<username>.github.io/amrutha-weds-thomson/">
<meta property="og:type" content="website">
<meta name="theme-color" content="#FAF7EF">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

`og:image` **must be an absolute URL**, sized 1200×630 and under 300 KB. WhatsApp caches previews, so finalise this image before sharing the link widely.

---

## 12. Accessibility & Quality

- Text contrast of at least 4.5:1 (sage-900 on ivory passes; check gold text on the evening-blue card)
- Every button has a visible label or `aria-label`
- The opener is keyboard accessible (Enter/Space triggers it)
- Music never plays without a tap, and the pause button is always visible
- The page works without JavaScript for core details (names, date, venues are in the HTML, not injected only by JS)
- `lang="en"` on `<html>`; `lang="ml"` on any Malayalam blocks

---

## 13. Build Order (milestones)

1. **Skeleton**: `index.html` with all sections and real text, no styling
2. **Design system**: colour tokens, fonts, spacing, card styles in `style.css`
3. **Sections**: style top to bottom, testing on a phone at each step
4. **Opener + music**: chapel doors and audio toggle
5. **Countdown + calendar/maps buttons**
6. **Gallery** carousel and lightbox
7. **Wishes backend**: Apps Script deploy, then `wishes.js`
8. **Polish**: SVG motifs, scroll animations, reduced-motion support
9. **Preview card**: OG tags and cover image
10. **Testing** (Section 15), then share

---

## 14. Deployment (GitHub Pages, free)

1. Create a free GitHub account and a **public** repository named `amrutha-weds-thomson`
2. Upload all files (Add file → Upload files) or push with Git
3. Go to Settings → Pages → Source: **Deploy from a branch** → Branch: `main` / root → Save
4. After 1–2 minutes the site is live at `https://<username>.github.io/amrutha-weds-thomson/`
5. Add `?v=2` to the link when re-sharing after updates, to bypass caches

**Optional custom domain** (the only paid part, about ₹800–1,000/year): buy a domain such as `amruthawedsthomson.in`, add a `CNAME` file containing the domain, and point DNS to GitHub Pages per GitHub's docs.

---

## 15. Testing Checklist

- [ ] iPhone Safari and Android Chrome, both portrait
- [ ] Opening the link from inside WhatsApp (in-app browser)
- [ ] Preview card shows the correct image and title in WhatsApp
- [ ] Doors open, music plays, pause works
- [ ] Countdown shows correct time in IST
- [ ] Google Calendar adds the right date and time
- [ ] `.ics` opens in the iPhone Calendar
- [ ] Directions open the correct church in Google Maps
- [ ] Call and WhatsApp buttons open with the right number
- [ ] A wish posts, appears, and is likeable; hiding it in the sheet removes it
- [ ] Malicious input like `<script>` shows as plain text
- [ ] Page loads in under 3 seconds on 4G
- [ ] No spelling mistakes in any name (have both families proofread)

---

## 16. Timeline

Today is 3 November 2026; the wedding is 22 November.

| Target date | Task |
|---|---|
| 5 Nov | Confirm open items (Section 1), collect photos and music |
| 8 Nov | Milestones 1–6 done |
| 10 Nov | Wishes backend live, polish complete |
| 11 Nov | Family proofread and test on several phones |
| **12 Nov** | **Share the link** (about 10 days before the wedding) |
| 22 Nov | Wedding day: countdown switches to "Today we celebrate" |
