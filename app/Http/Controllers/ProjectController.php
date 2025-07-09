<?php

namespace App\Http\Controllers;

use App\Helpers\FlashMessage;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateDeadlineRequest;
use App\Http\Requests\Project\UpdateInfoRequest;
use App\Models\Label;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
            'labels' => Label::all(),
            'statuses' => Status::all(),
            'priorities' => Priority::all(),
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

        // Create new model
        $project = new Project($request->validated());

        $user_projects = $user->projects;

        if ($user_projects->count() > 0) {
            // Prepare to reset positions
            [$query, $bindings] = $this->getResetPositionsQuery($user->projects, $user->id, 0);

            // Use transaction for optimization and safety
            DB::transaction(function () use ($project, $query, $bindings, $user) {
                // Save the resource
                $project->save();

                // Reorder resources
                DB::update($query, $bindings);

                // Attach the new project
                $user->projects()->attach($project->id, [
                    'position' => 0,
                    'role' => 'admin',
                ]);
            });
        } else {
            // Use transaction for optimization and safety
            DB::transaction(function () use ($project, $user) {
                // Save the resource
                $project->save();

                // Attach the new project
                $user->projects()->attach($project->id, [
                    'position' => 0,
                    'role' => 'admin',
                ]);
            });
        }

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

        // Find the requested resource with Collection key
        [$project_key, $project] = $user_projects->firstWithKey('id', intval($id));

        // Fail if not found
        if (! isset($project)) {
            abort(404);
        }

        // Remove the resource from its collection
        $user_projects->forget($project_key);

        if ($user_projects->count() > 0) {
            // Prepare to reset positions
            [$query, $bindings] = $this->getResetPositionsQuery($user_projects, $user->id);

            // Use transaction for optimization and safety
            DB::transaction(function () use ($project, $query, $bindings) {
                // Delete the resource
                $project->delete();

                // Reorder resources
                DB::update($query, $bindings);
            });
        } else {
            // Delete the resource
            $project->delete();
        }

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

        // Use transaction for optimization and safety
        DB::transaction(function () use ($projects, $data, $user) {
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
        });

        // Redirect with flash message
        return to_route('projects.index')
            ->with('flash', new FlashMessage(__('Projects reordered'), 'success'));
    }

    /**
     * Get query and bindings for resetting the position of a collection of projects.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project>  $projects
     * @param  int  $user_id
     * @param  int|null  $insert  (optional) Start shifting from this position if set
     * @return array
     */
    private function getResetPositionsQuery($projects, $user_id, ?int $insert = null)
    {
        $table = Project::getModel()->users()->getTable();

        $cases = [];
        $ids = [];
        $bindings = [];

        // Use values() to have the collection keys without gap
        $projects->values()->each(function (Project $project, int $key) use (&$cases, &$bindings, &$ids, $insert) {
            $cases[] = "WHEN {$project->id} THEN ?";
            $bindings[] = (isset($insert) && $key >= $insert) ? $key + 1 : $key;
            $ids[] = $project->id;
        });

        $ids = implode(',', $ids);
        $cases = implode(' ', $cases);
        $bindings[] = Carbon::now();

        $case = "CASE \"project_id\" $cases END";

        // @NOTE postgres fix
        if (env('DB_CONNECTION') === 'pgsql') {
            // @codeCoverageIgnoreStart
            $case = "($case)::int";
            // @codeCoverageIgnoreEnd
        }

        $update = "UPDATE \"$table\"";
        $set = "SET \"position\" = $case, \"updated_at\" = ?";
        $where = "WHERE \"user_id\" = $user_id AND \"project_id\" in ($ids)";

        $query = "$update $set $where";

        return [$query, $bindings];
    }
}
