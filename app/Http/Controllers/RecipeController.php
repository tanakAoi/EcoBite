<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\RecipeIngredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::paginate(12);
        return Inertia::render('Recipe/RecipeList', ['recipesData' => $recipes]);
    }

    public function show($id)
    {
        $recipe = Recipe::with('ingredients.product')->find($id);
        return Inertia::render('Recipe/RecipeSingle', ['recipe' => $recipe]);
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

            $ingredientNames = RecipeIngredient::whereIn('id', $selectedIngredientIds)->pluck('name');

            return response()->json([
                'searchedRecipesData' => $searchedRecipesData,
                'ingredientNames' => $ingredientNames,
            ], 200);
        }

        return response()->json(['message' => 'No ingredients selected'], 400);
    }
}
