<?php

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ImagenesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\CarritoProductoController;
use Illuminate\Support\Facades\Route;

// Rutas sin autenticación (registro y login)
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Nueva ruta para login sólo Admin:
Route::post('loginApp', [AuthController::class, 'loginApp']);

// Rutas para productos
Route::get('productos/slug/{slug}', [ProductoController::class, 'getBySlug']);
Route::apiResource('productos', ProductoController::class);

// Rutas para imágenes
Route::post('/imagenes', [ImagenesController::class, 'store']);
Route::get('/productos/{productoId}/imagenes', [ImagenesController::class, 'index']);
Route::delete('/imagenes/{id}', [ImagenesController::class, 'destroy']);


Route::get('usuarios', [UserController::class, 'index']);  // Obtener todos los usuarios
Route::get('usuarios/{id}', [UserController::class, 'show']);  // Obtener un usuario específico
Route::put('usuarios/{id}', [UserController::class, 'update']);  // Actualizar un usuario existente
Route::delete('usuarios/{id}', [UserController::class, 'destroy']);  // Eliminar un usuario
Route::post('usuarios/{userId}/assign-role', [UserController::class, 'assignRoleToUser']);  // Asignar un rol a un usuario
Route::post('usuarios', [UserController::class, 'store']);  // Crear un nuevo usuario



Route::get('roles', [RoleController::class, 'index']);
Route::get('roles/{id}', [RoleController::class, 'show']);
Route::post('roles', [RoleController::class, 'store']);
Route::put('roles/{id}', [RoleController::class, 'update']);
Route::delete('roles/{id}', [RoleController::class, 'destroy']);



// Rutas para gestionar los carritos
Route::get('carritos/{carritoId}', [CarritoController::class, 'show']);  // Obtener un carrito específico
Route::post('carritos', [CarritoController::class, 'store']);  // Crear un nuevo carrito
Route::put('carritos/{carritoId}', [CarritoController::class, 'update']);  // Actualizar carrito
Route::delete('carritos/{carritoId}', [CarritoController::class, 'destroy']);  // Eliminar un carrito

// Rutas para gestionar los productos dentro de un carrito
Route::get('carritos/{carritoId}/productos', [CarritoProductoController::class, 'index']);  // Ver productos en un carrito
Route::post('carritos/{carritoId}/productos', [CarritoProductoController::class, 'store']);  // Agregar un producto al carrito
Route::put('carritos/{carritoId}/productos/{productoId}', [CarritoProductoController::class, 'update']);  // Actualizar cantidad de un producto en el carrito
Route::delete('carritos/{carritoId}/productos/{productoId}', [CarritoProductoController::class, 'destroy']);  // Eliminar producto del carrito

// Ruta para asignar un rol a un usuario
