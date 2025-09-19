<?php

namespace App\Filament\Resources\EventParticipations;

use App\Filament\Resources\EventParticipations\Pages\CreateEventParticipation;
use App\Filament\Resources\EventParticipations\Pages\EditEventParticipation;
use App\Filament\Resources\EventParticipations\Pages\ListEventParticipations;
use App\Filament\Resources\EventParticipations\Pages\ViewEventParticipation;
use App\Filament\Resources\EventParticipations\Schemas\EventParticipationForm;
use App\Filament\Resources\EventParticipations\Schemas\EventParticipationInfolist;
use App\Filament\Resources\EventParticipations\Tables\EventParticipationsTable;
use App\Models\EventParticipation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use BezhanSalleh\FilamentShield\Contracts\HasShieldPermissions;

class EventParticipationResource extends Resource implements HasShieldPermissions
{   
     public static function getPermissionPrefixes(): array
    {
        return [
            'view',
            'view_any',
            'create',
            'update',
            'delete',
            'delete_any',
        ];
    }
    
    
    protected static ?string $model = EventParticipation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'participant_name';

    public static function form(Schema $schema): Schema
    {
        return EventParticipationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return EventParticipationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EventParticipationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEventParticipations::route('/'),
            'create' => CreateEventParticipation::route('/create'),
            'view' => ViewEventParticipation::route('/{record}'),
            'edit' => EditEventParticipation::route('/{record}/edit'),
        ];
    }
}
