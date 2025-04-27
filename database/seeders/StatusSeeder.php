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
            ['title' => 'backlog'],
            ['title' => 'todo'],
            ['title' => 'in progress'],
            ['title' => 'done'],
            ['title' => 'canceled'],
        ];

        collect($statuses)->each(function ($status) {
            Status::create($status);
        });
    }
}
