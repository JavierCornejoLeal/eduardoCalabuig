<?php

namespace App\Http\Controllers;

use App\Models\CarritoProducto;
use App\Models\Carrito;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CarritoProductoController extends Controller
{

    public function index($carritoId)
    {
        try {
            $carrito = Carrito::find($carritoId);
            if (!$carrito) {
                return response()->json(['message' => 'Carrito no encontrado'], 404);
            }
            $productos = $carrito->productos;

            if ($productos->isEmpty()) {
                return response()->json(['message' => 'No hay productos en este carrito.'], 200);
            }

            return response()->json($productos);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener los productos del carrito', 'error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request, $carritoId)
    {
        try {
            $request->validate([
                'producto_id' => 'nullable|exists:productos,id',
                'cantidad' => 'nullable|integer|min:1',
            ]);

            $existingCarritoProducto = CarritoProducto::where('carrito_id', $carritoId)
                ->where('producto_id', $request->producto_id)
                ->first();

            if ($existingCarritoProducto) {
                $existingCarritoProducto->cantidad += $request->cantidad;
                $existingCarritoProducto->save();
            } else {
                CarritoProducto::create([
                    'carrito_id' => $carritoId,
                    'producto_id' => $request->producto_id,
                    'cantidad' => $request->cantidad,
                ]);
            }

            return response()->json(['message' => 'Producto agregado al carrito'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al agregar el producto al carrito', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $carritoId, $productoId)
    {
        $request->validate([
            'cantidad' => 'nullable|integer|min:1',
        ]);

        $carritoProducto = CarritoProducto::where('carrito_id', $carritoId)
            ->where('producto_id', $productoId)
            ->first();

        if (!$carritoProducto) {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }

        $carritoProducto->cantidad = $request->cantidad;
        $carritoProducto->save();

        return response()->json(['message' => 'Cantidad actualizada'], 200);
    }

    public function destroy($carritoId, $productoId)
    {
        $carritoProducto = CarritoProducto::where('carrito_id', $carritoId)
            ->where('producto_id', $productoId)
            ->first();

        if (!$carritoProducto) {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }

        $carritoProducto->delete();

        return response()->json(['message' => 'Producto eliminado del carrito'], 200);
    }
}
