<?php

namespace App\Enums;

enum PermissionEnum: string
{
    // User permissions
    case VIEW_USERS = 'view users';
    case CREATE_USERS = 'create users';
    case EDIT_USERS = 'edit users';
    case DELETE_USERS = 'delete users';
    
    // Club permissions
    case VIEW_CLUBS = 'view clubs';
    case CREATE_CLUBS = 'create clubs';
    case EDIT_CLUBS = 'edit clubs';
    case DELETE_CLUBS = 'delete clubs';
    
    // Event permissions
    case VIEW_EVENTS = 'view events';
    case CREATE_EVENTS = 'create events';
    case EDIT_EVENTS = 'edit events';
    case DELETE_EVENTS = 'delete events';
    
    // Role permissions
    case VIEW_ROLES = 'view roles';
    case CREATE_ROLES = 'create roles';
    case EDIT_ROLES = 'edit roles';
    case DELETE_ROLES = 'delete roles';
    
    // Admin permissions
    case ACCESS_ADMIN_PANEL = 'access admin panel';
    case ACCESS_CLUB_PANEL = 'access club panel';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return [
            self::VIEW_USERS->value => 'View Users',
            self::CREATE_USERS->value => 'Create Users',
            self::EDIT_USERS->value => 'Edit Users',
            self::DELETE_USERS->value => 'Delete Users',
            self::VIEW_CLUBS->value => 'View Clubs',
            self::CREATE_CLUBS->value => 'Create Clubs',
            self::EDIT_CLUBS->value => 'Edit Clubs',
            self::DELETE_CLUBS->value => 'Delete Clubs',
            self::VIEW_EVENTS->value => 'View Events',
            self::CREATE_EVENTS->value => 'Create Events',
            self::EDIT_EVENTS->value => 'Edit Events',
            self::DELETE_EVENTS->value => 'Delete Events',
            self::VIEW_ROLES->value => 'View Roles',
            self::CREATE_ROLES->value => 'Create Roles',
            self::EDIT_ROLES->value => 'Edit Roles',
            self::DELETE_ROLES->value => 'Delete Roles',
            self::ACCESS_ADMIN_PANEL->value => 'Access Admin Panel',
            self::ACCESS_CLUB_PANEL->value => 'Access Club Panel',
        ];
    }

    public function label(): string
    {
        return match($this) {
            self::VIEW_USERS => 'View Users',
            self::CREATE_USERS => 'Create Users',
            self::EDIT_USERS => 'Edit Users',
            self::DELETE_USERS => 'Delete Users',
            self::VIEW_CLUBS => 'View Clubs',
            self::CREATE_CLUBS => 'Create Clubs',
            self::EDIT_CLUBS => 'Edit Clubs',
            self::DELETE_CLUBS => 'Delete Clubs',
            self::VIEW_EVENTS => 'View Events',
            self::CREATE_EVENTS => 'Create Events',
            self::EDIT_EVENTS => 'Edit Events',
            self::DELETE_EVENTS => 'Delete Events',
            self::VIEW_ROLES => 'View Roles',
            self::CREATE_ROLES => 'Create Roles',
            self::EDIT_ROLES => 'Edit Roles',
            self::DELETE_ROLES => 'Delete Roles',
            self::ACCESS_ADMIN_PANEL => 'Access Admin Panel',
            self::ACCESS_CLUB_PANEL => 'Access Club Panel',
        };
    }
}