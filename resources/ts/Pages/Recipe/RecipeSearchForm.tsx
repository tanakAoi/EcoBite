import Button from "../../Components/Button";
import { Recipe } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface RecipeSearchFormProps {
    onSearch: (recipes: Recipe[], ingredientNames: string[]) => void;
}

const RecipeSearchForm: FC<RecipeSearchFormProps> = ({ onSearch }) => {
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
                    (ingredient: { product_id: number }) => ingredient.product_id
                );
                const otherIngredients = allIngredients.filter(
                    (ingredient: { product_id: number }) => !ingredient.product_id
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
                const { recipes, ingredient_names } = response.data;
                onSearch(recipes, ingredient_names);
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div>
            <h2>Search recipes by ingredients</h2>
            <form onSubmit={handleSearch}>
                <select onChange={(e) => addIngredient(Number(e.target.value))}>
                    <option value="">Select from shop products</option>
                    {shopProducts.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <select onChange={(e) => addIngredient(Number(e.target.value))}>
                    <option value="">Select from other ingredients</option>
                    {otherIngredients.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div>
                    {data.selectedIngredients.map((id) => {
                        const ingredient =
                            shopProducts.find((item) => item.id === id) ||
                            otherIngredients.find((item) => item.id === id);
                        return ingredient ? (
                            <span key={id} className="">
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
                                    className=""
                                >
                                    &times;
                                </button>
                            </span>
                        ) : null;
                    })}
                </div>
                <Button label="Search" type="submit" disabled={processing} />
            </form>
        </div>
    );
};

export default RecipeSearchForm;
