import React, { useState, useEffect, FC, FormEventHandler } from "react";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import Button from "../../Components/Button";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import useFileUpload from "../../hooks/useFileUpload";

interface RecipeFormData {
    user_id: number;
    title: string;
    description: string;
    ingredients: {
        product_id: number | null;
        name: string;
        quantity: number;
        unit: string;
    }[];
    instructions: Instruction[];
    customIngredient: string;
    currentInstruction: string;
    image: File | null;
    image_url: string | null;
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
    const { user } = usePage().props;
    const { t } = useLaravelReactI18n();
    const { uploadImage, error } = useFileUpload("recipes");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCustomIngredient, setIsCustomIngredient] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState<{
        name: string;
        product_id: number | null;
        quantity: number;
        unit: string;
    }>({
        name: "",
        product_id: null,
        quantity: 0,
        unit: "",
    });
    const [shopIngredients, setShopIngredients] = useState<ShopProduct[]>([]);
    const unitOptions = [
        "g",
        "kg",
        "ml",
        "l",
        "tbsp",
        "tsp",
        "cup",
        "piece",
    ];

    if (!user) {
        return <div>{t("Loading...")}</div>;
    }

    const { data, setData, post, processing, errors } = useForm<RecipeFormData>(
        {
            user_id: user.id,
            title: "",
            description: "",
            ingredients: [],
            instructions: [],
            customIngredient: "",
            currentInstruction: "",
            image: null,
            image_url: "",
        }
    );
    console.log(data);
    

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

    const addIngredient = () => {
        if (
            currentIngredient.name &&
            currentIngredient.quantity > 0 &&
            currentIngredient.unit
        ) {
            setData("ingredients", [...data.ingredients, currentIngredient]);
            setCurrentIngredient({
                name: "",
                product_id: null,
                quantity: 0,
                unit: "",
            });
            setIsCustomIngredient(false);
        }
    };

    const handleIngredientChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedValue = e.target.value;
        if (selectedValue === "other") {
            setIsCustomIngredient(true);
            setCurrentIngredient({ ...currentIngredient, product_id: null });
        } else {
            const product = shopIngredients.find(
                (item) => String(item.id) === selectedValue
            );
            if (product) {
                setIsCustomIngredient(false);
                setCurrentIngredient({
                    name: product.name,
                    product_id: product.id,
                    quantity: 0,
                    unit: "",
                });
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

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (data.image) {
            const uploadedImageUrl = await uploadImage(data.image);

            if (!uploadedImageUrl || error) {
                setIsSubmitting(false);
                return;
            }

            setData("image_url", uploadedImageUrl);
        }

        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            const formData = new FormData();

            formData.append("user_id", String(data.user_id));
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("ingredients", JSON.stringify(data.ingredients));
            formData.append("instructions", JSON.stringify(data.instructions));
            if (data.image_url) {
                formData.append("image_url", data.image_url);
            }

            post(route("recipe.store"), {
                data: formData,
            });

            setIsSubmitting(false);
        }
    }, [isSubmitting]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 font-serif">
                {t("Create a new recipe")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Title")}
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
                        {t("Description")}
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
                        {t("Recipe Image")}
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
                        {t("Ingredients")}
                    </label>
                    <div className="flex gap-2 mb-2">
                        <select
                            onChange={handleIngredientChange}
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">
                                {t("Select from shop ingredients")}
                            </option>
                            {shopIngredients.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                            <option value="other" className="font-bold">
                                {t("Add custom ingredient")}
                            </option>
                        </select>
                        {isCustomIngredient && (
                            <input
                                type="text"
                                placeholder={t("Custom ingredient name")}
                                value={currentIngredient.name}
                                onChange={(e) =>
                                    setCurrentIngredient({
                                        ...currentIngredient,
                                        name: e.target.value,
                                    })
                                }
                                className="block w-full p-2 border border-gray-300 rounded-lg"
                            />
                        )}
                        <input
                            type="number"
                            min={0}
                            placeholder="Quantity"
                            value={currentIngredient.quantity}
                            onChange={(e) =>
                                setCurrentIngredient({
                                    ...currentIngredient,
                                    quantity: parseFloat(e.target.value),
                                })
                            }
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg"
                        />
                        <select
                            value={currentIngredient.unit}
                            onChange={(e) =>
                                setCurrentIngredient({
                                    ...currentIngredient,
                                    unit: e.target.value,
                                })
                            }
                            className="block w-1/3 p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">{t("Select unit")}</option>
                            {unitOptions.map((unit) => (
                                <option key={unit} value={unit}>
                                    {t(unit)}
                                </option>
                            ))}
                        </select>
                        <Button
                            label={t("Add")}
                            type="button"
                            onClick={addIngredient}
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {data.ingredients.map((ingredient, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm flex items-center"
                            >
                                {ingredient.name} - {ingredient.quantity}{" "}
                                {t(ingredient.unit)}
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
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Instructions")}
                    </label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder={t("Add step")}
                            value={data.currentInstruction}
                            onChange={(e) =>
                                setData("currentInstruction", e.target.value)
                            }
                            className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                        <Button
                            label={t("Add")}
                            type="button"
                            onClick={addInstruction}
                        />
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
                    <Button
                        label={processing ? t("Saving...") : t("Submit Recipe")}
                        type="submit"
                        disabled={processing}
                    />
                </div>
                {error && <div>{error}</div>}
            </form>
            <BackLink
                href={route("recipe.index")}
                label={t("Back to Recipes")}
                className="mb-0"
            />
        </div>
    );
};

export default RecipeCreate;
