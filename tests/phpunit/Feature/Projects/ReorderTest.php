<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class ReorderTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_reorder_projects()
    {
        $this->actingAs($user = User::first());

        $this
            ->followingRedirects()
            ->patch('/dashboard/projects', [
                'data' => [
                    [
                        'id' => 1,
                        'position' => 1,
                    ],
                    [
                        'id' => 2,
                        'position' => 0,
                    ],
                ],
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Projects reordered')
                            ->etc()
                    )
            );

        $project = $user->projects()->first();

        $this->assertTrue($project?->id === 2);
    }

    public function test_reorder_projects_validation_fail()
    {
        $this->actingAs($user = User::first());

        $this
            ->followingRedirects()
            ->patch('/dashboard/projects', [
                'data' => [
                    [
                        'id' => 1,
                        'position' => 1,
                    ],
                    [
                        'id' => 2,
                        'position' => '0',
                    ],
                ],
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Reorder operation failed')
                            ->etc()
                    )
            );

        $project = $user->projects()->first();

        $this->assertTrue($project?->id === 1);
    }
}
