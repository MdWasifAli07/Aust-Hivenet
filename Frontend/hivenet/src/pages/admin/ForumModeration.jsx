import { useMemo, useState } from "react"; // useMemo এবং useState হুকস ইম্পোর্ট করা হচ্ছে
import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import Modal from "../../components/Modal"; // Modal কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import { deleteComment, deletePost, listComments, listPosts } from "../../services/api"; // API কল করার জন্য ফাংশনগুলো ইম্পোর্ট করা হচ্ছে

export default function ForumModeration() {
  const [rows, setRows] = useState(listPosts()); // পোস্টের তালিকা স্টেটে সেভ হচ্ছে
  const [q, setQ] = useState(""); // সার্চ কুয়েরি স্টেট
  const [open, setOpen] = useState(false); // Modal ওপেন/বন্ধ করা হবে
  const [focus, setFocus] = useState(null); // নির্বাচিত পোস্টের ID (ক্লিক করা হলে)

  // সার্চ ফাংশন: কুয়েরি অনুসারে পোস্ট ফিল্টার করা
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows; // সার্চ না থাকলে সমস্ত পোস্ট দেখাবে
    return rows.filter(r =>
      r.title?.toLowerCase().includes(t) || // পোস্টের শিরোনাম অনুযায়ী
      r.body?.toLowerCase().includes(t) || // পোস্টের বডি অনুযায়ী
      r.club?.toLowerCase().includes(t) || // ক্লাব নাম অনুযায়ী
      r.authorName?.toLowerCase().includes(t) // লেখকের নাম অনুযায়ী
    );
  }, [rows, q]);

  // পোস্ট রিফ্রেশ করার ফাংশন
  const refresh = () => setRows(listPosts()); // নতুন করে পোস্ট তালিকা লোড করবে

  // পোস্ট ডিলিট করার ফাংশন
  const removePost = (id) => {
    deletePost(id); // পোস্ট ডিলিট করার API কল
    refresh(); // পোস্ট তালিকা রিফ্রেশ করা হচ্ছে
  };

  // কমেন্টস ম্যানেজমেন্ট ফাংশন (পোস্টে কমেন্টস দেখা)
  const manageComments = (id) => {
    setFocus(id); // নির্বাচিত পোস্টের ID সেট করা হচ্ছে
    setOpen(true); // Modal ওপেন করা হচ্ছে
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Forum Moderation</h1> {/* ফোরাম মডারেশন শিরোনাম */}
        <input className="input" placeholder="Search posts..." value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 300 }} /> {/* পোস্ট সার্চ ইনপুট */}
      </div>

      {/* পোস্ট টেবিল */}
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Title</th><th>Club</th><th>Author</th><th>Likes</th><th>Comments</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td> {/* পোস্টের ID */}
              <td>{p.title}</td> {/* পোস্টের শিরোনাম */}
              <td>{p.club || "General"}</td> {/* ক্লাবের নাম */}
              <td>{p.authorName}</td> {/* লেখকের নাম */}
              <td>{p.likes?.length || 0}</td> {/* লাইক সংখ্যা */}
              <td>{p.commentsCount || 0}</td> {/* কমেন্ট সংখ্যা */}
              <td style={{ display: "flex", gap: 8 }}>
                <a className="btn ghost" href={`/student/post/${p.id}`} target="_blank" rel="noreferrer">Open</a> {/* পোস্ট দেখুন */}
                <button className="btn ghost" onClick={() => manageComments(p.id)}>Comments</button> {/* কমেন্ট ম্যানেজ বাটন */}
                <button className="btn ghost" onClick={() => removePost(p.id)}>Delete</button> {/* পোস্ট ডিলিট বাটন */}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={7} style={{ color: "var(--muted)" }}>No posts.</td></tr>} {/* যদি কোনো পোস্ট না থাকে */}
        </tbody>
      </table>

      {/* Modal যেখানে কমেন্টস রেন্ডার হবে */}
      <Modal open={open} title={`Comments of Post #${focus || ""}`} onClose={() => setOpen(false)}>
        {!focus ? <div className="k">No post selected.</div> : <CommentsPanel pid={focus} />} {/* যদি কোনো পোস্ট নির্বাচিত না থাকে, 'No post selected.' দেখাবে */}
      </Modal>
    </>
  );
}

// CommentsPanel কম্পোনেন্ট, যেখানে পোস্টের কমেন্টস দেখানো হবে
function CommentsPanel({ pid }) {
  const [rows, setRows] = useState(listComments(pid)); // কমেন্টসের তালিকা পাওয়ার জন্য API কল

  // কমেন্ট ডিলিট করার ফাংশন
  const remove = (cid) => {
    deleteComment(pid, cid); // কমেন্ট ডিলিট করার API কল
    setRows(listComments(pid)); // কমেন্টস রিফ্রেশ করা
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map(c => (
        <div key={c.id} style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <strong>{c.authorName}</strong> {/* কমেন্ট লেখকের নাম */}
            <span style={{ color: "#6b7280" }}>{new Date(c.ts).toLocaleString()}</span> {/* কমেন্ট টাইমস্ট্যাম্প */}
            <div style={{ flex: 1 }} />
            <button className="btn" onClick={() => remove(c.id)}>Delete</button> {/* কমেন্ট ডিলিট বাটন */}
          </div>
          <div>{c.text}</div> {/* কমেন্টের টেক্সট */}
        </div>
      ))}
      {rows.length === 0 && <div className="k">No comments.</div>} {/* যদি কোনো কমেন্ট না থাকে */}
    </div>
  );
}
