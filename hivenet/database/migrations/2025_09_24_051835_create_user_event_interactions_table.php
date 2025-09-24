<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserEventInteractionsTable extends Migration
{
    public function up()
    {
        Schema::create('user_event_interactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->enum('interaction_type', ['going', 'favourite']);
            $table->timestamps();

            $table->unique(['user_id', 'event_id', 'interaction_type']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_event_interactions');
    }
}