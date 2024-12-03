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
                <a href="admin/products">Manage your products</a>
            </div>
        </div>
    );
};

export default Dashboard;
