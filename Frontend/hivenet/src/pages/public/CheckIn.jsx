import { useEffect, useState } from "react"; // React এর useEffect এবং useState হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/card.css"; // card.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { eventCheckinCode, getEvent, markAttendance } from "../../services/api"; // API কল করার জন্য ফাংশনগুলি ইম্পোর্ট করা হচ্ছে

// চেক-ইন কোড প্যার্স করার জন্য ফাংশন
function parseCode(input) {
  const m = String(input || "").trim().toUpperCase().match(/^EVT-(\d{4})$/); // কোডের ফরম্যাট মেলানোর জন্য রেগুলার এক্সপ্রেশন ব্যবহার করা হচ্ছে
  if (!m) return null; // যদি কোড মেলানো না যায়, তখন null রিটার্ন হবে
  return Number(m[1]); // কোডের সংখ্যা অংশ রিটার্ন হচ্ছে
}

export default function CheckIn() {
  const [code, setCode] = useState(""); // চেক-ইন কোড স্টেট
  const [who, setWho] = useState(""); // ব্যবহারকারীর ইমেইল বা ডিপার্টমেন্ট আইডি স্টেট
  const [msg, setMsg] = useState(""); // মেসেজ স্টেট, যা ইউজারকে জানাবে

  // NEW: prefill from ?code=EVT-0001
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search); // URL থেকে কোয়েরি প্যারামিটার নেয়া হচ্ছে
      const c = sp.get("code"); // কোড প্যারামিটার নেয়া হচ্ছে
      if (c && /^EVT-\d{4}$/i.test(c)) { // কোডের সঠিক ফরম্যাট নিশ্চিত করা হচ্ছে
        setCode(c.toUpperCase()); // কোডটি স্টেটে সেট করা হচ্ছে
      }
    } catch {}
  }, []); // শুধু প্রথমে একবার রান হবে

  // চেক-ইন ফাংশন
  const submit = () => {
    setMsg(""); // মেসেজ রিসেট করা হচ্ছে
    const id = parseCode(code); // কোড থেকে ইভেন্ট আইডি পাওয়া হচ্ছে
    if (!id) { setMsg("Invalid code. Example: EVT-0003"); return; } // কোড ভুল হলে মেসেজ দেখানো হচ্ছে
    const ev = getEvent(id); // API কল করে ইভেন্ট ডেটা পাওয়া হচ্ছে
    if (!ev) { setMsg("Event not found."); return; } // যদি ইভেন্ট না পাওয়া যায়
    if (!who.trim()) { setMsg("Please enter your email or DeptID."); return; } // যদি ইনপুট ফিল্ড খালি থাকে
    markAttendance(id, who.trim()); // API কল করে উপস্থিতি চিহ্নিত করা হচ্ছে
    setMsg(`Checked-in for "${ev.title}"!`); // সফল চেক-ইন হলে মেসেজ দেখানো হচ্ছে
    setCode(""); // কোড রিসেট করা হচ্ছে
    setWho(""); // ইমেইল বা ডিপার্টমেন্ট আইডি রিসেট করা হচ্ছে
  };

  // উদাহরণ কোড ব্যবহারের জন্য ফাংশন
  const tryExample = () => setCode(eventCheckinCode(1)); // উদাহরণ কোড সেট করা হচ্ছে

  return (
    <div className="container" style={{ padding: "32px 0" }}>
      <h1 style={{ margin: "0 0 12px" }}>Event Check-in</h1> {/* হেডিং */}
      
      <div className="kard" style={{ maxWidth: 680 }}>
        <p style={{ color: "var(--muted)" }}>
          Enter the event code shown by the organizer (e.g., <b>EVT-0001</b>) and your identifier.
        </p> {/* ইউজারকে নির্দেশনা দেওয়া হচ্ছে */}

        <div style={{ display: "grid", gap: 10 }}>
          <label>
            <div>Check-in Code</div>
            <input className="input" placeholder="EVT-0001" value={code} onChange={e => setCode(e.target.value)} /> {/* চেক-ইন কোড ইনপুট */}
          </label>
          <label>
            <div>Your Email / DeptID</div>
            <input className="input" placeholder="example@aust.edu or 2022xxxxxxx" value={who} onChange={e => setWho(e.target.value)} /> {/* ইমেইল বা ডিপার্টমেন্ট আইডি ইনপুট */}
          </label>
          
          <div className="actions">
            <button className="btn ghost" onClick={tryExample} type="button">Use Example</button> {/* উদাহরণ কোড ব্যবহারের বাটন */}
            <button className="btn primary" onClick={submit} type="button">Check in</button> {/* চেক-ইন বাটন */}
          </div>
          
          {/* মেসেজ শো করার জন্য */}
          {msg && <div style={{ color: "#065f46", background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "8px 10px", borderRadius: 8 }}>{msg}</div>}
        </div>
      </div>
    </div>
  );
}
