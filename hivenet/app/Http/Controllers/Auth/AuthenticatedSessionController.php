<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Enums\RoleEnum;
use Illuminate\Http\Response as HttpResponse; // alias to avoid conflict

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response|RedirectResponse|HttpResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        // Role-based redirect using Inertia::location
        if ($user->hasRole(RoleEnum::ADMIN->value) || $user->hasRole(RoleEnum::CLUB_ADMIN->value)) {
            return Inertia::location(url('/admin')); // Full redirect to Filament
        }

        // Default redirect for regular users
        return Inertia::location(route('dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
