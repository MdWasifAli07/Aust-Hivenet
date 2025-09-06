import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import { listClubs, listEvents } from "../../services/api"; // ক্লাব এবং ইভেন্টের তালিকা পাওয়ার জন্য API কল ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর অটেন্টিকেশন স্টেটের জন্য useAuth হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/home.css"; // home.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Home() {
  const { isAuthed } = useAuth(); // ব্যবহারকারীর লগইন স্টেট (isAuthed)

  const clubs = listClubs(); // ক্লাবগুলির পাবলিক তালিকা
  const events = listEvents()
    .slice() // ইভেন্টের তালিকা কপি করা হচ্ছে
    .sort((a, b) => (a.date > b.date ? 1 : -1)) // ইভেন্টগুলিকে তারিখ অনুসারে সাজানো হচ্ছে
    .slice(0, 3); // প্রথম ৩টি ইভেন্ট নেওয়া হচ্ছে

  return (
    <div className="home-page"> {/* হোম পেজ কনটেইনার */}
      
      {/* Edge-to-edge hero section */}
      <section className="home-hero"> {/* হিরো সেকশন */}
        <div className="home-wrap home-hero__inner"> {/* হিরো সেকশনের ভিতরের কনটেইনার */}
          
          {/* Left: Title + Lead + CTA — only when NOT logged in */}
          {!isAuthed && (  // যদি ব্যবহারকারী লগিন না করে থাকে, তাহলে এই সেকশন দেখানো হবে
            <div className="home-hero__left">
              <h1 className="home-title">AUST HiveNet</h1> {/* পেজের শিরোনাম */}
              <p className="home-lead">
                Clubs, events, chat &amp; a built-in AI assistant — all in one place.
                Discover communities, register for events, and stay updated.
              </p> {/* পেজের বর্ণনা */}
              <div className="home-cta"> {/* Call to Action */}
                <Link to="/login" className="btn-primary">Log in</Link> {/* লগইন বাটন */}
                <Link to="/signup" className="btn-ghost">Create account</Link> {/* সাইন আপ বাটন */}
              </div>
            </div>
          )}

          {/* Right: Upcoming Highlights — always visible */}
          <aside className="highlights kard"> {/* হাইলাইট সেকশন */}
            <div className="highlights__head">Upcoming Highlights</div> {/* শিরোনাম */}
            <ul className="highlights__list">
              {events.map((e) => ( // ইভেন্টের তালিকা রেন্ডার করা হচ্ছে
                <li key={e.id}>
                  <span className="dot" aria-hidden /> {/* ডট আইকন */}
                  <div className="hl-line">
                    <span className="hl-title">{e.title}</span> {/* ইভেন্ট শিরোনাম */}
                    <span className="hl-meta"> — {e.club} · {e.date} @ {e.time}</span> {/* ইভেন্ট ক্লাব, তারিখ এবং সময় */}
                  </div>
                </li>
              ))}
              {events.length === 0 && <li className="muted">No upcoming events yet.</li>} {/* যদি কোনো ইভেন্ট না থাকে */}
            </ul>
          </aside>
        </div>
      </section>

      {/* Edge-to-edge featured grid */}
      <section className="home-feature"> {/* ফিচার সেকশন */}
        <div className="home-wrap"> {/* হোম র্যাপ কনটেইনার */}
          <h3 className="section-title">Featured Clubs</h3> {/* "Featured Clubs" শিরোনাম */}
          <div className="feat-grid"> {/* ক্লাবের গ্রিড */}
            {clubs.slice(0, 6).map((c) => ( // প্রথম ৬টি ক্লাব রেন্ডার করা হচ্ছে
              <article key={c.id} className="feat-card"> {/* ক্লাব কার্ড */}
                <div className="feat-card__head">
                  <div className="feat-logo" /> {/* ক্লাবের লোগো */}
                  <div>
                    <div className="feat-title">{c.name}</div> {/* ক্লাবের নাম */}
                    <div className="feat-sub">{c.tagline}</div> {/* ক্লাবের ট্যাগলাইন */}
                  </div>
                </div>
                <p className="feat-desc">{c.about}</p> {/* ক্লাবের বর্ণনা */}
                <div>
                  <Link className="feat-link" to="/login">Join / Follow</Link> {/* ক্লাবে যোগদান বা ফলো করার জন্য লিঙ্ক */}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
