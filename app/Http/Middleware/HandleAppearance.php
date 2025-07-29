<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $appearance_cookie = $request->cookie('appearance');

        if ($appearance_cookie === 'light' || $appearance_cookie === 'dark') {
            $appearance = $appearance_cookie;
        } else {
            $appearance = 'system';
        }

        View::share('appearance', $appearance);

        return $next($request);
    }
}
