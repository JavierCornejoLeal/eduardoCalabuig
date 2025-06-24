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
        Schema::table('carrito_productos', function (Blueprint $table) {
            // Cambiar la columna 'carrito_id' para permitir valores nulos
            $table->uuid('carrito_id')->nullable()->change();
            // Hacer 'producto_id' y 'cantidad' nullable también
            $table->uuid('producto_id')->nullable()->change();
            $table->integer('cantidad')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Si queremos revertir, volver a hacer las columnas no nullable
        Schema::table('carrito_productos', function (Blueprint $table) {
            $table->uuid('carrito_id')->nullable(false)->change();
            $table->uuid('producto_id')->nullable(false)->change();
            $table->integer('cantidad')->nullable(false)->change();
        });
    }
};
