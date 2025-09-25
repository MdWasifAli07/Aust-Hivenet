<?php

namespace App\Http\Controllers\Api;

use App\Models\Club;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ClubController extends Controller
{
    public function index()
    {
        $clubs = Club::with(['events' => function($query) {
            $query->where('is_published', true)
                  ->where('start_date_time', '>', now())
                  ->orderBy('start_date_time');
        }])
        ->where('is_active', true)
        ->get();

        return response()->json([
            'clubs' => $clubs
        ]);
    }

    public function show(Club $club)
    {
        if (!$club->is_active) {
            return response()->json(['message' => 'Club not found'], 404);
        }

        $club->load(['events' => function($query) {
            $query->where('is_published', true)
                  ->orderBy('start_date_time');
        }]);

        return response()->json([
            'club' => $club
        ]);
    }
}