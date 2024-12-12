import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { User } from "@/types";

interface UserEditProps {
    user: User;
}

const UserEdit: React.FC<UserEditProps> = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        username: user.username,
        email: user.email,
        role: user.role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route("admin.user.update", user.id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("User updated successfully!");
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Edit User - {user.username}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.username && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.username}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    />
                    {errors.email && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        Role
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                    {errors.role && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.role}
                        </div>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>

            <div className="mt-4">
                <Link
                    href={route("admin.user.index")}
                    className="text-blue-500 hover:underline"
                >
                    Back to User List
                </Link>
            </div>
        </div>
    );
};

export default UserEdit;
