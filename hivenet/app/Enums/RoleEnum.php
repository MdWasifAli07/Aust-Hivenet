<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case CLUB_ADMIN = 'club_admin';
    case USER = 'user';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return [
            self::ADMIN->value => 'Administrator',
            self::CLUB_ADMIN->value => 'Club Administrator',
            self::USER->value => 'User',
        ];
    }

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrator',
            self::CLUB_ADMIN => 'Club Administrator',
            self::USER => 'User',
        };
    }
}