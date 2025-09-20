<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EventParticipation extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id',
        'member_id',
        'participant_name',
        'participant_email',
        'attendance_status',
        'registration_date',
        'payment_status',
        'payment_amount',
        'notes',
    ];

    protected $casts = [
        'registration_date' => 'datetime',
        'payment_amount' => 'decimal:2',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function markAsAttended()
    {
        $this->update(['attendance_status' => 'attended']);
    }

    public function cancel()
    {
        $this->update(['attendance_status' => 'cancelled']);
    }

    public function markPaymentComplete()
    {
        $this->update([
            'payment_status' => 'completed',
            'payment_amount' => $this->payment_amount ?? $this->event->price,
        ]);
    }
}