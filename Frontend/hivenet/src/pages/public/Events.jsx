import "../../styles/events-page.css"; // events-page.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Events() {
  return (
    <>
      <div className="events-page"> {/* 'events-page' ক্লাসের সাথে পেজ কনটেইনার */}
        
        {/* Header Section */}
        <div className="events-head"> {/* 'events-head' ক্লাসের সাথে হেড সেকশন */}
          <div>
            <h1 className="events-title">Events</h1> {/* ইভেন্ট শিরোনাম */}
            <p className="events-sub muted">
              Explore upcoming events. Search, filter by club, and view details.
            </p> {/* ইভেন্ট সম্পর্কিত সাবটাইটেল */}
          </div>

          <div className="events-actions"> {/* ইভেন্ট সার্চ এবং ফিল্টার একশন */}
            <input className="input" placeholder="Search events…" aria-label="Search events" /> {/* ইভেন্ট সার্চ ইনপুট */}
            <select className="input select" aria-label="Filter by club"> {/* ক্লাব ফিল্টার সিলেক্ট */}
              <option>All</option>
              <option>Coding Club</option>
              <option>Robotics Circle</option>
              <option>Cultural Club</option>
            </select>
            <div className="view-toggle" role="tablist" aria-label="View mode"> {/* ভিউ মোড পরিবর্তন করার অপশন */}
              <button className="on" role="tab" aria-selected="true">List</button> {/* লিস্ট ভিউ বাটন */}
              <button role="tab" aria-selected="false">Calendar</button> {/* ক্যালেন্ডার ভিউ বাটন */}
            </div>
          </div>
        </div>

        {/* List view (static demo items; later replace with dynamic) */}
        <div className="events-list"> {/* ইভেন্টের তালিকা শো করার জন্য গ্রিড */}
          
          {/* Event Card 1 */}
          <article className="evt-card"> {/* প্রথম ইভেন্ট কার্ড */}
            <div className="evt-left"> {/* ইভেন্টের তারিখ */}
              <div className="evt-date">
                <div className="d1">12</div>
                <div className="d2">Sep</div>
              </div>
            </div>
            <div className="evt-main"> {/* ইভেন্টের বর্ণনা */}
              <h3 className="evt-title">Intro to Competitive Programming</h3> {/* ইভেন্টের শিরোনাম */}
              <div className="evt-meta muted">
                <span>Coding Club</span> • <span>2025-09-12 @ 14:00</span> • <span>Auditorium</span>
              </div> {/* ক্লাব, তারিখ, সময় এবং লোকেশন */}
              <p className="evt-desc">
                Beginner-friendly session on CP basics, problem patterns and practice roadmap.
              </p> {/* ইভেন্টের সংক্ষিপ্ত বর্ণনা */}
            </div>
            <div className="evt-actions"> {/* ইভেন্টের অ্যাকশন */}
              <a className="btn-ghost" href="/login">RSVP</a> {/* RSVP বাটন */}
            </div>
          </article>

          {/* Event Card 2 */}
          <article className="evt-card"> {/* দ্বিতীয় ইভেন্ট কার্ড */}
            <div className="evt-left">
              <div className="evt-date">
                <div className="d1">18</div>
                <div className="d2">Sep</div>
              </div>
            </div>
            <div className="evt-main">
              <h3 className="evt-title">Robotics Bootcamp: Line Follower</h3>
              <div className="evt-meta muted">
                <span>Robotics Circle</span> • <span>2025-09-18 @ 10:00</span> • <span>Lab-502</span>
              </div>
              <p className="evt-desc">
                Hands-on workshop on sensors, motor drivers and PID tuning for LFR.
              </p>
            </div>
            <div className="evt-actions">
              <a className="btn-ghost" href="/login">RSVP</a>
            </div>
          </article>

           {/* Event Card 2 */}
          <article className="evt-card"> {/* দ্বিতীয় ইভেন্ট কার্ড */}
            <div className="evt-left">
              <div className="evt-date">
                <div className="d1">18</div>
                <div className="d2">Sep</div>
              </div>
            </div>
            <div className="evt-main">
              <h3 className="evt-title">Robotics Bootcamp: Line Follower</h3>
              <div className="evt-meta muted">
                <span>Robotics Circle</span> • <span>2025-09-18 @ 10:00</span> • <span>Lab-502</span>
              </div>
              <p className="evt-desc">
                Hands-on workshop on sensors, motor drivers and PID tuning for LFR.
              </p>
            </div>
            <div className="evt-actions">
              <a className="btn-ghost" href="/login">RSVP</a>
            </div>
          </article>

          {/* Event Card 3 */}
          <article className="evt-card"> {/* তৃতীয় ইভেন্ট কার্ড */}
            <div className="evt-left">
              <div className="evt-date">
                <div className="d1">25</div>
                <div className="d2">Sep</div>
              </div>
            </div>
            <div className="evt-main">
              <h3 className="evt-title">Cultural Night — Open Mic</h3>
              <div className="evt-meta muted">
                <span>Cultural Club</span> • <span>2025-09-25 @ 18:30</span> • <span>Stage-2</span>
              </div>
              <p className="evt-desc">
                Music, poetry and drama performances—open for all students.
              </p>
            </div>
            <div className="evt-actions">
              <a className="btn-ghost" href="/login">RSVP</a>
            </div>
          </article>
        </div>

        {/* Optional: Calendar block (static skeleton). চাইলে ব্যবহার করো */}
        {/* ক্যালেন্ডার ব্লক */}
        {/* 
        <div className="events-cal" style={{marginTop:12}}>
          <div className="cal-head">
            <button className="mini">‹</button>
            <div className="cal-title">September 2025</div>
            <button className="mini">›</button>
          </div>
          <div className="cal-grid cal-days">
            <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
          </div>
          <div className="cal-grid cal-cells">
            <div className="cal-cell dim"></div>
            <div className="cal-cell">
              <div className="cal-daynum">1</div>
              <div className="cal-list">
                <a className="cal-pill"><span className="dot"></span><span className="txt">Project Kickoff</span></a>
              </div>
            </div>
            <div className="cal-cell"><div className="cal-daynum">2</div></div>
            <!-- Repeat cells to complete 6x7 grid -->
          </div>
        </div>
        */}
      </div>
    </>
  );
}
