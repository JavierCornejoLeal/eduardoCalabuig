<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    /**
     * Mostrar todos los roles.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Role::all();  // Obtener todos los roles
        return response()->json($roles);  // Devolver los roles en formato JSON
    }

    /**
     * Mostrar un rol específico.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $role = Role::find($id);  // Buscar el rol por su UUID
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado'], 404);  // Si no se encuentra, devolver un error
        }
        return response()->json($role);  // Devolver el rol encontrado
    }

    /**
     * Crear un nuevo rol.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        // Crear un nuevo rol
        $role = Role::create([
            'id' => Str::uuid(),  // Asignar un UUID al rol
            'name' => $request->name,
        ]);

        return response()->json($role, 201);  // Devolver el rol creado
    }

    /**
     * Actualizar un rol existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $role = Role::find($id);  // Buscar el rol por su UUID
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado'], 404);  // Si no se encuentra, devolver un error
        }

        // Validar los datos de entrada
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $id,
        ]);

        // Actualizar los campos del rol
        $role->update([
            'name' => $request->name ?? $role->name,
        ]);

        return response()->json($role);  // Devolver el rol actualizado
    }

    /**
     * Eliminar un rol.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = Role::find($id);  // Buscar el rol por su UUID
        if (!$role) {
            return response()->json(['message' => 'Rol no encontrado'], 404);  // Si no se encuentra, devolver un error
        }

        $role->delete();  // Eliminar el rol

        return response()->json(['message' => 'Rol eliminado'], 200);  // Devolver mensaje de éxito
    }

    /**
     * Asignar un rol a un usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $userId
     * @return \Illuminate\Http\Response
     */
    public function assignRoleToUser(Request $request, $userId)
    {
        // Validar el input
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::find($userId);  // Buscar al usuario por su UUID
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);  // Si no se encuentra, devolver un error
        }

        // Asignar el rol al usuario
        $user->role_id = $request->role_id;
        $user->save();  // Guardar el usuario con el nuevo rol

        return response()->json(['message' => 'Rol asignado al usuario correctamente'], 200);  // Devolver mensaje de éxito
    }
}
