<?php

namespace Tests\PhpUnit;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Indicates whether the default seeder should run before each test.
     *
     * @var bool
     */
    protected $seed = true;

    /**
     * Run a specific seeder before each test.
     *
     * @var string
     */
    // protected $seeder = TestSeeder::class;
}
