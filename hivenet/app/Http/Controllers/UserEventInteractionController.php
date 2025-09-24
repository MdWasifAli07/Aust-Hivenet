<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Models\UserEventInteraction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserEventInteractionController extends Controller
{
    public function markGoing(Request $request, Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $interaction = UserEventInteraction::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'event_id' => $event->id,
                'interaction_type' => 'going',
            ]
        );

        return response()->json([
            'message' => 'You are going to this event!',
            'interaction' => $interaction,
            'user_is_going' => true,
            'user_is_favourite' => $this->hasFavourite($event->id)
        ]);
    }

    public function markFavourite(Request $request, Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $interaction = UserEventInteraction::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'event_id' => $event->id,
                'interaction_type' => 'favourite',
            ]
        );

        return response()->json([
            'message' => 'Event added to favourites!',
            'interaction' => $interaction,
            'user_is_going' => $this->hasGoing($event->id),
            'user_is_favourite' => true
        ]);
    }

    public function removeGoing(Request $request, Event $event)
    {
        UserEventInteraction::where('user_id', Auth::id())
                           ->where('event_id', $event->id)
                           ->where('interaction_type', 'going')
                           ->delete();

        return response()->json([
            'message' => 'Removed from going list',
            'user_is_going' => false,
            'user_is_favourite' => $this->hasFavourite($event->id)
        ]);
    }

    public function removeFavourite(Request $request, Event $event)
    {
        UserEventInteraction::where('user_id', Auth::id())
                           ->where('event_id', $event->id)
                           ->where('interaction_type', 'favourite')
                           ->delete();

        return response()->json([
            'message' => 'Removed from favourites',
            'user_is_going' => $this->hasGoing($event->id),
            'user_is_favourite' => false
        ]);
    }

    public function toggleGoing(Request $request, Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $existing = UserEventInteraction::where('user_id', Auth::id())
                                      ->where('event_id', $event->id)
                                      ->where('interaction_type', 'going')
                                      ->first();

        if ($existing) {
            $existing->delete();
            $userIsGoing = false;
            $message = 'Removed from going list';
        } else {
            UserEventInteraction::create([
                'user_id' => Auth::id(),
                'event_id' => $event->id,
                'interaction_type' => 'going',
            ]);
            $userIsGoing = true;
            $message = 'You are going to this event!';
        }

        return response()->json([
            'message' => $message,
            'user_is_going' => $userIsGoing,
            'user_is_favourite' => $this->hasFavourite($event->id)
        ]);
    }

    public function toggleFavourite(Request $request, Event $event)
    {
        if (!$event->is_published) {
            return response()->json(['message' => 'Event not found'], 404);
        }

        $existing = UserEventInteraction::where('user_id', Auth::id())
                                      ->where('event_id', $event->id)
                                      ->where('interaction_type', 'favourite')
                                      ->first();

        if ($existing) {
            $existing->delete();
            $userIsFavourite = false;
            $message = 'Removed from favourites';
        } else {
            UserEventInteraction::create([
                'user_id' => Auth::id(),
                'event_id' => $event->id,
                'interaction_type' => 'favourite',
            ]);
            $userIsFavourite = true;
            $message = 'Event added to favourites!';
        }

        return response()->json([
            'message' => $message,
            'user_is_going' => $this->hasGoing($event->id),
            'user_is_favourite' => $userIsFavourite
        ]);
    }

    public function userInteractions(Request $request)
    {
        $type = $request->get('type', 'all'); // all, going, favourite

        $query = UserEventInteraction::with(['event.club'])
                                   ->where('user_id', Auth::id());

        if ($type === 'going') {
            $query->where('interaction_type', 'going');
        } elseif ($type === 'favourite') {
            $query->where('interaction_type', 'favourite');
        }

        $interactions = $query->get();

        return response()->json([
            'interactions' => $interactions
        ]);
    }

    private function hasGoing($eventId)
    {
        return UserEventInteraction::where('user_id', Auth::id())
                                 ->where('event_id', $eventId)
                                 ->where('interaction_type', 'going')
                                 ->exists();
    }

    private function hasFavourite($eventId)
    {
        return UserEventInteraction::where('user_id', Auth::id())
                                 ->where('event_id', $eventId)
                                 ->where('interaction_type', 'favourite')
                                 ->exists();
    }
}