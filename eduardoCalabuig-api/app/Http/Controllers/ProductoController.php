<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // Listar todos los productos con imágenes
    public function index()
    {
        $productos = Producto::with('imagenes')->get();
        return response()->json($productos);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'alto' => 'nullable|string|max:255',
            'ancho' => 'nullable|string|max:255',
            'profundidad' => 'nullable|string|max:255',
            'precio' => 'required|numeric',
            'material' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'required|string',
            'cantidad' => 'required|numeric',
            'imagen' => 'nullable|image|max:2048',  // imagen opcional
            'slug' => 'nullable|string|max:255|unique:productos,slug',
        ]);

        // Generar slug único a partir del nombre
        $baseSlug = Str::slug($validated['nombre']);
        $slug = $baseSlug;
        $contador = 1;
        while (Producto::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $contador++;
        }
        $validated['slug'] = $slug;

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('productos', 'public');
            $validated['imagen'] = $path;
        }

        $producto = Producto::create($validated);

        return response()->json($producto, 201);
    }

    // Mostrar un producto por id con imágenes
    public function show($id)
    {
        $producto = Producto::with('imagenes')->find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    // Mostrar un producto por slug con imágenes
    public function getBySlug($slug)
    {
        $producto = Producto::with('imagenes')->where('slug', $slug)->first();

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'alto' => 'nullable|string|max:255',
            'ancho' => 'nullable|string|max:255',
            'profundidad' => 'nullable|string|max:255',
            'precio' => 'required|numeric',
            'material' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'required|string',
            'cantidad' => 'required|numeric',
            'imagen' => 'nullable|image|max:2048',
            'slug' => 'nullable|string|max:255|unique:productos,slug,' . $id,
        ]);

        if (isset($validated['nombre']) && $validated['nombre'] !== $producto->nombre) {
            $baseSlug = Str::slug($validated['nombre']);
            $slug = $baseSlug;
            $contador = 1;
            while (Producto::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $baseSlug . '-' . $contador++;
            }
            $validated['slug'] = $slug;
        }

        if ($request->hasFile('imagen')) {
            if ($producto->imagen) {
                Storage::disk('public')->delete($producto->imagen);
            }
            $path = $request->file('imagen')->store('productos', 'public');
            $validated['imagen'] = $path;
        }

        $producto->update($validated);

        return response()->json($producto);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $producto = Producto::find($id);

        if (!$producto) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        if ($producto->imagen) {
            Storage::disk('public')->delete($producto->imagen);
        }

        $producto->delete();

        return response()->json(['message' => 'Producto eliminado correctamente']);
    }
}
