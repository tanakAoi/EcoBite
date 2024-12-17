import React, { FC, useState } from "react";
import { Link } from "@inertiajs/react";
import { Order } from "@/types";
import Pagination from "../../Components/Pagination";

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
    const { data } = ordersData;
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [updatedStatus, setUpdatedStatus] = useState<Record<number, string>>(
        {}
    );
    const statuses = ["pending", "processing", "completed", "cancelled"];

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
                                <Link
                                    href={route("admin.order.edit", order.id)}
                                    className="text-blue-500 hover:text-blue-700 absolute top-2 inset-0 z-10"
                                >
                                    Update
                                </Link>
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
            <Pagination pageData={ordersData} itemLabel="order" />
        </div>
    );
};

export default OrderList;
