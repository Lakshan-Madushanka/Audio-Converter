<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMusicTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('music', function (Blueprint $table) {
            $table->id();
            $table->string('input_file', 500);
            $table->string('output_file', 500)->nullable();
            $table->string('input_format', 50);
            $table->string('output_format', 50)->default('mp3');
            $table->boolean('downloaded')->default(false);
            $table->enum('convert_status', ['success', 'error', 'pending', 'start'])->default('start');
            $table->timestamps();

            $table->foreignId('user_id')->constrained();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('music');
    }
}
