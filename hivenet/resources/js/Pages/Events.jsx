import React, { useMemo, useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ThreeDMarqueeDemo from "@/Components/ui/3d-marquee-demo";
import EventCard, { getStatus } from "@/Components/ui/event-card";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { getInterested, toggleInterested } from "@/lib/interested";

export default function Events({ events = [] }) {
  // Demo data (club/event vibes)
  const SAMPLE_EVENTS = [
    mkEvent(
      1,
      "Neon Night: DJ & Dance",
      "AUST CSE Society",
      "/clubs/aust-cse-society",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80&auto=format&fit=crop",
      2,
      "Main Auditorium"
    ),
    mkEvent(
      2,
      "Coding Carnival Afterparty",
      "AUST Programming & Informatics Club",
      "/clubs/aust-pic",
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1200&q=80&auto=format&fit=crop",
      6,
      "CSE Lounge"
    ),
    mkEvent(
      3,
      "Research Club Mixer",
      "AUST Research Club",
      "/clubs/aust-research-club",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop",
      10,
      "Seminar Room 2"
    ),
    mkEvent(
      4,
      "Inter-Dept DJ Battle",
      "AUST Music & Arts",
      "/clubs/aust-music-arts",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop",
      -1,
      "Open Grounds"
    ),
  ];

  const data = events.length ? events : SAMPLE_EVENTS;

  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all"); // all | upcoming | ongoing | ended
  const [favs, setFavs] = useState([]);
  const [ints, setInts] = useState([]);

  useEffect(() => {
    setFavs(getFavorites());
    setInts(getInterested());
  }, []);

  // ✅ derive booleans from state (not localStorage) for instant UI
  const favSet = useMemo(() => new Set(favs.map((e) => String(e.id))), [favs]);
  const intSet = useMemo(() => new Set(ints.map((e) => String(e.id))), [ints]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((e) => {
      const st = getStatus(e.start_at, e.end_at).toLowerCase();
      if (tab !== "all" && st !== tab) return false;
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.club?.name?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q)
      );
    });
  }, [data, tab, query]);

  const onFav = (ev) => setFavs(toggleFavorite(ev));
  const onInt = (ev) => setInts(toggleInterested(ev));

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">Events</h2>}>
      <Head title="Events" />

      {/* Hero 3D marquee */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ThreeDMarqueeDemo />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
              Upcoming events around you
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-400">
              Hosted by clubs & societies at AUST.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-neutral-900/60 p-1 ring-1 ring-white/10">
              {[
                { key: "all", label: "All" },
                { key: "upcoming", label: "Upcoming" },
                { key: "ongoing", label: "Ongoing" },
                { key: "ended", label: "Ended" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    tab === t.key
                      ? "bg-white text-black shadow"
                      : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events or clubs…"
              className="w-64 rounded-xl border-0 bg-neutral-900/60 px-4 py-2 text-sm text-white placeholder:text-neutral-500 shadow-inner ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => (
            <EventCard
              key={ev.id}
              ev={ev}
              onToggleFavourite={onFav}
              onToggleInterested={onInt}
              isFavourite={favSet.has(String(ev.id))}
              isInterested={intSet.has(String(ev.id))}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center text-neutral-400">
            No events match your filters.
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}

function mkEvent(id, title, clubName, clubHref, bannerUrl, daysFromNow, location) {
  const start = new Date();
  start.setDate(start.getDate() + daysFromNow);
  start.setHours(19, 0, 0, 0); // evening vibes
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
  return {
    id,
    title,
    bannerUrl,
    club: {
      name: clubName,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        clubName
      )}&background=111827&color=fff`,
      href: clubHref,
    },
    start_at: start.toISOString(),
    end_at: end.toISOString(),
    location,
  };
}
