<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class UserController extends Controller
{
    /**
     * Mostrar todos los usuarios.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();  // Obtener todos los usuarios
        return response()->json($users);  // Devolver la lista de usuarios en formato JSON
    }

    /**
     * Mostrar un usuario específico.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);  // Buscar al usuario por su UUID
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);  // Si no se encuentra, devolvemos un error
        }
        return response()->json($user);  // Devolver el usuario
    }

    /**
     * Actualizar un usuario existente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Validar los datos de entrada, excluyendo el carrito_id
        $request->validate([
            'name' => 'string|max:255',
            'apellidos' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'role_id' => 'nullable|exists:roles,id',
            // No permitas la actualización de carrito_id
            // 'carrito_id' => 'nullable|exists:carritos,id',  // Esta línea no debe existir.
        ]);

        // Actualizar los campos del usuario
        $user->update([
            'name' => $request->name ?? $user->name,
            'apellidos' => $request->apellidos ?? $user->apellidos,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role_id' => $request->role_id ?? $user->role_id,
            // No actualices el carrito_id
        ]);

        return response()->json($user);  // Devolver el usuario actualizado
    }



    public function store(Request $request)
    {
        // Validar los datos recibidos
        $request->validate([
            'name' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        // Crear un nuevo usuario
        $user = User::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => bcrypt($request->password),  // Encriptar la contraseña,
            'role_id' => '0ceadae7-3a51-43a4-8892-3fbd6e65789d',
        ]);

        // Crear un carrito vacío para el usuario
        $carrito = \App\Models\Carrito::create([
            'usuario_id' => $user->id,
            'fechaCreacion' => now(),
        ]);

        // Asignar el carrito al usuario
        $user->carrito_id = $carrito->id;
        $user->save();

        // Devolver el usuario y el carrito creado
        return response()->json([
            'user' => $user,
            'carrito' => $carrito
        ], 201);
    }


    /**
     * Eliminar un usuario.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id)
    {
        $user = User::find($id);  // Buscar al usuario por su UUID
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);  // Si no se encuentra, devolvemos un error
        }

        $user->delete();  // Eliminar al usuario

        return response()->json(['message' => 'Usuario eliminado'], 200);  // Devolver mensaje de éxito
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
        // Validar que el 'role_id' sea válido
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        // Buscar el usuario por su UUID
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);  // Si no se encuentra, devolver un error
        }

        // Asignar el nuevo rol al usuario
        $user->role_id = $request->role_id;
        $user->save();  // Guardar el usuario con el nuevo rol

        return response()->json(['message' => 'Rol asignado correctamente al usuario'], 200);  // Mensaje de éxito
    }
}
