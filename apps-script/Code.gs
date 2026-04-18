// Studio Raama — Inquiry Form Handler
// Deploy as: Web App | Execute as: Me | Who has access: Anyone
//
// Setup:
//   1. Create a Google Sheet named "Studio Raama Enquiries"
//   2. Rename the first tab to "Inquiries"
//   3. Row 1 headers (A–H):
//      Timestamp | Email | Full Name | Phone | Location |
//      Property Type | Property Other | Budget (Lakhs)
//   4. Replace SHEET_ID below with your Sheet's ID (from its URL)
//   5. Deploy: Extensions → Apps Script → Deploy → New deployment
//      Type: Web app | Execute as: Me | Who has access: Anyone
//   6. Copy the /exec URL and paste it into contact/index.html as GAS_ENDPOINT
//
// IMPORTANT: Every time you edit this script, create a NEW deployment version.
// Re-using the same version will not pick up your code changes.

const SHEET_ID     = '1MhoEyNWh8YARMgNEaUdxidiERlrmKdNhK4C5xZsX-Pc';
const NOTIFY_EMAIL = 'studioraama@gmail.com';

function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    sheet.appendRow([
      new Date(),
      data.email         || '',
      data.fullName      || '',
      data.phone         || '',
      data.location      || '',
      data.propertyType  || '',
      data.propertyOther || '',
      data.budget        || ''
    ]);

    const subject = `New Inquiry — ${data.fullName} | ${data.propertyType}`;
    GmailApp.sendEmail(NOTIFY_EMAIL, subject, plainBody(data), {
      htmlBody: htmlBody(data)
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#8A8279;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;border-bottom:1px solid #EDE8E3;width:200px;">${label}</td>
    <td style="padding:10px 16px;font-size:14px;color:#1C1714;border-bottom:1px solid #EDE8E3;">${value || '—'}</td>
  </tr>`;
}

function section(title) {
  return `<tr><td colspan="2" style="padding:20px 16px 8px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#B8A68E;background:#FAF7F4;">${title}</td></tr>`;
}

function htmlBody(d) {
  const submitted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F5F0EB;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <div style="max-width:620px;margin:32px auto;background:#FFFFFF;border:1px solid #EDE8E3;">

    <!-- Header -->
    <div style="background:#1C1714;padding:28px 32px;">
      <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#B8A68E;">New Project Inquiry</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;color:#FFFFFF;letter-spacing:-0.01em;">studio raama</h1>
    </div>

    <!-- Table -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${section('Contact Details')}
      ${row('Email', `<a href="mailto:${d.email}" style="color:#B8A68E;">${d.email}</a>`)}
      ${row('Full Name', d.fullName)}
      ${row('Phone', `<a href="tel:${d.phone}" style="color:#B8A68E;">${d.phone}</a>`)}

      ${section('Project Details')}
      ${row('Location', d.location)}
      ${row('Property Type', d.propertyType + (d.propertyOther ? ' — ' + d.propertyOther : ''))}
      ${row('Budget', '₹' + d.budget + ' Lakhs')}
    </table>

    <!-- Footer -->
    <div style="padding:16px 32px;background:#FAF7F4;border-top:1px solid #EDE8E3;">
      <p style="margin:0;font-size:12px;color:#8A8279;">Submitted on ${submitted} · via studioraama.com</p>
    </div>

  </div>

</body>
</html>`;
}

function plainBody(d) {
  return `New inquiry from ${d.fullName} (${d.email}) | ${d.propertyType} | ₹${d.budget} Lakhs\n\nPhone: ${d.phone}\nLocation: ${d.location}`;
}

// Health-check endpoint (GET) — useful for testing the deployment is live
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Studio Raama Inquiry Form' }))
    .setMimeType(ContentService.MimeType.JSON);
}
