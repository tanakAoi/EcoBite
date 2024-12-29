import { FC } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Order } from "@/types";
import Pagination from "../../Components/Pagination";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";

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
    const { t } = useLaravelReactI18n();
    const { locale, shopCurrency, exchangeRates } = usePage().props;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-6">
                {t("Order Management")}
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("Order ID")}
                            </th>
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("User ID")}
                            </th>
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("Total Price")}
                            </th>
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("Status")}
                            </th>
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("Created At")}
                            </th>
                            <th className="px-4 py-2 text-left border text-nowrap">
                                {t("Actions")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b relative z-0"
                            >
                                <td className="p-4 border">{order.id}</td>
                                <td className="p-4 border">{order.user_id}</td>
                                <td className="p-4 border">
                                    {formatCurrency(
                                        order.total_price,
                                        locale,
                                        shopCurrency,
                                        shopCurrency,
                                        exchangeRates
                                    )}
                                </td>
                                <td className="p-4 border">
                                    {t(order.order_status)}
                                </td>
                                <td className="px-4 py-2 border">
                                    {new Date(
                                        order.created_at
                                    ).toLocaleString()}
                                </td>
                                <td className="px-4 py-2 relative z-10">
                                    <Link
                                        href={route(
                                            "admin.order.edit",
                                            order.id
                                        )}
                                        className=" bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition w-full text-center text-nowrap"
                                    >
                                        {t("Update")}
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
            </div>
            <Pagination pageData={ordersData} itemLabel={t("order")} />
            <BackLink
                href={route("admin.index")}
                label={t("Back to Dashboard")}
            />
        </div>
    );
};

export default OrderList;
