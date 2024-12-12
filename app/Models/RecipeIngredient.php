<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeIngredientFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'recipe_id',
        'quantity',
        'unit',
    ];

    const INGREDIENT_UNIT_GRAMS = 'grams';
    const INGREDIENT_UNIT_ML = 'ml';
    const INGREDIENT_UNIT_PIECES = 'pieces';
    const INGREDIENT_UNIT_TSP = 'tsp';
    const INGREDIENT_UNIT_TBSP = 'tbsp';
    const INGREDIENT_UNIT_CUPS = 'cups';

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
