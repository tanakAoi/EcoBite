import React, { FC, useState } from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import Pagination from "../../Components/Pagination";

interface PaginatedUsers {
    data: User[];
    links: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface UserListProps {
    usersData: PaginatedUsers;
}

const UserList: FC<UserListProps> = ({ usersData }) => {
    const { data } = usersData;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                User List
            </h2>
            <table className="min-w-full table-auto border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className="relative">
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">
                                {user.username}
                            </td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border relative">
                                <Link
                                    href={route("admin.user.edit", user.id)}
                                    className="text-blue-500 hover:underline absolute inset-0 z-10"
                                >
                                    Edit
                                </Link>
                            </td>
                            <Link
                                href={route("admin.user.show", user.id)}
                                className="absolute inset-0 z-0"
                            ></Link>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination pageData={usersData} itemLabel="user" />
            <div className="mt-4">
                <Link
                    href={route("admin.user.index")}
                    className="text-blue-500 hover:underline"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default UserList;
