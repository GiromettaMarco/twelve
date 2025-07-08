<?php

namespace Tests\PhpUnit\Feature\Tasks;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class CreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_create_task()
    {
        $this->actingAs(User::first());

        $this
            ->followingRedirects()
            ->post('/dashboard/projects/1/tasks', [
                'title' => 'New task',
                'position' => '0',
                'description' => 'unique string wfdfdg',
                'label_id' => '2',
                'status_id' => '2',
                'priority_id' => '2',
            ])
            ->assertOk();

        $task = Task::where('description', 'unique string wfdfdg')->first();

        $this->assertTrue($task?->title === 'New task');
    }

    public function test_new_users_can_create_task()
    {
        $this->actingAs(User::factory()->create());

        $this
            ->followingRedirects()
            ->post('/dashboard/projects', [
                'title' => 'New project',
                'description' => 'unique string rddfhh',
                'deadline' => '2025-12-31',
            ])
            ->assertOk();

        $project = Project::where('description', 'unique string rddfhh')->first();

        $this->assertTrue($project?->title === 'New project');

        $this
            ->followingRedirects()
            ->post("/dashboard/projects/$project->id/tasks", [
                'title' => 'New task',
                'position' => '0',
                'description' => 'unique string kjoljkhnm',
                'label_id' => '2',
                'status_id' => '2',
                'priority_id' => '2',
            ])
            ->assertOk();

        $task = Task::where('description', 'unique string kjoljkhnm')->first();

        $this->assertTrue($task?->title === 'New task');
    }
}
