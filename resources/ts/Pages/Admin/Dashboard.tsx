import { Link } from "@inertiajs/react";
import React from "react";

const Dashboard: React.FC = () => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>
                Welcome to the admin dashboard. Here you can manage your
                application.
            </p>
            <div>
                <Link href={route("admin.product.index")}>
                    Manage your products
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
