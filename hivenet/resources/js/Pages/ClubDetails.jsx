import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import api from "@/lib/api";

export default function ClubDetails() {
    const { props } = usePage();
    const { clubId } = props;
    
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'about'

    useEffect(() => {
        if (clubId) {
            fetchClub();
        } else {
            setError('Club ID not provided');
            setLoading(false);
        }
    }, [clubId]);

    const fetchClub = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/clubs/${clubId}`);
            
            const clubData = response.data.club || response.data;
            
            if (!clubData) {
                throw new Error('Club data not found in response');
            }
            
            setClub(clubData);
        } catch (err) {
            console.error("Error fetching club details:", err);
            
            if (err.response?.status === 404) {
                setError("Club not found. Please check if the club exists.");
            } else {
                setError("Failed to load club details.");
            }
            
            setClub(null);
        } finally {
            setLoading(false);
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

    const getUpcomingEvents = () => {
        if (!club?.events) return [];
        return club.events.filter(event => isUpcoming(event.start_date_time));
    };

    const getPastEvents = () => {
        if (!club?.events) return [];
        return club.events.filter(event => !isUpcoming(event.start_date_time));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Head title="Loading Club..." />
                <div className="flex justify-center items-center min-h-64">
                    <div className="text-white text-lg">Loading club details...</div>
                </div>
            </div>
        );
    }

    if (error || !club) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Head title="Club Not Found" />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-900/20 border border-red-700 text-red-400 px-6 py-8 rounded-lg max-w-2xl mx-auto text-center">
                        <h2 className="text-2xl font-bold mb-4">Club Not Found</h2>
                        <p className="mb-6">{error || 'The club you\'re looking for doesn\'t exist.'}</p>
                        <Link 
                            href="/clubs" 
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Back to Clubs
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Head title={club.name} />

            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link 
                        href="/clubs" 
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Clubs
                    </Link>
                </div>

                {/* Club Header */}
                <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            {/* Club Logo */}
                            {club.logo_url && (
                                <img 
                                    src={club.logo_url} 
                                    alt={club.name}
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0"
                                />
                            )}
                            
                            {/* Club Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                            {club.name}
                                        </h1>
                                        {club.category && (
                                            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                                {club.category}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Club Stats */}
                                    <div className="flex gap-6 mt-4 md:mt-0">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">{getUpcomingEvents().length}</div>
                                            <div className="text-gray-400 text-sm">Upcoming Events</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">{getPastEvents().length}</div>
                                            <div className="text-gray-400 text-sm">Past Events</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-white">{club.member_count || 0}</div>
                                            <div className="text-gray-400 text-sm">Members</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {club.description || 'No description available for this club.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-700">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'upcoming'
                                        ? 'border-blue-500 text-blue-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                Upcoming Events ({getUpcomingEvents().length})
                            </button>
                            <button
                                onClick={() => setActiveTab('past')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'past'
                                        ? 'border-blue-500 text-blue-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                Past Events ({getPastEvents().length})
                            </button>
                            <button
                                onClick={() => setActiveTab('about')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'about'
                                        ? 'border-blue-500 text-blue-400'
                                        : 'border-transparent text-gray-400 hover:text-gray-300'
                                }`}
                            >
                                About Club
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6">
                    {activeTab === 'upcoming' && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
                            {getUpcomingEvents().length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getUpcomingEvents().map((event) => (
                                        <div key={event.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                                            <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                                {event.description || 'No description available'}
                                            </p>
                                            <div className="text-gray-400 text-xs mb-3">
                                                {formatDateTime(event.start_date_time)}
                                            </div>
                                            <Link 
                                                href={`/events/${event.id}`}
                                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                            >
                                                View Event Details →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400">No upcoming events scheduled.</div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'past' && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">Past Events</h2>
                            {getPastEvents().length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {getPastEvents().map((event) => (
                                        <div key={event.id} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                                            <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                                {event.description || 'No description available'}
                                            </p>
                                            <div className="text-gray-400 text-xs mb-3">
                                                {formatDateTime(event.start_date_time)}
                                            </div>
                                            <Link 
                                                href={`/events/${event.id}`}
                                                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                            >
                                                View Event Details →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-400">No past events found.</div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-6">About {club.name}</h2>
                            <div className="space-y-6">
                                <div className="bg-gray-700/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Club Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-400">Category</div>
                                            <div className="text-white">{club.category || 'Not specified'}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400">Status</div>
                                            <div className="text-green-400">Active</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400">Total Events</div>
                                            <div className="text-white">{(club.events?.length || 0)} events</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-400">Member Count</div>
                                            <div className="text-white">{club.member_count || 'Not specified'}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-700/50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {club.description || 'No detailed description available for this club.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}