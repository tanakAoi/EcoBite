import React from "react";
import DeleteForm from "../../Components/DeleteForm";
import { Link, usePage } from "@inertiajs/react";
import { Product } from "@/types";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductShowProps {
    product: Product;
}

const ProductShow: React.FC<ProductShowProps> = ({ product }) => {
    const { t } = useLaravelReactI18n();
    const { locale, shopCurrency, exchangeRates } = usePage().props;

    const handleDelete = () => {
        window.location.href = "/admin/product";
    };

    return (
        <div className="max-w-4xl mx-auto min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex flex-col items-center gap-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-md object-cover rounded-md border border-gray-300"
                    />
                    <h2 className="text-3xl font-bold text-gray-800">
                        {product.name}
                    </h2>
                    <p className="text-gray-600 text-center text-lg">
                        {product.description}
                    </p>
                    <p className="text-2xl font-semibold text-gray-800 mb-8">
                        {formatCurrency(
                            product.price,
                            locale,
                            shopCurrency,
                            shopCurrency,
                            exchangeRates
                        )}
                    </p>
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <Link
                        href={route("admin.product.edit", product.id)}
                        className="max-w-md w-full text-center bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition"
                    >
                        {t("Edit")}
                    </Link>
                    <DeleteForm
                        productId={product.id}
                        onDelete={handleDelete}
                        deleteObject="product"
                    />
                </div>
            </div>
            <BackLink
                href={route("admin.product.index")}
                label={t("Back to Products")}
            />
        </div>
    );
};

export default ProductShow;
