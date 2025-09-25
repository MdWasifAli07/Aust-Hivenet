import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import ThreeDMarqueeDemo from "@/Components/ui/3d-marquee-demo";
import api from "@/lib/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        console.log("Fetching events from API...");
        
        const response = await api.get("/events");
        console.log("API Response:", response);
        console.log("Events data:", response.data);
        
        // Handle different response structures
        const eventsData = response.data.events || response.data || [];
        console.log("Processed events:", eventsData);
        
        setEvents(Array.isArray(eventsData) ? eventsData : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Safe date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
    } catch (error) {
      return 'Date error';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Head title="Events" />
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <ThreeDMarqueeDemo />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-white text-lg">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Head title="Events" />
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <ThreeDMarqueeDemo />
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Head title="Events" />

      {/* Hero 3D marquee */}
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <ThreeDMarqueeDemo />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-white tracking-tight sm:text-4xl">
            All Events
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400 mx-auto">
            Discover events hosted by clubs & societies
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Showing {events.length} events
          </p>
        </div>

        {/* Simple Events Grid - without EventCard component */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                {event.title || 'Untitled Event'}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {event.description || 'No description available'}
              </p>
              
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="font-medium">Date:</span>
                  <span className="ml-2">{formatDate(event.start_date_time)}</span>
                </div>
                
                {event.location && (
                  <div className="flex items-center">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{event.location}</span>
                  </div>
                )}
                
                {event.club?.name && (
                  <div className="flex items-center">
                    <span className="font-medium">Club:</span>
                    <span className="ml-2">{event.club.name}</span>
                  </div>
                )}
              </div>
              
              <Link 
                href={`/events/${event.id}`}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="mt-20 text-center text-neutral-400">
            No events available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}