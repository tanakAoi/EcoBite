<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Recipe;
use App\Models\ShopSetting;
use App\Services\TranslationService;
class HomeController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

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
        $heroData = ShopSetting::select('tagline', 'text_color', 'image')->first();

        $lang = strtoupper(session('locale', 'en'));

        $latestProducts = Product::latest()->take(3)->get();
        $latestProducts = $latestProducts->map(function ($product) use ($lang) {
            $cacheKey = "product_{$product->id}_{$lang}_name";

            $product->name = $this->translationService->translateAndCache(
                $product->name,
                $cacheKey,
                $lang,
                function ($name, $lang) {
                    return $this->translationService->translateText($name, $lang);
                }
            );

            return $product;
        });

        $featuredRecipes = Recipe::latest()->take(3)->get();
        $featuredRecipes = $featuredRecipes->map(function ($recipe) use ($lang) {
            $cacheKey = "recipe_{$recipe->id}_{$lang}_title";

            $recipe->title = $this->translationService->translateAndCache(
                $recipe->title,
                $cacheKey,
                $lang,
                function ($title, $lang) {
                    return $this->translationService->translateText($title, $lang);
                }
            );

            return $recipe;
        });

        return inertia::render('Home', [
            'heroData' => $heroData,
            'latestProducts' => $latestProducts,
            'featuredRecipes' => $featuredRecipes,
        ]);
    }
}
