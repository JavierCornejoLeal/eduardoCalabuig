<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Carrito extends Model
{
    use HasFactory;

    protected $table = 'carritos';  
    
    protected $fillable = ['usuario_id', 'fechaCreacion'];  

    protected $primaryKey = 'id';  
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($carrito) {
            if (!$carrito->id) {
                $carrito->id = (string) Str::uuid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'usuario_id'); 
    }

    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'carrito_productos', 'carrito_id', 'producto_id')
            ->withPivot('cantidad');  
    }
}


