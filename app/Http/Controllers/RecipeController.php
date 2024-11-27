<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function index()
    {
        return Inertia::render('Recipe/RecipeList', [
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Recipe/RecipeSingle', [

        ]);
    }
}
