import { useParams, Link } from "react-router-dom"; // React Router এর useParams এবং Link হুক ইম্পোর্ট করা হচ্ছে
import { useState } from "react"; // React এর useState হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/forum.css"; // forum.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import Card from "../../components/Card"; // Card কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা পোস্ট এবং মন্তব্য প্রদর্শন করবে
import { addComment, getPost, likePost, listComments } from "../../services/api"; // API কল করার জন্য ফাংশনগুলি ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../../context/AuthContext"; // AuthContext থেকে ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক

export default function PostDetails() {
  const { id } = useParams(); // URL থেকে পোস্টের ID নেওয়া হচ্ছে
  const { user } = useAuth(); // লগিন করা ব্যবহারকারীর তথ্য
  const [post, setPost] = useState(getPost(id)); // পোস্টের তথ্য স্টেটে সেভ হচ্ছে
  const [cmts, setCmts] = useState(listComments(id)); // পোস্টের মন্তব্য তালিকা স্টেটে সেভ হচ্ছে
  const [text, setText] = useState(""); // মন্তব্য ইনপুটের স্টেট

  if (!post) return <div>Post not found. <Link to="/student/forum">Back</Link></div>; // যদি পোস্ট পাওয়া না যায়, তাহলে "Post not found" মেসেজ দেখানো হবে

  // লাইক করার ফাংশন
  const like = () => {
    likePost(post.id, user.id); // পোস্টে লাইক দেওয়া হচ্ছে
    setPost(getPost(id)); // পোস্ট আপডেট করা হচ্ছে
  };

  // নতুন মন্তব্য যোগ করার ফাংশন
  const add = () => {
    const t = text.trim(); 
    if (!t) return; // যদি মন্তব্য খালি থাকে, কিছুই হবে না
    addComment(post.id, { authorId: user.id, authorName: user.name, text: t }); // নতুন মন্তব্য যোগ করা হচ্ছে
    setText(""); // ইনপুট রিসেট করা হচ্ছে
    setCmts(listComments(id)); // মন্তব্যের তালিকা রিফ্রেশ করা হচ্ছে
    setPost(getPost(id)); // পোস্টের তথ্য রিফ্রেশ করা হচ্ছে
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link className="btn" to="/student/forum">Back</Link> {/* ফোরামে ফিরে যাওয়ার লিঙ্ক */}
        <h1 style={{ margin: 0 }}>Post</h1> {/* পোস্ট শিরোনাম */}
      </div>

      {/* পোস্টের বিস্তারিত */}
      <Card title={post.title} subtitle={`${post.club || "General"} • by ${post.authorName} • ${new Date(post.ts).toLocaleString()}`}>
        <p style={{ marginTop: 0 }}>{post.body}</p> {/* পোস্টের বডি */}
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button className="btn-outline" onClick={like}>{post.likes?.length || 0} ♥ Like</button> {/* লাইক বাটন */}
          <a className="btn" href="#comments">{cmts.length} Comments</a> {/* মন্তব্যের সংখ্যা এবং "Comments" লিঙ্ক */}
        </div>
      </Card>

      {/* মন্তব্য সেকশন */}
      <Card title="Comments" subtitle={`Total ${cmts.length}`}>
        <div id="comments" className="comments"> {/* মন্তব্যের তালিকা */}
          {cmts.map(c => (
            <div key={c.id} className="cmt"> {/* প্রতিটি মন্তব্য */}
              <div className="cmt__head">
                <strong>{c.authorName}</strong> <span className="muted">{new Date(c.ts).toLocaleString()}</span> {/* মন্তব্যকারী এবং তারিখ */}
              </div>
              <div>{c.text}</div> {/* মন্তব্যের টেক্সট */}
            </div>
          ))}
          {cmts.length === 0 && <div className="muted">No comments yet.</div>} {/* যদি কোনো মন্তব্য না থাকে */}
        </div>

        {/* মন্তব্য পোস্ট করার ফর্ম */}
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input className="input" placeholder="Write a comment..." value={text} onChange={e => setText(e.target.value)} /> {/* মন্তব্য ইনপুট */}
          <button className="btn-primary" onClick={add}>Comment</button> {/* মন্তব্য পোস্ট করার বাটন */}
        </div>
      </Card>
    </>
  );
}
