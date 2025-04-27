<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Seeder;

class LabelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = [
            ['title' => 'bug'],
            ['title' => 'documentation'],
            ['title' => 'feature'],
        ];

        collect($labels)->each(function ($label) {
            Label::create($label);
        });
    }
}
