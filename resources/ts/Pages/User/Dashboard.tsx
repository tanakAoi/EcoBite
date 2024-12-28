import { Link, usePage } from "@inertiajs/react";
import { FC } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const UserDashboard: FC = () => {
    const { user } = usePage().props;
    const { t } = useLaravelReactI18n();

    return (
        <div className=" min-h-screen">
            <div className="max-w-7xl mx-auto rounded-lg px-3">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-5xl font-serif font-bold text-dark">
                        {t("welcome_back", { name: user?.username || "" })}
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="p-6 rounded-lg bg-light shadow-md relative">
                        <h3 className="text-2xl font-bold text-text mb-4 font-serif">
                            {t("Account Settings")}
                        </h3>
                        <p className="text-text/85 mb-4">
                            {t("Manage your account settings and profile.")}
                        </p>
                        <Link
                            href={route("profile.edit")}
                            className="text-primary hover:underline font-semibold"
                        >
                            <span className="absolute inset-0"></span>
                            {t("Go to Account Settings")}
                        </Link>
                    </div>

                    <div className="p-6 rounded-lg bg-light shadow-md relative">
                        <h3 className="text-2xl font-bold text-text mb-4 font-serif">
                            {t("Order History")}
                        </h3>
                        <p className="text-text/85 mb-4">
                            {t("View your past orders and details.")}
                        </p>
                        <Link
                            href={route("customer.order.index")}
                            className="text-primary hover:underline font-semibold"
                        >
                            <span className="absolute inset-0"></span>
                            {t("View Order History")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
