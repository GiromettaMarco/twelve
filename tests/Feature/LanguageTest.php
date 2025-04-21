<?php

namespace Tests\Feature;

use Tests\TestCase;

class LanguageTest extends TestCase
{
    public function test_known_language(): void
    {
        $response = $this->withHeaders([
            'HTTP_ACCEPT_LANGUAGE' => 'it',
        ])->get('/');

        $response->assertSee('<html lang="it"', false);
    }

    public function test_unknown_language(): void
    {
        $response = $this->withHeaders([
            'HTTP_ACCEPT_LANGUAGE' => 'es',
        ])->get('/');

        $response->assertSee('<html lang="en"', false);
    }
}
