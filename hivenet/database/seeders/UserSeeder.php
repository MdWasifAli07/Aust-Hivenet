<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Enums\RoleEnum;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure roles exist
        foreach ([RoleEnum::ADMIN->value, RoleEnum::CLUB_ADMIN->value, RoleEnum::USER->value] as $role) {
            Role::firstOrCreate(['name' => $role, 'guard_name' => 'web']);
        }

        // Create Admin User
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole(RoleEnum::ADMIN->value);

        // Create Club Admin Users
        $clubAdmins = [
            ['name' => 'CSE admin', 'email' => 'cse@example.com'],
            ['name' => 'EEE admin', 'email' => 'eee@example.com'],
        ];

        foreach ($clubAdmins as $clubAdminData) {
            $clubAdmin = User::firstOrCreate(
                ['email' => $clubAdminData['email']],
                [
                    'name' => $clubAdminData['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
            $clubAdmin->assignRole(RoleEnum::CLUB_ADMIN->value);
        }

        // Create Regular Users
        $users = [
            ['name' => 'John Doe', 'email' => 'john@example.com'],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com'],
        ];

        foreach ($users as $userData) {
            $user = User::firstOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );
            $user->assignRole(RoleEnum::USER->value);
        }

        // Create additional users with Faker if in local
        if (app()->environment('local')) {
            User::factory(20)->create()->each(function ($user) {
                $roles = [RoleEnum::USER->value, RoleEnum::CLUB_ADMIN->value];
                $user->assignRole($roles[array_rand($roles)]);
            });
        }

        // Console output
        $this->command->info('✅ Users created successfully!');
        $this->command->info('🔑 Admin: admin@example.com / password');
        $this->command->info('🔑 Club Admins: cse@example.com, eee@example.com / password');
        $this->command->info('🔑 Users: john@example.com, jane@example.com / password');
    }
}
