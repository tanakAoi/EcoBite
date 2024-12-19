import Button from "../../Components/Button";
import { Link, usePage } from "@inertiajs/react";
import React, { FC } from "react";
import Edit from "./Profile/Edit";

const UserDashboard: FC = () => {
    const { user, cart } = usePage().props;

    return (
        <div className=" min-h-screen">
            <div className="max-w-7xl mx-auto rounded-lg px-3">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-5xl font-serif font-bold text-dark">
                        Welcome back, {user?.username}!
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-6">
                    <div className="p-6 rounded-lg bg-light shadow-md relative">
                        <h3 className="text-2xl font-bold text-text mb-4 font-serif">
                            Account Settings
                        </h3>
                        <p className="text-text/85 mb-4">
                            Manage your account settings and profile.
                        </p>
                        <Link
                            href={route("profile.edit")}
                            className="text-primary hover:underline font-semibold"
                        >
                            <span className="absolute inset-0"></span>
                            Go to Account Settings
                        </Link>
                    </div>
                    {user?.role === "customer" && (
                        <div className="p-6 rounded-lg bg-light shadow-md relative">
                            <h3 className="text-2xl font-bold text-text mb-4 font-serif">
                                Order History
                            </h3>
                            <p className="text-text/85 mb-4">
                                View your past orders and details.
                            </p>
                            <Link
                                href={route("customer.order.index")}
                                className="text-primary hover:underline font-semibold"
                            >
                                <span className="absolute inset-0"></span>
                                View Order History
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
