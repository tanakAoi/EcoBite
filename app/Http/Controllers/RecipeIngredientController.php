<?php

namespace App\Http\Controllers;

use App\Models\RecipeIngredient;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Log;

class RecipeIngredientController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function getAllIngredients()
    {
        $ingredients = RecipeIngredient::all();

        $lang = strtoupper(session('locale', 'en'));

        $translatedIngredients = $ingredients->map(function ($ingredient) use ($lang) {

            $cacheKey = "ingredient_{$ingredient->id}_{$lang}";

            $translatedIngredientName = $this->translationService->translateAndCache(
                $ingredient,
                $cacheKey,
                $lang,
                function ($ingredient, $lang) {
                    $ingredient->name = $this->translationService->translateText($ingredient->name, $lang);
                    return $ingredient;
                }
            );

            return $translatedIngredientName;
        });

        return $translatedIngredients;

        return response()->json($ingredients);
    }
}
