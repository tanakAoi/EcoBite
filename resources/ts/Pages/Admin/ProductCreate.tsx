import { useState, useEffect, FormEventHandler, FC } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Button from "../../Components/Button";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import useFileUpload from "../../hooks/useFileUpload";

const ProductCreate: FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        image: null as File | null,
        image_url: "",
    });
    const { t } = useLaravelReactI18n();
    const { uploadImage, error } = useFileUpload("products");
    const { shopCurrency } = usePage().props;

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

            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", String(data.price));
            formData.append("stock_quantity", String(data.stock_quantity));
            formData.append("image_url", data.image_url);
            formData.append("product_currency", shopCurrency);

            post(route("admin.product.store"), {
                data: formData,
            });

            setIsSubmitting(false);
        }
    }, [isSubmitting]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 font-serif">
                {t("Create a New Product")}
            </h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-6"
            >
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Product Name")}
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    {errors.name && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.name}
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
                        {t("Price")}
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) =>
                                setData("price", parseFloat(e.target.value))
                            }
                            className="block w-fit p-2 border border-gray-300 rounded-lg"
                            required
                        />
                        <span>{shopCurrency}</span>
                    </div>
                    {errors.price && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Stock Quantity")}
                    </label>
                    <input
                        type="number"
                        value={data.stock_quantity}
                        onChange={(e) =>
                            setData("stock_quantity", parseInt(e.target.value))
                        }
                        className="block w-fit p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    {errors.stock_quantity && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.stock_quantity}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Product Image")}
                    </label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setData("image", e.target.files?.[0] || null)
                        }
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
                    <Button
                        label={processing ? t("Saving...") : t("Save Product")}
                        type="submit"
                        disabled={processing}
                    />
                </div>
            </form>
            <BackLink
                href={route("admin.product.index")}
                label={t("Back to Products")}
                className="mb-0"
            />
        </div>
    );
};

export default ProductCreate;
