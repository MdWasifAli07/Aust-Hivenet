<?php

namespace App\Filament\Resources\EventParticipations\Pages;

use App\Filament\Resources\EventParticipations\EventParticipationResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditEventParticipation extends EditRecord
{
    protected static string $resource = EventParticipationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
