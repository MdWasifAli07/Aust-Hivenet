import { Navigate, Outlet, useLocation } from "react-router-dom"; // React Router এর Navigate, Outlet এবং useLocation হুক ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../context/AuthContext"; // ব্যবহারকারীর অটেন্টিকেশন স্টেট পাওয়ার জন্য useAuth হুক

export default function ProtectedRoute() {
  const { isAuthed } = useAuth(); // ব্যবহারকারীর লগইন স্টেট চেক করা হচ্ছে
  const loc = useLocation(); // বর্তমান লোকেশন (URL) নেওয়া হচ্ছে

  // যদি ব্যবহারকারী লগইন না করে থাকে, তাকে লগইন পৃষ্ঠায় রিডিরেক্ট করা হচ্ছে
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: loc.pathname }} />;

  return <Outlet />; // যদি লগইন করা থাকে, তাহলে নেস্টেড রাউট রেন্ডার করা হচ্ছে
}
