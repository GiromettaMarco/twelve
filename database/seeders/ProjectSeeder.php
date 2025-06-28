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
        $project1 = Project::create([
            'title' => 'Work in Progress',
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis eu augue eget congue. Praesent blandit neque justo. Morbi scelerisque mollis metus, vel accumsan ex malesuada id.',
            'deadline' => Carbon::tomorrow(),
        ]);

        $project2 = Project::create([
            'title' => 'Project Test',
            'description' => 'Test project reorder by dragging this project.',
            'deadline' => Carbon::today()->addDays(7),
        ]);

        $user = User::find(1);

        if ($user) {
            $project1->users()->attach(
                $user,
                [
                    'position' => 0,
                    'role' => 'admin',
                ]
            );

            $project2->users()->attach(
                $user,
                [
                    'position' => 1,
                    'role' => 'admin',
                ]
            );
        }
    }
}
