<?php

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ImagenesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Rutas sin autenticación (registro y login)
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas para productos
Route::get('productos/slug/{slug}', [ProductoController::class, 'getBySlug']);
Route::apiResource('productos', ProductoController::class);

// Rutas para imágenes
Route::post('/imagenes', [ImagenesController::class, 'store']);
Route::get('/productos/{productoId}/imagenes', [ImagenesController::class, 'index']);
Route::delete('/imagenes/{id}', [ImagenesController::class, 'destroy']);

// Rutas para los usuarios (protegidas por JWT)
Route::middleware(['jwt.auth'])->group(function () {
    Route::get('usuarios', [UserController::class, 'index']);  // Obtener todos los usuarios
    Route::get('usuarios/{id}', [UserController::class, 'show']);  // Obtener un usuario específico
    Route::put('usuarios/{id}', [UserController::class, 'update']);  // Actualizar un usuario existente
    Route::delete('usuarios/{id}', [UserController::class, 'destroy']);  // Eliminar un usuario
    Route::post('usuarios/{userId}/assign-role', [UserController::class, 'assignRoleToUser']);  // Asignar un rol a un usuario
    Route::post('usuarios', [UserController::class, 'store']);  // Crear un nuevo usuario
});

// Rutas para los roles (protegidas por JWT)
Route::middleware(['jwt.auth'])->group(function () {
    Route::get('roles', [RoleController::class, 'index']);
    Route::get('roles/{id}', [RoleController::class, 'show']);
    Route::post('roles', [RoleController::class, 'store']);
    Route::put('roles/{id}', [RoleController::class, 'update']);
    Route::delete('roles/{id}', [RoleController::class, 'destroy']);
});

// Ruta para asignar un rol a un usuario
