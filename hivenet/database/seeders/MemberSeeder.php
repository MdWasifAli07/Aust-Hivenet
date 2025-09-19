<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Enums\RoleEnum;

class MemberSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::role(RoleEnum::USER->value)->get();
        $clubAdmins = User::role(RoleEnum::CLUB_ADMIN->value)->get();
        $clubs = DB::table('clubs')->get();
        
        $memberships = [];
        
        // Assign club admins to their respective clubs
        $memberships[] = [
            'user_id' => $clubAdmins[0]->id, // CSE Admin
            'club_id' => $clubs[0]->id, // Computer Science Club
            'member_name' => $clubAdmins[0]->name,
            'member_email' => $clubAdmins[0]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $memberships[] = [
            'user_id' => $clubAdmins[1]->id, // EEE Admin
            'club_id' => $clubs[1]->id, // Electrical Engineering Club
            'member_name' => $clubAdmins[1]->name,
            'member_email' => $clubAdmins[1]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        // Regular users join clubs
        $memberships[] = [
            'user_id' => $users[0]->id, // John Doe
            'club_id' => $clubs[0]->id, // Computer Science Club
            'member_name' => $users[0]->name,
            'member_email' => $users[0]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $memberships[] = [
            'user_id' => $users[0]->id, // John Doe
            'club_id' => $clubs[2]->id, // Photography Society
            'member_name' => $users[0]->name,
            'member_email' => $users[0]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $memberships[] = [
            'user_id' => $users[1]->id, // Jane Smith
            'club_id' => $clubs[1]->id, // Electrical Engineering Club
            'member_name' => $users[1]->name,
            'member_email' => $users[1]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $memberships[] = [
            'user_id' => $users[2]->id, // Mike Johnson
            'club_id' => $clubs[2]->id, // Photography Society
            'member_name' => $users[2]->name,
            'member_email' => $users[2]->email,
            'membership_status' => 'approved',
            'joined_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        
        $memberships[] = [
            'user_id' => $users[3]->id, // Sarah Wilson
            'club_id' => $clubs[3]->id, // Drama Club
            'member_name' => $users[3]->name,
            'member_email' => $users[3]->email,
            'membership_status' => 'pending',
            'joined_at' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        DB::table('members')->insert($memberships);
        
        $this->command->info('✅ Members created successfully!');
    }
}