import React from "react";
import { User } from "@/types";
import BackLink from "../../Components/BackLink";

interface UserShowProps {
    user: User;
}

const UserShow: React.FC<UserShowProps> = ({ user }) => {
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                User Details - {user.username}
            </h2>
            <div className="space-y-4 mb-6">
                <div>
                    <strong className="text-gray-700">ID:</strong> {user.id}
                </div>
                <div>
                    <strong className="text-gray-700">Name:</strong>{" "}
                    {user.username}
                </div>
                <div>
                    <strong className="text-gray-700">Email:</strong>{" "}
                    {user.email}
                </div>
                <div>
                    <strong className="text-gray-700">Role:</strong> {user.role}
                </div>
            </div>
            <BackLink
                href={route("admin.user.index")}
                label="Back to Users"
                className="mb-0"
            />
        </div>
    );
};

export default UserShow;
