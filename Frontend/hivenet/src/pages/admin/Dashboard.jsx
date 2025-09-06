import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { useLang } from "../../context/LanguageContext"; // useLang হুক ইম্পোর্ট করা হচ্ছে, যা ভাষা পরিচালনা করতে ব্যবহৃত হবে

export default function AdminDashboard() {
  const { t } = useLang(); // ভাষার জন্য t (translation) ফাংশনটি ব্যবহার করা হচ্ছে

  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>{t("overview")}</h1> {/* পৃষ্ঠার শিরোনাম 'Overview' */}
      
      <div className="grid-3" style={{ marginBottom: 16 }}> {/* 3 কলাম গ্রিড */}
        {/* মোট ব্যবহারকারী */}
        <div className="kard">
          <div className="n">1,024</div> {/* মোট ব্যবহারকারীর সংখ্যা (ডেমো ডেটা) */}
          <div className="k">{t("totalUsers")}</div> {/* 'totalUsers' ভাষা অনুযায়ী টেক্সট */}
        </div>

        {/* মোট ক্লাব */}
        <div className="kard">
          <div className="n">16</div> {/* মোট ক্লাবের সংখ্যা (ডেমো ডেটা) */}
          <div className="k">{t("totalClubs")}</div> {/* 'totalClubs' ভাষা অনুযায়ী টেক্সট */}
        </div>

        {/* আসন্ন ইভেন্ট */}
        <div className="kard">
          <div className="n">8</div> {/* আসন্ন ইভেন্টের সংখ্যা (ডেমো ডেটা) */}
          <div className="k">{t("upcomingEvents")}</div> {/* 'upcomingEvents' ভাষা অনুযায়ী টেক্সট */}
        </div>
      </div>

      <div className="kard">
        <h3 style={{ marginTop: 0 }}>{t("events")}</h3> {/* ইভেন্টস শিরোনাম */}
        <p style={{ color: "var(--muted)" }}>Quick snapshot (demo data).</p> {/* ডেমো ডেটা সম্পর্কে সংক্ষিপ্ত বিবরণ */}
      </div>
    </>
  );
}
