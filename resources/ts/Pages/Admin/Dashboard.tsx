import { Link } from "@inertiajs/react";
import React from "react";

const Dashboard: React.FC = () => {

    return (
        <div className="flex flex-col gap-8">
            <h1>Admin Dashboard</h1>
            <p>
                Welcome to the admin dashboard. Here you can manage your
                application.
            </p>
            <div className="flex flex-col gap-4">
                <Link href={route("admin.product.index")}>
                    Manage your products
                </Link>
                <Link href={route("admin.order.index")}>
                    Manage orders
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
