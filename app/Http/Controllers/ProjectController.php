<?php

namespace App\Http\Controllers;

use App\Helpers\FlashMessage;
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
        if (! $user instanceof User) {
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
        if (! $user instanceof User) {
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
        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Project created'), 'success'));
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

        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Project deleted'), 'success'));
    }

    /**
     * Return to the projects index and print a flash error message.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function failReorder()
    {
        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Reorder operation failed'), 'error'));
    }

    public function reorder(Request $request)
    {
        // Make sure user exists
        $user = $request->user();
        if (! $user instanceof User) {
            abort(403);
        }

        // Recover data
        $data = $request->input('data');

        // Validate data type
        if (! isset($data) || ! is_array($data)) {
            return $this->failReorder();
        }

        // Collect project ids
        $project_ids = [];

        // Validate individual entries
        foreach ($data as $value) {
            if (
                ! array_key_exists('id', $value) ||
                ! array_key_exists('position', $value) ||
                (! is_int($value['id']) && ! is_string($value['id'])) ||
                ! is_int($value['position']) ||
                ! ($value['position'] >= 0 && $value['position'] <= 4294967295)
            ) {
                return $this->failReorder();
            }

            $project_ids[] = $value['id'];
        }

        // Query projects
        $projects = $user->projects()->findMany($project_ids);

        // Find all or fail
        if (! count($project_ids) == $projects->count()) {
            return $this->failReorder();
        }

        // Update positions
        $projects->each(function (Project $project) use ($data, $user) {
            foreach ($data as $value) {
                if ($value['id'] == $project->id) {
                    $project->users()->updateExistingPivot($user->id, [
                        'position' => $value['position'],
                    ]);

                    continue;
                }
            }
        });

        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Projects reordered'), 'success'));
    }
}
