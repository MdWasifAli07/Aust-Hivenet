<?php

namespace App\Filament\Resources\EventParticipations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class EventParticipationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('event.title')
                    ->searchable(),
                TextColumn::make('member.id')
                    ->searchable(),
                TextColumn::make('participant_name')
                    ->searchable(),
                TextColumn::make('participant_email')
                    ->searchable(),
                TextColumn::make('attendance_status')
                    ->badge(),
                TextColumn::make('registration_date')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('payment_status')
                    ->badge(),
                TextColumn::make('payment_amount')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
