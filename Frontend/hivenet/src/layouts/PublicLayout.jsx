import { Outlet } from "react-router-dom"; // React Router এর Outlet কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা নেস্টেড রাউট রেন্ডার করবে
import Navbar from "../components/Navbar.jsx"; // Navbar কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা পৃষ্ঠার উপরের ন্যাভিগেশন বার দেখাবে
import Footer from "../components/Footer.jsx"; // Footer কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা পৃষ্ঠার ফুটার দেখাবে
import FloatingChat from "../components/FloatingChat.jsx"; // FloatingChat কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ফ্লোটিং চ্যাট বেল দেখাবে
import "../styles/navbar.css"; // navbar.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function PublicLayout() {
  return (
    <>
      <Navbar /> {/* Navbar রেন্ডার হচ্ছে, যা নেভিগেশন সিস্টেম দেখাবে */}
      <main> {/* মূল কনটেন্ট এরিয়া */}
        <div className="container"> {/* কনটেন্টের জন্য একটি কনটেইনার */}
          <Outlet /> {/* নেস্টেড রাউট রেন্ডার হবে এখানে */}
        </div>
      </main>
      <FloatingChat /> {/* ফ্লোটিং চ্যাট বেল, যা AI চ্যাটের জন্য ব্যবহার হবে */}
      <Footer /> {/* Footer রেন্ডার হচ্ছে, যা পৃষ্ঠার ফুটারে দেখাবে */}
    </>
  );
}
