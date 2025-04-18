<?php

namespace App\Helpers;

class Locale
{
    public static array $supported = [
        'en',
        'it',
    ];

    public static string $default = 'en';

    public static function getHeader(): string|bool
    {
        if (array_key_exists('HTTP_ACCEPT_LANGUAGE', $_SERVER)) {
            return $_SERVER['HTTP_ACCEPT_LANGUAGE'];
        } else {
            return false;
        }
    }

    public static function getLanguage(): string
    {
        $request = self::getHeader();
        if ($request) {
            $locale = substr($request, 0, 2);
            if (in_array($locale, self::$supported)) {
                return $locale;
            }
        }
        return self::$default;
    }
}
