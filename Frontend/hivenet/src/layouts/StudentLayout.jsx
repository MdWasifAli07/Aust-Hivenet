import { Outlet, Link } from "react-router-dom"; // React Router এর Outlet এবং Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import SidebarStudent from "../components/SidebarStudent.jsx"; // SidebarStudent কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা স্টুডেন্টদের জন্য সাইডবার দেখাবে
import FloatingChat from "../components/FloatingChat.jsx"; // FloatingChat কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ফ্লোটিং চ্যাট বেল দেখাবে
import "../styles/student-layout.css"; // student-layout.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../context/AuthContext"; // useAuth হুক ইম্পোর্ট করা হচ্ছে, যা সাইন আউট ফাংশন প্রদান করবে

export default function StudentLayout() {
  const { signOut } = useAuth(); // সাইন আউট ফাংশন গ্রহণ করা হচ্ছে

  return (
    <div className="layout"> {/* লেআউট কনটেইনার */}
      <SidebarStudent /> {/* স্টুডেন্ট সাইডবার */}
      
      
      <div className="content"> {/* কনটেন্ট এরিয়া যেখানে নেস্টেড রাউট রেন্ডার হবে */}
        <Outlet /> {/* নেস্টেড রাউট রেন্ডার হবে এখানে */}
      </div>
      <FloatingChat /> {/* ফ্লোটিং চ্যাট বেল, যা AI চ্যাটের জন্য ব্যবহার হবে */}
      
      {/* Home and Logout button added at the bottom of the layout */}
      <div className="bottom-actions">
        <Link to="/" className="home-link">Home</Link> {/* Home লিঙ্ক */}
        <button className="logout-btn" onClick={signOut}>Logout</button> {/* Logout বাটন */}
      </div>
    </div>
  );
}
