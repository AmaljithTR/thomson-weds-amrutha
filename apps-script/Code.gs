/**
 * Wishes wall backend for the wedding invitation.
 * 1. Create a Google Sheet. Rename the first tab to: Wishes
 * 2. Put these headers in row 1: id | name | message | likes | time | approved
 * 3. Extensions > Apps Script, paste this file, save.
 * 4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 5. Copy the web app URL into js/config.js as wishesEndpoint.
 * To hide a wish, type FALSE in its "approved" cell.
 */
const SHEET = SpreadsheetApp.getActive().getSheetByName('Wishes');

function doGet() {
  const rows = SHEET.getDataRange().getValues().slice(1)
    .filter(r => r[0] && String(r[5]).toUpperCase() !== 'FALSE')
    .map(r => ({ id: r[0], name: r[1], message: r[2], likes: Number(r[3]) || 0, time: r[4] }))
    .reverse();
  return json({ wishes: rows });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    if (body.action === 'like') {
      const data = SHEET.getDataRange().getValues();
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === body.id) {
          SHEET.getRange(i + 1, 4).setValue((Number(data[i][3]) || 0) + 1);
          break;
        }
      }
      return json({ ok: true });
    }

    const name = String(body.name || '').slice(0, 60).trim();
    const message = String(body.message || '').slice(0, 300).trim();
    if (!name || !message) return json({ ok: false });
    // Prefix with ' so Sheets never treats guest text as a formula
    SHEET.appendRow([Utilities.getUuid(), "'" + name, "'" + message, 0, new Date(), true]);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
