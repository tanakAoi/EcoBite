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
        Log::info($request->all());
        
        $request->validate([
            'user_id' => 'required|string|exists:users,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'ingredients' => 'required|array',
            'instructions' => 'required|array',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,webp|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipes', 's3', 'public');
            $imageUrl = Storage::disk('s3')->url($imagePath);
        } else {
            $imageUrl = null;
        }

        $recipe = Recipe::create([
            'user_id' => $request->input('userId'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'instructions' => $request->input('instructions'),
            'image' => $imageUrl,
        ]);

        foreach ($request->input('ingredients') as $ingredient) {
            $recipe->ingredients()->create([
                'product_id' => $ingredient['product_id'] ?? null,
                'recipe_id' => $recipe->id,
                'quantity' => null,
                'unit' => null
            ]);
        }

        return redirect()->route('recipe.show', ['id' => $recipe->id]);
    }
}
