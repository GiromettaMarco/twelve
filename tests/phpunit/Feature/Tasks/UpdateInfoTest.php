<?php

namespace Tests\PhpUnit\Feature\Tasks;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class UpdateInfoTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_task_info()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project */
        $project = $user->projects()->first();

        /** @var Task $task_old */
        $task_old = $project->tasks()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project->id/tasks/$task_old->id/info", [
                'title' => 'Updated task',
                'description' => 'unique string sdgsdfg8',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Task updated')
                            ->etc()
                    )
            );

        $task_new = Task::where('description', 'unique string sdgsdfg8')->first();

        $this->assertTrue($task_new?->title === 'Updated task');
    }
}
