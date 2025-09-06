<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'slug' => 'super-admin',
                'description' => 'Has full access to the system'
            ],
            [
                'name' => 'Club Admin',
                'slug' => 'club-admin',
                'description' => 'Manages club operations'
            ],
            [
                'name' => 'User',
                'slug' => 'user',
                'description' => 'Regular system user'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['slug' => $role['slug']], // Check if exists by slug
                $role // Create if doesn't exist
            );
        }
    }
}