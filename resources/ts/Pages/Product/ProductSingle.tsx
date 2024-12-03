import { Product } from "@/types";
import { usePage } from "@inertiajs/react";
import React, { useState } from "react";

interface ProductDetailProps {
    product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1);
    const { auth } = usePage().props;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(
            1,
            Math.min(product.stock_quantity, parseInt(e.target.value, 10))
        );
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} of product ${product.id} to cart`);
    };

    return (
        <div className="product-detail-container max-w-4xl mx-auto p-6">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-xl text-gray-600 mb-4">
                        {product.description}
                    </p>
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-semibold text-green-600">
                            ${product.price}
                        </span>
                        <div className="ml-4">
                            {product.stock_quantity === 0 ? (
                                <span className="text-red-600 font-semibold">
                                    Out of stock
                                </span>
                            ) : product.stock_quantity <= 5 ? (
                                <span className="text-yellow-600 font-semibold">
                                    Only {product.stock_quantity} left in stock!
                                </span>
                            ) : (
                                <span className="text-green-600">
                                    In stock: {product.stock_quantity}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <input
                            id="quantity"
                            type="number"
                            min="1"
                            max={product.stock_quantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-20 p-2 border rounded-lg"
                        />
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`${
                            product.stock_quantity === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white px-6 py-3 rounded-lg transition`}
                        disabled={product.stock_quantity === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
