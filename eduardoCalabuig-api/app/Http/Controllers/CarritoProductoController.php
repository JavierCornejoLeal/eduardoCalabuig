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
        // Buscar el carrito por su ID
        $carrito = Carrito::find($carritoId);

        if (!$carrito) {
            return response()->json(['message' => 'Carrito no encontrado'], 404);
        }

        // Obtener el usuario autenticado usando JWTAuth
        $user = JWTAuth::user();  // Usamos JWTAuth para obtener el usuario autenticado

        // Verificar si el carrito pertenece al usuario autenticado
        if ($carrito->usuario_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para ver este carrito'], 403);
        }

        // Obtener los productos del carrito
        $productos = $carrito->productos;
        return response()->json($productos);  // Devolver los productos
    }


    /**
     * Agregar un producto al carrito.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $carritoId
     * @return \Illuminate\Http\Response
     */
public function store(Request $request, $carritoId)
{
    // Validar los datos recibidos
    $request->validate([
        'producto_id' => 'nullable|exists:productos,id',  // Acepta null como valor de producto_id
        'cantidad' => 'nullable|integer|min:1',  // La cantidad también puede ser null inicialmente
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
            'producto_id' => $request->producto_id,  // Puede ser null
            'cantidad' => $request->cantidad,  // Puede ser null
        ]);
    }

    return response()->json(['message' => 'Producto agregado al carrito'], 201);
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
