// import { useEffect, useState } from "react";
// import api from '../api';
// import Chat from "./Chat";
// import "./AdminInbox.css";


// export default function AdminInbox() {
//   const [list, setList] = useState([]);
//   const [current, setCurrent] = useState(null); // {id, name, role}

//   const load = async () => {
//     try {
//       await api.get("/sanctum/csrf-cookie").catch(() => {});
//       const { data } = await api.get("/conversations");
//       setList(data ?? []);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     load();
//     const t = setInterval(load, 5000); // হালকা রিফ্রেশ
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="inbox-wrap">
//       <aside className="inbox-sidebar">
//         <div className="inbox-title">Conversations</div>
//         <div className="inbox-list">
//           {list.map((c) => (
//             <button
//               key={c.partner_id}
//               className={`inbox-item ${current?.id === c.partner_id ? "active" : ""}`}
//               onClick={() => setCurrent({ id: c.partner_id, name: c.partner_name })}
//               title={new Date(c.last_time).toLocaleString()}
//             >
//               <span className="avatar">{(c.partner_name || "U")[0]}</span>
//               <span className="name">{c.partner_name}</span>
//               {!!c.unread_count && <span className="badge">{c.unread_count}</span>}
//             </button>
//           ))}
//         </div>
//       </aside>

//       <main className="inbox-main">
//         {current ? (
//           <Chat otherUser={current} />
//         ) : (
//           <div className="emptystate">Select a conversation</div>
//         )}
//       </main>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../api";
// import Chat from "./Chat";
// import "./AdminInbox.css";

// export default function AdminInbox() {
//   const [list, setList] = useState([]);       // সব conversation list
//   const [current, setCurrent] = useState(null); // current selected user

//   const load = async () => {
//     try {
//       await api.get("/sanctum/csrf-cookie").catch(() => {});
//       const { data } = await api.get("/conversations"); // [{partner_id, partner_name, last_time, unread_count}]
//       setList(data ?? []);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     load();
//     const t = setInterval(load, 5000); // প্রতি ৫ সেকেন্ড পর রিফ্রেশ
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="inbox-wrap">
//       {/* বাম পাশে user list */}
//       <aside className="inbox-sidebar">
//         <div className="inbox-title">Conversations</div>
//         <div className="inbox-list">
//           {list.map((c) => (
//             <button
//               key={c.partner_id}
//               className={`inbox-item ${current?.id === c.partner_id ? "active" : ""}`}
//               onClick={() =>
//                 setCurrent({ id: c.partner_id, name: c.partner_name })
//               }
//               title={new Date(c.last_time).toLocaleString()}
//             >
//               <span className="avatar">{(c.partner_name || "U")[0]}</span>
//               <span className="name">{c.partner_name}</span>
//               {!!c.unread_count && (
//                 <span className="badge">{c.unread_count}</span>
//               )}
//             </button>
//           ))}
//         </div>
//       </aside>

//       {/* ডানে chat box */}
//       <main className="inbox-main">
//         {current ? (
//           <Chat otherUser={current} />
//         ) : (
//           <div className="emptystate">Select a conversation</div>
//         )}
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api";
import Chat from "./Chat";
import "./AdminInbox.css";

export default function AdminInbox() {
  const [list, setList] = useState([]);       // সব conversation list
  const [current, setCurrent] = useState(null); // current selected user
  const [error, setError] = useState("");

  const load = async () => {
    try {
      await api.get("/sanctum/csrf-cookie").catch(() => { });
      const { data } = await api.get("/conversations"); // [{partner_id, partner_name, last_time, unread_count}]
      setList(data ?? []);
    } catch (e) {
      setError("Failed to load conversations.");
      console.error(e);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 5000); // প্রতি ৫ সেকেন্ড পর রিফ্রেশ
    return () => clearInterval(t);
  }, []);

  return (
    <div className="inbox-wrap">
      {/* বাম পাশে user list */}
      <aside className="inbox-sidebar">
        <div className="inbox-title">Conversations</div>
        <div className="inbox-list">
          {list.map((c) => (
            <button
              key={c.partner_id}
              className={`inbox-item ${current?.id === c.partner_id ? "active" : ""}`}
              onClick={() =>
                setCurrent({ id: c.partner_id, name: c.partner_name })
              }
              title={new Date(c.last_time).toLocaleString()}
            >
              <span className="avatar">{(c.partner_name || "U")[0]}</span>
              <span className="name">{c.partner_name}</span>
              {!!c.unread_count && (
                <span className="badge">{c.unread_count}</span>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* ডানে chat box */}
      <main className="inbox-main">
        {current ? (
          <Chat otherUser={current} />
        ) : (
          <div className="emptystate">Select a conversation</div>
        )}
      </main>
    </div>
  );
}

