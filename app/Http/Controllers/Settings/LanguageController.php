<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class LanguageController extends Controller
{
    /**
     * Show the user's language settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/language', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'language' => Auth::user()->language,
        ]);
    }

    /**
     * Update the user's language.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'language' => ['required', 'in:en,it,system'],
        ]);

        $request->user()->update([
            'language' => $validated['language'],
        ]);

        return back();
    }
}
