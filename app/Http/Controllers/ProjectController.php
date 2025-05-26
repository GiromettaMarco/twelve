<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
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
            ->orderBy('id')
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

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProjectRequest $request)
    {
        $project = new Project($request->validated());

        $project->save();

        $project->users()->attach(Auth::user()->id);

        return to_route('projects.show', ['id' => $project->id]);
    }
}
