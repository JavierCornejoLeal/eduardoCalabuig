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
            'id' => Str::uuid(),
            'name' => $request->name,
            'apellidos' => $request->apellidos,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role_id' => '572cf3d5-3a68-4710-b1be-c967c7e77da2',
        ]);

        // Crear el carrito vacío (sin usuario asignado)
        $carrito = Carrito::create([
            'usuario_id' => null,
            'fechaCreacion' => now(),
        ]);

        $user->carrito_id = $carrito->id;
        $user->save();

        // Actualizar el carrito con el usuario_id
        $carrito->usuario_id = $user->id;
        $carrito->save();

        // Generar un token para el nuevo usuario
        $token = JWTAuth::fromUser($user);

        // Devolver el usuario, el token y el carrito creado
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        // Validar la solicitud
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Login Incorrecto'], 401);
            }
            $user = JWTAuth::user();

        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            'token' => $token,
            'user' => $user
        ], 200);
    }

    public function loginApp(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Login Incorrecto'], 401);
            }
            $user = JWTAuth::user();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        $ADMIN_ROLE_ID = 'da058e48-3bdf-4ab5-a28a-3109d56e0bc0';
        if ($user->role_id !== $ADMIN_ROLE_ID) {
            try {
                JWTAuth::invalidate($token);
            } catch (JWTException $ex) {
            }
            return response()->json(['error' => 'Acceso restringido: no eres administrador'], 403);
        }

        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 200);
    }
}
