import "../styles/card.css"; // card.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

// Card কম্পোনেন্ট যা 'title', 'subtitle', 'actions', এবং 'children' প্রপস গ্রহণ করে
export default function Card({ title, subtitle, actions, children }) {
  return (
    <article className="card"> {/* মূল কার্ড কম্পোনেন্ট যা 'card' ক্লাস সহ রেন্ডার হবে */}
      
      {/* যদি title বা actions থাকে, তাহলে card এর header রেন্ডার হবে */}
      {(title || actions) && (
        <header className="card__head"> {/* card__head ক্লাসের সাথে header */}
          <div>
            {/* title থাকলে card__title ক্লাস সহ h3 ট্যাগে title দেখাবে */}
            {title && <h3 className="card__title">{title}</h3>}

            {/* subtitle থাকলে card__sub ক্লাস সহ p ট্যাগে subtitle দেখাবে */}
            {subtitle && <p className="card__sub">{subtitle}</p>}
          </div>

          {/* যদি actions থাকে, তাহলে card__actions ক্লাস সহ actions দেখাবে */}
          {actions && <div className="card__actions">{actions}</div>}
        </header>
      )}

      {/* card__body ক্লাসের সাথে body section, এখানে children কম্পোনেন্টের কন্টেন্ট রেন্ডার হবে */}
      <div className="card__body">{children}</div>
    </article>
  );
}
