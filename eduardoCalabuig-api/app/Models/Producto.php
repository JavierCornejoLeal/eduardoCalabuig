<?php

namespace App\Models;

use App\Models\Imagen;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Producto extends Model
{
    protected $keyType = 'string';  // El id es string (UUID)
    public $incrementing = false;   // No autoincrementa

    protected $fillable = [
        'nombre',
        'alto',
        'ancho',
        'profundidad',
        'precio',
        'material',
        'descripcion',
        'categoria',
        'cantidad',
        'imagen',
    ];

    // Generar UUID automáticamente al crear
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    // Relación uno a muchos: Un producto tiene muchas imágenes
    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'producto_id', 'id');
    }
}
