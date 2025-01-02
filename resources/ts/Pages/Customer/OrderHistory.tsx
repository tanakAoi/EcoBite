import { FC } from "react";
import { Order } from "@/types";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface OrderHistoryProps {
    orders: Order[];
}

const OrderHistory: FC<OrderHistoryProps> = ({ orders }) => {
    const { t } = useLaravelReactI18n();

    if (orders.length === 0) {
        return <div className="text-center mt-10">{t("No orders found.")}</div>;
    }

    console.log(orders);
    

    return (
        <div className="max-w-7xl mx-auto mt-10 px-5 md:px-10">
            <div className="flex justify-between">
                <h2 className="text-5xl font-serif font-bold text-gray-800 mb-8">
                    {t("Order History")}
                </h2>
                <BackLink
                    href={route("user.index")}
                    label={t("Back to Dashboard")}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-gray-700">
                                {t("order_number", {number: order.id})}
                            </h3>
                            <span className="text-sm text-gray-500">
                                {new Date(
                                    order.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="text-gray-600">
                            <p>
                                <strong>{t("Total")}: </strong>
                                {order.total_price}
                            </p>
                            <p>
                                <strong>{t("Status")}:</strong> {t(order.order_status)}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-700">
                                {t("Items")}:
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
