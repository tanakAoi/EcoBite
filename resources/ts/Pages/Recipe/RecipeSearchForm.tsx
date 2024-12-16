import { Recipe } from "@/types";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface RecipeSearchFormProps {
    onSearch: (recipes: Recipe[]) => void;
}

const RecipeSearchForm: FC<RecipeSearchFormProps> = ({ onSearch }) => {
    const [allIngredients, setAllIngredients] = useState<
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
                setAllIngredients(response.data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        fetchAllIngredients();
    }, []);

    console.log("allIngredients", allIngredients);

    const addIngredient = (id: number) => {
        const newIngredients = data.selectedIngredients.includes(id)
            ? data.selectedIngredients.filter((item) => item !== id)
            : [...data.selectedIngredients, id];
        setData("selectedIngredients", newIngredients);
    };

    console.log("selectedIngredients", data.selectedIngredients);

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
            console.log("Search response:", response);
            if (response.status === 200) {
                onSearch(response.data.recipes);
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
                    <option value="">Select an ingredient</option>
                    {allIngredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                        </option>
                    ))}
                </select>
                <div>
                    {data.selectedIngredients.map((id) => {
                        const ingredient = allIngredients.find(
                            (item) => item.id === id
                        );
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
                <button type="submit" disabled={processing}>
                    {processing ? "Searching..." : "Search"}
                </button>
            </form>
        </div>
    );
};

export default RecipeSearchForm;
