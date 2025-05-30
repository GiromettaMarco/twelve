<?php

namespace Tests\PhpUnit\Feature\Projects;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class IndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard/projects')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_projects_index_page()
    {
        $this->actingAs($user = User::first());

        $this->get('/dashboard/projects')->assertOk();
    }
}
