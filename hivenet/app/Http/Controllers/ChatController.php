<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;

class ChatController extends Controller
{
    // Fetch messages between current user & other
    public function fetchMessages($user_id)
    {
        $authId = auth()->id();

        $messages = Message::where(function($q) use ($authId, $user_id){
            $q->where('sender_id', $authId)->where('receiver_id', $user_id);
        })->orWhere(function($q) use ($authId, $user_id){
            $q->where('sender_id', $user_id)->where('receiver_id', $authId);
        })->with('sender')->get();

        return response()->json($messages);
    }

    // Send message
    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string|max:500',
        ]);

        $message = Message::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return response()->json($message);
    }
}

