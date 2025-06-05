<?php

namespace App\Http\Controllers;

use App\Models\CarritoProducto;
use App\Models\Carrito;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CarritoProductoController extends Controller
{
    /**
     * Mostrar todos los productos en un carrito.
     *
     * @param  string  $carritoId
     * @return \Illuminate\Http\Response
     */
    public function index($carritoId)
    {
        try {
            // Buscar el carrito por su ID
            $carrito = Carrito::find($carritoId);
            if (!$carrito) {
                return response()->json(['message' => 'Carrito no encontrado'], 404);
            }

            // Obtener los productos del carrito
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

            // Verificar si el producto ya está en el carrito
            $existingCarritoProducto = CarritoProducto::where('carrito_id', $carritoId)
                ->where('producto_id', $request->producto_id)
                ->first();

            if ($existingCarritoProducto) {
                // Si el producto ya existe en el carrito, solo actualizamos la cantidad
                $existingCarritoProducto->cantidad += $request->cantidad;
                $existingCarritoProducto->save();
            } else {
                // Si el producto no está en el carrito, lo agregamos
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



    /**
     * Actualizar la cantidad de un producto en el carrito.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $carritoId
     * @param  string  $productoId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $carritoId, $productoId)
    {
        // Validar los datos recibidos
        $request->validate([
            'cantidad' => 'nullable|integer|min:1',  // Permitimos null
        ]);

        // Buscar el producto en el carrito
        $carritoProducto = CarritoProducto::where('carrito_id', $carritoId)
            ->where('producto_id', $productoId)
            ->first();

        if (!$carritoProducto) {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }

        // Actualizar la cantidad
        $carritoProducto->cantidad = $request->cantidad;
        $carritoProducto->save();

        return response()->json(['message' => 'Cantidad actualizada'], 200);
    }


    /**
     * Eliminar un producto del carrito.
     *
     * @param  string  $carritoId
     * @param  string  $productoId
     * @return \Illuminate\Http\Response
     */
    public function destroy($carritoId, $productoId)
    {
        // Buscar el producto en el carrito
        $carritoProducto = CarritoProducto::where('carrito_id', $carritoId)
            ->where('producto_id', $productoId)
            ->first();

        if (!$carritoProducto) {
            return response()->json(['message' => 'Producto no encontrado en el carrito'], 404);
        }

        // Eliminar el producto
        $carritoProducto->delete();

        return response()->json(['message' => 'Producto eliminado del carrito'], 200);
    }
}
