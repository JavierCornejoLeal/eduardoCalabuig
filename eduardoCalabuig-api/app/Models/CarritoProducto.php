<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CarritoProducto extends Model
{
    use HasFactory;

    protected $table = 'carrito_productos';

    protected $fillable = ['carrito_id', 'producto_id', 'cantidad'];

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($carritoProducto) {
            if (!$carritoProducto->id) {
                $carritoProducto->id = (string) Str::uuid();
            }
        });
    }

    public function carrito()
    {
        return $this->belongsTo(Carrito::class, 'carrito_id');
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }
}
