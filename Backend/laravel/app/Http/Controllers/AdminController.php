<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function createClubAdmin(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'is_active' => true
        ]);

        $clubAdminRole = Role::where('slug', 'club-admin')->first();
        $user->roles()->attach($clubAdminRole);

        return response()->json([
            'message' => 'Club admin created successfully',
            'user' => $user->load('roles')
        ], 201);
    }

    public function getClubAdmins()
    {
        $clubAdmins = User::whereHas('roles', function ($query) {
            $query->where('slug', 'club-admin');
        })->with('roles')->get();

        return response()->json($clubAdmins);
    }

    public function updateUserStatus(Request $request, User $user)
    {
        $request->validate([
            'is_active' => 'required|boolean'
        ]);

        $user->update(['is_active' => $request->is_active]);

        return response()->json([
            'message' => 'User status updated successfully',
            'user' => $user->load('roles')
        ]);
    }
}