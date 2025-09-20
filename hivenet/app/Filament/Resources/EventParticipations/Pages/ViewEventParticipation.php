<?php

namespace App\Filament\Resources\EventParticipations\Pages;

use App\Filament\Resources\EventParticipations\EventParticipationResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewEventParticipation extends ViewRecord
{
    protected static string $resource = EventParticipationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
