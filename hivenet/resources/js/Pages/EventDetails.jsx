import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import api from "@/lib/api";

export default function EventDetails() {
    const { props } = usePage();
    const { eventId } = props;
    
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interactionLoading, setInteractionLoading] = useState(false);

    useEffect(() => {
        if (eventId) {
            fetchEvent();
        } else {
            setError('Event ID not provided');
            setLoading(false);
        }
    }, [eventId]);

    const fetchEvent = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/events/${eventId}`);
            
            const eventData = response.data.event || response.data;
            
            if (!eventData) {
                throw new Error('Event data not found in response');
            }
            
            setEvent(eventData);
        } catch (err) {
            console.error("Error fetching event details:", err);
            
            if (err.response?.status === 404) {
                setError("Event not found. Please check if the event exists.");
            } else {
                setError("Failed to load event details.");
            }
            
            setEvent(null);
        } finally {
            setLoading(false);
        }
    };

    const handleInteraction = async (action) => {
        try {
            setInteractionLoading(true);
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                alert('Please log in to interact with events');
                router.visit('/login');
                return;
            }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            let response;
            let message = '';
            
            switch (action) {
                case 'toggleGoing':
                    response = await api.post(`/events/${eventId}/toggle-going`, {}, config);
                    message = response.data.user_is_going 
                        ? 'Added to your events!' 
                        : 'Removed from your events';
                    break;
                case 'toggleFavourite':
                    response = await api.post(`/events/${eventId}/toggle-favourite`, {}, config);
                    message = response.data.user_is_favourite 
                        ? 'Added to favourites!' 
                        : 'Removed from favourites';
                    break;
                default:
                    return;
            }

            // Show success message
            if (message) {
                // You can add a toast notification here instead of alert
                alert(message);
            }

            // Update the event state with new interaction status
            setEvent(prev => ({
                ...prev,
                user_is_going: response.data.user_is_going,
                user_is_favourite: response.data.user_is_favourite
            }));

        } catch (err) {
            console.error('Error updating interaction:', err);
            if (err.response?.status === 401) {
                alert('Please log in again');
                router.visit('/login');
            } else {
                alert('Error updating interaction. Please try again.');
            }
        } finally {
            setInteractionLoading(false);
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'Date not available';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Date error';
        }
    };

    const isUpcoming = (dateString) => {
        if (!dateString) return false;
        try {
            return new Date(dateString) > new Date();
        } catch {
            return false;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Head title="Loading Event..." />
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-white text-lg">Loading event details...</div>
                </div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Head title="Event Not Found" />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-900/20 border border-red-700 text-red-400 px-6 py-8 rounded-lg max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
                        <p className="mb-6">{error || 'The event you\'re looking for doesn\'t exist.'}</p>
                        <Link 
                            href="/events" 
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Back to Events
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Head title={event.title} />

            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        href="/events" 
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Events
                    </Link>
                </div>

                {/* Event Content */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                    {event.image_url && (
                        <img 
                            src={event.image_url} 
                            alt={event.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    )}
                    
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {event.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className={`px-3 py-1 text-sm rounded-full ${
                                        isUpcoming(event.start_date_time) 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-600 text-white'
                                    }`}>
                                        {isUpcoming(event.start_date_time) ? 'Upcoming' : 'Past Event'}
                                    </span>
                                    
                                    {event.user_is_going && (
                                        <span className="bg-green-500 text-white px-3 py-1 text-sm rounded-full">
                                            You're Going ✓
                                        </span>
                                    )}
                                    {event.user_is_favourite && (
                                        <span className="bg-yellow-500 text-white px-3 py-1 text-sm rounded-full">
                                            Favourited ★
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            {/* Interaction Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                                <button
                                    onClick={() => handleInteraction('toggleGoing')}
                                    disabled={interactionLoading}
                                    className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                                        event.user_is_going
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{event.user_is_going ? 'Going' : 'Mark Going'}</span>
                                </button>
                                
                                <button
                                    onClick={() => handleInteraction('toggleFavourite')}
                                    disabled={interactionLoading}
                                    className={`px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all ${
                                        event.user_is_favourite
                                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>{event.user_is_favourite ? 'Favourited' : 'Add to Favourites'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Event Details Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-gray-700/50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4">Event Description</h2>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {event.description || 'No description available for this event.'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-700/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Event Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <div>
                                                <div className="text-sm text-gray-400">Date & Time</div>
                                                <div className="text-white">{formatDateTime(event.start_date_time)}</div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <div>
                                                <div className="text-sm text-gray-400">Location</div>
                                                <div className="text-white">{event.location || 'Location not specified'}</div>
                                            </div>
                                        </div>
                                        
                                        {event.club && (
                                            <div className="flex items-start">
                                                <svg className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <div>
                                                    <div className="text-sm text-gray-400">Hosted by</div>
                                                    <div className="text-white">{event.club.name}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Participants Section */}
                                {event.participations && event.participations.length > 0 && (
                                    <div className="bg-gray-700/50 rounded-lg p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">
                                            Participants ({event.participations.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {event.participations.slice(0, 10).map((participation, index) => (
                                                <span key={participation.id || index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                                    {participation.user?.name || 'Anonymous'}
                                                </span>
                                            ))}
                                            {event.participations.length > 10 && (
                                                <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                                                    +{event.participations.length - 10} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}