import { useState } from "react"; // React এর useState হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import Modal from "../../components/Modal"; // Modal কম্পোনেন্ট ইম্পোর্ট করা হচ্ছে, যা ক্লাব তৈরি/এডিট করার জন্য ব্যবহৃত হবে
import { adminListClubs, createClub, updateClub, deleteClub } from "../../services/api"; // API কল করার জন্য ফাংশনগুলো ইম্পোর্ট করা হচ্ছে

export default function ManageClubs() {
  const [rows, setRows] = useState(adminListClubs()); // ক্লাবের তালিকা স্টেটে সেভ হচ্ছে
  const [open, setOpen] = useState(false); // Modal ওপেন বা বন্ধ করার জন্য স্টেট
  const [editing, setEditing] = useState(null); // কনটেক্সট ক্লাব (যেটি এডিট বা সিলেক্ট করা হবে)
  const [form, setForm] = useState({ name: "", tagline: "", about: "", location: "" }); // ফর্মের জন্য স্টেট

  // ক্লাব তালিকা রিফ্রেশ করার ফাংশন
  const refresh = () => setRows(adminListClubs()); // ক্লাবের তালিকা আবার লোড হবে

  // Create ক্লাব Modal ওপেন করার ফাংশন
  const openCreate = () => { 
    setEditing(null); // নতুন ক্লাব তৈরি করা হচ্ছে, তাই এডিটিং আইডি ক্লিয়ার
    setForm({ name: "", tagline: "", about: "", location: "" }); // ফর্ম রিসেট করা হচ্ছে
    setOpen(true); // Modal ওপেন করা হচ্ছে
  };

  // Edit ক্লাব Modal ওপেন করার ফাংশন
  const openEdit = (row) => { 
    setEditing(row); // সিলেক্ট করা ক্লাব এডিটিং মোডে যাবে
    setForm(row); // ফর্মে সেই ক্লাবের ডেটা সেট করা হচ্ছে
    setOpen(true); // Modal ওপেন করা হচ্ছে
  };

  // Modal বন্ধ করার ফাংশন
  const close = () => setOpen(false);

  // ইনপুট পরিবর্তনের জন্য ফাংশন
  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  // ক্লাব সেভ করার ফাংশন (এডিট বা নতুন ক্লাব)
  const onSave = () => {
    if (editing) { 
      updateClub(editing.id, form); // এডিটিং হলে ক্লাব আপডেট করা হচ্ছে
    } else { 
      createClub(form); // নতুন ক্লাব তৈরি করা হচ্ছে
    }
    setOpen(false); // Modal বন্ধ করা হচ্ছে
    refresh(); // ক্লাব তালিকা রিফ্রেশ করা হচ্ছে
  };

  // ক্লাব ডিলিট করার ফাংশন
  const onDelete = (id) => { 
    deleteClub(id); // ক্লাব ডিলিট করার API কল
    refresh(); // ক্লাব তালিকা রিফ্রেশ করা হচ্ছে
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Manage Clubs</h1> {/* Manage Clubs শিরোনাম */}
        <button className="btn primary" onClick={openCreate}>Create Club</button> {/* Create Club বাটন */}
      </div>

      {/* ক্লাব তালিকার টেবিল */}
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Tagline</th><th>Location</th><th>Actions</th></tr> {/* টেবিলের হেড */}
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}> {/* ক্লাব রো */}
              <td>{r.id}</td> {/* ক্লাব আইডি */}
              <td>{r.name}</td> {/* ক্লাবের নাম */}
              <td>{r.tagline}</td> {/* ক্লাবের ট্যাগলাইন */}
              <td>{r.location}</td> {/* ক্লাবের অবস্থান */}
              <td style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost" onClick={() => openEdit(r)}>Edit</button> {/* ক্লাব এডিট বাটন */}
                <button className="btn ghost" onClick={() => onDelete(r.id)}>Delete</button> {/* ক্লাব ডিলিট বাটন */}
              </td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={5} style={{ color: "var(--muted)" }}>No clubs.</td></tr>} {/* যদি কোনো ক্লাব না থাকে */}
        </tbody>
      </table>

      {/* Modal যেখানে ক্লাব তৈরি বা এডিট করা হবে */}
      <Modal open={open} title={editing ? "Edit Club" : "Create Club"} onClose={close}>
        <div className="form-grid"> {/* ফর্মের ইনপুট ফিল্ড */}
          <label className="full"><div>Name</div><input className="input" name="name" value={form.name} onChange={onChange} /></label> {/* ক্লাবের নাম ইনপুট */}
          <label><div>Tagline</div><input className="input" name="tagline" value={form.tagline} onChange={onChange} /></label> {/* ক্লাবের ট্যাগলাইন ইনপুট */}
          <label><div>Location</div><input className="input" name="location" value={form.location} onChange={onChange} /></label> {/* ক্লাবের অবস্থান ইনপুট */}
          <label className="full"><div>About</div><input className="input" name="about" value={form.about} onChange={onChange} /></label> {/* ক্লাবের সম্পর্কে ইনপুট */}
        </div>
        <div className="actions">
          <button className="btn ghost" onClick={close}>Cancel</button> {/* ক্যানসেল বাটন */}
          <button className="btn primary" onClick={onSave}>Save</button> {/* সেভ বাটন */}
        </div>
      </Modal>
    </>
  );
}
