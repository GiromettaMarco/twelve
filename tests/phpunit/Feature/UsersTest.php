<?php

namespace Tests\PhpUnit\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class UsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get('/dashboard/users')->assertRedirect('/login');
    }

    public function test_authorized_user_can_visit_users()
    {
        $this->actingAs(User::first());

        $this->get('/dashboard/users')->assertOk();
    }
}
