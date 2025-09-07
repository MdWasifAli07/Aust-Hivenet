<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run()
    {
        $superAdmin = User::updateOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'is_active' => true,
                'phone' => null,
                'address' => null
            ]
        );

        $superAdminRole = Role::where('slug', 'super-admin')->first();
        
        if ($superAdminRole && !$superAdmin->hasRole('super-admin')) {
            $superAdmin->roles()->syncWithoutDetaching([$superAdminRole->id]);
        }

        $this->command->info('Super Admin seeded successfully.');
    }
}