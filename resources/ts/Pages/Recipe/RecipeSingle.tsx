import { Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";

interface RecipeSingleProps {
    recipe: Recipe;
}

const RecipeSingle: React.FC<RecipeSingleProps> = ({ recipe }) => {
    console.log(recipe);
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="">
                <div
                    className={`w-full h-64 overflow-hidden rounded-lg mb-8 ${
                        !recipe.image ? "bg-green-100" : ""
                    }`}
                >
                    {recipe.image ? (
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex justify-center items-center w-full h-full text-gray-500">
                            No Image Available
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">
                            {recipe.title}
                        </h1>
                        <span className="text-sm text-gray-500">
                            Created at:{" "}
                            {new Date(recipe.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-lg text-gray-700">
                        {recipe.description}
                    </p>

                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Ingredients
                        </h2>
                        <ul className="list-disc pl-6 text-lg text-gray-700">
                            {recipe.ingredients &&
                            recipe.ingredients.length > 0 ? (
                                recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {ingredient.product_id ? (
                                            <Link
                                                href={route(
                                                    "product.show",
                                                    ingredient.product.id
                                                )}
                                                className="text-blue-500 underline"
                                            >
                                                {ingredient.product.name}
                                            </Link>
                                        ) : (
                                            ingredient.name
                                        )}
                                        {" : "}
                                        {ingredient.quantity}
                                        {ingredient.unit}
                                    </li>
                                ))
                            ) : (
                                <p>No ingredients available.</p>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">
                            Instructions
                        </h2>
                        <div className="text-lg text-gray-700">
                            {recipe.instructions}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSingle;
