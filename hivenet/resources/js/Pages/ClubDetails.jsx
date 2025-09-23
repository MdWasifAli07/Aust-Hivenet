import React from "react";
import { Head } from "@inertiajs/react";
import EventCard from "@/Components/ui/event-card";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import { toggleInterested, isInterested } from "@/lib/interested";


export default function ClubDetails({ club, events = [] }) {
const c = club || SAMPLE_CLUB;
const evs = events.length ? events : SAMPLE_EVENTS(c);
return (
<AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">{c.name}</h2>}>
<Head title={c.name} />
<div className="relative h-40 w-full overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700"/>
<div className="relative mx-auto flex max-w-7xl items-end gap-4 px-4 py-6 sm:px-6 lg:px-8">
<img src={c.avatarUrl} className="h-16 w-16 rounded-full ring-2 ring-white/20"/>
<div className="text-white">
<h1 className="text-2xl font-semibold">{c.name}</h1>
<p className="text-xs text-white/80">Established {c.founded}</p>
</div>
</div>
</div>


<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
<p className="text-sm text-gray-700">{c.description}</p>
<h3 className="mt-6 text-lg font-semibold text-gray-900">Upcoming & recent events</h3>
<div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{evs.map((ev) => (
<EventCard
key={ev.id}
ev={ev}
onToggleFavourite={() => toggleFavorite(ev)}
onToggleInterested={() => toggleInterested(ev)}
isFavourite={isFavorite(ev.id)}
isInterested={isInterested(ev.id)}
/>
))}
</div>
</div>
</AuthenticatedLayout>
);
}


const SAMPLE_CLUB = { name: "AUST Programming & Informatics Club", founded: "2012", description: "Coding, hackathons, and study jams.", avatarUrl: "https://ui-avatars.com/api/?name=AUST+PIC&background=111827&color=fff" };
function SAMPLE_EVENTS(club) {
const mk = (id, title, days, img) => {
const s = new Date(); s.setDate(s.getDate() + days); s.setHours(15,0,0,0);
const e = new Date(s.getTime() + 2*60*60*1000);
return { id, title, bannerUrl: img, club, start_at: s.toISOString(), end_at: e.toISOString(), location: "Campus" };
};
return [
mk(1, "Workshop: Advanced React", 7, "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"),
mk(2, "Hack Night: OSS", 14, "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"),
];
}