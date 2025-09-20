<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('members', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('club_id')->constrained()->onDelete('cascade');
        $table->string('member_name');
        $table->string('member_email');
        $table->enum('membership_status', ['pending', 'approved', 'rejected', 'banned'])->default('pending');
        $table->timestamp('joined_at')->nullable();
        $table->timestamps();
        
        $table->unique(['user_id', 'club_id']);
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
