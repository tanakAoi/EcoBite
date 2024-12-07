import { Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import React from "react";

interface RecipeListProps {
    recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">All Recipe</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <Link
                            href={route("recipe.show", recipe.id)}
                            className="flex flex-col justify-between h-full gap-4"
                        >
                            <div
                                className={`w-full h-48 overflow-hidden rounded-lg ${
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
                            <h2 className="text-2xl font-semibold">
                                {recipe.title}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Created at:{" "}
                                {new Date(
                                    recipe.created_at
                                ).toLocaleDateString()}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
