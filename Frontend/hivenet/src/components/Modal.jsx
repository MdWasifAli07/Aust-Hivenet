import { useEffect } from "react"; // React এর useEffect হুক ইম্পোর্ট করা হচ্ছে যা side-effect হ্যান্ডলিংয়ের জন্য ব্যবহার হয়
import "../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Modal({ open, title, children, onClose }) {
  // useEffect হুক যা modal এর ওপেন স্টেট পরিবর্তিত হলে Escape কী চাপলে modal বন্ধ করবে
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.(); // Escape কী চাপলে onClose ফাংশন কল হবে
    if (open) window.addEventListener("keydown", onEsc); // modal ওপেন থাকলে keydown ইভেন্ট লিসেন করা হবে
    return () => window.removeEventListener("keydown", onEsc); // cleanup: যদি modal বন্ধ হয়, keydown ইভেন্ট রিমুভ করা হবে
  }, [open, onClose]); // open এবং onClose এর উপর ডিপেন্ডেন্ট

  // যদি modal ওপেন না থাকে, তাহলে কিছু রিটার্ন হবে না
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}> {/* modal-bacdrop ক্লাস, যা modal এর পিছনে থাকে এবং ক্লিক করলে modal বন্ধ হবে */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}> {/* modal-card, ক্লিক করলে ইভেন্ট প্রপাগেশন বন্ধ হবে */}
        <header className="modal-head"> {/* modal এর হেডার সেকশন */}
          <h3>{title}</h3> {/* modal এর শিরোনাম */}
          <button className="icon" onClick={onClose}>✕</button> {/* Close বাটন যা modal বন্ধ করবে */}
        </header>
        <div className="modal-body"> {/* modal এর বডি, এখানে children (কনটেন্ট) রেন্ডার হবে */}
          {children}
        </div>
      </div>
    </div>
  );
}
