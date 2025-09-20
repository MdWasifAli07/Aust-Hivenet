<?php

namespace App\Filament\Resources\EventParticipations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class EventParticipationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('event_id')
                    ->relationship('event', 'title')
                    ->required(),
                Select::make('member_id')
                    ->relationship('member', 'id')
                    ->required(),
                TextInput::make('participant_name')
                    ->required(),
                TextInput::make('participant_email')
                    ->email()
                    ->required(),
                Select::make('attendance_status')
                    ->options([
            'registered' => 'Registered',
            'attended' => 'Attended',
            'cancelled' => 'Cancelled',
            'no_show' => 'No show',
        ])
                    ->default('registered')
                    ->required(),
                DateTimePicker::make('registration_date')
                    ->required(),
                Select::make('payment_status')
                    ->options([
            'pending' => 'Pending',
            'completed' => 'Completed',
            'failed' => 'Failed',
            'refunded' => 'Refunded',
        ])
                    ->default('pending')
                    ->required(),
                TextInput::make('payment_amount')
                    ->numeric(),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}
