<?php

namespace App\Providers;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Laravel\Telescope\IncomingEntry;
use Laravel\Telescope\Telescope;
use Laravel\Telescope\TelescopeApplicationServiceProvider;

class TelescopeServiceProvider extends TelescopeApplicationServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Telescope::night();

        // $this->hideSensitiveRequestDetails();

        // Filter entries
        // $isLocal = $this->app->environment('local');

        // Telescope::filter(function (IncomingEntry $entry) use ($isLocal) {
        //     return $isLocal ||
        //            $entry->isReportableException() ||
        //            $entry->isFailedRequest() ||
        //            $entry->isFailedJob() ||
        //            $entry->isScheduledTask() ||
        //            $entry->hasMonitoredTag();
        // });
    }

    /**
     * Prevent sensitive request details from being logged by Telescope.
     *
     * @codeCoverageIgnore
     */
    protected function hideSensitiveRequestDetails(): void
    {
        if ($this->app->environment('local')) {
            return;
        }

        Telescope::hideRequestParameters(['_token']);

        Telescope::hideRequestHeaders([
            'cookie',
            'x-csrf-token',
            'x-xsrf-token',
        ]);
    }

    /**
     * Configure the Telescope authorization services.
     *
     * @return void
     */
    protected function authorization()
    {
        $this->gate();

        Telescope::auth(function ($request) {
            // app()->environment('local') ||
            return Gate::check('viewTelescope', [$request->user()]);
        });
    }

    /**
     * Register the Telescope gate.
     *
     * This gate determines who can access Telescope.
     */
    protected function gate(): void
    {
        Gate::define('viewTelescope', function (User $user) {
            return $user?->permissions->contains(function (Permission $permission) {
                return $permission->name === 'view-telescope';
            });
        });
    }
}
