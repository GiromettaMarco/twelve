<?php

namespace Tests\PhpUnit\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\PhpUnit\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $this->get('/dashboard')->assertRedirect('/login');
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $this->actingAs(User::factory()->create());

        $this->get('/dashboard')->assertOk();
    }

    public function test_when_sidebar_state_cookie_is_undefined()
    {
        $this->actingAs(User::factory()->create());

        $this->disableCookieEncryption();

        $this->get('/dashboard')->assertInertia(
            fn (Assert $page) => $page
                ->where('sidebarOpen', true)
        );
    }

    public function test_when_sidebar_state_cookie_is_true()
    {
        $this->actingAs(User::factory()->create());

        $this->disableCookieEncryption();

        $this
            ->withCookie('sidebar_state', 'true')
            ->get('/dashboard')
            ->assertInertia(
                fn (Assert $page) => $page
                    ->where('sidebarOpen', true)
            );
    }

    public function test_when_sidebar_state_cookie_is_not_true()
    {
        $this->actingAs(User::factory()->create());

        $this->disableCookieEncryption();

        $this
            ->withCookie('sidebar_state', 'false')
            ->get('/dashboard')
            ->assertInertia(
                fn (Assert $page) => $page
                    ->where('sidebarOpen', false)
            );
    }
}
