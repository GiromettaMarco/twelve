<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
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

        Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])
            ->name('projects.destroy');

        Route::patch('/projects', [ProjectController::class, 'reorder'])
            ->name('projects.reorder');

        Route::patch('/projects/{id}/info', [ProjectController::class, 'updateInfo'])
            ->name('projects.updateInfo');

        Route::patch('/projects/{id}/deadline', [ProjectController::class, 'updateDeadline'])
            ->name('projects.updateDeadline');

        Route::post('/projects/{project}/tasks', [TaskController::class, 'store'])
            ->name('tasks.store');

        Route::delete('/projects/{project}/tasks/{id}', [TaskController::class, 'destroy'])
            ->name('tasks.destroy');

        Route::patch('/projects/{project}/tasks/{id}/info', [TaskController::class, 'updateInfo'])
            ->name('tasks.updateInfo');

        Route::patch('/projects/{project}/tasks/{id}/label', [TaskController::class, 'updateLabel'])
            ->name('tasks.updateLabel');

        Route::patch('/projects/{project}/tasks/{id}/status', [TaskController::class, 'updateStatus'])
            ->name('tasks.updateStatus');

        Route::patch('/projects/{project}/tasks/{id}/priority', [TaskController::class, 'updatePriority'])
            ->name('tasks.updatePriority');

        Route::patch('/projects/{project}/tasks/{id}/position', [TaskController::class, 'updatePosition'])
            ->name('tasks.updatePosition');

        Route::get('users', [UserController::class, 'index'])
            ->name('users.index');
    });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::fallback(function () {
    return Inertia::render('errors/404')
        ->toResponse(request())
        ->setStatusCode(404);
});
