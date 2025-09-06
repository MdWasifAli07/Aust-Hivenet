<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Authentication Routes (defined in auth.php)
require __DIR__.'/auth.php';

// Protected Routes for all authenticated users
Route::middleware(['auth', 'verified'])->group(function () {

    // The main dashboard route - redirects based on role
    Route::get('/dashboard', function () {
        $user = auth()->user();

        if ($user->hasRole('super-admin')) {
            return redirect()->route('super.admin.dashboard');
        } elseif ($user->hasRole('club-admin')) {
            return redirect()->route('club.admin.dashboard');
        } elseif ($user->hasRole('user')) {
            return redirect()->route('user.dashboard');
        }
        // Fallback
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Super Admin Routes

Route::middleware(['role:super-admin'])->group(function () {
    Route::get('/super-admin/dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard', [
            'mustVerifyEmail' => config('auth.must_verify_email'),
            'status' => session('status'),
        ]);
    })->name('super.admin.dashboard');

    // Routes for managing club admins
    Route::get('/super-admin/create', [SuperAdminController::class, 'createClubAdmin'])->name('super.admin.create');
    Route::post('/super-admin/store', [SuperAdminController::class, 'storeClubAdmin'])->name('super.admin.store');
    
    // Additional routes
    Route::get('/user-management', function () {
        return Inertia::render('SuperAdmin/UserManagement');
    })->name('user.management');
});


    
    // Club Admin Routes
    Route::middleware(['role:club-admin'])->group(function () {
        Route::get('/club-admin/dashboard', function () {
            return Inertia::render('ClubAdmin/Dashboard');
        })->name('club.admin.dashboard');
    });

    // User Routes
    Route::middleware(['role:user'])->group(function () {
        Route::get('/user/dashboard', function () {
            return Inertia::render('User/Dashboard');
        })->name('user.dashboard');
    });

    // Profile Routes (accessible to all roles)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});