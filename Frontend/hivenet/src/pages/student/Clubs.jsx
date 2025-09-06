import { useEffect, useMemo, useState } from "react"; // React এর useEffect, useMemo, useState হুক ইম্পোর্ট করা হচ্ছে
import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক
import { listClubs, joinClub, leaveClub } from "../../services/api"; // ক্লাবের তালিকা পাওয়ার, ক্লাবে যোগদান এবং ক্লাব ছাড়ার ফাংশন
import "../../styles/clubs.css"; // clubs.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function StudentClubs() {
  const { user } = useAuth(); // লগইন করা ব্যবহারকারীর তথ্য
  const [rows, setRows] = useState([]); // ক্লাবের তালিকা স্টেট
  const [q, setQ] = useState(""); // সার্চ কুয়েরি স্টেট

  // ক্লাবের তালিকা লোড করার ফাংশন
  const load = () => setRows(listClubs(user.id)); // API কল করে ব্যবহারকারীর ক্লাবের তালিকা লোড করা হচ্ছে
  useEffect(load, [user.id]); // যখন ব্যবহারকারী আইডি পরিবর্তিত হবে, তখন ক্লাবের তালিকা রিফ্রেশ হবে

  // সার্চ ফাংশন: কুয়েরি অনুসারে ক্লাব ফিল্টার করা
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase(); // সার্চ কুয়েরি ছোট হাতের অক্ষরে রূপান্তর করা হচ্ছে
    if (!t) return rows; // যদি সার্চ কুয়েরি খালি থাকে, তাহলে সমস্ত ক্লাব রিটার্ন হবে
    return rows.filter(r =>
      r.name.toLowerCase().includes(t) || // ক্লাবের নামের মধ্যে সার্চ কুয়েরি খুঁজছে
      r.tagline.toLowerCase().includes(t) || // ক্লাবের ট্যাগলাইনে সার্চ কুয়েরি খুঁজছে
      r.about.toLowerCase().includes(t) // ক্লাবের বর্ণনায় সার্চ কুয়েরি খুঁজছে
    );
  }, [rows, q]); // যখন ক্লাবের তালিকা বা সার্চ কুয়েরি পরিবর্তিত হবে, তখন ফিল্টার হবে

  // ক্লাবে যোগদান করার ফাংশন
  const onJoin = (id) => { 
    joinClub(user.id, id); // ক্লাবে যোগদান করার জন্য API কল
    load(); // ক্লাবের তালিকা রিফ্রেশ করা হচ্ছে
  };

  // ক্লাব ছাড়ার ফাংশন
  const onLeave = (id) => { 
    leaveClub(user.id, id); // ক্লাব ছাড়ার জন্য API কল
    load(); // ক্লাবের তালিকা রিফ্রেশ করা হচ্ছে
  };

  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>Clubs</h1> {/* পেজের শিরোনাম */}
      <div className="club-topbar">
        <input className="search" placeholder="Search clubs..." value={q} onChange={e => setQ(e.target.value)} /> {/* ক্লাব সার্চ ইনপুট */}
      </div>

      <div className="club-grid"> {/* ক্লাবের তালিকার গ্রিড */}
        {filtered.map(c => ( // সার্চ এবং ফিল্টার করা ক্লাবগুলো রেন্ডার করা হচ্ছে
          <article key={c.id} className="club-card"> {/* ক্লাবের কার্ড */}
            <div className="club-head"> {/* ক্লাবের হেড */}
              <div className="avatar">{c.name[0]}</div> {/* ক্লাবের লোগো (প্রথম অক্ষর) */}
              <div>
                <h3 className="title">{c.name}</h3> {/* ক্লাবের নাম */}
                <div className="sub">{c.tagline}</div> {/* ক্লাবের ট্যাগলাইন */}
              </div>
            </div>
            <p className="about">{c.about}</p> {/* ক্লাবের বর্ণনা */}
            <div className="row">
              <Link className="btn-outline" to={`/student/club/${c.id}`}>View details</Link> {/* ক্লাবের বিস্তারিত দেখতে লিঙ্ক */}
              {c.joined
                ? <button className="btn-primary" onClick={() => onLeave(c.id)}>Leave</button> // যদি ক্লাব যোগ করা থাকে, তাহলে "Leave" বাটন
                : <button className="btn-primary" onClick={() => onJoin(c.id)}>Join</button>} // যদি ক্লাব যোগ না করা থাকে, তাহলে "Join" বাটন
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
