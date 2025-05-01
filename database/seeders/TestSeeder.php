<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Seed the application's database during tests.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            LabelSeeder::class,
            StatusSeeder::class,
            PrioritySeeder::class,
            ProjectSeeder::class,
            TaskSeeder::class,
        ]);
    }
}
