import { useState } from "react"; // React এর useState হুক ইম্পোর্ট করা হচ্ছে
import { Link } from "react-router-dom"; // React Router এর Link কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে
import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import Modal from "../../components/Modal"; // Modal কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ফর্ম তৈরি/এডিট করার জন্য ব্যবহৃত হবে
import { useLang } from "../../context/LanguageContext"; // useLang হুক ইম্পোর্ট করা হচ্ছে, যা ভাষা ব্যবস্থাপনা করবে

const seed = [
  { id:1, title:"Hackathon Kickoff", club:"CSE Society", date:"2025-09-05", time:"10:00", location:"Auditorium" },
  { id:2, title:"UI/UX Workshop", club:"Design Club", date:"2025-09-10", time:"14:00", location:"Lab 3" },
];

export default function ManageEvents() {
  const { t } = useLang(); // ভাষার জন্য 't' ফাংশনটি ব্যবহার করা হচ্ছে
  const [rows, setRows] = useState(seed); // ইভেন্টগুলির তালিকা স্টেটে সেভ হচ্ছে
  const [open, setOpen] = useState(false); // Modal ওপেন বা বন্ধ করার জন্য স্টেট
  const [editing, setEditing] = useState(null); // যদি একটি ইভেন্ট এডিট করা হয়, সেটি নির্ধারণ করা হচ্ছে
  const [form, setForm] = useState({ title: "", club: "", date: "", time: "", location: "" }); // ফর্মের ডেটা

  // একটি নতুন ক্লাব তৈরি করার জন্য ফাংশন
  const openCreate = () => {
    setEditing(null); // এডিটিং আইডি ক্লিয়ার করা হচ্ছে
    setForm({ title: "", club: "", date: "", time: "", location: "" }); // ফর্ম রিসেট করা হচ্ছে
    setOpen(true); // Modal ওপেন করা হচ্ছে
  };

  // একটি বিদ্যমান ইভেন্ট এডিট করার জন্য ফাংশন
  const openEdit = (row) => {
    setEditing(row); // সিলেক্ট করা ইভেন্টের তথ্য ফর্মে সেট করা হচ্ছে
    setForm(row); // ফর্মে সেই ইভেন্টের তথ্য সেট করা হচ্ছে
    setOpen(true); // Modal ওপেন করা হচ্ছে
  };

  // Modal বন্ধ করার ফাংশন
  const close = () => setOpen(false);

  // ইনপুট ফিল্ড পরিবর্তন হওয়ার সময় ফর্ম আপডেট করার ফাংশন
  const onChange = (e) => {
    const { name, value } = e.target; // ইনপুট নাম এবং তার মান
    setForm((f) => ({ ...f, [name]: value })); // ফর্ম আপডেট করা হচ্ছে
  };

  // ইভেন্ট সেভ করার ফাংশন (এডিট বা নতুন)
  const onSave = () => {
    if (editing) {
      setRows((rs) => rs.map((r) => r.id === editing.id ? { ...editing, ...form } : r)); // যদি এডিট হয়, ইভেন্ট আপডেট করা হবে
    } else {
      const id = Math.max(0, ...rows.map(r => r.id)) + 1; // নতুন আইডি তৈরি
      setRows((rs) => [...rs, { id, ...form }]); // নতুন ইভেন্ট তৈরি করা হবে
    }
    setOpen(false); // Modal বন্ধ করা হচ্ছে
  };

  // ইভেন্ট ডিলিট করার ফাংশন
  const onDelete = (id) => setRows((rs) => rs.filter((r) => r.id !== id)); // সিলেক্ট করা ইভেন্ট ডিলিট করা হচ্ছে

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>{t("manageEvents")}</h1> {/* "Manage Events" শিরোনাম */}
        <button className="btn primary" onClick={openCreate}>{t("createEvent")}</button> {/* "Create Event" বাটন */}
      </div>

      {/* ইভেন্ট তালিকা টেবিল */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>{t("title")}</th><th>{t("club")}</th>
            <th>{t("date")}</th><th>{t("time")}</th><th>{t("location")}</th><th>{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}> {/* ইভেন্টের জন্য রো */}
              <td>{r.id}</td> {/* ইভেন্টের আইডি */}
              <td>{r.title}</td> {/* ইভেন্টের শিরোনাম */}
              <td>{r.club}</td> {/* ইভেন্টের ক্লাব */}
              <td>{r.date}</td> {/* ইভেন্টের তারিখ */}
              <td>{r.time}</td> {/* ইভেন্টের সময় */}
              <td>{r.location}</td> {/* ইভেন্টের অবস্থান */}
              <td style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost" onClick={() => openEdit(r)}>Edit</button> {/* এডিট বাটন */}
                <button className="btn ghost" onClick={() => onDelete(r.id)}>Delete</button> {/* ডিলিট বাটন */}
                <Link className="btn ghost" to={`/admin/event/${r.id}`}>Open</Link> {/* ইভেন্ট দেখতে লিংক */}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} style={{ color: "var(--muted)" }}>No events found.</td> {/* যদি কোনো ইভেন্ট না থাকে */}
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal যেখানে ইভেন্ট তৈরি বা এডিট করা হবে */}
      <Modal open={open} title={editing ? t("editEvent") : t("createEvent")} onClose={close}>
        <div className="form-grid">
          <label className="full">
            <div>{t("title")}</div>
            <input className="input" name="title" value={form.title} onChange={onChange} />
          </label>
          <label>
            <div>{t("club")}</div>
            <input className="input" name="club" value={form.club} onChange={onChange} />
          </label>
          <label>
            <div>{t("date")}</div>
            <input className="input" type="date" name="date" value={form.date} onChange={onChange} />
          </label>
          <label>
            <div>{t("time")}</div>
            <input className="input" type="time" name="time" value={form.time} onChange={onChange} />
          </label>
          <label className="full">
            <div>{t("location")}</div>
            <input className="input" name="location" value={form.location} onChange={onChange} />
          </label>
        </div>
        <div className="actions">
          <button className="btn ghost" onClick={close}>{t("cancel")}</button> {/* ক্যানসেল বাটন */}
          <button className="btn primary" onClick={onSave}>{t("save")}</button> {/* সেভ বাটন */}
        </div>
      </Modal>
    </>
  );
}
