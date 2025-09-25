<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController; // Add this import
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public pages
Route::get('/aboutus', function () {
    return Inertia::render('AboutUs');
})->name('aboutus');

// Make events publicly accessible (remove auth middleware)
Route::get('/events', function () {
    return Inertia::render('Events');
})->name('events.index');

Route::get('/events/{id}', function ($id) {
    // Fetch the event data from your backend API
    $event = null;
    $error = null;
    
    try {
        // You can fetch the event data here or let the frontend handle it
        // For now, we'll just pass the ID and let frontend fetch
    } catch (\Exception $e) {
        $error = 'Event not found';
    }
    
    return Inertia::render('EventDetails', [
        'eventId' => $id,
        'event' => $event, // This will be null, frontend will fetch
        'error' => $error
    ]);
})->name('events.show');

// App pages (auth + verified) - keep these protected
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Favourites (♥)
    Route::get('/favorites', fn() => Inertia::render('Favourites'))->name('favorites.index');
Route::get('/going', function () {
    return Inertia::render('Going');
})->name('going.index');
    // My Clubs + Club details
    Route::get('/my-clubs', fn() => Inertia::render('MyClubs'))->name('clubs.mine');
    Route::get('/clubs/{slug}', fn(string $slug) => Inertia::render('ClubDetails', [
        'slug' => $slug,
    ]))->name('clubs.show');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';