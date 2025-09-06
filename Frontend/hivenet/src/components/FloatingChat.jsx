import { useAuth } from "../context/AuthContext"; // useAuth হুকটি ইম্পোর্ট করা হচ্ছে যা অটেন্টিকেশন সম্পর্কিত ডেটা দেয়
import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট যা নেভিগেশন সহায়তা করবে
import "../styles/floating-chat.css"; // floating-chat.css ফাইলটি ইম্পোর্ট করা হচ্ছে স্টাইলের জন্য

export default function FloatingChat() {
  // useAuth হুক ব্যবহার করে ব্যবহারকারীর অটেন্টিকেশন স্টেট এবং ডেটা পাওয়া যাচ্ছে
  const { isAuthed, user } = useAuth();
  
  // রিডিরেকশন ঠিক করা হচ্ছে, যদি ব্যবহারকারী অটেন্টিকেশন প্রাপ্ত থাকে এবং তার রোল 'student' হয়, তাহলে 'AI Assistant' পৃষ্ঠায় রিডিরেক্ট হবে। অন্যথায় লগইন পৃষ্ঠায় যাবে।
  const to = isAuthed && user?.role === "student" ? "/student/ai-assistant" : "/login";

  return (
    <Link to={to} className="float-chat" aria-label="AI Assistant"> {/* Link কম্পোনেন্ট, এখানে 'to' ভেরিয়েবলটি ব্যবহার করে রিডিরেক্ট পাথ নির্ধারণ */}
      <span className="dot"></span> {/* ছোট ডট চিহ্ন, যা ফ্লোটিং চ্যাট আইকনের একটি অংশ */}
      
      {/* SVG চিত্র, এটি AI অ্যাসিস্ট্যান্ট আইকনের রূপ */}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 3c4.97 0 9 3.582 9 8 0 2.485-1.357 4.69-3.5 6.13V21l-3.086-1.543A11.6 11.6 0 0 1 12 19c-4.97 0-9-3.582-9-8s4.03-8 9-8Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    </Link>
  );
}
