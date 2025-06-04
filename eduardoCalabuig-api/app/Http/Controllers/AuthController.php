<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
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
            'id' => Str::uuid(),
            'name' => $request->name,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => '0ceadae7-3a51-43a4-8892-3fbd6e65789d',
        ]);

        // Generar un token para el nuevo usuario
        $token = JWTAuth::fromUser($user);

        // Puedes devolver el token de sesión para el cliente
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
