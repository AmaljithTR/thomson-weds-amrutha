/**
 * Wishes wall for Thomson & Amrutha's invitation.
 * Paste into Extensions > Apps Script of the Google Sheet, then
 * Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * The "Wishes" tab and its headers are created automatically.
 * To hide a wish from the website, type FALSE in its "approved" cell.
 */
const HEADERS = ['id', 'name', 'message', 'likes', 'time', 'approved'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Wishes');
  if (!sh) sh = ss.insertSheet('Wishes');
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function doGet() {
  const rows = sheet_().getDataRange().getValues().slice(1)
    .filter(r => r[0] && String(r[5]).toUpperCase() !== 'FALSE')
    .map(r => ({ id: String(r[0]), name: String(r[1]), message: String(r[2]),
                 likes: Number(r[3]) || 0, time: r[4] }))
    .reverse();
  return json_({ wishes: rows });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const body = JSON.parse((e.postData && e.postData.contents) || '{}');

    if (body.action === 'like') {
      const ids = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0]) === String(body.id)) {
          const cell = sh.getRange(i + 2, 4);
          cell.setValue((Number(cell.getValue()) || 0) + 1);
          break;
        }
      }
      return json_({ ok: true });
    }

    const name = String(body.name || '').slice(0, 60).trim();
    const message = String(body.message || '').slice(0, 300).trim();
    if (!name || !message) return json_({ ok: false });
    // The leading ' stops Sheets from treating guest text as a formula
    sh.appendRow([Utilities.getUuid(), "'" + name, "'" + message, 0, new Date(), true]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
