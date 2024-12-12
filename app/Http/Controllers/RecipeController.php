<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::all();
        return Inertia::render('Recipe/RecipeList', ['recipes' => $recipes]);
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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipes', 's3', 'public');
            $imageUrl = Storage::disk('s3')->url($imagePath);
        } else {
            $imageUrl = null;
        }

        $instructionsString = implode("\n", array_map(function ($instruction) {
            return "{$instruction['number']}. {$instruction['text']}";
        }, $request->input('instructions')));

        $recipe = Recipe::create([
            'user_id' => $request->input('user_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'instructions' => $instructionsString,
            'image' => $imageUrl,
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

        return redirect()->route('recipe.show', ['id' => $recipe->id]);
    }
}
