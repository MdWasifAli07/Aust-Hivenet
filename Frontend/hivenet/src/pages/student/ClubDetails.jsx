import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { listClubs, listEvents } from "../../services/api";
import "../../styles/club-details.css";

export default function ClubDetails() {
  const { id } = useParams();
  const clubs = listClubs() || [];
  const club = useMemo(
    () => clubs.find(c => String(c.id) === String(id)) || {},
    [clubs, id]
  );

  const [tab, setTab] = useState("overview"); // overview | members | chat | events

  // Derive events of this club (name match; fallback by id->clubId if your data has it)
  const events = useMemo(() => {
    const all = listEvents() || [];
    return all.filter(e =>
      (e.club && club.name && e.club === club.name) ||
      (e.clubId && club.id && String(e.clubId) === String(club.id))
    );
  }, [club.id, club.name]);

  // Members fallback
  const members = useMemo(() => {
    // preferred: club.membersDetails = [{id,name,role}, ...]
    if (Array.isArray(club.membersDetails)) return club.membersDetails;
    // fallback: club.members = ['uid1','uid2', ...]
    if (Array.isArray(club.members)) {
      return club.members.map((m, i) => ({
        id: m,
        name: typeof m === "string" ? `Member ${i + 1}` : (m?.name || `Member ${i + 1}`),
        role: typeof m === "string" ? "member" : (m?.role || "member"),
      }));
    }
    // last resort: show count-only ghosts
    const count = typeof club.membersCount === "number" ? club.membersCount : 0;
    return Array.from({ length: Math.min(count, 6) }, (_, i) => ({
      id: `ghost-${i}`,
      name: `Member ${i + 1}`,
      role: "member",
    }));
  }, [club.membersDetails, club.members, club.membersCount]);

  // Demo chat (UI only)
  const demoChat = useMemo(() => {
    return (club.chat && Array.isArray(club.chat) ? club.chat : [
      { id: 1, by: "Admin", body: "Welcome to the club!", at: "10:05" },
      { id: 2, by: "You", body: "Glad to be here ✌️", at: "10:07" },
    ]).slice(0, 20);
  }, [club.chat]);

  return (
    <div className="clubd">
      {/* Header */}
      <header className="clubd__hero kard">
        <div className="clubd__logo">{(club.name || "C").slice(0, 2).toUpperCase()}</div>
        <div className="clubd__meta">
          <h1 className="clubd__title">{club.name || "Club"}</h1>
          <p className="clubd__tag muted">
            {club.department || club.category || "General"} • {club.membersCount ?? members.length} members
          </p>
          {club.tagline && <p className="clubd__line muted">{club.tagline}</p>}
        </div>
        <div className="clubd__cta">
          <Link className="btn-ghost" to="/student/clubs">Back to My Clubs</Link>
          <Link className="btn-primary" to="/student/forum">Open Forum</Link>
        </div>
      </header>

      {/* Tabs */}
      <nav className="clubd__tabs" role="tablist" aria-label="Club sections">
        {["overview", "members", "chat", "events"].map(key => (
          <button
            key={key}
            className={tab === key ? "on" : ""}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
          >
            {key === "overview" && "Overview"}
            {key === "members" && "Members"}
            {key === "chat" && "Chat"}
            {key === "events" && "Events"}
          </button>
        ))}
      </nav>

      {/* Panels */}
      <section className="clubd__panel">
        {tab === "overview" && (
          <div className="grid">
            <article className="card">
              <h3 className="card__title">About</h3>
              <p className="muted">
                {club.about || "This club hasn’t added a description yet."}
              </p>
            </article>

            <article className="card">
              <h3 className="card__title">Contacts</h3>
              <ul className="meta">
                <li><b>Email:</b> {club.email || "—"}</li>
                <li><b>Room:</b> {club.room || "—"}</li>
                <li><b>Advisor:</b> {club.advisor || "—"}</li>
              </ul>
            </article>

            <article className="card">
              <h3 className="card__title">Quick Links</h3>
              <div className="links">
                <Link className="mini" to="/student/chat">Club Chats</Link>
                <Link className="mini" to="/student/resources">Resources</Link>
                <Link className="mini" to="/student/events">All Events</Link>
              </div>
            </article>
          </div>
        )}

        {tab === "members" && (
          <div className="members">
            {members.length > 0 ? members.map(m => (
              <div key={m.id} className="mem">
                <div className="avatar">{(m.name || "M").slice(0,2).toUpperCase()}</div>
                <div className="grow">
                  <div className="m1">{m.name || m.id}</div>
                  <div className="m2 muted">{(m.role || "member").toString()}</div>
                </div>
                <button className="mini" title="Message (UI only)">Message</button>
              </div>
            )) : (
              <div className="kard muted">No members listed yet.</div>
            )}
          </div>
        )}

        {tab === "chat" && (
          <div className="chat">
            <div className="chat__list">
              {demoChat.map(msg => (
                <div key={msg.id} className={`bubble ${/you/i.test(msg.by) ? "me" : ""}`}>
                  <div className="b1">
                    <b>{msg.by}</b> <span className="muted">@ {msg.at || "--:--"}</span>
                  </div>
                  <div className="b2">{msg.body}</div>
                </div>
              ))}
            </div>
            <div className="chat__box">
              <input className="input" placeholder="Type a message… (demo)" disabled />
              <button className="btn-ghost" disabled>Send</button>
            </div>
          </div>
        )}

        {tab === "events" && (
          <div className="evts">
            {events.length > 0 ? events.map(ev => (
              <article key={ev.id} className="evt">
                <div className="evt-date">
                  <div className="d1">{ev.date?.split("-")[2] || "--"}</div>
                  <div className="d2">{(ev.date ? new Date(ev.date).toLocaleString(undefined, { month: "short" }) : "").slice(0,3)}</div>
                </div>
                <div className="grow">
                  <div className="t1">{ev.title}</div>
                  <div className="t2 muted">
                    <span>{ev.date}{ev.time ? ` @ ${ev.time}` : ""}</span>
                    {ev.location ? <> • <span>{ev.location}</span></> : null}
                  </div>
                </div>
                <Link className="mini" to={`/student/event/${ev.id}`}>Open</Link>
              </article>
            )) : (
              <div className="kard muted">No events for this club yet.</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
