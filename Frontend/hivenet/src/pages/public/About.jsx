import "../../styles/about-page.css"; // about-page.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function About() {
  return (
    <>
      <div className="about-page"> {/* 'about-page' ক্লাসের সাথে পেজ কনটেইনার */}

        {/* Hero Section */}
        <section className="about-hero"> {/* 'about-hero' ক্লাসের সাথে হিরো সেকশন */}
          <h1 className="about-title">About AUST HiveNet</h1> {/* পেজের শিরোনাম */}
          <p className="about-lead">
            HiveNet is a unified platform for clubs, events, chat and a built-in AI assistant—so students can
            discover communities, register for events and stay updated effortlessly.
          </p> {/* পেজের প্রধান বর্ণনা */}
        </section>

        {/* Feature Grid Section */}
        <section className="about-grid"> {/* 'about-grid' ক্লাসের সাথে ফিচারের গ্রিড */}
          {/* ক্লাব চ্যাট ফিচারের জন্য একটি কার্ড */}
          <article className="about-card">
            <div className="icon">💬</div>
            <div className="title">Club Chats</div>
            <div className="desc">Club-specific channels for announcements and discussions.</div>
          </article>

          {/* ইভেন্ট ফিচারের জন্য একটি কার্ড */}
          <article className="about-card">
            <div className="icon">📅</div>
            <div className="title">Events</div>
            <div className="desc">Browse, RSVP and track event sessions and attendance.</div>
          </article>

          {/* AI অ্যাসিস্ট্যান্ট ফিচারের জন্য একটি কার্ড */}
          <article className="about-card">
            <div className="icon">🤖</div>
            <div className="title">AI Assistant</div>
            <div className="desc">Recommendations, BN↔EN translation, and academic tips.</div>
          </article>

          {/* সার্টিফিকেট ফিচারের জন্য একটি কার্ড */}
          <article className="about-card">
            <div className="icon">🏆</div>
            <div className="title">Certificates</div>
            <div className="desc">Auto-generated certificates for completed event sessions.</div>
          </article>
        </section>

        {/* Roadmap / Timeline Section */}
        <section className="timeline"> {/* 'timeline' ক্লাসের সাথে টাইমলাইন সেকশন */}
          {/* MVP লঞ্চ */}
          <div className="row">
            <span className="dot"></span>
            <div className="txt">
              MVP Launch <span className="meta">— Public pages + Student dashboard</span>
            </div>
          </div>
          
          {/* Attendance & QR */}
          <div className="row">
            <span className="dot"></span>
            <div className="txt">
              Attendance &amp; QR <span className="meta">— Admin scan, session-wise tracking</span>
            </div>
          </div>

          {/* Forum + Resources */}
          <div className="row">
            <span className="dot"></span>
            <div className="txt">
              Forum + Resources <span className="meta">— Cross-club threads and file sharing</span>
            </div>
          </div>
        </section>

        {/* Team / Acknowledgements Section */}
        <section className="about-list"> {/* 'about-list' ক্লাসের সাথে টিম এবং অcknowledgements সেকশন */}
          {/* Project Lead */}
          <div className="about-person">
            <div className="name">Project Lead</div>
            <div className="role">Coordinator</div>
          </div>

          {/* Frontend Team */}
          <div className="about-person">
            <div className="name">Frontend Team</div>
            <div className="role">React • CSS</div>
          </div>

          {/* Backend Team */}
          <div className="about-person">
            <div className="name">Backend Team</div>
            <div className="role">API • Auth</div>
          </div>

          {/* Contributors */}
          <div className="about-person">
            <div className="name">Contributors</div>
            <div className="role">Clubs &amp; Volunteers</div>
          </div>
        </section>
      </div>
    </>
  );
}
