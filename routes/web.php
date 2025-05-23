<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })
            ->name('dashboard');

        Route::get('projects', [ProjectController::class, 'index'])
            ->name('projects.index');

        Route::get('/projects/{id}', [ProjectController::class, 'show'])
            ->name('projects.show');

        Route::post('/projects', [ProjectController::class, 'store'])
            ->name('projects.store');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
