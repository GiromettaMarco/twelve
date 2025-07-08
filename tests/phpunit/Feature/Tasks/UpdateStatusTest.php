<?php

namespace Tests\PhpUnit\Feature\Tasks;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class UpdateStatusTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_task_status()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project */
        $project = $user->projects()->first();

        /** @var Task $task */
        $task = $project->tasks()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project->id/tasks/$task->id/status", [
                'status_id' => '1',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Status updated')
                            ->etc()
                    )
            );
    }
}
