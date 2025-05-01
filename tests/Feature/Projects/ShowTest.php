<?php

namespace Tests\Feature\Projects;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ShowTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard/projects/1')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_projects_show_page()
    {
        $user = User::where('name', 'Mario Merola')->first();

        $this->actingAs($user);

        $this->get('/dashboard/projects/1')->assertOk();
    }
}
