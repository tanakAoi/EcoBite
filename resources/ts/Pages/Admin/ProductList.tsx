// resources/js/Pages/Admin/ProductList.tsx

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Product } from "@/types";
import DeleteForm from "../../Components/DeleteForm";
import Pagination from "../../Components/Pagination";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";

interface PaginatedProducts {
    data: Product[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface AdminProductProps {
    productsData: PaginatedProducts;
}

const ProductList: React.FC<AdminProductProps> = ({ productsData }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { data } = productsData;
    const { t } = useLaravelReactI18n();
    const { locale, shopCurrency, exchangeRates } = usePage().props;

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const handleDelete = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-4">
                    {t("Product Management")}
                </h2>
                <Link
                    href={route("admin.product.create")}
                    className="mb-4 inline-block bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition"
                >
                    {t("Add New Product")}
                </Link>
            </div>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">ID</th>
                        <th className="px-4 py-2 text-left border">
                            {t("Product Name")}
                        </th>
                        <th className="px-4 py-2 text-left border">
                            {t("Description")}
                        </th>
                        <th className="px-4 py-2 text-left border">
                            {t("Price")}
                        </th>
                        <th className="px-4 py-2 text-left border text-nowrap">
                            {t("Stock Quantity")}
                        </th>
                        <th className="px-4 py-2 text-left border text-nowrap">
                            {t("Product Image")}
                        </th>
                        <th className="px-4 py-2 text-left border">
                            {t("Created At")}
                        </th>
                        <th className="px-4 py-2 text-left border">
                            {t("Updated At")}
                        </th>
                        <th className="px-4 py-2 text-left border">
                            {t("Actions")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b relative">
                            <td className="px-4 py-2 border">{product.id}</td>
                            <td className="px-4 py-2 border">{product.name}</td>
                            <td className="px-4 py-2 border">
                                {product.description.length > 50
                                    ? `${product.description.substring(
                                          0,
                                          50
                                      )}...`
                                    : product.description}
                            </td>
                            <td className="px-4 py-2 border">
                                {formatCurrency(
                                    product.price,
                                    locale,
                                    shopCurrency,
                                    shopCurrency,
                                    exchangeRates
                                )}
                            </td>
                            <td className="px-4 py-2 border">
                                {product.stock_quantity}
                            </td>
                            <td className="px-4 py-2 border">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: "50px", height: "auto" }}
                                />
                            </td>
                            <td className="px-4 py-2 border">
                                {new Date(
                                    product.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 border">
                                {new Date(
                                    product.updated_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 border">
                                <div className="flex flex-col items-center gap-2 relative z-10">
                                    <Link
                                        href={route(
                                            "admin.product.edit",
                                            product.id
                                        )}
                                        className=" bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition w-full text-center text-nowrap"
                                    >
                                        {t("Edit")}
                                    </Link>
                                    <DeleteForm
                                        deleteObject="product"
                                        productId={product.id}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            </td>
                            <Link
                                href={route("admin.product.show", product.id)}
                                className="absolute inset-0 z-0"
                            ></Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pageData={productsData} itemLabel={t("product")} />
            <BackLink
                href={route("admin.index")}
                label={t("Back to Dashboard")}
                className="i"
            />
        </div>
    );
};

export default ProductList;
