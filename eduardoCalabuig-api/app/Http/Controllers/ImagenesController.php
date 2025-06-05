<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;




class ImagenesController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'producto_id' => 'required|uuid|exists:productos,id',
            'imagen' => 'required|image|max:2048',
        ]);

        $path = $request->file('imagen')->store('productos', 'public');

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

    public function index($productoId)
    {
        $imagenes = Imagen::where('producto_id', $productoId)->get();

        return response()->json($imagenes);
    }

    public function destroy($id)
    {
        $imagen = Imagen::findOrFail($id);

        Storage::disk('public')->delete($imagen->url);

        $imagen->delete();

        return response()->json(['message' => 'Imagen eliminada correctamente']);
    }
}
