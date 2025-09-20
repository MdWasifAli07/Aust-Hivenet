namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'receiver_id' => 'required|integer',
            'message' => 'required|string',
        ]);

        $msg = [
            'id' => now()->timestamp,
            'sender_id' => auth()->id(),
            'receiver_id' => (int)$data['receiver_id'],
            'body' => $data['message'],
            'created_at' => now()->toDateTimeString(),
        ];

        // Message Model create(...)
        broadcast(new MessageSent($msg, (int)$data['receiver_id']))->toOthers();

        return response()->json(['ok' => true, 'message' => $msg]);
    }
}
