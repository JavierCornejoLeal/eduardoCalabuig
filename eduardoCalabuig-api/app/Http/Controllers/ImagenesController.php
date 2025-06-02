<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;




class ImagenesController extends Controller
{
    /**
     * Subir una nueva imagen para un producto.
     */
    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|uuid|exists:productos,id',
            'imagen' => 'required|image|max:2048',
        ]);

        // Guardar la imagen en disco en carpeta "productos"
        $path = $request->file('imagen')->store('productos', 'public');

        // Crear registro en la BD
        $imagen = Imagen::create([
            'id' => (string) Str::uuid(),
            'producto_id' => $request->producto_id,
            'url' => $path,
        ]);

        return response()->json([
            'message' => 'Imagen subida correctamente',
            'imagen' => $imagen,
        ], 201);
    }

    /**
     * Obtener imágenes de un producto.
     */
    public function index($productoId)
    {
        $imagenes = Imagen::where('producto_id', $productoId)->get();

        return response()->json($imagenes);
    }

    /**
     * Eliminar una imagen.
     */
    public function destroy($id)
    {
        $imagen = Imagen::findOrFail($id);

        // Borrar archivo físico
        Storage::disk('public')->delete($imagen->url);

        // Borrar registro BD
        $imagen->delete();

        return response()->json(['message' => 'Imagen eliminada correctamente']);
    }
}
