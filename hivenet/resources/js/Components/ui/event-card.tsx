// Components/ui/event-card.tsx - Safe version
import React from 'react';

// Safe date validation
const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Safe getStatus function
export const getStatus = (startAt: string, endAt: string): string => {
  if (!isValidDate(startAt) || !isValidDate(endAt)) {
    return 'Date Error';
  }

  const now = new Date();
  const start = new Date(startAt);
  const end = new Date(endAt);

  if (now < start) return 'upcoming';
  if (now > end) return 'ended';
  return 'ongoing';
};

// Safe date formatting
const formatDate = (dateString: string): string => {
  if (!isValidDate(dateString)) return 'Invalid Date';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

interface EventCardProps {
  ev: {
    id: number;
    title?: string;
    description?: string;
    start_at?: string;
    end_at?: string;
    start_date_time?: string;
    location?: string;
    club?: {
      name?: string;
    };
    image_url?: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ ev }) => {
  // Use start_date_time if available, otherwise start_at
  const startDate = ev.start_date_time || ev.start_at;
  const endDate = ev.end_at;
  
  const status = getStatus(startDate || '', endDate || '');

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      {ev.image_url && (
        <img 
          src={ev.image_url} 
          alt={ev.title || 'Event image'}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {ev.title || 'Untitled Event'}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {ev.description || 'No description available'}
      </p>
      
      <div className="space-y-2 text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <span className="font-medium">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
            status === 'upcoming' ? 'bg-green-500 text-white' :
            status === 'ongoing' ? 'bg-blue-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {status.toUpperCase()}
          </span>
        </div>
        
        {startDate && (
          <div className="flex items-center">
            <span className="font-medium">Starts:</span>
            <span className="ml-2">{formatDate(startDate)}</span>
          </div>
        )}
        
        {ev.location && (
          <div className="flex items-center">
            <span className="font-medium">Location:</span>
            <span className="ml-2">{ev.location}</span>
          </div>
        )}
        
        {ev.club?.name && (
          <div className="flex items-center">
            <span className="font-medium">Club:</span>
            <span className="ml-2">{ev.club.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;