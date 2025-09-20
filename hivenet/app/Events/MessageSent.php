<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

// class MessageSent
// {
//     use Dispatchable, InteractsWithSockets, SerializesModels;

//     /**
//      * Create a new event instance.
//      */
//     public function __construct()
//     {
//         //
//     }

//     /**
//      * Get the channels the event should broadcast on.
//      *
//      * @return array<int, \Illuminate\Broadcasting\Channel>
//      */
//     public function broadcastOn(): array
//     {
//         return [
//             new PrivateChannel('channel-name'),
//         ];
//     }
// }

// class MessageSent implements ShouldBroadcast
// {
//     use Dispatchable, SerializesModels;

//     public $message;

//     public function __construct(Message $message)
//     {
//         $this->message = $message;
//     }

//     public function broadcastOn()
//     {
//         // Private channel for two-way chat
//         return new Channel('chat.' . $this->message->receiver_id);
//     }

//     public function broadcastAs()
//     {
//         return 'message.sent';
//     }
// }


class MessageSent implements ShouldBroadcast
{
    use SerializesModels;

    public array $message;
    public int $receiverId;

    public function __construct(array $message, int $receiverId)
    {
        $this->message = $message;
        $this->receiverId = $receiverId;
    }

    public function broadcastOn()
    {
        // chat.{userId}
        return new PrivateChannel('chat.' . $this->receiverId);
    }

    // ফ্রন্টএন্ডে .listen('MessageSent') দিয়ে ধরবো
    public function broadcastAs()
    {
        return 'MessageSent';
    }
}