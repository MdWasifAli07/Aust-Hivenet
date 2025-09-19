<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'club_id',
        'title',
        'description',
        'featured_image_path',
        'start_date_time',
        'end_date_time',
        'location',
        'event_type',
        'max_participants',
        'registration_deadline',
        'price',
        'is_published',
    ];

    protected $casts = [
        'start_date_time' => 'datetime',
        'end_date_time' => 'datetime',
        'registration_deadline' => 'datetime',
        'price' => 'decimal:2',
        'is_published' => 'boolean',
    ];

    public function club(): BelongsTo
    {
        return $this->belongsTo(Club::class);
    }

    public function participations(): HasMany
    {
        return $this->hasMany(EventParticipation::class);
    }

    public function getAvailableSpacesAttribute()
    {
        if (is_null($this->max_participants)) {
            return null; // Unlimited
        }
        
        return $this->max_participants - $this->participations()->count();
    }

    public function getIsRegistrationOpenAttribute()
    {
        if (is_null($this->registration_deadline)) {
            return true;
        }
        
        return now()->lte($this->registration_deadline);
    }
}