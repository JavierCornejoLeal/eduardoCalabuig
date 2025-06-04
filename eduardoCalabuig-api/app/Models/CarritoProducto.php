<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarritoProducto extends Model
{
    use HasFactory;

    protected $table = 'carrito_productos'; // Nombre de la tabla
    protected $fillable = ['carrito_id', 'producto_id', 'cantidad']; // Campos que se pueden asignar en masa

    // Relación con el carrito
    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'carrito_id');
    }

    // Relación con el producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
