<?php

namespace Tests\PhpUnit\Feature\Tasks;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class DeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_delete_task()
    {
        $this->actingAs(User::first());

        $this
            ->followingRedirects()
            ->delete('/dashboard/projects/1/tasks/1')
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Task deleted')
                            ->etc()
                    )
            );
    }

    public function test_new_users_can_delete_task()
    {
        $this->actingAs(User::factory()->create());

        $this
            ->followingRedirects()
            ->post('/dashboard/projects', [
                'title' => 'New project',
                'description' => 'unique string bkifv',
                'deadline' => '2025-12-31',
            ])
            ->assertOk();

        $project = Project::where('description', 'unique string bkifv')->first();

        $this->assertTrue($project?->title === 'New project');

        $this
            ->followingRedirects()
            ->post("/dashboard/projects/$project->id/tasks", [
                'title' => 'New task',
                'position' => '0',
                'description' => 'unique string weghnvc',
                'label_id' => '2',
                'status_id' => '2',
                'priority_id' => '2',
            ])
            ->assertOk();

        $task = Task::where('description', 'unique string weghnvc')->first();

        $this->assertTrue($task?->title === 'New task');

        $this
            ->followingRedirects()
            ->delete("/dashboard/projects/{$project->id}/tasks/{$task->id}")
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Task deleted')
                            ->etc()
                    )
            );
    }
}
