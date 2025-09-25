<?php

use App\Http\Controllers\Api\ClubController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\UserEventInteractionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes
Route::get('/clubs', [ClubController::class, 'index']);
Route::get('/clubs/{club}', [ClubController::class, 'show']);
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/events/{event}/going', [UserEventInteractionController::class, 'markGoing']);
    Route::post('/events/{event}/favourite', [UserEventInteractionController::class, 'markFavourite']);
    Route::delete('/events/{event}/going', [UserEventInteractionController::class, 'removeGoing']);
    Route::delete('/events/{event}/favourite', [UserEventInteractionController::class, 'removeFavourite']);
    Route::post('/events/{event}/toggle-going', [UserEventInteractionController::class, 'toggleGoing']);
    Route::post('/events/{event}/toggle-favourite', [UserEventInteractionController::class, 'toggleFavourite']);
    Route::get('/user/interactions', [UserEventInteractionController::class, 'userInteractions']);
});