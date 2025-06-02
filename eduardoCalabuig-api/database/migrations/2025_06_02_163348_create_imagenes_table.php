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
    Schema::create('imagenes', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->uuid('producto_id');
        $table->string('url');
        $table->timestamps();

        // Foreign key constraint
        $table->foreign('producto_id')->references('id')->on('productos')->onDelete('cascade');
    });
}

public function down()
{
    Schema::dropIfExists('imagenes');
}

};
