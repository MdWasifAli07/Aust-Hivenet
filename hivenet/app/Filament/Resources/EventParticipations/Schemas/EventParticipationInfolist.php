<?php

namespace App\Filament\Resources\EventParticipations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class EventParticipationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('event.title')
                    ->label('Event'),
                TextEntry::make('member.id')
                    ->label('Member'),
                TextEntry::make('participant_name'),
                TextEntry::make('participant_email'),
                TextEntry::make('attendance_status')
                    ->badge(),
                TextEntry::make('registration_date')
                    ->dateTime(),
                TextEntry::make('payment_status')
                    ->badge(),
                TextEntry::make('payment_amount')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('notes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
