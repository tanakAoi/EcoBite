import { Link, usePage } from "@inertiajs/react";
import React, { FC } from "react";

const UserDashboard: FC = () => {
    const { auth } = usePage().props;

    return (
        <div className=" min-h-screen p-6">
            <div className="max-w-7xl mx-auto rounded-lg p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        Welcome back, {auth.user.username}!
                    </h2>
                </div>
                <div className="flex w-full gap-6">
                    <div className="p-6 rounded-lg bg-white shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                            Account Settings
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Manage your account settings and profile.
                        </p>
                        <Link
                            href={route("user.account")}
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            Go to Account Settings
                        </Link>
                    </div>
                    {auth.user.role === "customer" && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                Order History
                            </h3>
                            <p className="text-gray-600 mb-4">
                                View your past orders and details.
                            </p>
                            <Link
                                href={route("customer.order.index")}
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                View Order History
                            </Link>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;