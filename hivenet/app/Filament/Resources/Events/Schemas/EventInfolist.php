<?php

namespace App\Filament\Resources\Events\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class EventInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('club.name')
                    ->label('Club'),
                TextEntry::make('title'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                ImageEntry::make('featured_image_path')
                    ->placeholder('-'),
                TextEntry::make('start_date_time')
                    ->dateTime(),
                TextEntry::make('end_date_time')
                    ->dateTime(),
                TextEntry::make('location'),
                TextEntry::make('event_type')
                    ->badge(),
                TextEntry::make('max_participants')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('registration_deadline')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('price')
                    ->money(),
                IconEntry::make('is_published')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
