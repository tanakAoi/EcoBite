// resources/js/Pages/Admin/ProductList.tsx

import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Product } from "@/types";
import DeleteForm from "../../Components/DeleteForm";

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
    success?: string;
}

const ProductList: React.FC<AdminProductProps> = ({
    productsData,
    success,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { data, links, current_page, last_page, total } = productsData;

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const handleDelete = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    const decodeHtml = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Product Management
            </h2>
            <Link
                href={route("admin.product.create")}
                className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Add New Product
            </Link>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">ID</th>
                        <th className="px-4 py-2 text-left border">
                            Product Name
                        </th>
                        <th className="px-4 py-2 text-left border">
                            Description
                        </th>
                        <th className="px-4 py-2 text-left border">Price</th>
                        <th className="px-4 py-2 text-left border">Stock</th>
                        <th className="px-4 py-2 text-left border">Image</th>
                        <th className="px-4 py-2 text-left border">
                            Created At
                        </th>
                        <th className="px-4 py-2 text-left border">
                            Updated At
                        </th>
                        <th className="px-4 py-2 text-left border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="border-b relative">
                            <td className="px-4 py-2 border">{product.id}</td>
                            <td className="px-4 py-2 border">{product.name}</td>
                            <td className="px-4 py-2 border">
                                {product.description}
                            </td>
                            <td className="px-4 py-2 border">
                                ${product.price}
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
                                        className=" bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 w-full text-center"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteForm
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
            <div className="mt-6 flex justify-center space-x-2">
                {links.map((link, index) => {
                    const label = decodeHtml(link.label);
                    if (link.url) {
                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 border rounded-md ${
                                    link.active
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    } else {
                        return (
                            <span
                                key={index}
                                className="px-4 py-2 border rounded-md text-gray-300"
                            >
                                {label}
                            </span>
                        );
                    }
                })}
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                Page {current_page} of {last_page} ({total} products)
            </div>
        </div>
    );
};

export default ProductList;
