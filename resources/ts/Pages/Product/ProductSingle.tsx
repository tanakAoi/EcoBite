import BackLink from "../../Components/BackLink";
import AddToCartButton from "../../Components/AddToCartButton";
import { Product } from "@/types";
import React, { useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { usePage } from "@inertiajs/react";
import { formatCurrency } from "../../utils/formatCurrency";
import Accordion from "../../Components/Accordion";

interface ProductSingleProps {
    product: Product;
}

const ProductSingle: React.FC<ProductSingleProps> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const { exchangeRates, locale, userCurrency, shopCurrency } = usePage().props;
    const { t } = useLaravelReactI18n();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(
            1,
            Math.min(product.stock_quantity, parseInt(e.target.value, 10))
        );
        setQuantity(newQuantity);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <BackLink
                href={route("product.index")}
                label={t("Back to Products")}
            />
            <div className="flex flex-col gap-4 md:flex-row items-center md:items-start">
                <div
                    className={`md:w-1/2 aspect-square ${
                        !product.image ? "bg-secondary/20 rounded" : ""
                    }`}
                >
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                        />
                    ) : (
                        <div className="flex justify-center items-center w-full h-full text-gray-500 bg-secondary/20">
                            {t("No Image Available")}
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">
                        {product.description}
                    </p>
                    <div className="flex items-center mb-4 justify-between md:justify-start">
                        <span className="text-2xl font-semibold text-green-600">
                            {formatCurrency(
                                product.price,
                                locale,
                                "USD",
                                userCurrency,
                                exchangeRates
                            )}
                        </span>
                        <div className="ml-4">
                            {product.stock_quantity === 0 ? (
                                <span className="text-red-600 font-semibold">
                                    {t("Out of stock")}
                                </span>
                            ) : product.stock_quantity <= 5 ? (
                                <span className="text-yellow-600 font-semibold">
                                    {t("low_stock", {
                                        quantity: product.stock_quantity,
                                    })}
                                </span>
                            ) : (
                                <span className="text-green-600">
                                    {t("In stock")}: {product.stock_quantity}
                                </span>
                            )}
                        </div>
                    </div>
                    {shopCurrency !== userCurrency && <Accordion />}
                    <div className="flex items-center gap-4">
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={product.stock_quantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-20 p-2 border rounded-lg"
                        />
                        <AddToCartButton
                            productQuantities={{ [product.id]: quantity }}
                            inStock={product.stock_quantity > 0 ? true : false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSingle;
