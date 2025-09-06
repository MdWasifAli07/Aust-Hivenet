import { useState } from "react"; // React এর useState হুক ইম্পোর্ট করা হচ্ছে
import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import "../../styles/forum.css"; // forum.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import Card from "../../components/Card"; // Card কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ফর্ম এবং পোস্ট প্রদর্শন করবে
import { useAuth } from "../../context/AuthContext"; // AuthContext থেকে ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক
import { createPost, likePost, listPosts } from "../../services/api"; // পোস্ট তৈরি, লাইক এবং পোস্ট তালিকা দেখানোর API ফাংশন

export default function Forum() {
  const { user } = useAuth(); // লগিন করা ব্যবহারকারীর তথ্য
  const [rows, setRows] = useState(listPosts()); // পোস্টের তালিকা স্টেটে সেভ হচ্ছে
  const [form, setForm] = useState({ title: "", body: "", club: "" }); // ফর্মের জন্য স্টেট

  // ইনপুট ফিল্ডের পরিবর্তন অনুসারে ফর্ম আপডেট হচ্ছে
  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // নতুন পোস্ট তৈরি করার ফাংশন
  const onCreate = () => {
    if (!form.title.trim() || !form.body.trim()) return; // শিরোনাম এবং বডি খালি না থাকার শর্ত
    createPost({ ...form, authorId: user.id, authorName: user.name }); // নতুন পোস্ট তৈরি করা হচ্ছে
    setForm({ title: "", body: "", club: "" }); // ফর্ম রিসেট করা হচ্ছে
    setRows(listPosts()); // পোস্টের তালিকা রিফ্রেশ করা হচ্ছে
  };

  // পোস্টে লাইক করার ফাংশন
  const onLike = (id) => {
    likePost(id, user.id); // পোস্টে লাইক দেওয়া হচ্ছে
    setRows(listPosts()); // পোস্টের তালিকা রিফ্রেশ করা হচ্ছে
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Forum</h1> {/* "Forum" শিরোনাম */}

      {/* পোস্ট তৈরি করার জন্য ফর্ম */}
      <Card title="Start a discussion" subtitle="Cross-club posts">
        <div className="forum-form"> {/* ফর্ম কন্টেইনার */}
          <input className="input" name="title" placeholder="Title" value={form.title} onChange={onChange} /> {/* পোস্টের শিরোনাম ইনপুট */}
          <input className="input" name="club" placeholder="(Optional) Club name e.g., AUSTIDC" value={form.club} onChange={onChange} /> {/* ক্লাবের নাম ইনপুট (ঐচ্ছিক) */}
          <textarea className="input" name="body" placeholder="Write your post..." rows={4} value={form.body} onChange={onChange} /> {/* পোস্টের বডি ইনপুট */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}> {/* ফর্মের বাটনগুলি */}
            <button className="btn" onClick={() => setForm({ title: "", body: "", club: "" })}>Clear</button> {/* ফর্ম ক্লিয়ার করার বাটন */}
            <button className="btn-primary" onClick={onCreate}>Post</button> {/* পোস্ট সাবমিট করার বাটন */}
          </div>
        </div>
      </Card>

      {/* পোস্টগুলির তালিকা */}
      <div className="forum-list">
        {rows.map(p => ( // সার্চ এবং ফিল্টার করা পোস্টগুলির জন্য রেন্ডার করা হচ্ছে
          <article key={p.id} className="post"> {/* পোস্ট কার্ড */}
            <div className="post__title">
              <Link to={`/student/post/${p.id}`}>{p.title}</Link> {/* পোস্টের শিরোনাম */}
            </div>
            <div className="post__meta">{p.club || "General"} • by {p.authorName} • {new Date(p.ts).toLocaleString()}</div> {/* পোস্টের ক্লাব, লেখক এবং টাইমস্ট্যাম্প */}
            <div className="post__body">{p.body}</div> {/* পোস্টের বডি */}
            <div className="post__actions">
              <button className="btn-outline" onClick={() => onLike(p.id)}>{p.likes?.length || 0} ♥ Like</button> {/* লাইক বাটন */}
              <Link className="btn" to={`/student/post/${p.id}`}>{p.commentsCount || 0} Comments</Link> {/* কমেন্টের সংখ্যা এবং পোস্টের বিস্তারিত লিঙ্ক */}
            </div>
          </article>
        ))}
        {rows.length === 0 && <div className="muted">No posts yet.</div>} {/* যদি কোনো পোস্ট না থাকে */}
      </div>
    </>
  );
}
