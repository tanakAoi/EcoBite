import React, { useState, useEffect, FC, FormEventHandler } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import axios from "axios";

interface RecipeFormData {
    user_id: number;
    title: string;
    description: string;
    ingredients: { product_id: number | null; name: string }[];
    instructions: Instruction[];
    customIngredient: string;
    currentInstruction: string;
    image: File | null;
}

interface ShopProduct {
    id: number;
    name: string;
}

interface Instruction {
    number: number;
    text: string;
}

const RecipeCreate: FC = () => {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm<RecipeFormData>(
        {
            user_id: auth.user.id,
            title: "",
            description: "",
            ingredients: [],
            instructions: [],
            customIngredient: "",
            currentInstruction: "",
            image: null,
        }
    );

    const [shopIngredients, setShopIngredients] = useState<ShopProduct[]>([]);

    useEffect(() => {
        const fetchShopIngredients = async () => {
            try {
                const response = await axios.get(route("api.products"));
                setShopIngredients(response.data);
            } catch (error) {
                console.error("Error fetching shop ingredients:", error);
            }
        };
        fetchShopIngredients();
    }, []);

    const addCustomIngredient = () => {
        if (data.customIngredient) {
            const newIngredient = {
                name: data.customIngredient,
                product_id: null,
            };
            setData({
                ...data,
                ingredients: [...data.ingredients, newIngredient],
                customIngredient: "",
            });
        }
    };

    const handleIngredientChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedIngredientName = e.target.value;
        if (
            selectedIngredientName &&
            !data.ingredients.some(
                (ingredient) => ingredient.name === selectedIngredientName
            )
        ) {
            const product = shopIngredients.find(
                (item) => item.name === selectedIngredientName
            );
            if (product) {
                const newIngredient = {
                    name: product.name,
                    product_id: product.id,
                };
                setData("ingredients", [...data.ingredients, newIngredient]);
            }
        }
    };

    const removeIngredient = (index: number) => {
        setData({
            ...data,
            ingredients: data.ingredients.filter((_, i) => i !== index),
        });
    };

    const addInstruction = () => {
        if (data.currentInstruction) {
            const newInstruction: Instruction = {
                number: data.instructions.length + 1,
                text: data.currentInstruction,
            };
            setData({
                ...data,
                instructions: [...data.instructions, newInstruction],
                currentInstruction: "",
            });
        }
    };

    const removeInstruction = (index: number) => {
        const updatedInstructions = data.instructions.filter(
            (_, i) => i !== index
        );
        const renumberedInstructions = updatedInstructions.map(
            (instruction, index) => ({
                ...instruction,
                number: index + 1,
            })
        );
        setData({
            ...data,
            instructions: renumberedInstructions,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData("image", e.target.files[0]);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("user_id", String(data.user_id));
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("ingredients", JSON.stringify(data.ingredients));
        formData.append("instructions", JSON.stringify(data.instructions));
        if (data.image) {
            formData.append("image", data.image);
        }

        console.log("formData", formData);

        post(route("recipe.store"), {
            data: formData,
        });
    };

    console.log(data);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Create a New Recipe
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    {errors.title && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                    {errors.description && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Recipe Image
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.image && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.image}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Ingredients
                    </label>
                    <div className="flex gap-2 mb-2">
                        <select
                            onChange={handleIngredientChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">
                                Select from shop ingredients
                            </option>
                            {shopIngredients.map((item) => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Add custom ingredient"
                            value={data.customIngredient}
                            onChange={(e) =>
                                setData("customIngredient", e.target.value)
                            }
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={addCustomIngredient}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data.ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center"
                            >
                                {ingredient.name}
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    ✖
                                </button>
                            </span>
                        ))}
                    </div>
                    {errors.ingredients && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.ingredients}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Instructions
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Add step"
                            value={data.currentInstruction}
                            onChange={(e) =>
                                setData("currentInstruction", e.target.value)
                            }
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={addInstruction}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                    <ol className="list-decimal pl-5">
                        {data.instructions.map((instruction, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-2 mb-1"
                            >
                                <span>
                                    {instruction.number}. {instruction.text}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => removeInstruction(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ol>
                    {errors.instructions && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.instructions}
                        </div>
                    )}
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit Recipe"}
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <Link
                    href={route("recipe.index")}
                    className="text-blue-500 hover:underline"
                >
                    Back to Recipe List
                </Link>
            </div>
        </div>
    );
};

export default RecipeCreate;
