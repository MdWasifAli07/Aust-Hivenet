<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserEventInteraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'event_id',
        'interaction_type', // 'going', 'favourite'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function scopeGoing($query)
    {
        return $query->where('interaction_type', 'going');
    }

    public function scopeFavourite($query)
    {
        return $query->where('interaction_type', 'favourite');
    }

    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}