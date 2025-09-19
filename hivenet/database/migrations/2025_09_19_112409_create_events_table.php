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
    Schema::create('events', function (Blueprint $table) {
        $table->id();
        $table->foreignId('club_id')->constrained()->onDelete('cascade');
        $table->string('title');
        $table->text('description')->nullable();
        $table->string('featured_image_path')->nullable();
        $table->dateTime('start_date_time');
        $table->dateTime('end_date_time');
        $table->string('location');
        $table->enum('event_type', ['physical', 'online']);
        $table->integer('max_participants')->nullable();
        $table->dateTime('registration_deadline')->nullable();
        $table->decimal('price', 8, 2)->default(0.00);
        $table->boolean('is_published')->default(false);
        $table->timestamps();
        
        $table->index('club_id');
        $table->index('start_date_time');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
