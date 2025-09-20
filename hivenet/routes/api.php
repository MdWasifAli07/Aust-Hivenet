// routes/api.php

use App\Http\Controllers\AdminInboxController;

Route::get('/users', [AdminInboxController::class, 'getUsers']);



