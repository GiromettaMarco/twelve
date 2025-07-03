<?php

namespace App\Http\Middleware;

use App\Helpers\FlashMessage;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Collect flash messages from session.
     */
    private function getFlashMessages(Request $request): array
    {
        $flash = $request->session()->get('flash');

        if ($flash instanceof FlashMessage) {
            return [$flash];
        }

        if (is_array($flash)) {
            $messages = [];

            foreach ($flash as $message) {
                if ($message instanceof FlashMessage) {
                    $messages[] = $message;
                }
            }

            return $messages;
        }

        return [];
    }

    /**
     * Collect sidebar state from cookie.
     */
    private function getSidebarOpen(Request $request)
    {
        $sidebar_state = $request->cookie('sidebar_state');

        if ($sidebar_state === null) {
            return true;
        }

        return $sidebar_state === 'true';
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => $request->user() ? [
                'user' => $request->user(),
                'permissions' => [
                    'telescope' => $request->user()->can('view-telescope'),
                    'users' => [
                        'view' => $request->user()->can('view-users'),
                    ],
                ],
            ] : [
                'user' => null,
                'permissions' => [],
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => $this->getSidebarOpen($request),
            'flash' => $this->getFlashMessages($request),
        ];
    }
}
