<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $project = Project::create(['name' => 'React']);

        $user = User::find(1);
        if ($user) {
            $project->users()->attach($user);
        }

        $project->tasks()->createMany([
            [
                'name' => 'Read the docs',
                'done' => true,
                'text' => 'https://react.dev/learn',
            ],
            [
                'name' => 'Build something good',
                'done' => false,
            ],
        ]);
    }
}
