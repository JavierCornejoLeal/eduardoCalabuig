<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;
use App\Models\Producto;

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

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id', 'id');
    }
}
