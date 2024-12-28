import Pagination from "../../Components/Pagination";
import AddToCartButton from "../../Components/AddToCartButton";
import { Product } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { FC, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";
import Accordion from "../../Components/Accordion";

interface PaginatedProducts {
    data: Product[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}
interface ProductListProps {
    productsData: PaginatedProducts;
}

const ProductList: FC<ProductListProps> = ({ productsData }) => {
    const { data } = productsData;
    const { exchangeRates, locale, userCurrency, shopCurrency } =
        usePage().props;
    const [productQuantities, setProductQuantities] = useState<{
        [key: number]: number;
    }>({});
    const { t } = useLaravelReactI18n();

    const handleQuantityChange = (id: number, quantity: number) => {
        setProductQuantities((prevProductQuantities) => ({
            ...prevProductQuantities,
            [id]: quantity,
        }));
    };

    return (
        <div className="">
            <h1 className="text-5xl text-center font-bold mb-10 font-serif">
                {t("Our Products")}
            </h1>
            {shopCurrency !== userCurrency && <Accordion />}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center justify-center gap-5 border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <Link
                            href={route("product.show", product.id)}
                            className="w-full flex flex-col items-center justify-between gap-4"
                        >
                            <div
                                className={`w-full aspect-square overflow-hidden rounded-lg ${
                                    !product.image ? "bg-secondary/20" : ""
                                }`}
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex justify-center items-center w-full h-full text-gray-500">
                                        {t("No Image Available")}
                                    </div>
                                )}
                            </div>
                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>
                            <div className="flex justify-between items-center gap-6">
                                <span className="text-xl font-bold">
                                    {formatCurrency(
                                        product.price,
                                        locale,
                                        "SEK",
                                        userCurrency,
                                        exchangeRates
                                    )}
                                </span>
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
                                        {t("In stock")}
                                    </span>
                                )}
                            </div>
                        </Link>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                value={productQuantities[product.id] || 1}
                                min="1"
                                max={product.stock_quantity}
                                onChange={(e) =>
                                    handleQuantityChange(
                                        product.id,
                                        parseInt(e.target.value, 10)
                                    )
                                }
                                className="w-16 p-2 border rounded"
                                disabled={product.stock_quantity === 0}
                            />
                            <AddToCartButton
                                productQuantities={{
                                    ...productQuantities,
                                    [product.id]:
                                        productQuantities[product.id] || 1,
                                }}
                                inStock={
                                    product.stock_quantity > 0 ? true : false
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
            <Pagination pageData={productsData} itemLabel={t("product")} />
        </div>
    );
};

export default ProductList;
