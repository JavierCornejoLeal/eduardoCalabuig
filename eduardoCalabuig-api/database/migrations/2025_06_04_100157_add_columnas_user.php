<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar la clave primaria existente (si es que existe)
            $table->dropPrimary();  // Aseguramos que no haya una clave primaria anterior

            // Cambiar el tipo de la columna 'id' a UUID y establecerlo como clave primaria
            $table->uuid('id')->default(Str::uuid())->primary()->change();  // Definir UUID como id y clave primaria
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Volver al tipo de dato original de 'id' (si es necesario)
            $table->bigIncrements('id')->change();

            // Eliminar la clave primaria (que ya se había establecido previamente)
            $table->dropPrimary();  // Esto es necesario para evitar conflictos al restaurar
        });
    }
};
