<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CarritoProducto extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'carrito_productos';  

    // Campos que se pueden asignar en masa
    protected $fillable = ['carrito_id', 'producto_id', 'cantidad'];  

    // Configuración para la clave primaria UUID
    protected $primaryKey = 'id';  
    public $incrementing = false;  // Desactivar el autoincremento (usamos UUID)
    protected $keyType = 'string';  // La clave primaria es un string (UUID)

    // Generación automática del UUID cuando se crea un nuevo carrito_producto
    protected static function boot()
    {
        parent::boot();

        // Asignar un UUID a 'id' si no está presente
        static::creating(function ($carritoProducto) {
            if (!$carritoProducto->id) {
                $carritoProducto->id = (string) Str::uuid();  // Generar el UUID
            }
        });
    }

    // Relación con el carrito (un carrito_producto pertenece a un carrito)
    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'carrito_id');
    }

    // Relación con el producto (un carrito_producto pertenece a un producto)
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
