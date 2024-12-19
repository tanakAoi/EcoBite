import { Cart } from "@/types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

interface CartProps {
    cart: Cart;
}

const CartContent: React.FC<CartProps> = ({ cart }) => {
    const [updatedCart, setUpdatedCart] = useState<Cart>(cart);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setUpdatedCart(cart);
        setIsLoading(false);
    }, [cart]);

    const handleQuantityChange = async (
        cartItemId: number,
        newQuantity: number
    ) => {
        setIsLoading(true);
        try {
            const response = await axios.put(
                route("cart.item.update", cartItemId),
                {
                    quantity: newQuantity,
                }
            );

            if (response.status === 200) {
                const updatedItem = response.data[0];
                const updatedTotalPrice = response.data[1];

                setUpdatedCart((prevCart) => {
                    const updatedItems = prevCart.items?.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                    );

                    return {
                        ...prevCart,
                        items: updatedItems,
                        total_price: updatedTotalPrice,
                    };
                });
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleIncrement = (cartItemId: number, quantity: number) => {
        if (cart.items) {
            cart.items.map((item) => {
                if (cartItemId === item.id) {
                    const stock = item.product.stock_quantity;

                    if (quantity < stock) {
                        handleQuantityChange(cartItemId, quantity + 1);
                    }
                }
            });
        }
    };

    const handleDecrement = (cartItemId: number, quantity: number) => {
        if (quantity > 1) {
            handleQuantityChange(cartItemId, quantity - 1);
        }
    };

    const RemoveItem = async (cartItemId: number) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(
                route("cart.item.delete", cartItemId)
            );

            if (response.status === 200) {
                const updatedTotalPrice = response.data[0];

                setUpdatedCart((prevCart) => {
                    const updatedItems = prevCart.items?.filter(
                        (item) => item.id !== cartItemId
                    );

                    return {
                        ...prevCart,
                        items: updatedItems,
                        total_price: updatedTotalPrice,
                    };
                });

                window.location.reload();
            }
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-4xl font-serif font-bold mb-6">Your Cart</h2>

            {updatedCart.items && updatedCart.items.length > 0 ? (
                <div>
                    <ul className="space-y-6">
                        {updatedCart.items.map((item) => (
                            <li
                                key={item.id}
                                className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-5 md:gap-0 md:flex-row md:justify-between md:items-center"
                            >
                                <div className="flex items-center space-x-4">
                                    {item.product.image ? (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    ) : (
                                        <div className="bg-gray-300 w-20 h-20"></div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-xl">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-gray-600">
                                            Price: ${item.product.price}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between space-x-4">
                                    <div className="flex items-center space-x-2 text-lg">
                                        <button
                                            className="px-2 py-0 bg-gray-200 rounded-full"
                                            onClick={() =>
                                                handleDecrement(
                                                    item.id,
                                                    item.quantity
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="px-2 py-0 bg-gray-200 rounded-full"
                                            onClick={() =>
                                                handleIncrement(
                                                    item.id,
                                                    item.quantity
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => {
                                                RemoveItem(item.id);
                                            }}
                                        >
                                            <TrashIcon className="h-6 w-6 ml-1" />
                                        </button>
                                    </div>
                                    <div className="text-lg font-medium">
                                        <span>Total:</span> $
                                        {(
                                            item.product.price * item.quantity
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10 flex justify-between items-center">
                        <p className="text-xl font-semibold">
                            Total: ${updatedCart.total_price}
                        </p>
                        <Link
                            method="post"
                            href={route("checkout.index")}
                            className="bg-secondary hover:bg-primary text-light px-6 py-2 rounded-md transition"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-gray-600">Your cart is empty</p>
            )}
        </div>
    );
};

export default CartContent;
