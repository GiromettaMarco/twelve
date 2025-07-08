<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class DeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_delete_project()
    {
        $this->actingAs(User::first());

        $this
            ->followingRedirects()
            ->delete('/dashboard/projects/1')
            ->assertInertia(
                fn (Assert $page) => $page
                    ->has(
                        'flash.0',
                        fn (Assert $page) => $page
                            ->where('title', 'Project deleted')
                            ->etc()
                    )
            );

        $this->get('/dashboard/projects/1')->assertNotFound();
    }
}
