import "../../styles/clubs-page.css"; // clubs-page.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Clubs() {
  return (
    <>
      <div className="clubs-page"> {/* ক্লাব পেজ কনটেইনার */}
        
        {/* Header + filters */}
        <div className="clubs-head"> {/* ক্লাব পেজের হেড */}
          <div>
            <h1 className="clubs-title">Clubs</h1> {/* ক্লাব শিরোনাম */}
            <p className="clubs-sub muted">
              Browse all AUST clubs. Filter by department or category, search by name, and sort by popularity.
            </p> {/* ক্লাবের বর্ণনা */}
          </div>

          <div className="clubs-actions"> {/* ক্লাবের ফিল্টার এবং সার্চ একশন */}
            <input
              className="input"
              placeholder="Search clubs…"
              aria-label="Search clubs"
            /> {/* ক্লাব সার্চ ইনপুট */}
            
            {/* ডিপার্টমেন্ট ফিল্টার */}
            <select className="input select" aria-label="Filter by department">
              <option>All</option>
              <option>CSE</option>
              <option>EEE</option>
              <option>ME</option>
            </select>
            
            {/* ক্যাটেগরি ফিল্টার */}
            <select className="input select" aria-label="Filter by category">
              <option>All</option>
              <option>Tech</option>
              <option>Cultural</option>
              <option>Sports</option>
            </select>
            
            {/* পপুলারিটি অনুসারে সোর্ট ফিল্টার */}
            <select className="input select" aria-label="Sort">
              <option>Sort: Popular</option>
              <option>Sort: Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Cards grid (static demo items; later replace with dynamic) */}
        <div className="clubs-grid"> {/* ক্লাব গ্রিড যেখানে প্রতিটি ক্লাবের তথ্য দেখানো হবে */}
          
          {/* ক্লাব ১ */}
          <article className="club-card">
            <div className="club-card__head"> {/* ক্লাব কার্ডের হেড */}
              <div className="club-logo">AC</div> {/* ক্লাবের লোগো */}
              <div className="club-meta"> {/* ক্লাবের মেটা ডেটা */}
                <div className="club-name">AUST Coding Club</div> {/* ক্লাবের নাম */}
                <div className="club-tagline muted">Solve • Learn • Compete</div> {/* ক্লাবের ট্যাগলাইন */}
              </div>
              <div className="club-badge">120 members</div> {/* ক্লাবের সদস্য সংখ্যা */}
            </div>
            <p className="club-desc">
              Competitive programming, problem-solving sessions, and internal contests for all levels.
            </p> {/* ক্লাবের বর্ণনা */}
            <div className="club-info muted">
              <span>Dept: <b>CSE</b></span> {/* ডিপার্টমেন্ট */}
              <span>•</span>
              <span>Category: <b>Tech</b></span> {/* ক্যাটেগরি */}
            </div>
            <div className="club-actions">
              <a className="btn-ghost" href="/login">Join / Follow</a> {/* ক্লাব যোগ/ফলো করার বাটন */}
            </div>
          </article>

          {/* ক্লাব ২ */}
          <article className="club-card">
            <div className="club-card__head">
              <div className="club-logo">RC</div>
              <div className="club-meta">
                <div className="club-name">Robotics Circle</div>
                <div className="club-tagline muted">Build &amp; innovate robots</div>
              </div>
              <div className="club-badge">86 members</div>
            </div>
            <p className="club-desc">
              Workshops on Arduino, embedded systems, line followers, and national competitions.
            </p>
            <div className="club-info muted">
              <span>Dept: <b>EEE</b></span>
              <span>•</span>
              <span>Category: <b>Tech</b></span>
            </div>
            <div className="club-actions">
              <a className="btn-ghost" href="/login">Join / Follow</a>
            </div>
          </article>

          {/* ক্লাব ৩ */}
          <article className="club-card">
            <div className="club-card__head">
              <div className="club-logo">CC</div>
              <div className="club-meta">
                <div className="club-name">Cultural Club</div>
                <div className="club-tagline muted">Music • Drama • Art</div>
              </div>
              <div className="club-badge">150 members</div>
            </div>
            <p className="club-desc">
              Performances, open mics, stage shows, and inter-university cultural events.
            </p>
            <div className="club-info muted">
              <span>Dept: <b>General</b></span>
              <span>•</span>
              <span>Category: <b>Cultural</b></span>
            </div>
            <div className="club-actions">
              <a className="btn-ghost" href="/login">Join / Follow</a>
            </div>
          </article>
        </div>

        {/* Empty state (show this block only when no items) */}
        {/* ক্লাব না থাকলে 'No clubs found.' বার্তা দেখানো হবে */}
        {/* <div className="kard" style={{marginTop:12}}>
          No clubs found. Try clearing filters or changing the search.
        </div> */}
      </div>
    </>
  );
}
