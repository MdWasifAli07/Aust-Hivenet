<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventParticipationSeeder extends Seeder
{
    public function run(): void
    {
        $events = DB::table('events')->get();
        $members = DB::table('members')->get();
        
        $participations = [];
        
        // John Doe registers for Web Development Workshop and Hackathon
        $webDevEvent = $events[0];
        $hackathonEvent = $events[1];
        $johnDoeMember = $members[2]; // John Doe in Computer Science Club
        
        $participations[] = [
            'event_id' => $webDevEvent->id,
            'member_id' => $johnDoeMember->id,
            'participant_name' => $johnDoeMember->member_name,
            'participant_email' => $johnDoeMember->member_email,
            'attendance_status' => 'registered',
            'registration_date' => now(),
            'payment_status' => 'completed',
            'payment_amount' => $webDevEvent->price,
            'notes' => 'Interested in frontend development',
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $participations[] = [
            'event_id' => $hackathonEvent->id,
            'member_id' => $johnDoeMember->id,
            'participant_name' => $johnDoeMember->member_name,
            'participant_email' => $johnDoeMember->member_email,
            'attendance_status' => 'registered',
            'registration_date' => now(),
            'payment_status' => 'pending',
            'payment_amount' => $hackathonEvent->price,
            'notes' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        // Jane Smith registers for IoT Workshop
        $iotEvent = $events[2];
        $janeSmithMember = $members[4]; // Jane Smith in Electrical Engineering Club
        
        $participations[] = [
            'event_id' => $iotEvent->id,
            'member_id' => $janeSmithMember->id,
            'participant_name' => $janeSmithMember->member_name,
            'participant_email' => $janeSmithMember->member_email,
            'attendance_status' => 'registered',
            'registration_date' => now(),
            'payment_status' => 'completed',
            'payment_amount' => $iotEvent->price,
            'notes' => 'Bringing own Arduino kit',
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        // Mike Johnson registers for Sunrise Photo Walk
        $photoWalkEvent = $events[3];
        $mikeJohnsonMember = $members[5]; // Mike Johnson in Photography Society
        
        $participations[] = [
            'event_id' => $photoWalkEvent->id,
            'member_id' => $mikeJohnsonMember->id,
            'participant_name' => $mikeJohnsonMember->member_name,
            'participant_email' => $mikeJohnsonMember->member_email,
            'attendance_status' => 'registered',
            'registration_date' => now(),
            'payment_status' => 'pending',
            'payment_amount' => $photoWalkEvent->price,
            'notes' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        DB::table('event_participations')->insert($participations);
        
        $this->command->info('✅ Event participations created successfully!');
    }
}