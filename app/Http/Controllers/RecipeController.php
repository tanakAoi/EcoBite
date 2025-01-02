<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TranslationService;

class RecipeController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function index()
    {
        $recipes = Recipe::paginate(12);

        $lang = strtoupper(session('locale', 'en'));

        $translatedRecipes = $recipes->getCollection()->map(function ($recipe) use ($lang) {

            $cacheKey = "recipe_{$recipe->id}_{$lang}_title";

            return $this->translationService->translateAndCache(
                $recipe,
                $cacheKey,
                $lang,
                function ($recipe, $lang) {
                    $recipe->title = $this->translationService->translateText($recipe->title, $lang);
                    return $recipe;
                }
            );
        });

        $recipes->setCollection($translatedRecipes);

        return Inertia::render('Recipe/RecipeList', ['recipesData' => $recipes]);
    }

    public function show($id)
    {
        $recipe = Recipe::with('ingredients.product')->find($id);

        $lang = strtoupper(session('locale', 'en'));

        $cacheKey = "recipe_{$recipe->id}_{$lang}";

        $translatedRecipe = $this->translationService->translateAndCache(
            $recipe,
            $cacheKey,
            $lang,
            function ($recipe, $lang) {
                return $this->translationService->translateSingleRecipe($recipe, $lang);
            }
        );

        return Inertia::render('Recipe/RecipeSingle', ['recipe' => $translatedRecipe]);
    }

    public function create()
    {
        return Inertia::render('Recipe/RecipeCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'ingredients.*.name' => 'required|string|max:255',
            'ingredients.*.quantity' => 'required|numeric|min:0',
            'ingredients.*.unit' => 'required|string|max:50',
            'instructions' => 'required|array',
            'image_url' => 'nullable|string|url',
        ]);

        $instructionsString = implode("\n", array_map(function ($instruction) {
            return "{$instruction['number']}. {$instruction['text']}";
        }, $request->input('instructions')));

        $recipe = Recipe::create([
            'user_id' => $request->input('user_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'instructions' => $instructionsString,
            'image' => $request->input('image_url'),
        ]);

        foreach ($request->input('ingredients') as $ingredient) {
            $recipe->ingredients()->create([
                'product_id' => $ingredient['product_id'] ?? null,
                'recipe_id' => $recipe->id,
                'name' => $ingredient['name'],
                'quantity' => $ingredient['quantity'],
                'unit' => $ingredient['unit'],
            ]);
        }

        session()->flash('type', 'success');
        session()->flash('message', 'Recipe saved successfully!');

        return redirect()->route('recipe.show', ['id' => $recipe->id]);
    }

    public function search(Request $request)
    {
        $selectedIngredientIds = $request->input('selectedIngredients', []);

        if (count($selectedIngredientIds) > 0) {
            $matchingRecipeIds = RecipeIngredient::whereIn('id', $selectedIngredientIds)
                ->groupBy('recipe_id')
                ->pluck('recipe_id')
                ->unique();

            $searchedRecipesData = Recipe::with(['ingredients' => function ($query) use ($selectedIngredientIds) {
                $query->whereIn('id', $selectedIngredientIds);
            }])
                ->whereIn('id', $matchingRecipeIds)
                ->paginate(12);

            $lang = strtoupper(session('locale', 'en'));

            $searchedRecipesData->getCollection()->map(function ($recipe) use ($lang) {
                $recipe->ingredients->map(function ($ingredient) use ($lang) {
                    $cacheKey = "searched_recipe_ingredient_{$ingredient->id}_{$lang}";

                    $ingredient->name = $this->translationService->translateAndCache(
                        $ingredient->name,
                        $cacheKey,
                        $lang,
                        function ($name, $lang) {
                            return $this->translationService->translateText($name, $lang);
                        }
                    );

                    return $ingredient;
                });
                return $recipe;
            });

            $ingredientNames = RecipeIngredient::whereIn('id', $selectedIngredientIds)
                ->get()
                ->map(function ($ingredient) use ($lang) {
                    $cacheKey = "searched_ingredient_{$ingredient->id}_{$lang}";
                    return $this->translationService->translateAndCache(
                        $ingredient->name,
                        $cacheKey,
                        $lang,
                        function ($name, $lang) {
                            return $this->translationService->translateText($name, $lang);
                        }
                    );
                    return $ingredient->name;
                });

            return response()->json([
                'searchedRecipesData' => $searchedRecipesData,
                'ingredientNames' => $ingredientNames,
            ], 200);
        }

        return response()->json(['message' => 'No ingredients selected'], 400);
    }
}
