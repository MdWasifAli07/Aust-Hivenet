







import { useEffect, useMemo, useRef, useState } from "react";
import api from '../api'; // api.js থেকে import
import "./Chat.css";

/**
 * Props:
 * - otherUser: { id: number|string, name: string, role?: "Club Admin"|"User" }
 * - currentUser: { id: number|string, name: string, role?: string }
 *
 * যদি props না পাঠাও, তাহলে window.AppUser / window.OtherUser থেকে নেবে।
 */

export default function Chat({ otherUser, currentUser }) {
  // Current user
  const me = useMemo(() => {
    return (
      currentUser ||
      window.AppUser || { id: window.AppUserId ?? null, name: "You" }
    );
  }, [currentUser]);

  // Other user
  const other = useMemo(() => {
    return otherUser || window.OtherUser || { id: null, name: "Club Admin" };
  }, [otherUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const listRef = useRef(null);

  // --- Helper: scroll to bottom ---
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  };

  // --- Mark messages as read when thread opens ---
  useEffect(() => {
    if (!other?.id) return;

    api.post(`/chat/${other.id}/read`).catch(() => {
      console.log("Failed to mark message as read");
    });
  }, [other?.id]);

  // --- Load messages + Real-time subscribe / polling fallback ---
  useEffect(() => {
    if (!other?.id) return;

    let pollTimer;

    const loadMessages = async () => {
      setError("");
      try {
        await api.get("/sanctum/csrf-cookie").catch(() => {});
        const { data } = await api.get(`/chat/${other.id}`);
        setMessages(Array.isArray(data) ? data : []);
        scrollToBottom();
      } catch (e) {
        setError("Could not load messages.");
        console.error(e);
      }
    };

    loadMessages();

    // Laravel Echo real-time
    if (typeof window !== "undefined" && window.Echo && me?.id) {
      const channel = window.Echo.private(`chat.${me.id}`);

      const handler = (e) => {
        const incoming = e.message ?? e;
        if (
          (incoming?.sender_id === other.id && incoming?.receiver_id === me.id) ||
          incoming?.from_user_id === other.id
        ) {
          setMessages((prev) => [...prev, incoming]);
          scrollToBottom();
        }
      };

      channel.listen("MessageSent", handler);

      return () => {
        try {
          channel.stopListening("MessageSent", handler);
        } catch {}
      };
    }

    // Polling fallback
    pollTimer = setInterval(async () => {
      try {
        const { data } = await api.get(`/chat/${other.id}`);
        setMessages(Array.isArray(data) ? data : []);
      } catch {}
    }, 5000);

    return () => clearInterval(pollTimer);
  }, [me?.id, other?.id]);

  // Scroll bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // --- Send message ---
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending || !other?.id) return;

    setSending(true);
    setError("");

    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      message: text,
      sender_id: me?.id,
      receiver_id: other?.id,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");
    scrollToBottom();

    try {
      await api.get("/sanctum/csrf-cookie").catch(() => {});
      const { data } = await api.post("/chat", {
        receiver_id: other.id,
        message: text,
      });

      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? { ...optimistic, ...(data ?? {}) } : m))
      );
    } catch (e) {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setInput(text);
      setError("Failed to send. Please try again.");
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <div className="chat-title">
          Chat with <span className="chat-peer">{other?.name || "User"} {other?.role ? `(${other.role})` : ""}</span>
        </div>
        <div className="chat-subtitle">
          You: {me?.name || "You"} {me?.role ? `(${me.role})` : ""}
        </div>
      </div>

      <div ref={listRef} className="chat-list">
        {messages.map((m) => {
          const fromMe = String(m.sender_id ?? m.from_user_id) === String(me?.id);
          const text = m.body ?? m.message ?? "";
          return (
            <div
              key={m.id ?? `${m.sender_id}-${m.created_at}-${Math.random()}`}
              className={`chat-row ${fromMe ? "me" : "other"}`}
              title={m.created_at ? new Date(m.created_at).toLocaleString() : undefined}
            >
              {!fromMe && <div className="chat-avatar">{other?.name?.[0]?.toUpperCase() || "U"}</div>}
              <div className="chat-bubble">
                {!fromMe && <div className="chat-name">{other?.name || `User ${m.sender_id}`}</div>}
                <div className="chat-text">{text}</div>
              </div>
              {fromMe && <div className="chat-avatar me">{me?.name?.[0]?.toUpperCase() || "Y"}</div>}
            </div>
          );
        })}
      </div>

      {error && <div className="chat-error">{error}</div>}

      <div className="chat-input-row">
        <textarea
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Write a message…"
          rows={1}
        />
        <button
          className="chat-send"
          onClick={sendMessage}
          disabled={!input.trim() || sending || !other?.id}
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
