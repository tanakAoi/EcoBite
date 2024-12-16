<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Recipe;

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

    public function index()
    {
        $latestProducts = Product::latest()->take(3)->get();
        $featuredRecipes = Recipe::latest()->take(3)->get();

        return inertia::render('Home', [
            'latestProducts' => $latestProducts,
            'featuredRecipes' => $featuredRecipes,
        ]);
    }
}
