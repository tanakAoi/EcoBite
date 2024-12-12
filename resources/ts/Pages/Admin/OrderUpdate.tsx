import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { OrderDetails, OrderItem } from "@/types";

interface OrderUpdateProps {
    order: OrderDetails;
}

const OrderUpdate: React.FC<OrderUpdateProps> = ({ order }) => {
    const { data, setData, put, processing, errors } = useForm({
        order_status: order.order_status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.order.update", order.id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Order updated successfully!");
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit Order - #{order.id}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Order Status
                    </label>
                    <select
                        value={data.order_status}
                        onChange={(e) =>
                            setData("order_status", e.target.value)
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.order_status && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.order_status}
                        </div>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>

            <div className="mt-8">
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

            <div className="mt-4">
                <Link
                    href={route("admin.order.index")}
                    className="text-blue-500 hover:underline"
                >
                    Back to Orders List
                </Link>
            </div>
        </div>
    );
};

export default OrderUpdate;
