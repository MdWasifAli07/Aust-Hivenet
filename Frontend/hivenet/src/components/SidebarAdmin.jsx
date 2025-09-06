import { NavLink, Link } from "react-router-dom"; // React Router এর NavLink এবং Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import "../styles/admin-layout.css"; // admin-layout.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { useLang } from "../context/LanguageContext"; // useLang হুক ইম্পোর্ট করা হচ্ছে, যা ভাষার জন্য ব্যবহৃত হবে
import { useAuth } from "../context/AuthContext"; // AuthContext হুক ব্যবহার করা হচ্ছে সাইন আউট করার জন্য

export default function SidebarAdmin() {
  const { t } = useLang(); // ভাষা নির্ধারণ করার জন্য useLang হুক থেকে t (translation) ফাংশন গ্রহণ করা হচ্ছে
  const { signOut } = useAuth(); // সাইন আউট ফাংশন ব্যবহার করা হচ্ছে

  return (
    <aside className="admin-sider"> {/* সাইডবার কম্পোনেন্ট */}
      <div className="admin-brand"> {/* ব্র্যান্ড সেকশন */}
        <div className="logo">AN</div> {/* ব্র্যান্ডের লোগো */}
        <div className="btext"> {/* ব্র্যান্ডের টেক্সট */}
          <div className="t1">{t("brand")}</div> {/* ব্র্যান্ডের নাম (ভাষা অনুযায়ী পরিবর্তিত হবে) */}
          <div className="t2">{t("admin")}</div> {/* 'admin' টেক্সট (ভাষা অনুযায়ী পরিবর্তিত হবে) */}
        </div>
      </div>

      <nav className="admin-nav"> {/* নেভিগেশন সেকশন */}

        {/* Home link added */}
        <NavLink to="/" className="home-link">{t("Home")}</NavLink> {/* হোম পেইজের লিঙ্ক */}
        {/* NavLink কম্পোনেন্ট, প্রতিটি লিঙ্কের জন্য ভাষা অনুযায়ী টেক্সট রেন্ডার করা হবে */}
        <NavLink to="/admin/dashboard" end>{t("dashboard")}</NavLink> {/* ড্যাশবোর্ড পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/admin/manage-events">{t("manageEvents")}</NavLink> {/* ইভেন্ট ম্যানেজ পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/admin/manage-clubs">{t("manageClubs")}</NavLink> {/* ক্লাব ম্যানেজ পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/admin/manage-users">{t("manageUsers")}</NavLink> {/* ইউজার ম্যানেজ পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/admin/analytics">{t("analytics")}</NavLink> {/* অ্যানালিটিক্স পৃষ্ঠার লিঙ্ক */}
        <NavLink to="/admin/forum-moderation">{t("forumModeration")}</NavLink> {/* ফোরাম মডারেশন পৃষ্ঠার লিঙ্ক */}


        {/* Logout button */}
        <button className="logout-btn" onClick={signOut}>{t("logout")}</button> {/* সাইন আউট বাটন */}
      </nav>
    </aside>
  );
}
