<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class UpdateInfoTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_update_project_info()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project_old */
        $project_old = $user->projects()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project_old->id/info", [
                'title' => 'New Title',
                'description' => 'Lorem ipsum dolor sit amet',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Project updated')
                            ->etc()
                    )
            );

        /** @var Project $project_new */
        $project_new = $user->projects()->first();

        $this->assertTrue($project_new->title === 'New Title');
        $this->assertTrue($project_new->description === 'Lorem ipsum dolor sit amet');
    }

    public function test_update_project_info_validation_fail()
    {
        /** @var User $user */
        $user = User::first();

        $this->actingAs($user);

        /** @var Project $project_old */
        $project_old = $user->projects()->first();

        $this
            ->followingRedirects()
            ->patch("/dashboard/projects/$project_old->id/info", [
                'description' => 'Lorem ipsum dolor sit amet',
            ])
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has('errors.title')
            );

        /** @var Project $project_new */
        $project_new = $user->projects()->first();

        $this->assertTrue($project_new->title === $project_old->title);
        $this->assertTrue($project_new->description === $project_old->description);
    }
}
