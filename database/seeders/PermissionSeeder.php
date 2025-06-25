<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            [
                'tag' => 'view-telescope',
                'label' => 'View Telescope',
                'description' => 'Access Telescope control panel.',
            ],
            [
                'tag' => 'view-users',
                'label' => 'View Users',
                'description' => 'View all registered userd.',
            ],
        ];

        $user = User::find(1);
        if ($user) {
            collect($permissions)->each(function ($permission) use ($user) {
                $user->permissions()->attach(Permission::create($permission));
            });
        }
    }
}
