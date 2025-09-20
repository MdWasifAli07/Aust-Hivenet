
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender_id');   // যে পাঠিয়েছে
            $table->unsignedBigInteger('receiver_id'); // যে পেয়েছে
            $table->text('message');                      // মেসেজ টেক্সট
            $table->timestamp('read_at')->nullable();  // কবে পড়া হয়েছে
            $table->timestamps();                      // created_at, updated_at

            $table->index(['sender_id', 'receiver_id']);
            $table->index(['receiver_id', 'read_at']);

            // চাইলে ফরেন কি যোগ করা যায়
            // $table->foreign('sender_id')->references('id')->on('users')->onDelete('cascade');
            // $table->foreign('receiver_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('messages');
    }
};
