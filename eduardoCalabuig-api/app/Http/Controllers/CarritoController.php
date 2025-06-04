<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Utilidad para generar UUID
use Tymon\JWTAuth\Facades\JWTAuth; // Si prefieres seguir utilizando JWTAuth

class CarritoController extends Controller
{
    /**
     * Mostrar todos los carritos.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $carritos = Carrito::all();  // Obtener todos los carritos
        return response()->json($carritos);  // Devolver la lista de carritos
    }

    /**
     * Mostrar un carrito específico.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $carrito = Carrito::find($id);  // Buscar el carrito por su UUID
        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }
        return response()->json($carrito);  // Devolver el carrito
    }

    /**
     * Crear un nuevo carrito.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
public function store(Request $request)
{
    // Validar que fechaCreacion exista; usuario_id puede quedar nulo
    $request->validate([
        'fechaCreacion' => 'required|date',
    ]);

    // Crear el carrito con un UUID generado manualmente
    $carrito = Carrito::create([
        'id' => (string) Str::uuid(),          // Generar el UUID manualmente
        'usuario_id' => null,                  // Lo dejamos nulo al crearlo
        'fechaCreacion' => $request->fechaCreacion,
    ]);

    return response()->json($carrito, 201);
}



    /**
     * Actualizar un carrito.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $carrito = Carrito::find($id);  // Buscar el carrito por su UUID
        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        // Validar los datos de entrada
        $request->validate([
            'usuario_id' => 'required|exists:users,id', // Validar que el usuario existe
            'fechaCreacion' => 'required|date', // Validar la fecha de creación
        ]);

        // Verificar que el carrito pertenece al usuario autenticado
        $user = JWTAuth::user(); // Si prefieres usar JWTAuth::user()

        if ($carrito->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para modificar este carrito'], 403);
        }

        // Actualizar el carrito
        $carrito->update([
            'usuario_id' => $request->usuario_id,
            'fechaCreacion' => $request->fechaCreacion,
        ]);

        return response()->json($carrito);  // Devolver el carrito actualizado
    }

    /**
     * Eliminar un carrito.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Buscar el carrito por su ID
        $carrito = Carrito::find($id);

        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);  // Si no se encuentra el carrito, devolver un error
        }

        // Obtener el usuario autenticado
        $user = JWTAuth::user();  // Usamos JWTAuth::user() para obtener el usuario autenticado

        // Verificar si el carrito pertenece al usuario autenticado
        if ($carrito->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para modificar este carrito'], 403);  // Si el carrito no pertenece al usuario
        }

        // Eliminar el carrito si corresponde
        $carrito->delete();

        return response()->json(['message' => 'Carrito eliminado'], 200);  // Devolver mensaje de éxito
    }
}
