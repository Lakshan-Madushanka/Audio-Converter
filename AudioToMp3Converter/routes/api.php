<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// User Routes
Route::group(['prefix' => 'users'], function () {
    Route::apiResource('/', \App\Http\Controllers\UserController::class, ['only' => 'store']);
    Route::get('/{user}/verify/{token}', [\App\Http\Controllers\UserController::class, 'verify'])->name('verify');
    Route::get('/{user}/resend', [\App\Http\Controllers\UserController::class, 'resend'])->name('resend');

});

Route::apiResource('users.music', \App\Http\Controllers\UserMusicController::class, ['only' => 'store']);
Route::post('users/{user}/convert', [\App\Http\Controllers\UserMusicController::class, 'convert']);
Route::get('users/{user}/download', [\App\Http\Controllers\UserMusicController::class, 'download']);
Route::get('users/{user}/history', [\App\Http\Controllers\UserMusicController::class, 'history']);
