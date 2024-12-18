<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function switchLanguage(Request $request)
    {
        $request->validate([
            'language' => 'required|string|in:en,sv,jp',
        ]);

        session(['locale' => $request->language]);

        return response()->json(['message' => 'Language switched successfully']);
    }
}
