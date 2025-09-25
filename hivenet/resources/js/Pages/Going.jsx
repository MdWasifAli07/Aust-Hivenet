import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import api from "@/lib/api";
import EventCard from "@/Components/ui/event-card";

export default function Going() {
    const [goingEvents, setGoingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGoingEvents();
    }, []);

    const fetchGoingEvents = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                setError('Please log in to view your events');
                setLoading(false);
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await api.get('/user/interactions?type=going', config);
            const interactions = response.data.interactions || [];
            
            // Extract events from interactions
            const events = interactions.map(interaction => ({
                ...interaction.event,
                user_is_going: true // Mark as going
            }));
            
            setGoingEvents(events);
            setError(null);
        } catch (err) {
            console.error("Error fetching going events:", err);
            if (err.response?.status === 401) {
                setError('Please log in to view your events');
            } else {
                setError('Failed to load your events');
            }
        } finally {
            setLoading(false);
        }
    };

    const removeFromGoing = async (eventId) => {
        try {
            const token = localStorage.getItem('auth_token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await api.post(`/events/${eventId}/toggle-going`, {}, config);
            
            // Remove from local state
            setGoingEvents(prev => prev.filter(event => event.id !== eventId));
            
        } catch (err) {
            console.error('Error removing from going events:', err);
            alert('Error removing from events');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Head title="Events I'm Going To" />
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-white text-lg">Loading your events...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Head title="Events I'm Going To" />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/events" 
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Events
                    </Link>
                    
                    <h1 className="text-3xl font-semibold text-white">Events I'm Going To</h1>
                    <p className="text-neutral-400 mt-2">
                        Events you've marked as "Going"
                    </p>
                </div>

                {error ? (
                    <div className="bg-red-900/20 border border-red-700 text-red-400 px-6 py-8 rounded-lg text-center">
                        <p className="mb-4">{error}</p>
                        <Link 
                            href="/login" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Log In
                        </Link>
                    </div>
                ) : goingEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-neutral-400 text-lg mb-4">
                            No events yet
                        </div>
                        <p className="text-neutral-500 mb-6">
                            Start marking events you're going to by clicking the "Going" button on any event.
                        </p>
                        <Link 
                            href="/events" 
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                        >
                            Browse Events
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-neutral-400">
                            {goingEvents.length} {goingEvents.length === 1 ? 'event' : 'events'} you're attending
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {goingEvents.map((event) => (
                                <div key={event.id} className="relative">
                                    <Link href={`/events/${event.id}`}>
                                        <EventCard ev={event} />
                                    </Link>
                                    <button
                                        onClick={() => removeFromGoing(event.id)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="Remove from events"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}