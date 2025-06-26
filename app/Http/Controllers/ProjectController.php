<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Show all resources
     */
    public function index(Request $request): Response
    {
        // Gate::authorize('viewProjects', [Team::class, $team_id]);

        // Make sure user exists
        $user = $request->user();
        if (! is_a($user, User::class)) {
            abort(403);
        }

        // Render the page
        return Inertia::render('projects/index', [
            'projects' => $user->projects()
                ->where('archived', false)
                ->with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])
                ->get(),
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
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProjectRequest $request)
    {
        // Make sure user exists
        $user = $request->user();
        if (! is_a($user, User::class)) {
            abort(403);
        }

        // Create and save
        $project = new Project($request->validated());
        $project->save();

        // Shift related projects
        $user->projects->each(function (Project $project, int $key) use ($user) {
            $project->users()->updateExistingPivot($user->id, [
                'position' => $key + 1,
            ]);
        });

        // Attach the new project
        $user->projects()->attach($project->id, [
            'position' => 0,
            'role' => 'admin',
        ]);

        // Render the page
        return to_route('projects.index')->with([
            'flash.title' => __('Project created'),
            'flash.level' => 'success',
        ]);
    }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(string $id)
    {
        // @TODO add gate (avoid deletion of unrelated projects)

        $project = Project::findOrFail($id);

        $project->delete();

        return to_route('projects.index')->with([
            'flash.title' => __('Project deleted'),
            'flash.level' => 'success',
        ]);
    }
}
