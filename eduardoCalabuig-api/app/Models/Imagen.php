<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str; // para UUID
use App\Models\Producto;   // Importa el modelo Producto

class Imagen extends Model
{
    use HasFactory;

    protected $table = 'imagenes';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'producto_id',
        'url',
    ];

    // Asignar UUID automáticamente al crear (opcional pero recomendable)
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    // Relación a Producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id', 'id');
    }
}
