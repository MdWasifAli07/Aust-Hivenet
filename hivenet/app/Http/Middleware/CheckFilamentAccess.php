<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\RoleEnum;

class CheckFilamentAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Allow access only to admin and club_admin roles
        if ($user && ($user->hasRole(RoleEnum::ADMIN->value) || $user->hasRole(RoleEnum::CLUB_ADMIN->value))) {
            return $next($request);
        }
        
        // Redirect regular users to dashboard with error message
        if ($user) {
            return redirect('/dashboard')->with('error', 'Access denied. Admin privileges required.');
        }
        
        // For non-authenticated users, redirect to login
        return redirect('/login');
    }
}