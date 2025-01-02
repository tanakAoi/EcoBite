import BackLink from "../../Components/BackLink";
import { Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import  { FC } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface RecipeSingleProps {
    recipe: Recipe;
}

const RecipeSingle: FC<RecipeSingleProps> = ({ recipe }) => {
    const { t } = useLaravelReactI18n();
    console.log(recipe);

    return (
        <div className="max-w-4xl mx-auto">
            <BackLink
                href={route("recipe.index")}
                label={t("Back to Recipes")}
            />
            <div className="">
                <div
                    className={`w-full h-64 overflow-hidden rounded-lg mb-8 ${
                        !recipe.image ? "bg-secondary/20" : ""
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

                <div className="flex flex-col gap-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 font-serif">
                            {recipe.title}
                        </h1>
                        <span className="text-sm text-gray-500">
                            {t("created_at", {
                                date: new Date(
                                    recipe.created_at
                                ).toLocaleDateString(),
                            })}
                        </span>
                    </div>

                    <p className="text-lg text-gray-700">
                        {recipe.description}
                    </p>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">
                                {t("Ingredients")}
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
                                                    className="text-dark/80 underline"
                                                >
                                                    {ingredient.product.name}
                                                </Link>
                                            ) : (
                                                ingredient.name
                                            )}
                                            {" : "}
                                            {ingredient.quantity}{" "}
                                            {(ingredient.unit === "cup" &&
                                                ingredient.quantity > 1) ||
                                            (ingredient.unit === "piece" &&
                                                ingredient.quantity > 1)
                                                ? `${t(ingredient.unit)}s`
                                                : t(ingredient.unit)}
                                        </li>
                                    ))
                                ) : (
                                    <p>{t("No ingredients available.")}</p>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">
                                {t("Instructions")}
                            </h2>
                            <div className="text-lg text-gray-700 flex flex-col gap-3">
                                {recipe.instructions
                                    .split("\n")
                                    .map((instruction, index) => (
                                        <p key={index}>{instruction}</p>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSingle;
