<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show all resources
     */
    public function index(): Response
    {
        $users = User::with(['projects'])
            ->orderBy('name')
            ->get();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }
}
