import { Outlet } from "react-router-dom"; // React Router এর Outlet কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা নেস্টেড রাউট রেন্ডার করবে
import SidebarAdmin from "../components/SidebarAdmin.jsx"; // Admin সাইডবার কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import FloatingChat from "../components/FloatingChat.jsx"; // FloatingChat কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ফ্লোটিং চ্যাট বেল দেখাবে
import "../styles/admin-layout.css"; // admin-layout.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function AdminLayout() {
  return (
    <div className="layout admin"> {/* Admin লেআউটের মূল কনটেইনার */}
      <SidebarAdmin /> {/* Admin সাইডবার */}
      <div className="content"> {/* কনটেন্ট এরিয়া যেখানে নেস্টেড রাউট রেন্ডার হবে */}
        <Outlet /> {/* নেস্টেড রাউট রেন্ডার হবে এখানে */}
      </div>
      <FloatingChat /> {/* ফ্লোটিং চ্যাট বেল, যা AI চ্যাটের জন্য ব্যবহার হবে */}
    </div>
  );
}
