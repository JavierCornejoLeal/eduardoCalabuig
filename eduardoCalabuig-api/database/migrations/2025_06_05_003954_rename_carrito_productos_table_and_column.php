<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameCarritoProductosTableAndColumn extends Migration
{
    /**
     * Ejecutar la migración.
     *
     * @return void
     */
    public function up()
    {
        // Cambiar el nombre de la tabla 'carrito_productos' a 'carrito_items'
        Schema::rename('carrito_productos', 'carrito_items');

        // Cambiar el nombre de la columna 'cantidad' a 'cantidadCarrito'
        Schema::table('carrito_items', function (Blueprint $table) {
            $table->renameColumn('cantidad', 'cantidadCarrito');
        });
    }

    /**
     * Deshacer la migración.
     *
     * @return void
     */
    public function down()
    {
        // Si se deshace la migración, revertir los cambios
        Schema::table('carrito_items', function (Blueprint $table) {
            $table->renameColumn('cantidadCarrito', 'cantidad');
        });

        Schema::rename('carrito_items', 'carrito_productos');
    }
}
