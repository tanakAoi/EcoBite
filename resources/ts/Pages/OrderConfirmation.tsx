import { CartItem, CartItemProduct, Product } from "@/types";
import { Button } from "@headlessui/react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

const OrderConfirmation: FC = ({}) => {
    const { cart, user } = usePage().props;
    const [orderId, setOrderId] = useState<number | null>(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const saveOrderData = async () => {
            if (orderPlaced) return;

            try {
                const response = await axios.post(route("order.store"), {
                    user_id: user ? user.id : null,
                    session_id: user ? null : cart.session_id,
                    total_price: cart.total_price,
                    items: cart.items,
                });
                if (response.status === 201) {
                    setOrderId(response.data.order_id);
                    setOrderPlaced(true);

                    await axios.delete(route("cart.clear"), {
                        params: {
                            user_id: user ? user.id : null,
                            session_id: user ? null : cart.session_id,
                        },
                    });
                }
            } catch (error) {
                console.error("Error saving order:", error);
            }
        };
        saveOrderData();
    }, [orderPlaced, cart]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-auto mt-10">
                <h2 className="text-5xl font-bold text-center mb-8 text-text font-serif">
                    Order Confirmation
                </h2>
                <div className="text-center text-lg text-text/80 mb-10">
                    <p>Thank you for your order!</p>
                    <p>
                        Your order ID is: <strong>{orderId}</strong>
                        <span className="font-bold text-gray-900"></span>
                    </p>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl font-serif font-semibold text-gray-800">
                        Order Summary
                    </h3>
                    <ul className="list-none space-y-4 mt-4">
                        {cart.items?.map(
                            (item: CartItemProduct, index: number) => (
                                <li
                                    key={index}
                                    className="flex justify-between text-gray-700"
                                >
                                    <span>
                                        {item.product.name} (x{item.quantity})
                                    </span>
                                    <span>
                                        {(
                                            item.product.price * item.quantity
                                        ).toFixed(2)}{" "}
                                        SEK
                                    </span>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div className="border-t border-gray-300 pt-4 mt-6">
                    <div className="flex justify-between font-serif font-semibold text-xl text-gray-800">
                        <span>Total Amount:</span>
                        <span>{cart.total_price} SEK</span>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-md text-gray-600">
                        We will send you an email confirmation shortly with more
                        details.
                    </p>
                </div>
            </div>
            <Link
                href={route("home")}
                className="mt-10 flex hover:underline"
            >
                Back to home
            </Link>
        </div>
    );
};

export default OrderConfirmation;
