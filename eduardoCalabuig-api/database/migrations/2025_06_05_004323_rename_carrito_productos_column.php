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
        Schema::rename('carrito_items', 'carrito_productos');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('carrito_productos', 'carrito_items');
    }
};
