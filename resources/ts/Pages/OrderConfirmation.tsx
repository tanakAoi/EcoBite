import React from "react";

interface OrderConfirmationProps {
    orderId: string;
    customerName: string;
    totalAmount: number;
    items: { name: string; quantity: number; price: number }[];
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
    orderId,
    customerName,
    totalAmount,
    items,
}) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                Order Confirmation
            </h2>
            <div className="text-center text-lg text-gray-600 mb-6">
                <p>Thank you for your order, {customerName}!</p>
                <p>
                    Your order ID is:{" "}
                    <span className="font-bold text-gray-900">{orderId}</span>
                </p>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800">
                    Order Summary
                </h3>
                <ul className="list-none space-y-4 mt-4">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between text-gray-700"
                        >
                            <span>
                                {item.name} (x{item.quantity})
                            </span>
                            <span>
                                {(item.price * item.quantity).toFixed(2)} SEK
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="border-t border-gray-300 pt-4 mt-6">
                <div className="flex justify-between font-semibold text-xl text-gray-800">
                    <span>Total Amount:</span>
                    <span>{totalAmount.toFixed(2)} SEK</span>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-lg text-gray-600">
                    We will send you an email confirmation shortly with more
                    details.
                </p>
            </div>
        </div>
    );
};

export default OrderConfirmation;
