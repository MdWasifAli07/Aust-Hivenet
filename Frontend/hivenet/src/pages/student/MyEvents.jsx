// src/pages/student/MyEvents.jsx
import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক
import { listMyEvents } from "../../services/api"; // ব্যবহারকারীর নিবন্ধিত ইভেন্টগুলির তালিকা পাওয়ার API ফাংশন
import { generateCertificate } from "../../utils/certificate"; // সার্টিফিকেট তৈরি করার জন্য ইউটিলিটি ফাংশন
import "../../styles/clubs.css"; // clubs.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function MyEvents() {
  const { user } = useAuth(); // লগিন করা ব্যবহারকারীর তথ্য
  const rows = listMyEvents(user.id); // ব্যবহারকারীর নিবন্ধিত ইভেন্টগুলির তালিকা

  // সার্টিফিকেট তৈরি করার ফাংশন
  const onCert = (ev) => {
    generateCertificate(user, ev); // সার্টিফিকেট তৈরি করা হচ্ছে
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>My Events</h1> {/* "My Events" শিরোনাম */}
      <div className="res-list"> {/* নিবন্ধিত ইভেন্টগুলির তালিকা */}
        {rows.map(e => ( // সমস্ত ইভেন্ট রেন্ডার করা হচ্ছে
          <div key={e.id} className="res-row"> {/* প্রতিটি ইভেন্টের জন্য রো */}
            <div className="avatar">{String(e.title).slice(0, 2)}</div> {/* ইভেন্টের প্রথম দুটি অক্ষর দিয়ে অ্যাভাটার */}
            <div className="grow">
              <div className="bold">{e.title}</div> {/* ইভেন্টের শিরোনাম */}
              <div className="muted">{e.club} • {e.date} • {e.time} • {e.location}</div> {/* ক্লাব, তারিখ, সময়, এবং স্থান */}
            </div>
            <button className="btn-outline" onClick={() => onCert(e)} title="Print or Save as PDF">
              Certificate
            </button> {/* সার্টিফিকেট তৈরি করার বাটন */}
          </div>
        ))}
        {rows.length === 0 && <div className="muted">No registrations yet.</div>} {/* যদি কোনো ইভেন্ট না থাকে */}
      </div>
    </>
  );
}
