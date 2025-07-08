<?php

namespace Tests\PhpUnit\Feature\Tasks;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class UpdatePositionTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_task_position()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project */
        $project = $user->projects()->first();

        /** @var Task $task_1 */
        $task_1 = $project->tasks()->where('position', 0)->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project->id/tasks/$task_1->id/position", [
                'position' => '4',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Position updated')
                            ->etc()
                    )
            );

        /** @var Task $task_12 */
        $task_12 = $project->tasks()->where('position', 12)->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project->id/tasks/$task_12->id/position", [
                'position' => '4',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Position updated')
                            ->etc()
                    )
            );

        $tasks = $project->tasks;

        $actual_positions = $tasks->pluck('position')->all();

        $expected_positions = [];
        for ($i = 0; $i < $tasks->count(); $i++) {
            $expected_positions[] = $i;
        }

        $this->assertEquals($actual_positions, $expected_positions);
    }
}
