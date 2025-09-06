import { NavLink } from "react-router-dom"; // React Router এর NavLink কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে নেভিগেশন সহায়তার জন্য
import "../styles/student-layout.css"; // student-layout.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function SidebarStudent() {
  return (
    <aside className="sider"> {/* সাইডবার কম্পোনেন্ট */}
      <div className="sider__brand"> {/* ব্র্যান্ড সেকশন */}
        <div className="logo">AN</div> {/* ব্র্যান্ডের লোগো */}
        <div className="btext"> {/* ব্র্যান্ডের টেক্সট */}
          <div className="t1">HiveNet</div> {/* হাইভনেট ব্র্যান্ড নাম */}
          <div className="t2">Student</div> {/* স্টুডেন্ট ব্র্যান্ড সাবটাইটেল */}
        </div>
      </div>

      <nav className="sider__nav"> {/* সাইডবার নেভিগেশন সেকশন */}
        {/* NavLink কম্পোনেন্ট, প্রতিটি লিঙ্ক স্টুডেন্টের বিভিন্ন পৃষ্ঠায় নেভিগেট করবে */}
        <NavLink to="/student/dashboard" end>Dashboard</NavLink> {/* ড্যাশবোর্ড পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/events">Events</NavLink> {/* ইভেন্ট পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/clubs">My Clubs</NavLink> {/* আমার ক্লাব পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/my-events">My Events</NavLink> {/* আমার ইভেন্টস পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/resources">Resources</NavLink> {/* রিসোর্স পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/ai-assistant">AI Assistant</NavLink> {/* AI অ্যাসিস্ট্যান্ট পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/student/forum">Forum</NavLink> {/* ফোরাম পৃষ্ঠার লিঙ্ক */}
      </nav>
    </aside>
  );
}
