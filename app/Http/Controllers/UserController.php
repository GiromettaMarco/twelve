<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show all resources
     */
    public function index(): Response
    {
        if (! Gate::allows('view-users')) {
            abort(403);
        }

        $users = User::with(['projects', 'permissions'])
            ->orderBy('name')
            ->get();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }
}
