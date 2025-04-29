<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    /**
     * Available languages.
     */
    public $available = [
        'en',
        'it',
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Use the language explicitly chosen by the user
        if (Auth::check()) {
            $dbLanguage = Auth::user()->language;
            if ($dbLanguage !== 'system') {
                App::setLocale($dbLanguage);

                return $next($request);
            }
        }

        // Infer the language by Accept-Language header
        $acceptLanguage = explode(',', strtolower(trim($request->header('Accept-Language', '*'))));
        $parsedLanguage = [];

        foreach ($acceptLanguage as $qualityLang) {
            $qLangArr = array_map('trim', explode(';', trim($qualityLang)));
            $q = 1;

            if (isset($qLangArr[1]) && substr($qLangArr[1], 0, 2) === 'q=') {
                $q = (float) substr($qLangArr[1], 2);
            }

            $parsedLanguage[] = ['q' => $q, 'lang' => $qLangArr[0]];

            usort($parsedLanguage, function ($a, $b) {
                return $a < $b;
            });
        }

        foreach ($parsedLanguage as $lang) {
            if (in_array($lang['lang'], $this->available)) {
                App::setLocale($lang['lang']);

                return $next($request);
            }

            if (str_contains($lang['lang'], '-')) {
                $noCountryLang = explode('-', $lang['lang'])[0];

                if (in_array($noCountryLang, $this->available)) {
                    App::setLocale($noCountryLang);

                    return $next($request);
                }
            }
        }

        return $next($request);
    }
}
