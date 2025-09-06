import "../styles/card.css"; // card.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

// EventCard কম্পোনেন্ট যা 'event', 'onAttend', এবং 'onDetails' প্রপস গ্রহণ করে
export default function EventCard({ event, onAttend, onDetails }) {
  // 'event' প্রপস থেকে title, club, date, time, location, এবং id বের করা হচ্ছে
  const { title, club, date, time, location, id } = event;

  return (
    <div className="event"> {/* মূল ইভেন্ট কম্পোনেন্ট যা 'event' ক্লাস সহ রেন্ডার হবে */}
      
      <div className="event__left"> {/* ইভেন্টের বাম অংশ */}
        <div className="event__date"> {/* ইভেন্টের তারিখ */}
          {/* তারিখ থেকে দিন বের করা হচ্ছে, এবং ডিফল্ট মান '--' দেখানো হবে যদি তারিখ না থাকে */}
          <div className="d">{new Date(date).getDate() || "--"}</div>
          {/* তারিখের মাসের নাম (সংক্ষিপ্ত আকারে) বের করা হচ্ছে, যদি তারিখ ভুল হলে '--' দেখাবে */}
          <div className="m">{isNaN(Date.parse(date)) ? "--" : new Date(date).toLocaleString("en-US",{month:"short"})}</div>
        </div>
        <div>
          {/* ইভেন্টের শিরোনাম */}
          <div className="event__title">{title}</div>
          {/* ইভেন্টের মেটা তথ্য: ক্লাব, সময়, অবস্থান */}
          <div className="event__meta">{club} • {time} • {location}</div>
        </div>
      </div>

      <div className="event__right"> {/* ইভেন্টের ডান অংশ */}
        {/* যদি onDetails ফাংশন থাকে, তাহলে 'Details' বাটন রেন্ডার হবে */}
        {onDetails && <button className="btn-outline" onClick={()=>onDetails(id)}>Details</button>}
        
        {/* যদি onAttend ফাংশন থাকে, তাহলে 'Attend' বাটন রেন্ডার হবে */}
        {onAttend && <button className="btn-primary" onClick={()=>onAttend(id)}>Attend</button>}
      </div>
    </div>
  );
}
