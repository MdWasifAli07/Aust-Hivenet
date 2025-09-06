import { createContext, useContext, useMemo, useState, useEffect } from "react"; // React এর প্রয়োজনীয় হুকস ইম্পোর্ট করা হচ্ছে

const LangContext = createContext(null); // ভাষা ব্যবস্থাপনার জন্য একটি Context তৈরি করা হচ্ছে
const LS = "hivenet_lang"; // LocalStorage এর জন্য একটি কী নির্ধারণ করা হচ্ছে, যা ভাষা সংরক্ষণ করবে

// ভাষার ডিকশনারি (English এবং বাংলা) তৈরি করা হচ্ছে
const dict = {
  en: {
    brand: "HiveNet", // ইংরেজি ভাষায় টেক্সট
    student: "Student",
    admin: "Admin",
    login: "Log in",
    signup: "Sign up",
    chat: "Chat with AI",
    dashboard: "Dashboard",
    events: "Events",
    manageEvents: "Manage Events",
    overview: "Overview",
    totalUsers: "Total Users",
    totalClubs: "Total Clubs",
    upcomingEvents: "Upcoming Events",
    createEvent: "Create Event",
    editEvent: "Edit Event",
    title: "Title",
    club: "Club",
    date: "Date",
    time: "Time",
    location: "Location",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
  },
  bn: {
    brand: "HiveNet", // বাংলা ভাষায় টেক্সট
    student: "স্টুডেন্ট",
    admin: "অ্যাডমিন",
    login: "লগইন",
    signup: "সাইন আপ",
    chat: "এআই চ্যাট",
    dashboard: "ড্যাশবোর্ড",
    events: "ইভেন্টস",
    manageEvents: "ইভেন্ট ম্যানেজ",
    overview: "ওভারভিউ",
    totalUsers: "মোট ইউজার",
    totalClubs: "মোট ক্লাব",
    upcomingEvents: "আগামী ইভেন্ট",
    createEvent: "ইভেন্ট তৈরি",
    editEvent: "ইভেন্ট এডিট",
    title: "টাইটেল",
    club: "ক্লাব",
    date: "তারিখ",
    time: "সময়",
    location: "লোকেশন",
    actions: "অ্যাকশন",
    save: "সেভ",
    cancel: "ক্যানসেল",
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // ভাষার স্টেট, ডিফল্ট 'en' (ইংরেজি)
  
  // ভাষা লোড করার জন্য useEffect হুক, যা কম্পোনেন্ট মাউন্ট হওয়ার পর LocalStorage থেকে ভাষা নিয়ে আসবে
  useEffect(() => {
    const saved = localStorage.getItem(LS); // LocalStorage থেকে ভাষা পাওয়া
    if (saved) setLang(saved); // যদি ভাষা পাওয়া যায়, তাহলে সেটি স্টেটে সেট করা হবে
  }, []);

  // ভাষা পরিবর্তিত হলে LocalStorage এবং HTML ডকুমেন্টের 'lang' অ্যাট্রিবিউট আপডেট হবে
  useEffect(() => {
    localStorage.setItem(LS, lang); // ভাষা LocalStorage এ সংরক্ষণ
    document.documentElement.lang = lang; // HTML ডকুমেন্টের 'lang' অ্যাট্রিবিউট পরিবর্তন করা
  }, [lang]);

  // ভাষার জন্য একটি 't' ফাংশন তৈরি করা হচ্ছে, যা টেক্সটের কীগুলোর জন্য সংশ্লিষ্ট ভাষার মান ফেরত দেবে
  const t = (key) => dict[lang][key] ?? key;

  // useMemo ব্যবহার করে value তৈরি করা হচ্ছে যাতে প্রতি রেন্ডারে সেটি পুনরায় না তৈরি হয়
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>; // Context.Provider এর মাধ্যমে ভাষার ডেটা প্রদান করা হচ্ছে
}

// useLang হুক, যা অন্য কম্পোনেন্টে ব্যবহার করে LangContext থেকে ডেটা নিয়ে আসবে
export const useLang = () => useContext(LangContext);
