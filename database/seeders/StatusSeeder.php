<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['value' => 'backlog', 'label' => 'backlog'],
            ['value' => 'todo', 'label' => 'todo'],
            ['value' => 'in_progress', 'label' => 'in progress'],
            ['value' => 'done', 'label' => 'done'],
            ['value' => 'canceled', 'label' => 'canceled'],
        ];

        collect($statuses)->each(function ($status) {
            Status::create($status);
        });
    }
}
