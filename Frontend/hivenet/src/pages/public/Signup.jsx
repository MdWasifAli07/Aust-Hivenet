import Navbar from "../../components/Navbar"; // Navbar ইম্পোর্ট করা হচ্ছে
import "./login.css"; // একই স্টাইল রিইউজ করা হচ্ছে
import { useState } from "react"; // React এর useState হুক ইম্পোর্ট করা হচ্ছে
import { Link, useNavigate } from "react-router-dom"; // React Router এর Link এবং useNavigate হুক ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../../context/AuthContext"; // AuthContext থেকে useAuth হুক ইম্পোর্ট করা হচ্ছে

export default function Signup() {
  const nav = useNavigate(); // রাউটিং জন্য useNavigate হুক ব্যবহার
  const { signUp } = useAuth(); // ব্যবহারকারী সাইনআপ করার জন্য useAuth থেকে signUp ফাংশন

  const [form, setForm] = useState({
    name: "", email: "", password: "",
    deptId: "", department: "",
    adminMode: false, specialKey: ""
  }); // ফর্মের জন্য স্টেট
  const [err, setErr] = useState(""); // ত্রুটির জন্য স্টেট

  // ইনপুট ফিল্ডে পরিবর্তন ঘটলে ফর্ম আপডেট করার ফাংশন
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value })); // যদি চেকবক্স হয়, তাহলে চেকড স্টেট সেট হবে
  };

  // ফর্ম সাবমিট করার ফাংশন
  const onSubmit = async (e) => {
    e.preventDefault(); // সাবমিট হলে পেজ রিলোড হওয়ার থেকে রোধ করা হচ্ছে
    setErr(""); // পুরোনো ত্রুটি রিসেট করা হচ্ছে
    try {
      const user = await signUp(form); // signUp ফাংশনটি ব্যবহার করে নতুন ইউজার তৈরি করা হচ্ছে
      // ইউজারের রোল অনুসারে রিডিরেক্ট করা হচ্ছে
      if (user.role === "admin") nav("/admin/dashboard"); // যদি অ্যাডমিন হয়, তাহলে অ্যাডমিন ড্যাশবোর্ডে রিডিরেক্ট
      else nav("/student/dashboard"); // অন্যথায় স্টুডেন্ট ড্যাশবোর্ডে রিডিরেক্ট
    } catch (ex) {
      setErr(ex.message || "Signup failed."); // ত্রুটি হলে মেসেজ সেট করা হচ্ছে
    }
  };

  return (
    <>
      <Navbar /> {/* Navbar সরাসরি এখানে রেন্ডার করা হচ্ছে */}

      <div className="login">
        {/* Hero Section */}
        <section className="login-hero">
          <div className="hero-content">
            <div className="brand">
              <span className="brand-top">AUST</span>
              <span className="brand-bottom">HiveNet</span>
            </div>
            <p className="tagline">Join the community — clubs, events & more.</p>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="login-form-side">
          <div className="logo">AN</div>

          {err && <div style={{ color: "#b91c1c", marginBottom: 8, fontWeight: 600 }}>{err}</div>}

          <form className="login-form" onSubmit={onSubmit}>
            <label className="field"><span>Name</span>
              <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />
            </label>

            <label className="field"><span>Edumail</span>
              <input name="email" type="email" value={form.email} onChange={onChange} placeholder="example@aust.edu" />
            </label>

            <label className="field"><span>Password</span>
              <input name="password" type="password" value={form.password} onChange={onChange} />
            </label>

            <label className="field"><span>DeptID</span>
              <input name="deptId" value={form.deptId} onChange={onChange} placeholder="e.g., 20220204054" />
            </label>

            <label className="field"><span>Department</span>
              <input name="department" value={form.department} onChange={onChange} placeholder="e.g., CSE" />
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 4px" }}>
              <input type="checkbox" name="adminMode" checked={form.adminMode} onChange={onChange} />
              <span>Register as Admin (have special key)</span>
            </label>

            {form.adminMode && (
              <label className="field"><span>Special Key</span>
                <input name="specialKey" value={form.specialKey} onChange={onChange} placeholder="Enter admin key" />
              </label>
            )}

            <button className="btn-primary" type="submit">Create account</button>
          </form>

          <p className="small">Already have an account? <Link to="/login" className="link">Log in</Link></p>
        </section>
      </div>
    </>
  );
}
