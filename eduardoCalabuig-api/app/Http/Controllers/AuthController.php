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
                return response()->json(['error' => 'Login Incorrecto'], 401);
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

    /**
     * Nuevo método: loginApp
     * Solo acepta usuarios con role_id = 'da058e48-3bdf-4ab5-a28a-3109d56e0bc0'
     */
    public function loginApp(Request $request)
    {
        // 1) Validar que lleguen email y password
        $credentials = $request->only('email', 'password');

        try {
            // 2) Intentar autenticar al usuario
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Login Incorrecto'], 401);
            }
            // 3) Obtener el usuario autenticado
            $user = JWTAuth::user();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        // 4) Verificar que el usuario tenga el role_id de Admin
        $ADMIN_ROLE_ID = 'da058e48-3bdf-4ab5-a28a-3109d56e0bc0';
        if ($user->role_id !== $ADMIN_ROLE_ID) {
            // Invalidar el token recién generado
            try {
                JWTAuth::invalidate($token);
            } catch (JWTException $ex) {
                // Ignoramos si falla al invalidar
            }
            return response()->json(['error' => 'Acceso restringido: no eres administrador'], 403);
        }

        // 5) Si ha pasado la verificación, devolvemos token y datos del usuario
        return response()->json([
            'token' => $token,
            'user'  => $user,
        ], 200);
    }
}
