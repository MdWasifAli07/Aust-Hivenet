<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Enums\RoleEnum;

class ClubSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::role(RoleEnum::ADMIN->value)->first();
        
        $clubs = [
            [
                'name' => 'Computer Science Club',
                'description' => 'A club for computer science enthusiasts. We organize hackathons, coding competitions, and tech workshops.',
                'logo_image_path' => null,
                'banner_image_path' => null,
                'is_active' => true,
                'created_by' => $admin->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Electrical Engineering Club',
                'description' => 'For electrical engineering students. We work on projects, organize seminars and participate in competitions.',
                'logo_image_path' => null,
                'banner_image_path' => null,
                'is_active' => true,
                'created_by' => $admin->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Photography Society',
                'description' => 'For photography lovers. We organize photo walks, workshops, and exhibitions.',
                'logo_image_path' => null,
                'banner_image_path' => null,
                'is_active' => true,
                'created_by' => $admin->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Drama Club',
                'description' => 'Explore acting, directing, and stage production. We put on several productions each year.',
                'logo_image_path' => null,
                'banner_image_path' => null,
                'is_active' => true,
                'created_by' => $admin->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('clubs')->insert($clubs);
        
        $this->command->info('✅ Clubs created successfully!');
    }
}