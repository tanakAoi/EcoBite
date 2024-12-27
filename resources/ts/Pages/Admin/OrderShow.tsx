// resources/js/Pages/Admin/OrderShow.tsx

import React from "react";
import { Link } from "@inertiajs/react";
import { OrderDetails, OrderItem } from "@/types";
import BackLink from "../../Components/BackLink";

interface OrderShowProps {
    order: OrderDetails;
}

const OrderShow: React.FC<OrderShowProps> = ({ order }) => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Details - #{order.id}
            </h2>
            <div className="space-y-4 mb-6">
                <div>
                    <strong className="text-gray-700">Order ID:</strong> #
                    {order.id}
                </div>
                <div>
                    <strong className="text-gray-700">Customer Name:</strong>{" "}
                    {order.user.username}
                </div>
                <div>
                    <strong className="text-gray-700">Customer Email:</strong>{" "}
                    {order.user.email}
                </div>
                <div>
                    <strong className="text-gray-700">Total Price:</strong> $
                    {order.total_price}
                </div>
                <div>
                    <strong className="text-gray-700">Order Status:</strong>{" "}
                    {order.order_status}
                </div>
                <div>
                    <strong className="text-gray-700">Created At:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                </div>
                <div>
                    <strong className="text-gray-700">Updated At:</strong>{" "}
                    {new Date(order.updated_at).toLocaleString()}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Order Items
                </h3>
                <table className="min-w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">Product Name</th>
                            <th className="px-4 py-2 border">Quantity</th>
                            <th className="px-4 py-2 border">Unit Price</th>
                            <th className="px-4 py-2 border">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item: OrderItem) => (
                            <tr key={item.id}>
                                <td className="px-4 py-2 border">
                                    {item.product.name}
                                </td>
                                <td className="px-4 py-2 border">
                                    {item.quantity}
                                </td>
                                <td className="px-4 py-2 border">
                                    ${item.product.price}
                                </td>
                                <td className="px-4 py-2 border">
                                    ${item.total_price}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <BackLink
                href={route("admin.order.index")}
                label="Back to Orders"
                className="mb-0 mt-6"
            />
        </div>
    );
};

export default OrderShow;
