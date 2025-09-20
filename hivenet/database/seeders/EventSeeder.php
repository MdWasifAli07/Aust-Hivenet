<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $clubs = DB::table('clubs')->get();
        
        $events = [
            // Computer Science Club events
            [
                'club_id' => $clubs[0]->id,
                'title' => 'Web Development Workshop',
                'description' => 'Learn modern web development with React and Laravel. Hands-on session included.',
                'featured_image_path' => null,
                'start_date_time' => now()->addDays(5)->setTime(14, 0),
                'end_date_time' => now()->addDays(5)->setTime(17, 0),
                'location' => 'Computer Lab, Building A',
                'event_type' => 'physical',
                'max_participants' => 30,
                'registration_deadline' => now()->addDays(4)->setTime(23, 59),
                'price' => 0.00,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'club_id' => $clubs[0]->id,
                'title' => 'Hackathon 2024',
                'description' => 'Annual coding competition. Build innovative solutions and win prizes!',
                'featured_image_path' => null,
                'start_date_time' => now()->addDays(15)->setTime(9, 0),
                'end_date_time' => now()->addDays(16)->setTime(18, 0),
                'location' => 'Innovation Center',
                'event_type' => 'physical',
                'max_participants' => 50,
                'registration_deadline' => now()->addDays(10)->setTime(23, 59),
                'price' => 10.00,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Electrical Engineering Club events
            [
                'club_id' => $clubs[1]->id,
                'title' => 'IoT Workshop',
                'description' => 'Hands-on workshop on Internet of Things and embedded systems.',
                'featured_image_path' => null,
                'start_date_time' => now()->addDays(7)->setTime(10, 0),
                'end_date_time' => now()->addDays(7)->setTime(16, 0),
                'location' => 'Electronics Lab, Building B',
                'event_type' => 'physical',
                'max_participants' => 20,
                'registration_deadline' => now()->addDays(6)->setTime(23, 59),
                'price' => 5.00,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Photography Society events
            [
                'club_id' => $clubs[2]->id,
                'title' => 'Sunrise Photo Walk',
                'description' => 'Capture the beautiful morning light at Riverside Park.',
                'featured_image_path' => null,
                'start_date_time' => now()->addDays(3)->setTime(5, 30),
                'end_date_time' => now()->addDays(3)->setTime(8, 0),
                'location' => 'Riverside Park Main Entrance',
                'event_type' => 'physical',
                'max_participants' => 15,
                'registration_deadline' => now()->addDays(2)->setTime(23, 59),
                'price' => 0.00,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Drama Club events
            [
                'club_id' => $clubs[3]->id,
                'title' => 'Auditions: Spring Play',
                'description' => 'Open auditions for our spring production. All roles available.',
                'featured_image_path' => null,
                'start_date_time' => now()->addDays(8)->setTime(16, 0),
                'end_date_time' => now()->addDays(8)->setTime(20, 0),
                'location' => 'Auditorium',
                'event_type' => 'physical',
                'max_participants' => null,
                'registration_deadline' => now()->addDays(7)->setTime(23, 59),
                'price' => 0.00,
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('events')->insert($events);
        
        $this->command->info('✅ Events created successfully!');
    }
}