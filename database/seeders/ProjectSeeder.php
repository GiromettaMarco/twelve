<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project = Project::create([
            'title' => 'Work in Progress',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis eu augue eget congue. Praesent blandit neque justo. Morbi scelerisque mollis metus, vel accumsan ex malesuada id.',
            'deadline' => Carbon::tomorrow(),
        ]);

        $user = User::find(1);
        if ($user) {
            $project->users()->attach(
                $user,
                [
                    'position' => 0,
                    'role' => 'admin',
                ]
            );
        }
    }
}
