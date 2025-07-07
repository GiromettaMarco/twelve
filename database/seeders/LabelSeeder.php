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
            ['value' => 'bug', 'label' => 'bug'],
            ['value' => 'documentation', 'label' => 'documentation'],
            ['value' => 'feature', 'label' => 'feature'],
        ];

        collect($labels)->each(function ($label) {
            Label::create($label);
        });
    }
}
