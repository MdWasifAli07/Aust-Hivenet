"use client";
import React from "react";
import { Heart, CalendarDays, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

export type Club = {
  name: string;
  avatarUrl: string;
  href?: string;
};

export type EventItem = {
  id: string | number;
  title: string;
  bannerUrl: string;
  club: Club;
  start_at: string; // ISO
  end_at?: string; // ISO
  location?: string;
};

export function getStatus(
  startISO: string,
  endISO?: string
): "Upcoming" | "Ongoing" | "Ended" {
  const now = new Date();
  const s = new Date(startISO);
  const e = endISO ? new Date(endISO) : undefined;
  if (s > now) return "Upcoming";
  if (e && e < now) return "Ended";
  return "Ongoing";
}

export default function EventCard({
  ev,
  onToggleInterested,
  onToggleFavourite,
  isFavourite,
  isInterested,
}: {
  ev: EventItem;
  onToggleInterested?: (ev: EventItem) => void;
  onToggleFavourite?: (ev: EventItem) => void;
  isFavourite?: boolean;
  isInterested?: boolean;
}) {
  const status = getStatus(ev.start_at, ev.end_at);
  const dateFmt = new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      className={cn(
        "group/card relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-0.5 shadow-xl ring-1 ring-white/10"
      )}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(99,102,241,0.35) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="flex h-full flex-col overflow-hidden rounded-[15px] bg-neutral-950">
        {/* Banner */}
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={ev.bannerUrl}
            alt={ev.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
          {/* Status */}
          <span
            className={cn(
              "absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ring-1 backdrop-blur",
              status === "Upcoming" &&
                "bg-emerald-400 text-emerald-900 ring-emerald-900/20",
              status === "Ongoing" &&
                "bg-amber-400 text-amber-950 ring-amber-900/20",
              status === "Ended" && "bg-neutral-200 text-neutral-900 ring-black/10"
            )}
          >
            {status}
          </span>
          {/* Date chip */}
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white ring-1 ring-white/10">
            <CalendarDays className="h-3.5 w-3.5" />
            {dateFmt.format(new Date(ev.start_at))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center gap-2">
            <img
              src={ev.club.avatarUrl}
              className="h-7 w-7 rounded-full ring-1 ring-white/10"
              alt={ev.club.name}
              loading="lazy"
            />
            {ev.club.href ? (
              <Link
                href={ev.club.href}
                className="text-sm font-medium text-white hover:underline"
              >
                {ev.club.name}
              </Link>
            ) : (
              <span className="text-sm font-medium text-white">{ev.club.name}</span>
            )}
          </div>

          <h3 className="line-clamp-1 text-lg font-semibold text-white">{ev.title}</h3>

          {ev.location && (
            <div className="inline-flex items-center gap-2 text-sm text-neutral-300">
              <MapPin className="h-4 w-4 opacity-80" />
              <span className="truncate">{ev.location}</span>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-2">
            <Link
              href={`/events/${ev.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black shadow transition hover:translate-y-0.5"
            >
              <CheckCircle2 className="h-4 w-4" /> Details
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleInterested?.(ev);
                }}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm shadow-inner transition",
                  isInterested
                    ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-300"
                    : "border-white/15 bg-neutral-900 text-white/90 hover:bg-neutral-800"
                )}
              >
                Interested
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavourite?.(ev);
                }}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm shadow-inner transition inline-flex items-center gap-1",
                  isFavourite
                    ? "border-pink-400/40 bg-pink-500/20 text-pink-300"
                    : "border-white/15 bg-neutral-900 text-white/90 hover:bg-neutral-800"
                )}
                aria-pressed={isFavourite}
              >
                <Heart className={cn("h-4 w-4", isFavourite && "fill-current")} />
                Favourite
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
