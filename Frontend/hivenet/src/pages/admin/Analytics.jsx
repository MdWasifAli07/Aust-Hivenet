import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { listEvents, listAttendance } from "../../services/api"; // API কল করার জন্য ফাংশনগুলি ইম্পোর্ট করা হচ্ছে

// compute ফাংশন: ইভেন্টসের তালিকা, উপস্থিতির সংখ্যা এবং মোট উপস্থিতি গণনা করার জন্য
function compute() {
  const events = listEvents(); // ইভেন্টসের তালিকা পাওয়া
  const rows = events.map(e => ({ ...e, count: listAttendance(e.id).length })); // প্রতি ইভেন্টের জন্য উপস্থিতির সংখ্যা যোগ করা হচ্ছে
  const totalAttendance = rows.reduce((s, r) => s + r.count, 0); // মোট উপস্থিতি গণনা করা হচ্ছে
  rows.sort((a, b) => b.count - a.count); // উপস্থিতির সংখ্যা অনুযায়ী ইভেন্টস গুলি সাজানো হচ্ছে
  return { rows, totalAttendance, totalEvents: events.length }; // রিটার্ন করা হচ্ছে সাজানো ইভেন্টস, মোট উপস্থিতি এবং মোট ইভেন্টসের সংখ্যা
}

export default function Analytics() {
  const { rows, totalAttendance, totalEvents } = compute(); // compute ফাংশন থেকে ডেটা পাওয়া হচ্ছে

  return (
    <>
      <h1 style={{ margin: 0 }}>Analytics</h1> {/* হেডিং */}
      
      {/* মোট ইভেন্টস, মোট উপস্থিতি, এবং শীর্ষ ইভেন্টের উপস্থিতির জন্য তথ্য প্রদর্শন */}
      <div className="grid-3" style={{ margin: "12px 0 16px" }}>
        <div className="kard">
          <div className="n">{totalEvents}</div> {/* মোট ইভেন্টস */}
          <div className="k">Total Events</div>
        </div>
        <div className="kard">
          <div className="n">{totalAttendance}</div> {/* মোট উপস্থিতি */}
          <div className="k">Total Attendance</div>
        </div>
        <div className="kard">
          <div className="n">{rows[0]?.count || 0}</div> {/* শীর্ষ ইভেন্টের উপস্থিতি */}
          <div className="k">Top Event Attendance</div>
        </div>
      </div>

      {/* ইভেন্টের তালিকা টেবিল */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Club</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Attendance</th> {/* উপস্থিতি */}
          </tr>
        </thead>
        <tbody>
          {/* ইভেন্টের প্রতি রো রেন্ডার হচ্ছে */}
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td> {/* ইভেন্টের ID */}
              <td>{r.title}</td> {/* ইভেন্টের শিরোনাম */}
              <td>{r.club}</td> {/* ক্লাবের নাম */}
              <td>{r.date}</td> {/* ইভেন্টের তারিখ */}
              <td>{r.time}</td> {/* ইভেন্টের সময় */}
              <td>{r.location}</td> {/* ইভেন্টের অবস্থান */}
              <td>{r.count}</td> {/* উপস্থিতির সংখ্যা */}
            </tr>
          ))}
          
          {/* যদি কোনো ইভেন্ট না থাকে, তাহলে 'No events.' বার্তা দেখানো হবে */}
          {rows.length === 0 && (
            <tr><td colSpan={7} style={{ color: "var(--muted)" }}>No events.</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
