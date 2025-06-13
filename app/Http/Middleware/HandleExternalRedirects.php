<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as RequestFacade;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

/**
 * Handle redirects outside of the Inertia scope
 */
class HandleExternalRedirects
{
    /**
     * List of paths not handled by Inertia
     *
     * @var string[]
     */
    protected $externalPathPrefixes = [
        '/telescope',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Redirect responses to urls that aren't part of the Inertia stack, need to use
        // Inertia's ::location() function or the target url will show in an iframe.
        if (
            RequestFacade::inertia() &&
            $response instanceof RedirectResponse &&
            array_any(
                $this->externalPathPrefixes,
                fn (string $prefix) => str_starts_with(
                    parse_url($response->getTargetUrl(), PHP_URL_PATH) ?: '',
                    $prefix
                )
            )
        ) {
            return Inertia::location($response->getTargetUrl());
        }

        return $response;
    }
}
