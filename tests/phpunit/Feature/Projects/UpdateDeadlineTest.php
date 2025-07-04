<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class UpdateDeadlineTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_project_deadline()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project_old */
        $project_old = $user->projects()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project_old->id/deadline", [
                'deadline' => '2025-12-30',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Deadline updated')
                            ->etc()
                    )
            );

        /** @var Project $project_new */
        $project_new = $user->projects()->first();

        $this->assertTrue($project_new->deadline === '2025-12-30');
    }

    public function test_update_project_deadline_validation_fail()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project_old */
        $project_old = $user->projects()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project_old->id/deadline", [
                'deadline' => '12-30-2025',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has('errors.deadline')
            );

        /** @var Project $project_new */
        $project_new = $user->projects()->first();

        $this->assertTrue($project_new->deadline === $project_old->deadline);
    }
}
