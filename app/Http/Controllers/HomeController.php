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
        $auth = Auth::user();

        return Inertia::render('AppLayout', [
            'auth' => $auth,
        ]);
    }
}
