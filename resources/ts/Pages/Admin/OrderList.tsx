import React, { FC, useState } from "react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { Order } from "@/types";

interface PaginatedOrders {
    data: Order[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface OrderListProps {
    ordersData: PaginatedOrders;
    statuses: string[];
}

const OrderList: FC<OrderListProps> = ({ ordersData }) => {
    const { data, links, current_page, last_page, total } = ordersData;
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [updatedStatus, setUpdatedStatus] = useState<Record<number, string>>(
        {}
    );
    const statuses = ["pending", "processing", "completed", "cancelled"];

    const decodeHtml = (html: string) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const updateOrderStatus = async (orderId: number) => {
        try {
            const newStatus = updatedStatus[orderId];
            await axios.post(route("admin.order.update", orderId), {
                order_status: newStatus,
            });
            setEditingOrderId(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        orderId: number
    ) => {
        setUpdatedStatus((prev) => ({
            ...prev,
            [orderId]: e.target.value,
        }));
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Orders
            </h2>
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">User ID</th>
                        <th className="px-4 py-2 text-left">Total Price</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Created At</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr key={order.id} className="border-b relative z-0">
                            <td className="px-4 py-2">{order.id}</td>
                            <td className="px-4 py-2">{order.user_id}</td>
                            <td className="px-4 py-2">${order.total_price}</td>
                            <td className="px-4 py-2">
                                {editingOrderId === order.id ? (
                                    <select
                                        value={
                                            updatedStatus[order.id] ??
                                            order.order_status
                                        }
                                        onChange={(e) =>
                                            handleStatusChange(e, order.id)
                                        }
                                        className="w-full p-1 border rounded"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    order.order_status
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {new Date(order.created_at).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 relative">
                                {editingOrderId === order.id ? (
                                    <button
                                        onClick={() =>
                                            updateOrderStatus(order.id)
                                        }
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            setEditingOrderId(order.id)
                                        }
                                        className="text-blue-500 hover:text-blue-700 absolute inset-0 z-10"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                            {!editingOrderId && (
                                <Link
                                    href={route("admin.order.show", order.id)}
                                    className="absolute inset-0 z-0"
                                ></Link>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6 flex justify-center">
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
                Page {current_page} of {last_page} ({total} orders)
            </div>
        </div>
    );
};

export default OrderList;
