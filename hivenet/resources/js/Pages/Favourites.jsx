import React, { useEffect, useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import EventCard from "@/Components/ui/event-card";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { getInterested, toggleInterested } from "@/lib/interested";

export default function Favourites() {
  const [items, setItems] = useState([]);
  const [ints, setInts] = useState([]);

  useEffect(() => {
    setItems(getFavorites());
    setInts(getInterested());
  }, []);

  // ✅ derive sets from state for instant button feedback
  const favSet = useMemo(() => new Set(items.map((e) => String(e.id))), [items]);
  const intSet = useMemo(() => new Set(ints.map((e) => String(e.id))), [ints]);

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold text-white">Favourites</h2>}>
      <Head title="Favourites" />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="text-sm text-neutral-400">
            No favourites yet. Mark events with the ♥ button to see them here.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((ev) => (
              <EventCard
                key={ev.id}
                ev={ev}
                onToggleFavourite={(e) => setItems(toggleFavorite(e))}
                onToggleInterested={(e) => setInts(toggleInterested(e))}
                isFavourite={favSet.has(String(ev.id))}
                isInterested={intSet.has(String(ev.id))}
              />
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
