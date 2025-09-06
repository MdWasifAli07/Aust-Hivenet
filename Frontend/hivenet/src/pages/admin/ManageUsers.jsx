import { useMemo, useState } from "react"; // useMemo এবং useState হুক ইম্পোর্ট করা হচ্ছে
import "../../styles/admin-pages.css"; // admin-pages.css ফাইলটি স্টাইলের জন্য ইম্পোর্ট করা হচ্ছে
import { listUsers, updateUserRole, deleteUser } from "../../services/api"; // API কল করার জন্য ফাংশনগুলো ইম্পোর্ট করা হচ্ছে
import { useAuth } from "../../context/AuthContext"; // ব্যবহারকারীর অটেন্টিকেশন স্টেটের জন্য useAuth হুক ইম্পোর্ট করা হচ্ছে

export default function ManageUsers() {
  const { user: me } = useAuth(); // ব্যবহারকারী স্টেট (অর্থাৎ লগিন করা ব্যবহারকারী)
  const [rows, setRows] = useState(listUsers()); // সমস্ত ইউজারের তালিকা স্টেটে সেভ হচ্ছে
  const [q, setQ] = useState(""); // সার্চ কুয়েরি স্টেট

  // সার্চ ফাংশন: কুয়েরি অনুসারে ইউজারদের তালিকা ফিল্টার করা
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase(); // সার্চ কুয়েরি ছোট হাতের অক্ষরে রূপান্তর করা হচ্ছে
    if (!t) return rows; // যদি সার্চ কুয়েরি খালি থাকে, তাহলে সমস্ত ইউজার রিটার্ন হবে
    return rows.filter(r =>
      r.name?.toLowerCase().includes(t) || // ইউজারের নামের মধ্যে সার্চ কুয়েরি খুঁজছে
      r.email?.toLowerCase().includes(t) || // ইউজারের ইমেইলের মধ্যে সার্চ কুয়েরি খুঁজছে
      r.role?.toLowerCase().includes(t) // ইউজারের রোলের মধ্যে সার্চ কুয়েরি খুঁজছে
    );
  }, [rows, q]);

  // ইউজারের রোল পরিবর্তন করার ফাংশন
  const changeRole = (id, role) => {
    updateUserRole(id, role); // API কল করে ইউজারের রোল আপডেট করা হচ্ছে
    setRows(listUsers()); // ইউজার তালিকা রিফ্রেশ করা হচ্ছে
  };

  // ইউজার ডিলিট করার ফাংশন
  const remove = (id) => {
    if (id === me?.id) { alert("You cannot delete your own account."); return; } // নিজের অ্যাকাউন্ট ডিলিট করা যাবে না
    deleteUser(id); // API কল করে ইউজার ডিলিট করা হচ্ছে
    setRows(listUsers()); // ইউজার তালিকা রিফ্রেশ করা হচ্ছে
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Manage Users</h1> {/* "Manage Users" শিরোনাম */}
        <input className="input" placeholder="Search users..." value={q} onChange={e => setQ(e.target.value)} style={{ maxWidth: 280 }} /> {/* ইউজার সার্চ ইনপুট */}
      </div>

      {/* ইউজারের তালিকা টেবিল */}
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>DeptID</th><th>Department</th><th>Role</th><th>Actions</th></tr> {/* টেবিলের হেড */}
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}> {/* ইউজারের জন্য একটি রো */}
              <td title={u.id}>{u.id.slice(0, 6)}…</td> {/* ইউজারের আইডি, প্রথম 6 অক্ষর দেখানো হচ্ছে */}
              <td>{u.name}</td> {/* ইউজারের নাম */}
              <td>{u.email}</td> {/* ইউজারের ইমেইল */}
              <td>{u.deptId || "—"}</td> {/* ইউজারের ডিপার্টমেন্ট আইডি */}
              <td>{u.department || "—"}</td> {/* ইউজারের ডিপার্টমেন্ট */}
              <td>
                <select value={u.role} onChange={e => changeRole(u.id, e.target.value)} className="input" style={{ padding: "8px 10px" }}>
                  <option value="student">student</option> {/* স্টুডেন্ট রোল */}
                  <option value="admin">admin</option> {/* অ্যাডমিন রোল */}
                </select>
              </td>
              <td style={{ display: "flex", gap: 8 }}>
                <button className="btn ghost" onClick={() => remove(u.id)}>Delete</button> {/* ইউজার ডিলিট করার বাটন */}
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={7} style={{ color: "var(--muted)" }}>No users.</td></tr>} {/* যদি কোনো ইউজার না থাকে */}
        </tbody>
      </table>
    </>
  );
}
