// src/utils/certificate.js
// Generate a printable certificate in a new window (no external deps)

function pad4(n) {
  var s = String(n);
  var pad = "0000";
  return pad.slice(Math.min(pad.length, s.length)) + s;
}

function makeSerial(user, ev) {
  var u = (user?.id || "").toString().toUpperCase();
  var tail = u.slice(-6) || "USER00";
  return "CERT-" + pad4(ev?.id || 0) + "-" + tail;
}

export function generateCertificate(user, ev) {
  if (!user || !ev) return;

  var serial = makeSerial(user, ev);
  var now = new Date();
  var issued = now.toLocaleDateString();

  var title = (ev.title || "Event");
  var club = (ev.club || "Club");
  var when = [ev.date, ev.time].filter(Boolean).join(" • ");
  var where = ev.location || "";

  var name = user.name || "Student";
  var email = user.email || "";

  var w = window.open("", "_blank", "width=900,height=650");
  if (!w) {
    alert("Please allow pop-ups to generate the certificate.");
    return;
  }

  // Minimal, print-ready HTML (plain CSS only)
  var html = `
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<title>${serial} - AUST HiveNet Certificate</title>
<style>
  :root{
    --ink:#0f1528;
    --muted:#6b7280;
    --primary:#0f1e46;
    --gold:#C19A3F;
  }
  *{ box-sizing:border-box; }
  body{ margin:0; background:#f5f7fb; color:var(--ink); font-family: Inter, system-ui, Arial, sans-serif; }
  .wrap{ display:grid; place-items:center; padding:40px 18px; }
  .paper{
    width: 100%;
    max-width: 900px;
    background:#fff;
    border: 10px solid #f5f5f5;
    outline: 2px solid #e5e7eb;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(2,6,23,.08);
    padding: 36px 34px 30px;
  }
  .head{ display:flex; align-items:center; gap:12px; justify-content:space-between; }
  .brand{ display:flex; align-items:center; gap:10px; color:var(--primary); font-weight:800; }
  .brand .logo{ width:42px; height:42px; border-radius:50%; display:grid; place-items:center; background:#0f1e46; color:#fff; font-weight:800; }
  .serial{ color:var(--muted); font-size:12px; }
  .title{
    text-align:center; margin: 26px 0 6px; font-size:28px; font-weight:800; letter-spacing:.3px;
  }
  .subtitle{ text-align:center; color:var(--muted); }
  .hr{ height:1px; background:linear-gradient(90deg, transparent, #e5e7eb, transparent); margin:24px 0; }
  .name{
    text-align:center; font-size:32px; font-weight:900; margin: 8px 0 2px;
  }
  .email{ text-align:center; color:var(--muted); font-size:14px; }
  .body{ margin-top:18px; font-size:16px; line-height:1.6; }
  .em{ font-weight:800; }
  .meta{
    margin-top:16px; display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; color:var(--muted);
  }
  .badge{
    margin: 18px auto 0; width: fit-content; border: 2px dashed var(--gold);
    color: var(--gold); padding: 8px 12px; border-radius: 999px; font-weight:800; letter-spacing:.5px;
  }
  .signs{
    margin-top: 26px; display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;
  }
  .sign{ text-align:center; }
  .sigline{ height:1px; background:#e5e7eb; margin: 34px 0 8px; }
  .printbar{
    display:flex; justify-content:center; gap:10px; margin-top: 24px;
  }
  .btn{ border:1px solid #e5e7eb; border-radius:999px; padding:8px 12px; background:#fff; cursor:pointer; }
  @media print {
    .printbar{ display:none; }
    body{ background:#fff; }
    .paper{ box-shadow:none; outline:none; }
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="paper">
      <div class="head">
        <div class="brand"><div class="logo">AN</div><div>Hivenet</div></div>
        <div class="serial">Certificate ID: <b>${serial}</b></div>
      </div>

      <div class="title">Certificate of Participation</div>
      <div class="subtitle">This is to certify that</div>

      <div class="name">${name}</div>
      <div class="email">${email}</div>

      <div class="body">
        has successfully participated in the event <span class="em">“${title}”</span> organized by
        <span class="em">${club}</span>.
      </div>

      <div class="meta">
        <div><b>Issued:</b> ${issued}</div>
        <div><b>Schedule:</b> ${when}</div>
        <div><b>Venue:</b> ${where}</div>
        <div><b>Student ID:</b> ${user.deptId || "N/A"}</div>
      </div>

      <div class="badge">AUST • HiveNet</div>

      <div class="signs">
        <div class="sign">
          <div class="sigline"></div>
          <div>Club Coordinator</div>
        </div>
        <div class="sign">
          <div class="sigline"></div>
          <div>Department Head</div>
        </div>
      </div>

      <div class="hr"></div>
      <div class="printbar">
        <button class="btn" onclick="window.print()">Print / Save as PDF</button>
        <button class="btn" onclick="window.close()">Close</button>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  w.document.open();
  w.document.write(html);
  w.document.close();

  try { w.focus(); } catch {}
}
