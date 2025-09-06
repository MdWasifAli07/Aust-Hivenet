import { createContext, useContext, useEffect, useMemo, useState } from "react"; // React এর হুকস ইম্পোর্ট করা হচ্ছে
import { isAustEmail } from "../utils/validators"; // @aust.edu ইমেইল চেক করার জন্য একটি ভ্যালিডেটর ইম্পোর্ট করা হচ্ছে
import { findUserByEmail, registerUser } from "../services/api"; // API কল করার জন্য ফাংশন ইম্পোর্ট করা হচ্ছে

const AuthContext = createContext(null); // AuthContext তৈরি করা হচ্ছে, যাতে অটেন্টিকেশন স্টেট শেয়ার করা যায়
const LS_KEY = "hivenet_auth"; // LocalStorage এর জন্য একটি কী নির্ধারণ করা হচ্ছে
const ADMIN_KEY = "EXAMPLE_ADMIN_KEY"; // অ্যাডমিন রেজিস্ট্রেশনের জন্য স্পেশাল কী (TODO: backend/env এ হবে)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // ব্যবহারকারীর স্টেট (যেমন id, name, email, deptId, etc.)

  // LocalStorage থেকে ডেটা লোড করার জন্য useEffect ব্যবহার করা হচ্ছে
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY); // LocalStorage থেকে ডেটা পাওয়া
      if (raw) setUser(JSON.parse(raw)); // যদি ডেটা থাকে, সেটি user স্টেটে সেভ করা
    } catch {}
  }, []);

  // ব্যবহারকারী স্টেট পরিবর্তিত হলে সেটি LocalStorage এ persist করা
  useEffect(() => {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user)); // ব্যবহারকারী স্টেট LocalStorage এ সেভ করা
    else localStorage.removeItem(LS_KEY); // যদি ব্যবহারকারী লগআউট করে, তাহলে LocalStorage থেকে ডেটা রিমুভ করা
  }, [user]);

  // সাইন ইন ফাংশন, ইমেইল এবং পাসওয়ার্ড দিয়ে ব্যবহারকারী লগইন
  const signIn = async ({ email, password }) => {
    if (!isAustEmail(email)) throw new Error("Use your @aust.edu email."); // ইমেইল ভ্যালিডেশন
    if (!password) throw new Error("Password required."); // পাসওয়ার্ড চেক করা হচ্ছে

    let profile = findUserByEmail(email); // ইমেইল দিয়ে ব্যবহারকারী খোঁজা হচ্ছে
    if (!profile) {
      // যদি ব্যবহারকারী রেজিস্টার না থাকে, তবে একটি মিনিমাল প্রোফাইল তৈরি করা হচ্ছে (ডেমো বেহেভিয়র)
      const name = email.split("@")[0]; // ইমেইল থেকে নাম তৈরি করা হচ্ছে
      profile = {
        id: crypto.randomUUID(),
        name,
        email,
        deptId: "",
        department: "",
        role: "student", // ডিফল্ট রোল 'student'
        password, // DEMO ONLY
      };
      registerUser(profile); // ব্যবহারকারী রেজিস্টার করা হচ্ছে
    }
    setUser(profile); // প্রোফাইল সেট করা হচ্ছে
    return profile; // প্রোফাইল রিটার্ন করা হচ্ছে
  };

  // সাইন আপ ফাংশন, নতুন ব্যবহারকারী রেজিস্টার করা
  const signUp = async ({ name, email, password, deptId, department, adminMode, specialKey }) => {
    if (!name) throw new Error("Name required."); // নাম চেক করা হচ্ছে
    if (!isAustEmail(email)) throw new Error("Use your @aust.edu email."); // ইমেইল ভ্যালিডেশন
    if (!password) throw new Error("Password required."); // পাসওয়ার্ড চেক করা হচ্ছে
    if (!deptId) throw new Error("DeptID required."); // ডিপার্টমেন্ট আইডি চেক করা হচ্ছে
    if (!department) throw new Error("Department required."); // ডিপার্টমেন্ট চেক করা হচ্ছে

    let role = "student"; // ডিফল্ট রোল 'student'
    if (adminMode) {
      if (!specialKey) throw new Error("Admin special key required."); // অ্যাডমিন স্পেশাল কী চেক করা হচ্ছে
      if (specialKey !== ADMIN_KEY) throw new Error("Invalid admin key."); // অ্যাডমিন কী চেক করা হচ্ছে
      role = "admin"; // অ্যাডমিন রোল সেট করা হচ্ছে
    }

    const profile = { id: crypto.randomUUID(), name, email, deptId, department, role, password }; // প্রোফাইল তৈরি করা হচ্ছে
    registerUser(profile); // নতুন ব্যবহারকারী রেজিস্টার করা হচ্ছে
    setUser(profile); // প্রোফাইল সেট করা হচ্ছে
    return profile; // প্রোফাইল রিটার্ন করা হচ্ছে
  };

  // সাইন আউট ফাংশন, ব্যবহারকারী লগআউট
  const signOut = () => setUser(null); // ব্যবহারকারী স্টেট null করে সাইন আউট করা হচ্ছে

  // AuthContext এর মান তৈরি করা হচ্ছে
  const value = useMemo(() => ({ user, isAuthed: !!user, signIn, signUp, signOut }), [user]);

  // AuthContext.Provider এর মাধ্যমে মান প্রদান করা হচ্ছে
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// AuthContext থেকে মান পাওয়ার জন্য useAuth হুক
export const useAuth = () => useContext(AuthContext);
