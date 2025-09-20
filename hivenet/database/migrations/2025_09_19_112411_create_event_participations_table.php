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
    Schema::create('event_participations', function (Blueprint $table) {
        $table->id();
        $table->foreignId('event_id')->constrained()->onDelete('cascade');
        $table->foreignId('member_id')->constrained()->onDelete('cascade');
        $table->string('participant_name');
        $table->string('participant_email');
        $table->enum('attendance_status', ['registered', 'attended', 'cancelled', 'no_show'])->default('registered');
        $table->timestamp('registration_date')->useCurrent();
        $table->enum('payment_status', ['pending', 'completed', 'failed', 'refunded'])->default('pending');
        $table->decimal('payment_amount', 8, 2)->nullable();
        $table->text('notes')->nullable();
        $table->timestamps();
        
        $table->unique(['event_id', 'member_id']);
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_participations');
    }
};
