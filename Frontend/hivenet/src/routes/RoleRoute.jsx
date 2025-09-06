import { Navigate, Outlet } from "react-router-dom"; // React Router এর Navigate এবং Outlet হুক ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../context/AuthContext"; // ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক

export default function RoleRoute({ allow }) {
  const { user } = useAuth(); // ব্যবহারকারীর তথ্য (যেমন রোল) পাওয়ার জন্য useAuth হুক ব্যবহার করা হচ্ছে
  
  // যদি ব্যবহারকারী লগইন না করে থাকে, তাকে লগইন পৃষ্ঠায় রিডিরেক্ট করা হচ্ছে
  if (!user) return <Navigate to="/login" replace />;
  
  // যদি ব্যবহারকারীর রোল অনুমোদিত রোলগুলির মধ্যে থাকে, তাহলে নেস্টেড রাউট রেন্ডার করা হচ্ছে
  // অন্যথায়, রিডিরেক্ট করা হচ্ছে হোম পৃষ্ঠায়
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
}
