<?php

namespace App\Http\Controllers;

use App\Models\Carrito;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class CarritoController extends Controller
{
    public function index()
    {
        $carritos = Carrito::all();
        return response()->json($carritos);
    }

    public function show($id)
    {
        $carrito = Carrito::find($id);
        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }
        return response()->json($carrito);
    }

public function store(Request $request)
{
    $request->validate([
        'fechaCreacion' => 'required|date',
    ]);

    $carrito = Carrito::create([
        'id' => (string) Str::uuid(),
        'usuario_id' => null,
        'fechaCreacion' => $request->fechaCreacion,
    ]);

    return response()->json($carrito, 201);
}

    public function update(Request $request, $id)
    {
        $carrito = Carrito::find($id);
        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'fechaCreacion' => 'required|date',
        ]);

        $user = JWTAuth::user();

        if ($carrito->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para modificar este carrito'], 403);
        }

        $carrito->update([
            'usuario_id' => $request->usuario_id,
            'fechaCreacion' => $request->fechaCreacion,
        ]);

        return response()->json($carrito);
    }

    public function destroy($id)
    {
        $carrito = Carrito::find($id);

        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        $user = JWTAuth::user();

        if ($carrito->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para modificar este carrito'], 403);
        }
        $carrito->delete();

        return response()->json(['message' => 'Carrito eliminado'], 200);
    }
}
