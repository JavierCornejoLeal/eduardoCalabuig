<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameCantidadCarritoToCantidadInCarritoProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('carrito_productos', function (Blueprint $table) {
            // Renombramos la columna 'cantidadCarrito' a 'cantidad'
            $table->renameColumn('cantidadCarrito', 'cantidad');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('carrito_productos', function (Blueprint $table) {
            // Si revertimos, restauramos el nombre de la columna a 'cantidadCarrito'
            $table->renameColumn('cantidad', 'cantidadCarrito');
        });
    }
}
