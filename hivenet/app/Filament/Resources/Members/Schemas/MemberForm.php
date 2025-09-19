<?php

namespace App\Filament\Resources\Members\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class MemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                Select::make('club_id')
                    ->relationship('club', 'name')
                    ->required(),
                TextInput::make('member_name')
                    ->required(),
                TextInput::make('member_email')
                    ->email()
                    ->required(),
                Select::make('membership_status')
                    ->options([
            'pending' => 'Pending',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            'banned' => 'Banned',
        ])
                    ->default('pending')
                    ->required(),
                DateTimePicker::make('joined_at'),
            ]);
    }
}
