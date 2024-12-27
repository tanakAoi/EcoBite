import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";
import React from "react";

const Dashboard: React.FC = () => {

    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-serif text-4xl font-bold">Admin Dashboard</h1>
            <p>
                Welcome to the admin dashboard. Here you can manage your
                shop.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <Link
                    href={route("admin.product.index")}
                    className="p-6 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">Manage Products</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
                <Link
                    href={route("admin.order.index")}
                    className="p-6 bg-secondary text-white rounded-lg shadow-md hover:bg-secondary/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">Manage Orders</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
                <Link
                    href={route("admin.user.index")}
                    className="p-6 bg-dark text-white rounded-lg shadow-md hover:bg-accent/90 transition flex items-center justify-between gap-4"
                >
                    <span className="font-medium text-lg">Manage Users</span>
                    <ArrowRightIcon className="w-6 h-6" />
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
