import Navbar from "../../components/Navbar"; // Navbar কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import "./login.css"; // login.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { Link, useLocation, useNavigate } from "react-router-dom"; // React Router এর Link, useLocation, এবং useNavigate হুক
import { useState } from "react"; // React এর useState হুক
import { useAuth } from "../../context/AuthContext"; // AuthContext থেকে useAuth হুক

export default function Login() {
  const nav = useNavigate(); // রাউটিং জন্য useNavigate হুক
  const { state } = useLocation(); // আগের পৃষ্ঠার অবস্থান (যদি কোনো প্রটেক্টেড পৃষ্ঠা থেকে আসা হয়)
  const { signIn } = useAuth(); // লগইন করার জন্য AuthContext থেকে signIn ফাংশন
  const [email, setEmail] = useState(""); // ইমেইল স্টেট
  const [password, setPassword] = useState(""); // পাসওয়ার্ড স্টেট
  const [err, setErr] = useState(""); // ত্রুটির স্টেট

  // ফর্ম সাবমিট হ্যান্ডলার
  const onSubmit = async (e) => {
    e.preventDefault(); // ফর্ম সাবমিট হলে পেজ রিলোড না করার জন্য
    setErr(""); // পুরোনো ত্রুটি রিসেট করা হচ্ছে
    try {
      const profile = await signIn({ email, password }); // signIn API কল করে প্রোফাইল পাওয়া যাচ্ছে
      // যদি আগের কোনো প্রটেক্টেড পেজ থেকে এসেছিলে
      const to = state?.from || (profile.role === "admin" ? "/admin/dashboard" : "/student/dashboard"); // রিডিরেক্ট পাথ নির্ধারণ
      nav(to, { replace: true }); // নির্ধারিত পাথে রিডিরেক্ট করা হচ্ছে
    } catch (ex) {
      setErr(ex.message || "Login failed."); // ত্রুটি হলে মেসেজ দেখানো হচ্ছে
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar সরাসরি এখানে রেন্ডার করা হচ্ছে */}

      <div className="login">
        {/* Hero Section */}
        <section className="login-hero">
          <div className="hero-content">
            <div className="brand"> {/* ব্র্যান্ড */}
              <span className="brand-top">AUST</span>
              <span className="brand-bottom">HiveNet</span>
            </div>
            <p className="tagline">Your Campus, Your Community, Your Platform</p> {/* স্লোগান */}
          </div>
        </section>

        {/* Login Form Section */}
        <section className="login-form-side">
          <div className="logo">AN</div> {/* লোগো */}

          {/* ত্রুটির বার্তা */}
          {err && <div style={{ color: "#b91c1c", marginBottom: 8, fontWeight: 600 }}>{err}</div>}

          {/* লগইন ফর্ম */}
          <form className="login-form" onSubmit={onSubmit}>
            {/* ইমেইল ইনপুট */}
            <label className="field"><span>Email ID</span>
              <input type="email" placeholder="example@aust.edu" value={email} onChange={e => setEmail(e.target.value)} />
            </label>

            {/* পাসওয়ার্ড ইনপুট */}
            <label className="field"><span>Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>

            {/* লগইন বাটন */}
            <button className="btn-primary" type="submit">Log in</button>
          </form>

          {/* সাইন আপ লিঙ্ক */}
          <p className="small">Don’t have an account? <Link to="/signup" className="link">Sign up</Link></p>
        </section>
      </div>
    </>
  );
}
