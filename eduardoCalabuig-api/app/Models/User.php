<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Tymon\JWTAuth\Contracts\JWTSubject; // Importa la interfaz JWTSubject

class User extends Authenticatable implements JWTSubject // Implementa la interfaz JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * La clave primaria de la tabla.
     *
     * @var string
     */
    protected $primaryKey = 'id';  // Especificamos el nombre de la clave primaria (por si cambias el nombre)

    /**
     * Indica si la clave primaria es autoincrementable.
     *
     * @var bool
     */
    public $incrementing = false;  // Desactivamos el autoincremento ya que usaremos UUID

    /**
     * El tipo de datos de la clave primaria.
     *
     * @var string
     */
    protected $keyType = 'string';  // Indicamos que la clave primaria es de tipo string (UUID)

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'apellidos',
        'email',
        'password',
        'role_id',  // Añadido role_id al campo fillable
    ];

    /**
     * Los atributos que deben ser ocultos para la serialización.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Los atributos que deberían ser casteados.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relación uno a muchos inversa con el modelo 'Role'.
     */
    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');  // Un usuario pertenece a un solo rol
    }

    /**
     * Obtener el identificador único que se almacenará en el payload del JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        // Este método devuelve el identificador único del usuario (usualmente el id)
        return $this->getKey();
    }

    /**
     * Obtener las reclamaciones personalizadas que se agregarán al payload del JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        // Aquí puedes agregar datos adicionales que quieras en el payload
        return [];
    }
}
