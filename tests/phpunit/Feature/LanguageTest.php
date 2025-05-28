<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Phpunit\TestCase;

class LanguageTest extends TestCase
{
    use RefreshDatabase;

    public function test_known_language(): void
    {
        $response = $this->withHeaders([
            'HTTP_ACCEPT_LANGUAGE' => 'it-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
        ])->get('/');

        $response->assertSee('<html lang="it"', false);
    }

    public function test_unknown_language(): void
    {
        $response = $this->withHeaders([
            'HTTP_ACCEPT_LANGUAGE' => 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
        ])->get('/');

        $response->assertSee('<html lang="en"', false);
    }

    public function test_any_language(): void
    {
        $response = $this->withHeaders([
            'HTTP_ACCEPT_LANGUAGE' => '*',
        ])->get('/');

        $response->assertSee('<html lang="en"', false);
    }

    public function test_no_header(): void
    {
        $response = $this->get('/');

        $response->assertSee('<html lang="en"', false);
    }

    public function test_logged_user_system(): void
    {
        $user = User::factory()->create([
            'language' => 'system',
        ]);

        $response = $this->actingAs($user)->get('/');

        $response->assertSee('<html lang="en"', false);
    }

    public function test_logged_user_en(): void
    {
        $user = User::factory()->create([
            'language' => 'en',
        ]);

        $response = $this->actingAs($user)->get('/');

        $response->assertSee('<html lang="en"', false);
    }

    public function test_logged_user_it(): void
    {
        $user = User::factory()->create([
            'language' => 'it',
        ]);

        $response = $this->actingAs($user)->get('/');

        $response->assertSee('<html lang="it"', false);
    }
}
