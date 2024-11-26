<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Recipe;
use App\Models\Product;
use App\Models\RecipeIngredient;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecipeIngredient>
 */
class RecipeIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ingredientUnit = [
            RecipeIngredient::INGREDIENT_UNIT_GRAMS,
            RecipeIngredient::INGREDIENT_UNIT_ML,
            RecipeIngredient::INGREDIENT_UNIT_PIECES,
            RecipeIngredient::INGREDIENT_UNIT_CUPS,
            RecipeIngredient::INGREDIENT_UNIT_TSP,
            RecipeIngredient::INGREDIENT_UNIT_TBSP,
            RecipeIngredient::INGREDIENT_UNIT_CUPS,
        ];

        return [
            'recipe_id' => Recipe::inRandomOrder()->first()->id,
            'product_id' => Product::inRandomOrder()->first()->id,
            'quantity' => fake()->randomFloat(2, 0.5, 5),
            'unit' => fake()->randomElement($ingredientUnit),
        ];
    }
}
