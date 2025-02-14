import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";
import { FC } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const Dashboard: FC = () => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-serif text-4xl font-bold">{t("Admin Dashboard")}</h1>
            <p>
                {t("Welcome to the admin dashboard. Here you can manage your shop.")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Link
                    href={route("admin.product.index")}
                    className="p-6 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">{t("Manage Products")}</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
                <Link
                    href={route("admin.order.index")}
                    className="p-6 bg-secondary text-white rounded-lg shadow-md hover:bg-secondary/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">{t("Manage Orders")}</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
                <Link
                    href={route("admin.user.index")}
                    className="p-6 bg-dark text-white rounded-lg shadow-md hover:bg-accent/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">{t("Manage Users")}</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
                <Link
                    href={route("admin.settings.index")}
                    className="p-6 bg-light text-dark rounded-lg shadow-md hover:bg-accent/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">{t("Manage Shop Settings")}</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
