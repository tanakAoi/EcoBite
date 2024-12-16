import { Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import { FC, useState } from "react";
import RecipeSearchForm from "./RecipeSearchForm";

interface RecipeListProps {
    initialRecipes: Recipe[];
}

const RecipeList: FC<RecipeListProps> = ({ initialRecipes }) => {
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [isSearchActive, setIsSearchActive] = useState(false);

    const updateRecipeList = (newRecipes: Recipe[]) => {
        setRecipes(newRecipes);
        setIsSearchActive(true);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold mb-6">All Recipe</h1>
                <Link href={route("recipe.create")}>Create a new recipe</Link>
            </div>

            <div>
                <RecipeSearchForm onSearch={updateRecipeList} />
            </div>

            <div>
                {isSearchActive ? (
                    <>
                        <h2 className="text-2xl mb-4">Search Results</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <div
                                        key={recipe.id}
                                        className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <Link
                                            href={route(
                                                "recipe.show",
                                                recipe.id
                                            )}
                                            className="flex flex-col justify-between h-full gap-4"
                                            target="_blank"
                                        >
                                            <div
                                                className={`w-full h-48 overflow-hidden rounded-lg ${
                                                    !recipe.image
                                                        ? "bg-green-100"
                                                        : ""
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
                                ))
                            ) : (
                                <p>
                                    No recipes found for the selected
                                    ingredients.
                                </p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl mb-4">All Recipes</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <Link
                                        href={route("recipe.show", recipe.id)}
                                        className="flex flex-col justify-between h-full gap-4"
                                        target="_blank"
                                    >
                                        <div
                                            className={`w-full h-48 overflow-hidden rounded-lg ${
                                                !recipe.image
                                                    ? "bg-green-100"
                                                    : ""
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
                    </>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
