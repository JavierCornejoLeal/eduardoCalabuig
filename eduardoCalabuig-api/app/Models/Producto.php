<?php

namespace App\Models;

use App\Models\Imagen;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Producto extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'nombre',
        'slug',
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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'producto_id', 'id');
    }
}
