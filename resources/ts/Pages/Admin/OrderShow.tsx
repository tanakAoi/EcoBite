// resources/js/Pages/Admin/OrderShow.tsx

import { OrderDetails, OrderItem } from "@/types";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePage } from "@inertiajs/react";
import { FC } from "react";

interface OrderShowProps {
    order: OrderDetails;
}

const OrderShow: FC<OrderShowProps> = ({ order }) => {
    const { t } = useLaravelReactI18n();
    const { locale, shopCurrency, exchangeRates } = usePage().props;
    console.log(order);
    
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("order_details", { id: order.id })}
            </h2>
            <div className="space-y-4 mb-6">
                <div>
                    <strong className="text-gray-700">{t("Order ID")}:</strong>{" "}
                    {order.id}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Customer Name")}:
                    </strong>{" "}
                    {order.user.username ? order.user.username : "Guest"}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Customer Email")}:
                    </strong>{" "}
                    {order.user.email}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Total Price")}:
                    </strong>{" "}
                    {formatCurrency(
                        order.total_price,
                        locale,
                        shopCurrency,
                        shopCurrency,
                        exchangeRates
                    )}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Order Status")}:
                    </strong>{" "}
                    {t(order.order_status)}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Created At")}:
                    </strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                </div>
                <div>
                    <strong className="text-gray-700">
                        {t("Updated At")}:
                    </strong>{" "}
                    {new Date(order.updated_at).toLocaleString()}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {t("Order Items")}
                </h3>
                <table className="min-w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">
                                {t("Product Name")}
                            </th>
                            <th className="px-4 py-2 border">
                                {t("Quantity")}
                            </th>
                            <th className="px-4 py-2 border">
                                {t("Unit Price")}
                            </th>
                            <th className="px-4 py-2 border">
                                {t("Total Price")}
                            </th>
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
                                    {formatCurrency(
                                        item.product.price,
                                        locale,
                                        shopCurrency,
                                        shopCurrency,
                                        exchangeRates
                                    )}
                                </td>
                                <td className="px-4 py-2 border">
                                    {formatCurrency(
                                        item.total_price,
                                        locale,
                                        shopCurrency,
                                        shopCurrency,
                                        exchangeRates
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <BackLink
                href={route("admin.order.index")}
                label={t("Back to Orders")}
                className="mb-0 mt-6"
            />
        </div>
    );
};

export default OrderShow;
