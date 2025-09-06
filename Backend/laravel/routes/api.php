<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClubAdminController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

    // User routes (accessible by all authenticated users)
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);

    // Super Admin routes
    Route::middleware(['role:super-admin'])->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
        
        Route::post('/club-admins', [AdminController::class, 'createClubAdmin']);
        Route::get('/club-admins', [AdminController::class, 'getClubAdmins']);
        Route::patch('/users/{user}/status', [AdminController::class, 'updateUserStatus']);
        Route::get('/stats', [AdminController::class, 'getUsersStats']);
    });

    // Club Admin routes
    Route::middleware(['role:club-admin'])->group(function () {
        Route::get('/club/dashboard', [ClubAdminController::class, 'dashboard']);
        Route::get('/club/users', [ClubAdminController::class, 'getUsers']);
        Route::patch('/club/users/{user}/toggle-status', [ClubAdminController::class, 'toggleUserStatus']);
    });

    // User routes (regular users)
    Route::middleware(['role:user'])->group(function () {
        Route::get('/user/dashboard', function () {
            return response()->json(['message' => 'User Dashboard - Welcome!']);
        });
    });
});