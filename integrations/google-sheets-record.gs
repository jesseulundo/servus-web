/**
 * ServUS website → Google Sheets enquiry record (free, no Zapier/Make needed).
 *
 * Setup (about 10 minutes, once):
 *  1. Create a Google Sheet named "ServUS — Website enquiries" in the ServUS Google account.
 *  2. In the sheet: Extensions → Apps Script. Delete the sample code and paste this whole file. Save.
 *  3. Project Settings (gear icon) → Script properties → Add property:
 *       Property: KEY    Value: a long random password (e.g. from a password manager)
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy, authorise, and copy the Web app URL (ends in /exec).
 *  5. In Vercel (Production only) set:
 *       FORM_WEBHOOK_URL = <Web app URL>?key=<the same KEY>
 *     and leave FORM_WEBHOOK_SECRET empty. Redeploy.
 *  6. Send a test form: a new row appears in the "Enquiries" tab.
 *
 * "Anyone" only means the URL can be called without a Google login; without the KEY every
 * request is rejected. Never share the URL with the key in it.
 * If you edit this script later: Deploy → Manage deployments → edit → Version: New version.
 */

const SHEET_NAME = "Enquiries";
const COLUMNS = ["Received at", "Reference", "Form", "Language", "Name", "Email", "Company", "Country", "Details", "Consent at", "Submission id", "Owner", "Status", "Notes"];
const MAIN_FIELDS = ["name", "email", "company", "country", "submissionId"];

function doPost(e) {
  const key = PropertiesService.getScriptProperties().getProperty("KEY");
  if (!key || !e || !e.parameter || e.parameter.key !== key) return reply({ ok: false, error: "forbidden" });

  let p;
  try {
    p = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "bad_json" });
  }
  const data = p.data || {};
  const details = Object.keys(data)
    .filter((k) => MAIN_FIELDS.indexOf(k) === -1)
    .map((k) => k + ": " + (Array.isArray(data[k]) ? data[k].join(", ") : String(data[k] == null ? "" : data[k])))
    .join("\n");

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet();
    // A leading apostrophe stops Sheets from treating text that starts with = + - @ as a formula.
    const safe = (v) => (/^[=+\-@]/.test(String(v)) ? "'" + v : v);
    sheet.appendRow([
      p.receivedAt || new Date().toISOString(),
      p.reference || "",
      p.form || "",
      p.locale || "",
      safe(data.name || ""),
      safe(data.email || ""),
      safe(data.company || ""),
      safe(data.country || ""),
      safe(details),
      p.consentAt || "",
      data.submissionId || "",
      "",
      "New",
      "",
    ]);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
