<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    // Especificamos la tabla, aunque Laravel la detectará automáticamente como 'roles'
    protected $table = 'roles';

    // Definimos los campos que son asignables masivamente
    protected $fillable = [
        'id',
        'name',
    ];

    // Indicamos que la clave primaria es UUID, no un auto-incremental
    public $incrementing = false;
    protected $keyType = 'string';  // La clave primaria es de tipo string (UUID)

    /**
     * Relación uno a muchos con los usuarios.
     */
    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
