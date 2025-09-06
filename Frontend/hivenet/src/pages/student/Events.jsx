import EventCard from "../../components/EventCard"; // EventCard কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ইভেন্ট প্রদর্শন করবে
import Card from "../../components/Card"; // Card কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা পেজের সেকশন রেন্ডার করবে
import "../../styles/student-pages.css"; // student-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { listEvents, attendEvent } from "../../services/api"; // ইভেন্টের তালিকা পাওয়ার এবং ইভেন্টে রেজিস্ট্রেশন করার ফাংশন
import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক
import { useNotify } from "../../context/NotifyContext"; // নোটিফিকেশন সিস্টেম ব্যবহারের জন্য useNotify হুক

export default function StudentEvents() {
  const { user } = useAuth(); // লগিন করা ব্যবহারকারীর তথ্য
  const { push } = useNotify(); // নোটিফিকেশন পুশ করার ফাংশন
  const rows = listEvents(); // সমস্ত ইভেন্টের তালিকা

  // ইভেন্টে রেজিস্ট্রেশন করার ফাংশন
  const onAttend = (id) => {
    attendEvent(user.id, id); // ইভেন্টে রেজিস্ট্রেশন করা হচ্ছে
    const event = rows.find(e => e.id === id); // ইভেন্টের বিস্তারিত তথ্য পাওয়া যাচ্ছে
    push(user.id, `You registered for "${event?.title || "an event"}".`, { type: "attend", eventId: id }); // নোটিফিকেশন পাঠানো হচ্ছে
    alert("Registered! Check My Events → Generate Certificate after the event."); // সফল রেজিস্ট্রেশন মেসেজ
  };

  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>Events</h1> {/* ইভেন্ট শিরোনাম */}
      <Card title="Upcoming" subtitle="All events from your followed clubs"> {/* ইভেন্টের কার্ড */}
        <div style={{ display: "grid", gap: 10 }}>
          {rows.map(e => <EventCard key={e.id} event={e} onAttend={onAttend} />)} {/* ইভেন্টের তালিকা রেন্ডার করা হচ্ছে */}
        </div>
      </Card>
    </>
  );
}
