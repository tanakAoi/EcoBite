import React from "react";
import DeleteForm from "../../Components/DeleteForm";
import { Link } from "@inertiajs/react";
import { Product } from "@/types";

interface ProductShowProps {
    product: Product;
}

const ProductShow: React.FC<ProductShowProps> = ({ product }) => {
    const handleDelete = () => {
        window.location.href = "/admin/product";
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg max-w-4xl mx-auto p-6">
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
                        ${product.price}
                    </p>
                </div>
                <div className="flex gap-4 w-full justify-center">
                    <Link
                        href={route("admin.product.edit", product.id)}
                        className="max-w-md w-full text-center bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition"
                    >
                        Edit
                    </Link>
                    <DeleteForm
                        productId={product.id}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductShow;
