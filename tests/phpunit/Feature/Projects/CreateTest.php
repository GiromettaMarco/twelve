<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class CreateTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_create_project()
    {
        $this->actingAs(User::first());

        $this
            ->followingRedirects()
            ->post('/dashboard/projects', [
                'title' => 'New project',
                'description' => 'unique string 753951',
                'deadline' => '2025-12-31',
            ])
            ->assertOk();

        $project = Project::where('description', 'unique string 753951')->first();

        $this->assertTrue($project?->title === 'New project');
    }

    public function test_new_users_can_create_project()
    {
        $this->actingAs(User::factory()->create());

        $this
            ->followingRedirects()
            ->post('/dashboard/projects', [
                'title' => 'New project',
                'description' => 'unique string 753951',
                'deadline' => '2025-12-31',
            ])
            ->assertOk();

        $project = Project::where('description', 'unique string 753951')->first();

        $this->assertTrue($project?->title === 'New project');
    }
}
