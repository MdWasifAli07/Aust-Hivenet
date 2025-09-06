import "../../styles/clubs.css"; // clubs.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে

// রিসোর্সের তালিকা
const files = [
  { id: 1, name: "CP-Guide.pdf", club: "AUSTIDC", size: "1.6 MB" },
  { id: 2, name: "Design-System.fig", club: "Design Club", size: "2.1 MB" },
  { id: 3, name: "Robotics-Intro.pptx", club: "Robotics Club", size: "4.3 MB" },
];

export default function Resources() {
  return (
    <>
      <h1 style={{ margin: "0 0 12px" }}>Resources</h1> {/* রিসোর্স শিরোনাম */}
      <div className="res-list"> {/* রিসোর্সের তালিকা */}
        {files.map(f => ( // প্রতিটি ফাইলের জন্য রেন্ডার করা হচ্ছে
          <div key={f.id} className="res-row"> {/* রিসোর্সের রো */}
            <div className="avatar">{f.name[0]}</div> {/* ফাইলের নামের প্রথম অক্ষর দিয়ে অ্যাভাটার */}
            <div className="grow">
              <div className="bold">{f.name}</div> {/* ফাইলের নাম */}
              <div className="muted">{f.club} • {f.size}</div> {/* ক্লাবের নাম এবং ফাইল সাইজ */}
            </div>
            <button className="btn-outline">Preview</button> {/* প্রিভিউ বাটন */}
            <button className="btn-primary">Download</button> {/* ডাউনলোড বাটন */}
          </div>
        ))}
      </div>
    </>
  );
}
