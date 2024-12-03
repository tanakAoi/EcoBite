<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::all();
        return Inertia::render('Recipe/RecipeList', ['recipes' => $recipes]);
    }

    public function show($id)
    {
        $recipe = Recipe::with('ingredients')->find($id);
        return Inertia::render('Recipe/RecipeSingle', ['recipe' => $recipe]);
    }
}
