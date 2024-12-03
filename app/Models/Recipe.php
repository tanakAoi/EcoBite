<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeFactory> */
    use HasFactory;

    public function ingredients()
    {
        return $this->belongsToMany(Product::class, 'recipe_ingredients')->withPivot('quantity', 'unit');
    }
}
