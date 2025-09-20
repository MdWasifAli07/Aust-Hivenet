
// app/Http/Controllers/AdminInboxController.php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminInboxController extends Controller
{
    public function getUsers()
    {
        // সব ইউজারকে ফেচ করা
        $users = User::all();

        // JSON আকারে রিটার্ন করা
        return response()->json($users);
    }
}
