<?php

namespace App\Http\Controllers;

use App\Helpers\FlashMessage;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateLabelRequest;
use App\Http\Requests\Task\UpdatePositionRequest;
use App\Http\Requests\Task\UpdatePriorityRequest;
use App\Http\Requests\Task\UpdateStatusRequest;
use App\Models\Project;
use App\Models\Task;
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
        /** @var Project $project */
        $project = $request->user()->projects()->with('tasks')->findOrFail($project_id);

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
        /** @var Task $task */
        $task = $request->user()->projects()->findOrFail($project_id)->tasks()->findOrFail($id);

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
        /** @var Task $task */
        $task = $request->user()->projects()->findOrFail($project_id)->tasks()->findOrFail($id);

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
        /** @var Task $task */
        $task = $request->user()->projects()->findOrFail($project_id)->tasks()->findOrFail($id);

        // Save relationship
        $task->priority()->associate($request->validated('priority_id'));
        $task->save();

        // Redirect with flash message
        return to_route('projects.show', ['id' => $project_id])
            ->with('flash', new FlashMessage(__('Priority updated'), 'success'));
    }

    /**
     * Update the task position.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updatePosition(UpdatePositionRequest $request, string $project_id, string $id)
    {
        /** @var Project $project */
        $project = $request->user()->projects()->with('tasks')->findOrFail($project_id);

        // Collect related projects
        $project_tasks = $project->tasks;

        // Find the requested resource with Collection key
        $task = $project_tasks->firstWhere('id', $id);

        // Fail if not found
        if (! isset($task)) {
            abort(404);
        }

        // Collect positions
        $old_position = $task->position;
        $new_position = (int) $request->validated('position');

        if ($project_tasks->count() > 0) {
            if ($old_position > $new_position) {
                // Filter tasks
                $tasks_to_reorder = $project_tasks->filter(function ($project_task) use ($old_position, $new_position) {
                    return $project_task->position >= $new_position && $project_task->position < $old_position;
                });

                // Prepare to reset positions
                [$query, $bindings] = $this->getResetPositionsQuery($tasks_to_reorder, from: $new_position + 1);
            } elseif ($old_position < $new_position) {
                // Filter tasks
                $tasks_to_reorder = $project_tasks->filter(function ($project_task) use ($old_position, $new_position) {
                    return $project_task->position > $old_position && $project_task->position <= $new_position;
                });

                // Prepare to reset positions
                [$query, $bindings] = $this->getResetPositionsQuery($tasks_to_reorder, from: $old_position);
            }

            if (isset($query, $bindings)) {
                // Use transaction for optimization and safety
                DB::transaction(function () use ($request, $task, $query, $bindings) {
                    // Update the resource
                    $task->update($request->validated());

                    // Reorder resources
                    DB::update($query, $bindings);
                });
            }
        } else {
            // Update the resource
            if ($old_position != $new_position) {
                $task->update(['position' => $new_position]);
            }
        }

        // Redirect with flash message
        return to_route('projects.show', ['id' => $project_id])
            ->with('flash', new FlashMessage(__('Position updated'), 'success'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $project_id, string $id)
    {
        /** @var Project $project */
        $project = $request->user()->projects()->with('tasks')->findOrFail($project_id);

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
     * @param  int  $delta  (optional) If $insert is set, shift by this ammount
     * @param  int  $from  (optional) Start counting from ...
     * @return array
     */
    private function getResetPositionsQuery($tasks, ?int $insert = null, $delta = 1, $from = 0)
    {
        $table = Task::getModel()->getTable();

        $cases = [];
        $ids = [];
        $bindings = [];

        // Use values() to have the collection keys without gap
        $tasks->values()->each(function (Task $task, int $key) use (&$cases, &$bindings, &$ids, $insert, $delta, $from) {
            $cases[] = "WHEN {$task->id} THEN ?";
            $bindings[] = $from + ((isset($insert) && $key >= $insert) ? $key + $delta : $key);
            $ids[] = $task->id;
        });

        $ids = implode(',', $ids);
        $cases = implode(' ', $cases);
        $bindings[] = Carbon::now();

        $case = "CASE \"id\" $cases END";

        // @NOTE postgres fix
        if (env('DB_CONNECTION') === 'pgsql') {
            // @codeCoverageIgnoreStart
            $case = "($case)::int";
            // @codeCoverageIgnoreEnd
        }

        $update = "UPDATE \"$table\"";
        $set = "SET \"position\" = $case, \"updated_at\" = ?";
        $where = "WHERE \"id\" in ($ids)";

        $query = "$update $set $where";

        return [$query, $bindings];
    }
}
