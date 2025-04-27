<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Show all resources
     */
    public function index(): Response
    {
        // Gate::authorize('viewProjects', [Team::class, $team_id]);

        $projects = Project::with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])
            ->whereHas('users', function (Builder $query) {
                $query->where('users.id', '=', Auth::user()->id);
            })
            ->where('archived', false)
            ->get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the resource
     *
     * Without Route Model Binding.
     * With 404 if not authorized.
     */
    public function show(string $id): Response
    {
        $project = Project::with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])
            ->whereHas('users', function (Builder $query) {
                $query->where('users.id', Auth::user()->id);
            })
            ->findOrFail($id);

        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Show the resource
     *
     * Without Route Model Binding.
     */
    // public function show(string $id): Response
    // {
    //     $project = Project::with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])->findOrFail($id);

    //     // Gate::authorize('view', $project);

    //     return Inertia::render('projects/show', [
    //         'project' => $project,
    //     ]);
    // }
}
