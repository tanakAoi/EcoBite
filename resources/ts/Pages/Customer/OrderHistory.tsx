import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { Order } from "@/types";

interface OrderHistoryProps {
    orders: Order[];
}

const OrderHistory: FC<OrderHistoryProps> = ({ orders }) => {
    console.log(orders);
    
    if (orders.length === 0) {
        return <div className="text-center mt-10">No orders found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order History
            </h2>
             <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-700">
                                Order #{order.id}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="text-gray-600">
                            <p>
                                <strong>Total:</strong> $
                                {order.total_price}
                            </p>
                            <p>
                                <strong>Status:</strong> {order.order_status}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-700">
                                Items:
                            </h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.product.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
