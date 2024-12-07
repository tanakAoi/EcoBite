<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return Inertia::render('AppLayout', [
                'auth' => [
                    'user' => $user,
                ],
            ]);
        }

        return Inertia::render('AppLayout', []);
    }
}
