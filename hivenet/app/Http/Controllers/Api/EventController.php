<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with(['club', 'participations'])
                     ->where('is_published', true)
                     ->orderBy('start_date_time');

        // Filter by club if provided
        if ($request->has('club_id')) {
            $query->where('club_id', $request->club_id);
        }

        // Filter upcoming events
        if ($request->has('upcoming') && $request->upcoming) {
            $query->where('start_date_time', '>', now());
        }

        $events = $query->get();

        // Add user interaction status if authenticated
        if (Auth::check()) {
            $userInteractions = Auth::user()->eventInteractions()
                ->whereIn('event_id', $events->pluck('id'))
                ->get()
                ->keyBy('event_id');

            $events->each(function ($event) use ($userInteractions) {
                $interaction = $userInteractions->get($event->id);
                $event->user_is_going = $interaction && $interaction->interaction_type === 'going';
                $event->user_is_favourite = $interaction && $interaction->interaction_type === 'favourite';
            });
        }

        return response()->json([
            'events' => $events
        ]);
    }

    public function show(Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $event->load(['club', 'participations']);

        // Add user interaction status if authenticated
        if (Auth::check()) {
            $userInteraction = Auth::user()->eventInteractions()
                ->where('event_id', $event->id)
                ->first();
            
            $event->user_is_going = $userInteraction && $userInteraction->interaction_type === 'going';
            $event->user_is_favourite = $userInteraction && $userInteraction->interaction_type === 'favourite';
        }

        return response()->json([
            'event' => $event
        ]);
    }
} 