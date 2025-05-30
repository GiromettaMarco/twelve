<?php

namespace Tests\PhpUnit\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\PhpUnit\TestCase;

class LanguageUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_language_page_is_displayed()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/settings/language');

        $response->assertOk();
    }

    public function test_language_can_be_updated()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/settings/language')
            ->patch('/settings/language', [
                'language' => 'it',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/settings/language');

        $user->refresh();
        $this->assertSame('it', $user->language);

        $response = $this
            ->actingAs($user)
            ->get('/');
        $response->assertSee('<html lang="it"', false);
    }
}
