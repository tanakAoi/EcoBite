<?php

namespace App\Http\Controllers;

use App\Models\RecipeIngredient;

class RecipeIngredientController extends Controller
{
    public function getAllIngredients()
    {
        $ingredients = RecipeIngredient::all();
        return response()->json($ingredients);
    }
}
