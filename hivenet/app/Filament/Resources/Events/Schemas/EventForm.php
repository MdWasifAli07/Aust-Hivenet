<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class EventForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('club_id')
                    ->relationship('club', 'name')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('featured_image_path')
                    ->image(),
                DateTimePicker::make('start_date_time')
                    ->required(),
                DateTimePicker::make('end_date_time')
                    ->required(),
                TextInput::make('location')
                    ->required(),
                Select::make('event_type')
                    ->options(['physical' => 'Physical', 'online' => 'Online'])
                    ->required(),
                TextInput::make('max_participants')
                    ->numeric(),
                DateTimePicker::make('registration_deadline'),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->default(0.0)
                    ->prefix('$'),
                Toggle::make('is_published')
                    ->required(),
            ]);
    }
}
