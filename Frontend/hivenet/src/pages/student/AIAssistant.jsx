import { useState, useRef, useEffect } from "react"; // React এর useState, useRef, useEffect হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/clubs.css"; // clubs.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function AIAssistant() {
  const [chat, setChat] = useState([ // চ্যাটের ইতিহাস স্টেটে সেভ হচ্ছে
    { id: "g1", who: "bot", text: "Hi! I'm your AUST HiveNet assistant. Ask me about clubs or events." } // প্রথম বটের মেসেজ
  ]);
  const [msg, setMsg] = useState(""); // নতুন মেসেজের জন্য স্টেট
  const endRef = useRef(null); // চ্যাট শেষে রেফারেন্স সেট করা হচ্ছে, যাতে নতুন মেসেজ দেখানোর পরে স্ক্রল করা যায়
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [chat.length]); // চ্যাট ইতিহাসের দৈর্ঘ্য পরিবর্তিত হলে চ্যাট বক্স স্ক্রল করা হচ্ছে

  // মেসেজ পাঠানোর ফাংশন
  const onSend = (e) => {
    e.preventDefault(); // ফর্ম সাবমিট হওয়ার পর পেজ রিফ্রেশ হবে না
    const t = msg.trim(); // মেসেজ থেকে অপ্রয়োজনীয় স্পেস সরানো হচ্ছে
    if (!t) return; // যদি মেসেজ খালি থাকে, কিছুই হবে না
    const u = { id: crypto.randomUUID(), who: "me", text: t }; // ব্যবহারকারীর মেসেজ
    setChat(c => [...c, u]); // চ্যাট ইতিহাসে ব্যবহারকারীর মেসেজ যোগ করা হচ্ছে
    setMsg(""); // মেসেজ ইনপুট রিসেট করা হচ্ছে
    // বটের প্রতিক্রিয়া (ডেমো রেসপন্স)
    setTimeout(() => {
      setChat(c => [...c, { id: crypto.randomUUID(), who: "bot", text: "(Demo) I’ll answer once backend is connected." }]); // বটের উত্তর
    }, 600);
  };

  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>AI Assistant</h1> {/* হেডিং */}
      <div className="panel chat"> {/* চ্যাট প্যানেল */}
        <div className="chat-body"> {/* চ্যাট ইতিহাস */}
          {chat.map(x => (
            <div key={x.id} className={"bubble " + (x.who === "me" ? "me" : "other")}>
              <div className="meta">{x.who === "me" ? "You" : "Assistant"}</div> {/* চ্যাটের রোল */}
              <div>{x.text}</div> {/* চ্যাটের টেক্সট */}
            </div>
          ))}
          <div ref={endRef} /> {/* চ্যাটের শেষে স্ক্রল করার জন্য রেফারেন্স */}
        </div>
        <form className="chat-input" onSubmit={onSend}> {/* চ্যাট ইনপুট ফর্ম */}
          <input placeholder="Ask in English or Bangla…" value={msg} onChange={e => setMsg(e.target.value)} /> {/* মেসেজ ইনপুট */}
          <button className="btn-primary" disabled={!msg.trim()}>Send</button> {/* সাবমিট বাটন */}
        </form>
      </div>
    </>
  );
}
