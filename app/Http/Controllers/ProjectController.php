<?php

namespace App\Http\Controllers;

use App\Helpers\FlashMessage;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateDeadlineRequest;
use App\Http\Requests\Project\UpdateInfoRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Show all resources
     */
    public function index(Request $request): Response
    {
        // Render the page
        return Inertia::render('projects/index', [
            'projects' => $request->user()->projects()
                ->where('archived', false)
                ->with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])
                ->get(),
        ]);
    }

    /**
     * Show the resource
     *
     * Get the project with related tasks and fail with 404 if not found or not realted to user.
     */
    public function show(Request $request, string $id): Response
    {
        // Render the page
        return Inertia::render('projects/show', [
            'project' => $request->user()->projects()
                ->with(['tasks', 'tasks.label', 'tasks.status', 'tasks.priority'])
                ->findOrFail($id),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreProjectRequest $request)
    {
        // Get user
        $user = $request->user();

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

        // Redirect with flash message
        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Project created'), 'success'));
    }

    /**
     * Update the project title and description.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateInfo(UpdateInfoRequest $request, string $id)
    {
        // Get the project and save changes
        $request->user()->projects()->findOrFail($id)
            ->update([
                'title' => $request->validated('title'),
                'description' => $request->validated('description', null),
            ]);

        // Redirect with flash message
        return to_route('projects.show', ['id' => $id])
            ->with('flash', new FlashMessage(__('Project updated'), 'success'));
    }

    /**
     * Update the project deadline.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateDeadline(UpdateDeadlineRequest $request, string $id)
    {
        // Get the project and save changes
        $request->user()->projects()->findOrFail($id)
            ->update([
                'deadline' => $request->validated('deadline', null),
            ]);

        // Redirect with flash message
        return to_route('projects.show', ['id' => $id])
            ->with('flash', new FlashMessage(__('Deadline updated'), 'success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $id)
    {
        // Get user
        $user = $request->user();

        // Collect related projects
        $user_projects = $user->projects;

        // Prepare to collect the requested resource
        /** @var Project|null $project */
        $project = null;
        /** @var int|null $project_key */
        $project_key = null;

        // Search for the resource in the collection
        $user_projects->each(function (Project $user_project, int $key) use ($id, &$project, &$project_key) {
            if (strval($user_project->id) === $id) {
                // Save value and key
                $project = $user_project;
                $project_key = $key;

                // Stop iterating
                return false;
            }
        });

        // Fail if not found
        if (! isset($project)) {
            abort(404);
        }

        // Delete the resource
        $project->delete();

        // Remove the resource from its collection
        $user_projects->forget($project_key);

        // Reorder related projects
        $user_projects->each(function (Project $user_project, int $key) use ($user) {
            $user_project->users()->updateExistingPivot($user->id, [
                'position' => $key - 1,
            ]);
        });

        // Redirect with flash message
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

    /**
     * Change the position attribute of multiple projects at once.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function reorder(Request $request)
    {
        // Get user
        $user = $request->user();

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

        // Redirect with flash message
        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Projects reordered'), 'success'));
    }
}
