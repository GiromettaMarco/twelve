<?php

namespace Tests\Phpunit\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Phpunit\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_that_true_is_true()
    {
        $this->assertTrue(true);
    }
}
