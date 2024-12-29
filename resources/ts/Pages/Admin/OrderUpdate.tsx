import { FC, FormEvent } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { OrderDetails, OrderItem } from "@/types";
import Button from "../../Components/Button";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { formatCurrency } from "../../utils/formatCurrency";

interface OrderUpdateProps {
    order: OrderDetails;
}

const OrderUpdate: FC<OrderUpdateProps> = ({ order }) => {
    const { data, setData, put, processing, errors } = useForm({
        order_status: order.order_status,
    });
    const { t } = useLaravelReactI18n();
    const { locale, shopCurrency, exchangeRates } = usePage().props;

    const handleSubmit = (e: FormEvent) => {
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
                {t("edit_order", { id: order.id })}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("Order Status")}
                    </label>
                    <select
                        value={data.order_status}
                        onChange={(e) =>
                            setData("order_status", e.target.value)
                        }
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="pending">{t("pending")}</option>
                        <option value="processing">{t("processing")}</option>
                        <option value="completed">{t("completed")}</option>
                        <option value="cancelled">{t("cancelled")}</option>
                    </select>
                    {errors.order_status && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.order_status}
                        </div>
                    )}
                </div>

                <div>
                    <Button
                        label={t("Save Changes")}
                        type="submit"
                        disabled={processing}
                    />
                </div>
            </form>
            <div className="mt-8">
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
                className="mt-6 mb-0"
            />
        </div>
    );
};

export default OrderUpdate;
