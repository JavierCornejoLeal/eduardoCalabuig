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
        Schema::create('carrito_productos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('carrito_id');
            $table->uuid('producto_id');
            $table->integer('cantidad');
            $table->foreign('carrito_id')->references('id')->on('carritos');
            $table->foreign('producto_id')->references('id')->on('productos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('carrito_productos');
    }
};
