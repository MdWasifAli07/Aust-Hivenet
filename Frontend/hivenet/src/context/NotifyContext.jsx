import { createContext, useContext } from "react"; // React এর createContext এবং useContext হুকস ইম্পোর্ট করা হচ্ছে

const Ctx = createContext(null); // একটি কন্টেক্সট তৈরি করা হচ্ছে, যা নোটিফিকেশন সম্পর্কিত ডেটা শেয়ার করবে
const LSKEY = (owner) => `hivenet_notify_${owner || "public"}`; // LocalStorage কী তৈরি করার জন্য একটি ফাংশন (owner অনুযায়ী কাস্টম কী)

function getList(owner) {
  return JSON.parse(localStorage.getItem(LSKEY(owner)) || "[]"); // LocalStorage থেকে নোটিফিকেশন তালিকা রিটার্ন করবে
}
function setList(owner, list) {
  localStorage.setItem(LSKEY(owner), JSON.stringify(list)); // নোটিফিকেশন তালিকা LocalStorage এ সংরক্ষণ করবে
}

export function NotifyProvider({ children }) {
  // নোটিফিকেশন পুশ করার ফাংশন, যা নতুন নোটিফিকেশন LocalStorage এ সংরক্ষণ করবে
  const push = (owner, text, meta = {}) => {
    const row = { id: crypto.randomUUID(), text, meta, ts: Date.now(), read: false }; // নোটিফিকেশন আইটেম তৈরি
    setList(owner, [row, ...getList(owner)]); // নতুন নোটিফিকেশন তালিকায় পুশ করা হচ্ছে
    return row; // নতুন নোটিফিকেশন আইটেম রিটার্ন করা হচ্ছে
  };

  // নোটিফিকেশন তালিকা পাওয়ার জন্য ফাংশন
  const list = (owner) => getList(owner); 

  // পড়া না হওয়া নোটিফিকেশনগুলোর সংখ্যা পাওয়ার জন্য ফাংশন
  const count = (owner) => getList(owner).filter(x => !x.read).length;

  // সব নোটিফিকেশনকে 'read' হিসেবে মার্ক করার ফাংশন
  const markAllRead = (owner) => setList(owner, getList(owner).map(x => ({ ...x, read: true })));

  // নির্দিষ্ট নোটিফিকেশন মুছে ফেলার ফাংশন
  const remove = (owner, id) => setList(owner, getList(owner).filter(x => x.id !== id));

  // সব নোটিফিকেশন মুছে ফেলার ফাংশন
  const clear = (owner) => setList(owner, []);

  // Context.Provider এর মাধ্যমে নোটিফিকেশন ফাংশনগুলি প্রদান করা হচ্ছে
  return (
    <Ctx.Provider value={{ push, list, count, markAllRead, remove, clear }}>
      {children} {/* শিশু কম্পোনেন্টগুলিকে Context এর মাধ্যমে মান প্রদান করা হচ্ছে */}
    </Ctx.Provider>
  );
}

export const useNotify = () => useContext(Ctx); // Context থেকে নোটিফিকেশন ডেটা ব্যবহার করার জন্য কাস্টম হুক
