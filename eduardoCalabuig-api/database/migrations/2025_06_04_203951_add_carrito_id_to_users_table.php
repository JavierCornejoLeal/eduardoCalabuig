<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCarritoIdToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('carrito_id')->nullable()->after('role_id'); // Usamos uuid para la columna carrito_id
            $table->foreign('carrito_id')->references('id')->on('carritos')->onDelete('set null'); // Relación con la tabla carritos
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
            $table->dropForeign(['carrito_id']); // Eliminamos la relación con la tabla carritos
            $table->dropColumn('carrito_id'); // Eliminamos la columna carrito_id
        });
    }
}
