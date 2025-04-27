<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $priorities = [
            ['title' => 'low'],
            ['title' => 'medium'],
            ['title' => 'high'],
        ];

        collect($priorities)->each(function ($priority) {
            Priority::create($priority);
        });
    }
}
