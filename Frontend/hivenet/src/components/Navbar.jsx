import { NavLink, Link } from "react-router-dom"; // React Router এর NavLink এবং Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../context/AuthContext"; // useAuth হুক ইম্পোর্ট করা হচ্ছে
import { useLang } from "../context/LanguageContext"; // useLang হুক ইম্পোর্ট করা হচ্ছে
import NotificationsBell from "./NotificationsBell"; // NotificationsBell কম্পোনেন্ট
import "../styles/navbar.css"; // navbar.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import "../styles/toggle.css"; // toggle.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Navbar() {
  const { isAuthed, user, signOut } = useAuth(); // ব্যবহারকারীর অটেন্টিকেশন স্টেট এবং সাইন আউট ফাংশন গ্রহণ করা হচ্ছে
  const { lang, setLang, t } = useLang(); // ভাষা স্টেট এবং ভাষা পরিবর্তন করার ফাংশন গ্রহণ করা হচ্ছে

  // Notifications owner: student uses their user.id; admin uses "admin"; public uses "public"
  const owner = isAuthed ? (user?.role === "admin" ? "admin" : user?.id) : "public"; // নোটিফিকেশন মালিক নির্ধারণ করা হচ্ছে

  return (
    <header className="nav">
      <div className="nav__inner container">
        
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand__logo">⋰⋱</span>
          <span className="brand__text">Hivenet</span>
        </Link>

        {/* Links */}
        <nav className="nav__links">
          <NavLink to="/" end>{t("home")}</NavLink>
          <NavLink to="/clubs">{t("clubs")}</NavLink>
          <NavLink to="/events">{t("events")}</NavLink>
          <NavLink to="/about">{t("about")}</NavLink>
          <NavLink to="/contact">{t("contact")}</NavLink>
          <NavLink to="/check-in">{t("check-in")}</NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin/dashboard">{t("dashboard")}</NavLink> // Admin-এর জন্য dashboard লিঙ্ক
          )}
          {user?.role === "student" && (
            <NavLink to="/student/dashboard">{t("dashboard")}</NavLink> // Student-এর জন্য dashboard লিঙ্ক
          )}
        </nav>

        {/* Right actions */}
        <div className="nav__actions">
          {/* Language Toggle */}
          <div className="lang-switch">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} type="button">EN</button>
            <button className={lang === "bn" ? "active" : ""} onClick={() => setLang("bn")} type="button">BN</button>
          </div>

          {/* Notifications */}
          <NotificationsBell owner={owner} />

          {/* Auth-dependent actions */}
          {isAuthed ? (
            <>
              <span style={{ color: "var(--muted)", textTransform: "capitalize" }} title={user?.email}>
                {user?.role}
              </span>
              <button className="btn-outline" onClick={signOut} type="button">Logout</button> {/* সাইন আউট বাটন */}
            </>
          ) : (
            <>
              <Link className="btn-outline" to="/login">{t("login")}</Link> {/* লগইন লিঙ্ক */}
              <Link className="btn-primary" to="/signup">{t("signup")}</Link> {/* সাইন আপ লিঙ্ক */}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
