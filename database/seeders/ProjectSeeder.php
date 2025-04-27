<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project = Project::create(['title' => 'Work in Progress']);

        $user = User::find(1);
        if ($user) {
            $project->users()->attach($user, ['role' => 'admin']);
        }
    }
}
