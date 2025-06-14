<?php

namespace Tests\PhpUnit\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class TelescopeTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get('/telescope')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_telescope()
    {
        $this->actingAs(User::factory()->create());

        $this->get('/telescope')->assertOk();
    }
}
