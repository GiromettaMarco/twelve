<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class LoginTest extends DuskTestCase
{
    use DatabaseTruncation;

    /**
     * A Dusk test example.
     */
    public function test_example(): void
    {
        $user = User::factory()->create([
            'email' => 'girometta.marco@gmail.com',
        ]);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->visit('/login')
                ->type('#email', $user->email)
                ->type('#password', 'password')
                ->press('Log in')
                ->assertPathIs('/login');
        });
    }
}
