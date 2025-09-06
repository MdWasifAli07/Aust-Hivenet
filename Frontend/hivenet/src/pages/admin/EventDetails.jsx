import { useParams, Link } from "react-router-dom";
import { eventCheckinCode, getEvent, listAttendance, markAttendance } from "../../services/api";
import "../../styles/admin-pages.css";
import { useMemo, useState } from "react";

export default function EventDetails(){
  const { id } = useParams();
  const ev = getEvent(id);
  const code = eventCheckinCode(id);
  const [who, setWho] = useState("");
  const [rows, setRows] = useState(listAttendance(id));

  const onMark = ()=>{
    if (!who.trim()) return;
    const updated = markAttendance(id, who.trim());
    setRows(updated);
    setWho("");
  };

  // Deep-link that pre-fills the check-in code
  const deepLink = useMemo(()=>{
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/check-in?code=${encodeURIComponent(code)}`;
  }, [code]);

  // Simple QR using Google Chart API (no extra libs)
  const qrUrl = useMemo(()=>{
    const content = deepLink;
    const size = "240x240";
    return `https://chart.googleapis.com/chart?cht=qr&chs=${size}&chld=L|0&chl=${encodeURIComponent(content)}`;
  }, [deepLink]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied!");
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand("copy"); }catch{}
      document.body.removeChild(ta);
      alert("Copied!");
    }
  };

  return (
    <>
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <h1 style={{margin:0}}>Event</h1>
        <span className="kard" style={{padding:"6px 10px"}}>ID: {id}</span>
        <Link className="btn ghost" to="/admin/manage-events">Back</Link>
      </div>

      <div className="kard" style={{marginTop:12}}>
        {ev ? (
          <>
            <h3 style={{marginTop:0}}>{ev.title}</h3>
            <div style={{color:"var(--muted)"}}>{ev.club} • {ev.date} • {ev.time} • {ev.location}</div>
          </>
        ) : (
          <div style={{color:"var(--muted)"}}>Event not found in demo store. You can still use check-in code.</div>
        )}
      </div>

      <div className="grid-3" style={{margin:"12px 0"}}>
        <div className="kard">
          <div style={{fontWeight:700, marginBottom:8}}>Check-in Code</div>
          <div style={{fontSize:28, fontWeight:800, letterSpacing:2}}>{code}</div>
          <div className="actions" style={{marginTop:10}}>
            <button className="btn ghost" onClick={()=>copy(code)}>Copy code</button>
          </div>
        </div>

        <div className="kard">
          <div style={{fontWeight:700, marginBottom:8}}>QR for Check-in</div>
          <div style={{display:"grid", placeItems:"center"}}>
            <img src={qrUrl} alt="Check-in QR" width={240} height={240} style={{borderRadius:12, border:"1px solid #e5e7eb"}} />
          </div>
          <div style={{marginTop:8, fontSize:12, color:"var(--muted)", wordBreak:"break-all"}}>{deepLink}</div>
          <div className="actions" style={{marginTop:10}}>
            <a className="btn ghost" href={qrUrl} target="_blank" rel="noreferrer">Open QR</a>
            <button className="btn ghost" onClick={()=>copy(deepLink)}>Copy link</button>
          </div>
        </div>

        <div className="kard">
          <div style={{fontWeight:700, marginBottom:8}}>Mark Attendance (manual)</div>
          <div style={{display:"flex", gap:8}}>
            <input className="input" placeholder="Student email or DeptID" value={who} onChange={e=>setWho(e.target.value)} />
            <button className="btn primary" onClick={onMark}>Mark present</button>
          </div>
          <p className="k" style={{marginTop:8}}>
            Tip: Display the QR on a projector. Students scan → code auto-fills on the Check-in page.
          </p>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr><th>#</th><th>Who</th><th>Marked At</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={r.id}>
              <td>{i+1}</td>
              <td>{r.who}</td>
              <td>{new Date(r.at).toLocaleString()}</td>
            </tr>
          ))}
          {rows.length===0 && (
            <tr><td colSpan={3} style={{color:"var(--muted)"}}>No attendance yet.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
