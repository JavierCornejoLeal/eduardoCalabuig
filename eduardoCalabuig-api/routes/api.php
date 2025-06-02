<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ImagenesController;

Route::apiResource('productos', ProductoController::class);

Route::post('/imagenes', [ImagenesController::class, 'store']);
Route::get('/productos/{productoId}/imagenes', [ImagenesController::class, 'index']);
Route::delete('/imagenes/{id}', [ImagenesController::class, 'destroy']);

