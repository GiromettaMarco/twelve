<?php

namespace App\Http\Controllers;

use App\Helpers\FlashMessage;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateLabelRequest;
use App\Http\Requests\Task\UpdatePriorityRequest;
use App\Http\Requests\Task\UpdateStatusRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreTaskRequest $request, string $project_id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Project $project */
        $project = $user->projects()->with('tasks')->findOrFail($project_id);

        // Clamp position
        $position = min($request->validated('position', 0), $project->tasks->count());

        // Create new model
        $task = new Task([
            'title' => $request->validated('title'),
            'position' => $position,
            'description' => $request->validated('description', null),
        ]);

        // Associate label
        $label_id = $request->validated('label_id');
        if (isset($label_id)) {
            $task->label()->associate($label_id);
        }

        // Associate status and priority
        $task->status()->associate($request->validated('status_id', 2)); // todo
        $task->priority()->associate($request->validated('priority_id', 2)); // medium

        if ($project->tasks->count() > 0) {
            // Prepare to reset positions
            [$query, $bindings] = $this->getResetPositionsQuery($project->tasks, $position);

            dd($bindings);

            DB::transaction(function () use ($project, $task, $query, $bindings) {
                // Save the resource
                $project->tasks()->save($task);

                // Reorder resources
                DB::update($query, $bindings);
            });
        } else {
            // Save the resource
            $project->tasks()->save($task);
        }

        // Redirect with flash message
        return to_route('projects.show', $project_id)
            ->with('flash', new FlashMessage(__('Task created'), 'success'));
    }

    /**
     * Update the task label.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateLabel(UpdateLabelRequest $request, string $project_id, string $id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Project $project */
        $project = $user->projects()->findOrFail($project_id);

        /** @var Task $task */
        $task = Task::whereBelongsTo($project)->findOrFail($id);

        // Save relationship
        $task->label()->associate($request->validated('label_id', null));
        $task->save();

        // Redirect with flash message
        return to_route('projects.show', ['id' => $project_id])
            ->with('flash', new FlashMessage(__('Label updated'), 'success'));
    }

    /**
     * Update the task status.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateStatus(UpdateStatusRequest $request, string $project_id, string $id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Project $project */
        $project = $user->projects()->findOrFail($project_id);

        /** @var Task $task */
        $task = Task::whereBelongsTo($project)->findOrFail($id);

        // Save relationship
        $task->status()->associate($request->validated('status_id'));
        $task->save();

        // Redirect with flash message
        return to_route('projects.show', ['id' => $project_id])
            ->with('flash', new FlashMessage(__('Status updated'), 'success'));
    }

    /**
     * Update the task priority.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePriority(UpdatePriorityRequest $request, string $project_id, string $id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Project $project */
        $project = $user->projects()->findOrFail($project_id);

        /** @var Task $task */
        $task = Task::whereBelongsTo($project)->findOrFail($id);

        // Save relationship
        $task->priority()->associate($request->validated('priority_id'));
        $task->save();

        // Redirect with flash message
        return to_route('projects.show', ['id' => $project_id])
            ->with('flash', new FlashMessage(__('Priority updated'), 'success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $project_id, string $id)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Project $project */
        $project = $user->projects()->with('tasks')->findOrFail($project_id);

        // Collect related projects
        $project_tasks = $project->tasks;

        // Find the requested resource with Collection key
        [$task_key, $task] = $project_tasks->firstWithKey('id', intval($id));

        // Fail if not found
        if (! isset($task)) {
            abort(404);
        }

        // Remove the resource from its collection
        $project_tasks->forget($task_key);

        if ($project_tasks->count() > 0) {
            // Prepare to reset positions
            [$query, $bindings] = $this->getResetPositionsQuery($project_tasks);

            // Use transaction for optimization and safety
            DB::transaction(function () use ($task, $query, $bindings) {
                // Delete the resource
                $task->delete();

                // Reorder resources
                DB::update($query, $bindings);
            });
        } else {
            // Delete the resource
            $task->delete();
        }

        // Redirect with flash message
        return to_route('projects.show', $project_id)
            ->with('flash', new FlashMessage(__('Task deleted'), 'success'));
    }

    /**
     * Get query and bindings for resetting the position of a collection of tasks.
     *
     * @param  \Illuminate\Database\Eloquent\Collection<int, \App\Models\Task>  $tasks
     * @param  int|null  $insert  (optional) Start shifting from this position if set
     * @return array
     */
    private function getResetPositionsQuery($tasks, ?int $insert = null)
    {
        $table = Task::getModel()->getTable();

        $cases = [];
        $ids = [];
        $bindings = [];

        // Use values() to have the collection keys without gap
        $tasks->values()->each(function (Task $task, int $key) use (&$cases, &$bindings, &$ids, $insert) {
            $cases[] = "WHEN {$task->id} THEN ?";
            $bindings[] = (isset($insert) && $key >= $insert) ? $key + 1 : $key;
            $ids[] = $task->id;
        });

        $ids = implode(',', $ids);
        $cases = implode(' ', $cases);
        $bindings[] = Carbon::now();

        $query = "UPDATE \"$table\" SET \"position\" = (CASE \"id\" $cases END)::int, \"updated_at\" = ? WHERE \"id\" in ($ids)";

        return [$query, $bindings];
    }
}
