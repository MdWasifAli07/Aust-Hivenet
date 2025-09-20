<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\RoleEnum;
use App\Enums\PermissionEnum;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        foreach (PermissionEnum::cases() as $permission) {
            Permission::firstOrCreate(['name' => $permission->value]);
        }

        // Create roles and assign permissions
        $adminRole = Role::firstOrCreate(['name' => RoleEnum::ADMIN->value]);
        $clubAdminRole = Role::firstOrCreate(['name' => RoleEnum::CLUB_ADMIN->value]);
        $userRole = Role::firstOrCreate(['name' => RoleEnum::USER->value]);

        // Admin gets all permissions
        $adminRole->givePermissionTo(Permission::all());

        // Club Admin permissions
        $clubAdminRole->givePermissionTo([
            PermissionEnum::VIEW_USERS->value,
            PermissionEnum::CREATE_USERS->value,
            PermissionEnum::EDIT_USERS->value,
            PermissionEnum::VIEW_CLUBS->value,
            PermissionEnum::EDIT_CLUBS->value,
            PermissionEnum::VIEW_EVENTS->value,
            PermissionEnum::CREATE_EVENTS->value,
            PermissionEnum::EDIT_EVENTS->value,
            PermissionEnum::DELETE_EVENTS->value,
            PermissionEnum::ACCESS_CLUB_PANEL->value,
        ]);

        // User permissions
        $userRole->givePermissionTo([
            PermissionEnum::VIEW_EVENTS->value,
        ]);
    }
}