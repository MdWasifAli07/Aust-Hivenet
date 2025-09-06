import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে যা নেভিগেশন সহায়তা করবে
import "../styles/footer.css"; // footer.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

export default function Footer() {
  const year = new Date().getFullYear(); // বর্তমান বছর ডেট থেকে নেওয়া হচ্ছে

  return (
    <footer className="footer"> {/* মূল ফুটার কম্পোনেন্ট */}
      <div className="container footer__grid"> {/* ফুটার কনটেন্টের জন্য গ্রিড স্ট্রাকচার */}
        <div className="footer__brand"> {/* ব্র্যান্ড সেকশন */}
          <div className="f-logo">AN</div> {/* ব্র্যান্ডের লোগো */}
          <div>
            <div className="f-title">AUST HiveNet</div> {/* সাইটের টাইটেল */}
            <div className="f-sub">Clubs • Events • Chat • AI</div> {/* সাবটাইটেল */}
          </div>
        </div>

        <nav className="footer__links"> {/* ফুটারে নেভিগেশন লিঙ্ক */}
          <Link to="/">Home</Link> {/* হোম পৃষ্ঠার লিঙ্ক */}
          <Link to="/about">About</Link> {/* অ্যাবাউট পৃষ্ঠার লিঙ্ক */}
          <Link to="/clubs">Clubs</Link> {/* ক্লাব পৃষ্ঠার লিঙ্ক */}
          <Link to="/events">Events</Link> {/* ইভেন্ট পৃষ্ঠার লিঙ্ক */}
          <Link to="/contact">Contact</Link> {/* কন্ট্যাক্ট পৃষ্ঠার লিঙ্ক */}
        </nav>

        <div className="footer__social"> {/* সামাজিক মিডিয়া লিঙ্ক সেকশন */}
          {/* Facebook আইকন এবং লিঙ্ক */}
          <a href="#" aria-label="Facebook" title="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.01 3.66 9.16 8.44 9.94v-7.03H8.08v-2.9h2.36V9.41c0-2.34 1.39-3.63 3.52-3.63.99 0 2.04.18 2.04.18v2.26h-1.15c-1.14 0-1.5.71-1.5 1.43v1.72h2.56l-.41 2.9h-2.15V22c4.78-.78 8.44-4.93 8.44-9.94Z" />
            </svg>
          </a>

          {/* Twitter আইকন এবং লিঙ্ক */}
          <a href="#" aria-label="Twitter/X" title="Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20.7 3H17.9l-4.1 5.6L8.3 3H3.1l7 9.4L3 21h2.8l4.9-6.7L15.8 21h5.2l-7.5-10.1L20.7 3z" />
            </svg>
          </a>

          {/* Instagram আইকন এবং লিঙ্ক */}
          <a href="#" aria-label="Instagram" title="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM18 6.6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="footer__bottom"> {/* ফুটারের নিচের অংশ */}
        <div className="container footer__bottom__inner"> {/* ফুটারের নিচের কনটেন্ট */}
          <span>© {year} AUST HiveNet</span> {/* বর্তমান বছর সহ কপিরাইট */}
          <div className="footer__mini"> {/* ছোট ফুটার লিঙ্ক */}
            <Link to="/about">About</Link> {/* অ্যাবাউট পৃষ্ঠার লিঙ্ক */}
            <Link to="/contact">Support</Link> {/* সাপোর্ট পৃষ্ঠার লিঙ্ক */}
            <a href="#">Privacy</a> {/* প্রাইভেসি পলিসির লিঙ্ক */}
            <a href="#">Terms</a> {/* টার্মস অ্যান্ড কন্ডিশন লিঙ্ক */}
          </div>
        </div>
      </div>
    </footer>
  );
}
