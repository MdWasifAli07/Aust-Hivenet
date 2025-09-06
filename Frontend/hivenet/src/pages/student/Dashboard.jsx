import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর তথ্য পাওয়ার জন্য useAuth হুক ইম্পোর্ট করা হচ্ছে
import Card from "../../components/Card"; // Card কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা বিভিন্ন সেকশন প্রদর্শন করবে
import EventCard from "../../components/EventCard"; // EventCard কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ইভেন্ট প্রদর্শন করবে
import "../../styles/student-pages.css"; // student-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

// স্যাম্পল ইভেন্ট ডেটা
const sampleEvents = [
  { id: 1, title: "Intro to Competitive Programming", club: "AUSTIDC", date: new Date(), time: "3:00 PM", location: "Auditorium" },
  { id: 2, title: "Design Systems 101", club: "AUST Design Club", date: new Date(Date.now() + 86400000), time: "11:00 AM", location: "CSE 402" },
];

export default function StudentDashboard() {
  const { user } = useAuth(); // লগিন করা ব্যবহারকারীর তথ্য

  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>Welcome, {user?.name}</h1> {/* স্বাগতম বার্তা */}
      <p style={{ margin: "0 0 18px", color: "var(--muted)" }}>
        Department: <b>{user?.department || "—"}</b> • Role: <b>{user?.role}</b> {/* ব্যবহারকারীর ডিপার্টমেন্ট এবং রোল */}
      </p>

      <div className="feed-grid">
        {/* Left column: feed */}
        <div className="left">
          <Card title="Campus Feed" subtitle="Latest from your clubs"> {/* ক্যাম্পাস ফিড কার্ড */}
            <div className="stats" style={{ marginBottom: 12 }}>
              <div className="stat"><div className="n">5</div><div className="k">New posts</div></div> {/* নতুন পোস্টের সংখ্যা */}
              <div className="stat"><div className="n">3</div><div className="k">Upcoming</div></div> {/* আসন্ন ইভেন্ট সংখ্যা */}
              <div className="stat"><div className="n">12</div><div className="k">Notifications</div></div> {/* নোটিফিকেশন সংখ্যা */}
            </div>

            {/* ফিড পোস্টগুলির তালিকা */}
            <div style={{ display: "grid", gap: 12 }}>
              {/* প্রথম পোস্ট */}
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 700 }}>AUSTIDC • Contest this Friday</div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>2h ago</div>
                <p style={{ marginTop: 6 }}>Join our practice session and get tips from seniors.</p>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button className="btn-outline">Like</button> {/* লাইক বাটন */}
                  <button className="btn-primary">Comment</button> {/* কমেন্ট বাটন */}
                </div>
              </div>

              {/* দ্বিতীয় পোস্ট */}
              <div className="card" style={{ padding: 16 }}>
                <div style={{ fontWeight: 700 }}>CSE Society • Tech Talk Series</div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>1d ago</div>
                <p style={{ marginTop: 6 }}>A talk on microservices and deployment strategy.</p>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button className="btn-outline">Like</button>
                  <button className="btn-primary">Comment</button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: quick events */}
        <div className="right">
          <Card title="Your Upcoming Events" subtitle="Based on joined clubs" actions={<button className="btn-outline">View all</button>}>
            <div style={{ display: "grid", gap: 10 }}>
              {/* স্যাম্পল ইভেন্টগুলি রেন্ডার করা হচ্ছে */}
              {sampleEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </Card>

          {/* Shortcut actions */}
          <Card title="Shortcuts">
            <div style={{ display: "grid", gap: 10 }}>
              <button className="btn-primary">Join a Club</button> {/* ক্লাবে যোগদান করার বাটন */}
              <button className="btn-outline">Browse Events</button> {/* ইভেন্ট ব্রাউজ করার বাটন */}
              <button className="btn-outline">Open AI Assistant</button> {/* AI অ্যাসিস্ট্যান্ট খোলার বাটন */}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
