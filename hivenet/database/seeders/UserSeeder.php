<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Enums\RoleEnum;
use Spatie\Permission\Models\Role;

// class UserSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // Create Admin User
//         $admin = User::firstOrCreate(
//             ['email' => 'admin@example.com'],
//             [
//                 'name' => 'System Administrator',
//                 'password' => Hash::make('password'),
//                 'email_verified_at' => now(),
//             ]
//         );
//         $admin->assignRole(RoleEnum::ADMIN->value);

//         // Create Club Admin Users
//         $clubAdmins = [
//             [
//                 'name' => 'Cse admin',
//                 'email' => 'cse@example.com',
//                 'password' => Hash::make('password'),
//             ],
//             [
//                 'name' => 'EEE admin',
//                 'email' => 'eee@example.com',
//                 'password' => Hash::make('password'),
//             ],
            
//         ];

//         foreach ($clubAdmins as $clubAdminData) {
//             $clubAdmin = User::firstOrCreate(
//                 ['email' => $clubAdminData['email']],
//                 [
//                     'name' => $clubAdminData['name'],
//                     'password' => $clubAdminData['password'],
//                     'email_verified_at' => now(),
//                 ]
//             );
//             $clubAdmin->assignRole(RoleEnum::CLUB_ADMIN->value);
//         }

//         // Create Regular Users
//         $users = [
//             [
//                 'name' => 'John Doe',
//                 'email' => 'john@example.com',
//                 'password' => Hash::make('password'),
//             ],
//             [
//                 'name' => 'Jane Smith',
//                 'email' => 'jane@example.com',
//                 'password' => Hash::make('password'),
//             ],
           
//         ];

//         foreach ($users as $userData) {
//             $user = User::firstOrCreate(
//                 ['email' => $userData['email']],
//                 [
//                     'name' => $userData['name'],
//                     'password' => $userData['password'],
//                     'email_verified_at' => now(),
//                 ]
//             );
//             $user->assignRole(RoleEnum::USER->value);
//         }

//         // Create additional users with Faker if needed
//         if (app()->environment('local')) {
//             User::factory(20)->create()->each(function ($user) {
//                 $roles = [RoleEnum::USER->value, RoleEnum::CLUB_ADMIN->value];
//                 $user->assignRole($roles[array_rand($roles)]);
//             });
//         }

//         $this->command->info('Users created successfully!');
//         $this->command->info('Admin credentials: admin@example.com / password');
//         $this->command->info('Club admin credentials: sports@example.com / password');
//         $this->command->info('User credentials: john@example.com / password');
//     }
// }


class UserSeeder extends Seeder
{
    public function run()
    {
        // Create Admin User
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Club Admin',
                'password' => bcrypt('adminpassword'),
                // 'role' => 'admin',
                // 'status' => 'active',
            ]
        );

        // Create Regular Users
        User::firstOrCreate(
            ['email' => 'john@example.com'],
            [
                'name' => 'John Doe',
                'password' => bcrypt('johnpassword'),
                // 'role' => 'user',
                // 'status' => 'active',
            ]
        );

        User::firstOrCreate(
            ['email' => 'jane@example.com'],
            [
                'name' => 'Jane Smith',
                'password' => bcrypt('janepassword'),
                // 'role' => 'user',
                // 'status' => 'active',
            ]
        );

        User::firstOrCreate(
            ['email' => 'alex@example.com'],
            [
                'name' => 'Alex Johnson',
                'password' => bcrypt('alexpassword'),
                // 'role' => 'user',
                // 'status' => 'active',
            ]
        );
    }
}
