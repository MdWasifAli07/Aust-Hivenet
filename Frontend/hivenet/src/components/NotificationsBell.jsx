import { useEffect, useRef, useState } from "react"; // React এর useEffect, useRef, এবং useState হুক ইম্পোর্ট করা হচ্ছে
import { useNotify } from "../context/NotifyContext"; // useNotify হুক ইম্পোর্ট করা হচ্ছে, যা নোটিফিকেশন ডেটা প্রদান করে
import "../styles/notify.css"; // notify.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function NotificationsBell({ owner }) {
  // নোটিফিকেশন তালিকা, সংখ্যা, সবগুলো 'read' চিহ্নিত করা, সব মুছে ফেলা, এবং নির্দিষ্ট নোটিফিকেশন মুছে ফেলার ফাংশন
  const { list, count, markAllRead, clear, remove } = useNotify();

  const [open, setOpen] = useState(false); // নোটিফিকেশন ড্রপডাউন খুলতে বা বন্ধ করতে useState ব্যবহার হচ্ছে
  const ref = useRef(null); // DOM রেফারেন্স, যা ক্লিক বাহিরে হলে নোটিফিকেশন ড্রপডাউন বন্ধ করবে

  // 'owner' এর উপর নির্ভর করে নোটিফিকেশন তালিকা এবং অপর্যাপ্ত নোটিফিকেশন সংখ্যা পাওয়া যাচ্ছে
  const items = list(owner || "public"); // ডিফল্ট 'public' owner ব্যবহার হচ্ছে যদি 'owner' না দেওয়া থাকে
  const unread = count(owner || "public"); // অপর্যাপ্ত নোটিফিকেশন সংখ্যা

  // ক্লিক বাহিরে হলে ড্রপডাউন বন্ধ করতে useEffect ব্যবহার করা হচ্ছে
  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false); // ড্রপডাউন বন্ধ করা হচ্ছে
    };
    document.addEventListener("click", onDoc); // ডকুমেন্টে ক্লিক হলে onDoc ফাংশন চালানো হবে
    return () => document.removeEventListener("click", onDoc); // কম্পোনেন্ট আনমাউন্ট হলে ইভেন্ট লিসেনার রিমুভ করা হবে
  }, []);

  return (
    <div className="notify" ref={ref}> {/* নোটিফিকেশন কম্পোনেন্টের মূল কনটেইনার */}
      <button className="notify__btn" onClick={() => setOpen((v) => !v)} type="button" title="Notifications">
        {/* বেল আইকন এবং অপর্যাপ্ত নোটিফিকেশন সংখ্যা */}
        <span className="bell" aria-hidden>🔔</span>
        {unread > 0 && <span className="badge">{unread}</span>} {/* অপর্যাপ্ত নোটিফিকেশন থাকলে ব্যাজ শো করবে */}
      </button>

      {open && (  // যদি ড্রপডাউন ওপেন থাকে, তাহলে নোটিফিকেশন ড্রপডাউন রেন্ডার হবে
        <div className="notify__drop">
          <div className="notify__head">
            <strong>Notifications</strong> {/* হেডারে নোটিফিকেশন লেখা */}
            <div className="spacer" /> {/* স্পেসার */}
            <button className="mini" onClick={() => markAllRead(owner || "public")} type="button">Mark all read</button> {/* সব নোটিফিকেশন 'read' চিহ্নিত করার বাটন */}
            <button className="mini" onClick={() => clear(owner || "public")} type="button">Clear</button> {/* সব নোটিফিকেশন মুছে ফেলার বাটন */}
          </div>
          <div className="notify__list">
            {/* যদি কোন নোটিফিকেশন না থাকে, তবে 'No notifications' দেখাবে */}
            {items.length === 0 ? (
              <div className="empty">No notifications</div>
            ) : (
              // নোটিফিকেশন তালিকা, প্রতিটি আইটেমের জন্য একটি 'delete' বাটন থাকবে
              items.map(n => (
                <div key={n.id} className={"notify__item " + (n.read ? "read" : "unread")}>
                  <div className="txt">{n.text}</div> {/* নোটিফিকেশনের টেক্সট */}
                  <div className="meta">{new Date(n.ts).toLocaleString()}</div> {/* নোটিফিকেশনের টাইমস্ট্যাম্প */}
                  <button className="mini danger" onClick={() => remove(owner || "public", n.id)} type="button">✕</button> {/* নোটিফিকেশন মুছে ফেলার বাটন */}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
