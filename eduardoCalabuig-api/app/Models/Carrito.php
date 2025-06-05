<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Carrito extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'carritos';  
    
    // Campos que se pueden asignar en masa
    protected $fillable = ['usuario_id', 'fechaCreacion'];  

    // Configuración para la clave primaria UUID
    protected $primaryKey = 'id';  
    public $incrementing = false;  // Desactivar el autoincremento (usamos UUID)
    protected $keyType = 'string';  // La clave primaria es un string (UUID)

    // Generación automática del UUID cuando se crea un nuevo carrito
    protected static function boot()
    {
        parent::boot();

        // Asignar un UUID a 'id' si no está presente
        static::creating(function ($carrito) {
            if (!$carrito->id) {
                $carrito->id = (string) Str::uuid();  // Generar el UUID
            }
        });
    }

    // Relación con el modelo User (un carrito pertenece a un usuario)
    public function user()
    {
        return $this->belongsTo(User::class, 'usuario_id'); 
    }

    // Relación con los productos (un carrito puede tener muchos productos)
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'carrito_productos', 'carrito_id', 'producto_id')
            ->withPivot('cantidad');  
    }
}


