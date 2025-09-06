import "../../styles/contact-page.css"; // contact-page.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Contact() {
  return (
    <>
      <div className="contact-page"> {/* Contact পেজ কনটেইনার */}
        <div className="contact-head"> {/* পেজের শিরোনাম এবং সাবটাইটেল */}
          <h1 className="contact-title">Contact & Feedback</h1> {/* "Contact & Feedback" শিরোনাম */}
          <p className="contact-sub">
            Send us your questions, suggestions or report an issue. We’ll get back ASAP.
          </p> {/* ক্লিয়ার নির্দেশনা */}
        </div>

        <div className="contact-grid"> {/* ফর্ম এবং ইনফো প্যানেল */}
          
          {/* Form Section */}
          <section className="contact-card"> {/* কনটাক্ট ফর্ম */}
            <form>
              <div className="form-row"> {/* ফর্মের জন্য রো */}
                <div className="form-group"> {/* নাম ইনপুট ফিল্ড */}
                  <label htmlFor="name">Your name</label>
                  <input id="name" className="input" placeholder="e.g., A. Rahman" />
                </div>
                <div className="form-group"> {/* ইমেইল ইনপুট ফিল্ড */}
                  <label htmlFor="email">Email</label>
                  <input id="email" className="input" type="email" placeholder="you@aust.edu" />
                </div>
                <div className="form-group full"> {/* সাবজেক্ট ইনপুট ফিল্ড */}
                  <label htmlFor="subject">Subject</label>
                  <input id="subject" className="input" placeholder="What’s this about?" />
                </div>
                <div className="form-group full"> {/* মেসেজ ইনপুট ফিল্ড */}
                  <label htmlFor="msg">Message</label>
                  <textarea id="msg" className="input" placeholder="Write your message…" />
                </div>
              </div>

              {/* ফর্ম সাবমিট এবং ক্যানসেল বাটন */}
              <div className="form-actions">
                <button type="reset" className="btn-ghost">Clear</button> {/* ক্যানসেল বাটন */}
                <button type="submit" className="btn-primary">Send</button> {/* সাবমিট বাটন */}
              </div>

              {/* সফল বা ত্রুটির মেসেজ (অপশনাল) */}
              {/* <div className="contact-success">Thanks! We’ve received your message.</div> */}
              {/* <div className="contact-error">Something went wrong. Please try again.</div> */}
            </form>
          </section>

          {/* Info Panel */}
          <aside className="contact-info"> {/* কন্টাক্ট ইনফো প্যানেল */}
            <div className="info-list"> {/* ইনফো আইটেমের তালিকা */}
              <div className="info-item"> {/* ইমেইল ইনফো */}
                <div className="ico">📧</div> {/* আইকন */}
                <div>
                  <div className="txt"><b>Email</b></div>
                  <div className="muted">support@hivenet.example</div> {/* ইমেইল */}
                </div>
              </div>
              <div className="info-item"> {/* ক্যাম্পাস ইনফো */}
                <div className="ico">📍</div> {/* আইকন */}
                <div>
                  <div className="txt"><b>Campus</b></div>
                  <div className="muted">AUST, Tejgaon, Dhaka</div> {/* ক্যাম্পাস ঠিকানা */}
                </div>
              </div>
              <div className="info-item"> {/* অফিস সময় ইনফো */}
                <div className="ico">⏰</div> {/* আইকন */}
                <div>
                  <div className="txt"><b>Office Hours</b></div>
                  <div className="muted">Sun–Thu, 9:00–17:00</div> {/* অফিস সময় */}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
