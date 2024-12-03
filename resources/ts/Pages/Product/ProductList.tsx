import { Product } from "@/types";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleQuantityChange = (id: number, quantity: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: quantity,
        }));
    };

    const handleAddToCart = (id: number) => {
        const quantity = quantities[id] || 1;
        console.log(`Added ${quantity} of product ${id} to cart`);
    };

    return (
        <div className="product-list">
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <Link
                            href={`/products/${product.id}`}
                            className="flex flex-col items-center justify-between gap-4"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>
                            <div className="flex justify-between items-center gap-6">
                                <span className="text-xl font-bold">
                                    ${product.price}
                                </span>
                                {product.stock_quantity === 0 ? (
                                    <span className="text-red-600 font-semibold">
                                        Out of stock
                                    </span>
                                ) : product.stock_quantity <= 5 ? (
                                    <span className="text-yellow-600 font-semibold">
                                        Only {product.stock_quantity} left in
                                        stock!
                                    </span>
                                ) : (
                                    <span className="text-green-600">
                                        In stock
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <input
                                    type="number"
                                    value={quantities[product.id] || 1}
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
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    className={`${
                                        product.stock_quantity === 0
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 hover:bg-blue-600"
                                    } text-white px-4 py-2 rounded transition`}
                                    disabled={product.stock_quantity === 0}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
