<?php

namespace App\Filament\Resources\EventParticipations\Pages;

use App\Filament\Resources\EventParticipations\EventParticipationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListEventParticipations extends ListRecords
{
    protected static string $resource = EventParticipationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
