<?php

use App\Http\Controllers\ProfileController;
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

// App pages (auth + verified)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Events list + details
    Route::get('/events', fn() => Inertia::render('Events'))->name('events.index');
    Route::get('/events/{id}', fn(string $id) => Inertia::render('EventDetails', [
        'eventId' => $id,
    ]))->name('events.show');

    // Favourites (♥)
    Route::get('/favorites', fn() => Inertia::render('Favourites'))->name('favorites.index');

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
