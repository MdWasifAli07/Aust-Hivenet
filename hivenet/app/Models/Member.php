<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'club_id',
        'member_name',
        'member_email',
        'membership_status',
        'joined_at',
    ];

    protected $casts = [
        'joined_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function participations(): HasMany
    {
        return $this->hasMany(EventParticipation::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('membership_status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('membership_status', 'pending');
    }

    public function approve()
    {
        $this->update([
            'membership_status' => 'approved',
            'joined_at' => now(),
        ]);
    }

    public function reject()
    {
        $this->update(['membership_status' => 'rejected']);
    }
}