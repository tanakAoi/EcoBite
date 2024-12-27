import React, { FC, useState } from "react";
import { Link } from "@inertiajs/react";
import { Order } from "@/types";
import Pagination from "../../Components/Pagination";
import BackLink from "../../Components/BackLink";

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
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-6">
                Order Management
            </h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">Order ID</th>
                        <th className="px-4 py-2 text-left border">User ID</th>
                        <th className="px-4 py-2 text-left border">
                            Total Price
                        </th>
                        <th className="px-4 py-2 text-left border">Status</th>
                        <th className="px-4 py-2 text-left border">
                            Created At
                        </th>
                        <th className="px-4 py-2 text-left border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order) => (
                        <tr key={order.id} className="border-b relative z-0">
                            <td className="p-4 border">{order.id}</td>
                            <td className="p-4 border">{order.user_id}</td>
                            <td className="p-4 border">${order.total_price}</td>
                            <td className="p-4 border">
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
                            <td className="px-4 py-2 border">
                                {new Date(order.created_at).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 relative z-10">
                                <Link
                                    href={route("admin.order.edit", order.id)}
                                    className=" bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition w-full text-center"
                                >
                                    Update
                                </Link>
                            </td>
                            <Link
                                href={route("admin.order.show", order.id)}
                                className="absolute inset-0 z-0"
                            ></Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pageData={ordersData} itemLabel="order" />
            <BackLink href={route("admin.index")} label="Back to Dashboard" />
        </div>
    );
};

export default OrderList;
