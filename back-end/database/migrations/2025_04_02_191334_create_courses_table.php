<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name');
            $table->decimal('price');
            $table->string('description');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('client_id');
            $table->unsignedBigInteger('subject_id');
            $table->timestamps();

            $table->foreign('client_id')->references('id')->on('admin')->onDelete('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
