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
        $permission = Permission::create([
            'name' => 'view-telescope',
            'description' => 'Access Telescope control panel.',
        ]);

        $user = User::find(1);
        if ($user) {
            $permission->users()->attach($user);
        }
    }
}
