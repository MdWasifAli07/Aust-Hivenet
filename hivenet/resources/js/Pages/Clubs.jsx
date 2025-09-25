import React from "react";
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from "@inertiajs/react";


export default function MyClubs({ clubs = [] }) {
const data = clubs.length ? clubs : SAMPLE_CLUBS;
return (
<GuestLayout header={<h2 className="text-xl font-semibold text-white">My Clubs</h2>}>
<Head title="My Clubs" />
<div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
{data.map((c) => (
<article key={c.slug} className="overflow-hidden rounded-2xl bg-white/90 p-4 shadow-sm transition hover:shadow-md">
<div className="flex items-center gap-3">
<img src={c.avatarUrl} className="h-12 w-12 rounded-full ring-1 ring-gray-200"/>
<div>
<h3 className="text-base font-semibold text-gray-900">{c.name}</h3>
<p className="text-xs text-gray-600">Est. {c.founded}</p>
</div>
</div>
<p className="mt-3 line-clamp-2 text-sm text-gray-700">{c.description}</p>
<div className="mt-4">
<Link href={`/clubs/${c.slug}`} className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white">View Club</Link>
</div>
</article>
))}
</div>
</div>
</GuestLayout>
);
}


const SAMPLE_CLUBS = [
mkClub("aust-cse-society", "AUST CSE Society", "2010", "Fostering community & innovation."),
mkClub("aust-pic", "AUST Programming & Informatics Club", "2012", "Coding, hackathons, and study jams."),
mkClub("aust-research-club", "AUST Research Club", "2015", "Research talks and projects."),
];
function mkClub(slug, name, founded, desc) {
return { slug, name, founded, description: desc, avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=111827&color=fff` };
}