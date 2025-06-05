<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'apellidos' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'role_id' => 'nullable|exists:roles,id',
        ]);

        $user->update([
            'name' => $request->name ?? $user->name,
            'apellidos' => $request->apellidos ?? $user->apellidos,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'role_id' => $request->role_id ?? $user->role_id,
        ]);

        return response()->json($user);
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'id' => Str::uuid(),
            'name' => $request->name,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => $request->role_id,
        ]);

        $carrito = \App\Models\Carrito::create([
            'usuario_id' => $user->id,
            'fechaCreacion' => now(),
        ]);

        $user->carrito_id = $carrito->id;
        $user->save();

        return response()->json([
            'user' => $user,
            'carrito' => $carrito
        ], 201);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $carritoId = $user->carrito_id;
        if ($carritoId) {
            \App\Models\CarritoProducto::where('carrito_id', $carritoId)->delete();

            \App\Models\Carrito::where('id', $carritoId)->delete();
        }
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado'], 200);
    }

    public function assignRoleToUser(Request $request, $userId)
    { 
        $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $user->role_id = $request->role_id;
        $user->save();

        return response()->json(['message' => 'Rol asignado correctamente al usuario'], 200);
    }
}
