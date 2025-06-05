<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Carrito;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
public function register(Request $request)
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
        'id' => Str::uuid(),  // Generar el UUID del usuario
        'name' => $request->name,
        'apellidos' => $request->apellidos,
        'email' => $request->email,
        'password' => bcrypt($request->password),
        'role_id' => '572cf3d5-3a68-4710-b1be-c967c7e77da2',  // Asignar un role predeterminado
    ]);

    // Crear el carrito vacío (sin usuario asignado)
    $carrito = Carrito::create([
        'usuario_id' => null,  // Carrito sin usuario asignado
        'fechaCreacion' => now(),
    ]);

    // Asignar el carrito al usuario creado
    $user->carrito_id = $carrito->id;
    $user->save();  // Guardar los cambios en el usuario

    // Actualizar el carrito con el usuario_id
    $carrito->usuario_id = $user->id;
    $carrito->save();  // Guardar el carrito actualizado

    // Generar un token para el nuevo usuario
    $token = JWTAuth::fromUser($user);

    // Devolver el usuario, el token y el carrito creado
    return response()->json([
        'user' => $user,
        'token' => $token,  // Devolver el token
    ], 201);
}






    public function login(Request $request)
    {
        // Validar la solicitud
        $credentials = $request->only('email', 'password');

        // Intentar crear un token para el usuario
        try {
            // Intentar autenticar al usuario con las credenciales
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Si las credenciales son correctas, obtener el usuario
            $user = JWTAuth::user(); // Usamos JWTAuth::user() para obtener el usuario autenticado

        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // Devolver el token generado y los datos del usuario
        return response()->json([
            'token' => $token,
            'user' => $user // Devolver el usuario con los datos (incluido su nombre, correo, etc.)
        ], 200);
    }
}
