import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function EventDetails({ event }) {
  const ev = event || sampleEvent();
  const segments = ev.segments || [];
  const now = new Date();

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">Event Details</h2>}>
      <Head title={ev.title} />

      {/* Banner */}
      <div className="relative h-72 w-full overflow-hidden">
        <img src={ev.bannerUrl} alt={ev.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white">
          <h1 className="text-3xl font-semibold">{ev.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-white/90">
            <img src={ev.club.avatarUrl} alt={ev.club.name} className="h-8 w-8 rounded-full ring-1 ring-white/20" />
            <Link href={ev.club.href || "#"} className="hover:underline">
              {ev.club.name}
            </Link>
          </div>
        </div>
      </div>

      {/* Meta + Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Left: details + segments */}
          <section className="space-y-6">
            <div className="rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-gray-900">About this event</h2>
              {ev.description && <p className="mt-2 text-sm text-gray-700">{ev.description}</p>}
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-800 sm:grid-cols-3">
                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {fmt(ev.start_at)} – {fmt(ev.end_at)}
                </div>
                {ev.location && (
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {ev.location}
                  </div>
                )}
                {typeof ev.attendees === "number" && (
                  <div className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4" /> {ev.attendees} going
                  </div>
                )}
              </div>
            </div>

            {/* Segments timeline */}
            <div className="rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur">
              <h3 className="text-base font-semibold text-gray-900">Event timeline</h3>
              <ol className="mt-4 space-y-4">
                {segments.map((s, i) => {
                  const st = new Date(s.start_at);
                  const en = new Date(s.end_at);
                  const status = now < st ? "Upcoming" : now > en ? "Done" : "Live";
                  const pct = Math.min(100, Math.max(0, ((+now - +st) / (+en - +st)) * 100));
                  return (
                    <li key={i} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{s.title}</h4>
                          <p className="text-xs text-gray-600">
                            {fmt(st)} – {fmt(en)}
                          </p>
                        </div>
                        <span
                          className={`text-xs font-medium ${
                            status === "Live"
                              ? "text-amber-700"
                              : status === "Done"
                              ? "text-emerald-700"
                              : "text-gray-600"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-2 ${
                            status === "Live"
                              ? "bg-amber-400"
                              : status === "Done"
                              ? "bg-emerald-400"
                              : "bg-gray-300"
                          }`}
                          style={{ width: `${status === "Upcoming" ? 0 : pct}%` }}
                        />
                      </div>
                      {s.description && (
                        <p className="mt-2 text-xs text-gray-700">{s.description}</p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* Right: actions */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur">
              <h4 className="text-sm font-semibold text-gray-900">Club</h4>
              <div className="mt-2 flex items-center gap-3">
                <img src={ev.club.avatarUrl} alt={ev.club.name} className="h-10 w-10 rounded-full ring-1 ring-gray-200" />
                <div>
                  <Link
                    href={ev.club.href || "#"}
                    className="text-sm font-medium text-gray-900 hover:underline"
                  >
                    {ev.club.name}
                  </Link>
                  <p className="text-xs text-gray-600">Click to view club page</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/90 p-5 shadow-sm backdrop-blur">
              <h4 className="text-sm font-semibold text-gray-900">Share</h4>
              <div className="mt-2 flex gap-2 text-xs text-gray-700">Copy link · Facebook · X</div>
            </div>
          </aside>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

function fmt(d) {
  const dd = new Date(d);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dd);
}

function sampleEvent() {
  const start = new Date();
  start.setDate(start.getDate() + 2);
  start.setHours(15, 0, 0, 0);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const seg = (t, offMin, durMin) => ({
    title: t,
    start_at: new Date(start.getTime() + offMin * 60000).toISOString(),
    end_at: new Date(start.getTime() + (offMin + durMin) * 60000).toISOString(),
    description: "Segment details...",
  });
  return {
    id: 1,
    title: "AUST CSE JS Sprint: React Hooks",
    description:
      "Hands-on session covering hooks, composition, and performance best practices.",
    bannerUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
    club: {
      name: "AUST Programming & Informatics Club",
      href: "/clubs/aust-pic",
      avatarUrl: "https://ui-avatars.com/api/?name=AUST+PIC&background=111827&color=fff",
    },
    start_at: start.toISOString(),
    end_at: end.toISOString(),
    location: "Lab 3, CSE",
    segments: [
      seg("Registration & Networking", -30, 30),
      seg("Opening Remarks", 0, 15),
      seg("Workshop Part I", 15, 45),
      seg("Break", 60, 15),
      seg("Workshop Part II", 75, 45),
      seg("Q&A + Closing", 120, 15),
    ],
  };
}
