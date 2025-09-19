<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Club extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'logo_image_path',
        'banner_image_path',
        'is_active',
        'created_by',
    ];

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }

    public function members(): HasMany
    {
        return $this->hasMany(Member::class);
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function participations()
    {
        return $this->hasManyThrough(EventParticipation::class, Event::class);
    }
}