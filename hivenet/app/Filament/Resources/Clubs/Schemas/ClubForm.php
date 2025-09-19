<?php

namespace App\Filament\Resources\Clubs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ClubForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                FileUpload::make('logo_image_path')
                    ->image(),
                FileUpload::make('banner_image_path')
                    ->image(),
                Toggle::make('is_active')
                    ->required(),
                TextInput::make('created_by')
                    ->required()
                    ->numeric(),
            ]);
    }
}
