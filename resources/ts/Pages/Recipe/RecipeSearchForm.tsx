import Button from "../../Components/Button";
import { PaginatedRecipes, Recipe } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface RecipeSearchFormProps {
    onSearch: (
        searchedRecipesData: PaginatedRecipes,
        ingredientNames: string[]
    ) => void;
}

const RecipeSearchForm: FC<RecipeSearchFormProps> = ({ onSearch }) => {
    const { t } = useLaravelReactI18n();
    const [shopProducts, setShopProducts] = useState<
        { id: number; name: string }[]
    >([]);
    const [otherIngredients, setOtherIngredients] = useState<
        { id: number; name: string }[]
    >([]);
    const { data, setData, post, processing, errors, reset } = useForm<{
        selectedIngredients: number[];
    }>({
        selectedIngredients: [] as number[],
    });

    useEffect(() => {
        const fetchAllIngredients = async () => {
            try {
                const response = await axios.get(
                    route("api.recipe-ingredients")
                );

                const allIngredients = response.data;

                const shopProducts = allIngredients.filter(
                    (ingredient: { product_id: number }) =>
                        ingredient.product_id
                );
                const otherIngredients = allIngredients.filter(
                    (ingredient: { product_id: number }) =>
                        !ingredient.product_id
                );

                setShopProducts(shopProducts);
                setOtherIngredients(otherIngredients);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        fetchAllIngredients();
    }, []);

    const addIngredient = (id: number) => {
        const newIngredients = data.selectedIngredients.includes(id)
            ? data.selectedIngredients.filter((item) => item !== id)
            : [...data.selectedIngredients, id];
        setData("selectedIngredients", newIngredients);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                route("recipe.search", {
                    selectedIngredients: data.selectedIngredients,
                }),
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );

            if (response.status === 200) {
                const { searchedRecipesData, ingredientNames } = response.data;
                onSearch(searchedRecipesData, ingredientNames);
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="bg-light p-6 rounded-lg shadow-lg my-6">
            <h2 className="text-xl text-center md:text-2xl font-bold font-serif mb-4">
                {t("Search recipes by ingredients")}
            </h2>
            <form
                className="flex flex-col md:flex-row justify-between gap-2"
                onSubmit={handleSearch}
            >
                <div className="flex flex-col md:flex-row gap-1 w-full">
                    <select
                        onChange={(e) => addIngredient(Number(e.target.value))}
                        className="bg-white border md:w-1/2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-300"
                    >
                        <option value="">{t("Store products")}</option>
                        {shopProducts.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => addIngredient(Number(e.target.value))}
                        className="bg-white border md:w-1/2 border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-dark focus:border-transparent transition duration-300"
                    >
                        <option value="">{t("Other ingredients")}</option>
                        {otherIngredients.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    label={t("Search")}
                    type="submit"
                    disabled={processing}
                />
            </form>
            <div className="mt-2 flex gap-1 overflow-hidden flex-wrap">
                {data.selectedIngredients.map((id) => {
                    const ingredient =
                        shopProducts.find((item) => item.id === id) ||
                        otherIngredients.find((item) => item.id === id);
                    return ingredient ? (
                        <span
                            key={id}
                            className="bg-dark text-light px-4 py-1 rounded-full flex items-center justify-center gap-2 w-fit"
                        >
                            {ingredient.name}{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    setData(
                                        "selectedIngredients",
                                        data.selectedIngredients.filter(
                                            (item) => item !== id
                                        )
                                    )
                                }
                            >
                                &times;
                            </button>
                        </span>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default RecipeSearchForm;
