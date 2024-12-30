import BackLink from "../../Components/BackLink";
import Button from "../../Components/Button";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { ChangeEvent, FC, FormEventHandler, useEffect, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import useFileUpload from "../../hooks/useFileUpload";

interface ProductEditProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock_quantity: number;
        image: null;
        image_url: string;
    };
}

const ProductEdit: FC<ProductEditProps> = ({ product }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, put, post, processing, errors } = useForm({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        image: null as File | null,
        image_url: product.image ?? "",
    });
    const { t } = useLaravelReactI18n();
    const { uploadImage, error } = useFileUpload("products");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({ ...prev, image: file }));
        }
    };
    console.log(data);
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

            formData.append("_method", "put");
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", String(data.price));
            formData.append("stock_quantity", String(data.stock_quantity));
            formData.append("image_url", data.image_url);

            post(route("admin.product.update", product.id), {
                data: formData,
            });

            setIsSubmitting(false);
        }
    }, [isSubmitting, data.image_url]);

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {t("Edit Product")}
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="flex flex-col">
                        <label
                            htmlFor="name"
                            className="text-gray-700 font-medium"
                        >
                            {t("Product Name")}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="description"
                            className="text-gray-700 font-medium"
                        >
                            {t("Description")}
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label
                                htmlFor="price"
                                className="text-gray-700 font-medium"
                            >
                                {t("Price")}
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={data.price}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 mt-1"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-sm">
                                    {errors.price}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="stock_quantity"
                                className="text-gray-700 font-medium"
                            >
                                {t("Stock Quantity")}
                            </label>
                            <input
                                type="number"
                                id="stock_quantity"
                                name="stock_quantity"
                                value={data.stock_quantity}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md p-2 mt-1"
                            />
                            {errors.stock_quantity && (
                                <p className="text-red-500 text-sm">
                                    {errors.stock_quantity}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="" className="text-gray-700 font-medium">
                            {t("Product Image")}
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border border-gray-300 rounded-md p-2 mt-1"
                        />
                        {typeof data.image === "string" && data.image && (
                            <div className="mt-4">
                                <img
                                    src={data.image}
                                    alt="Product"
                                    className="w-32 rounded-md border"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            label={processing ? t("Saving...") : t("Save")}
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                        />
                    </div>
                </form>
            </div>
            <BackLink
                href={route("admin.product.index")}
                label={t("Back to Products")}
            />
        </div>
    );
};

export default ProductEdit;
