<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    protected $fillable = [
        'id',
        'name',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function users()
    {
        return $this->hasMany(User::class, 'role_id');
    }
}
