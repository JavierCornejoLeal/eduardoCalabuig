<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyIdColumnInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar la clave primaria anterior (si existe) y la columna id
            $table->dropPrimary();
            $table->dropColumn('id');

            // Añadir la nueva columna id como UUID al principio de la tabla
            $table->uuid('id')->primary()->first();  // 'first()' coloca la columna al principio
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar la columna uuid
            $table->dropColumn('id');

            // Volver a crear la columna id como auto-incremento
            $table->bigIncrements('id')->primary()->after('created_at');
        });
    }
}
