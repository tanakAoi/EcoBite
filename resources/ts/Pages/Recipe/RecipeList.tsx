import { PaginatedRecipes, Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import { FC, useState } from "react";
import RecipeSearchForm from "./RecipeSearchForm";
import Pagination from "../../Components/Pagination";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface RecipeListProps {
    recipesData: PaginatedRecipes;
}

const RecipeList: FC<RecipeListProps> = ({ recipesData }) => {
    const { data } = recipesData;
    const [newRecipesData, setNewRecipesData] =
        useState<PaginatedRecipes>(recipesData);
    const [ingredientNames, setIngredientNames] = useState<string[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const { t } = useLaravelReactI18n();

    const updateRecipeList = (
        searchedRecipesData: PaginatedRecipes,
        ingredientNames: string[]
    ) => {
        setNewRecipesData(searchedRecipesData);
        setIngredientNames(ingredientNames);
        setIsSearchActive(true);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
                <h1 className="text-5xl font-bold font-serif">{t("Recipes")}</h1>
                <Link
                    className="w-full md:w-fit text-center bg-dark text-primary px-4 py-2 rounded font-semibold transition hover:bg-primary hover:text-dark"
                    href={route("recipe.create")}
                >
                    {t("Create a New Recipe")}
                </Link>
            </div>
            <div>
                <RecipeSearchForm onSearch={updateRecipeList} />
            </div>

            <div>
                {isSearchActive ? (
                    <>
                        <h2 className="text-2xl mb-4">
                            {t("Search Results for")}{" "}
                            <strong>{ingredientNames.join(", ")}</strong>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newRecipesData.data.length > 0 ? (
                                newRecipesData.data.map((recipe) => (
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
                                                        ? "bg-secondary/20"
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
                                                        {t(
                                                            "No Image Available"
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <h2 className="text-2xl font-semibold">
                                                {recipe.title}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {t("created_at", {
                                                    date: new Date(
                                                        recipe.created_at
                                                    ).toLocaleDateString(),
                                                })}
                                            </p>
                                            <p>
                                                {t("ingredients", {
                                                    ingredients:
                                                        recipe.ingredients
                                                            .map(
                                                                (ingredient) =>
                                                                    ingredient.name
                                                            )
                                                            .join(", "),
                                                })}
                                            </p>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>
                                    {t(
                                        "No recipes found for the selected ingredients."
                                    )}
                                </p>
                            )}
                        </div>
                        <Pagination
                            pageData={newRecipesData}
                            itemLabel={t("recipe")}
                        />
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((recipe) => (
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
                                                    ? "bg-secondary/20"
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
                                                    {t("No Image Available")}
                                                </div>
                                            )}
                                        </div>
                                        <h2 className="text-2xl font-semibold">
                                            {recipe.title}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {t("created_at", {
                                                date: new Date(
                                                    recipe.created_at
                                                ).toLocaleDateString(),
                                            })}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <Pagination pageData={recipesData} itemLabel={t("recipe")} />
                    </>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
