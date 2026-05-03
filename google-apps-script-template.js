const ADMIN_EMAIL = 'your-email@example.com';

function doPost(e) {
  try {
    const data = e.parameter || {};
    const formType = data.formType || 'join';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(formType);
    if (!sheet) sheet = ss.insertSheet(formType);
    const keys = Object.keys(data);
    if (sheet.getLastRow() === 0) sheet.appendRow(['timestamp', ...keys]);
    sheet.appendRow([new Date(), ...keys.map(k => data[k])]);
    MailApp.sendEmail(ADMIN_EMAIL, `Professional Jewess: ${formType}`, keys.map(k => `${k}: ${data[k]}`).join('\n'));
    if (data.email) MailApp.sendEmail(data.email, 'Professional Jewess submission received', 'Thank you. We received your submission and will review it soon.');
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ok:false,error:err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
