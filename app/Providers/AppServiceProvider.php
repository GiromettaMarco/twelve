<?php

namespace App\Providers;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /** @var \Illuminate\Foundation\Application $app */
        $app = $this->app;

        Model::preventLazyLoading(! $app->isProduction());

        // @NOTE Postgres model binding fix
        // https://github.com/laravel/framework/issues/26239
        Route::pattern('id', '[0-9]+');
        Route::pattern('project', '[0-9]+');
        // Route::pattern('task', '[0-9]+');

        // Define permission gates
        Gate::define('view-users', function (User $user) {
            return $user?->permissions->contains(function (Permission $permission) {
                return $permission->tag === 'view-users';
            });
        });

        // Extend Collection
        Collection::macro('firstWithKey', function ($key, $value) {
            /** @var null|array $found */
            $found = null;

            /** @disregard P1013 Undefined method */
            $this->each(function ($item, int $item_key) use ($key, $value, &$found) {
                if (data_get($item, $key) === $value) {
                    // Save key and value
                    $found = [$item_key, $item];

                    // Stop iterating
                    return false;
                }
            });

            return $found;
        });
    }
}
