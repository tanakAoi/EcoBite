import React from "react";
import { useForm } from "@inertiajs/react";
import { User } from "@/types";
import Button from "../../Components/Button";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface UserEditProps {
    user: User;
}

const UserEdit: React.FC<UserEditProps> = ({ user }) => {
    const { data, setData, put, processing, errors } = useForm({
        username: user.username,
        email: user.email,
        role: user.role,
    });
    const { t } = useLaravelReactI18n();

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
                {t("edit_user", { username: user.username })}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">
                        {t("username")}
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
                        {t("Email")}
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
                        {t("Role")}
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData("role", e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="admin">{t("Administrator")}</option>
                        <option value="customer">{t("Customer")}</option>
                    </select>
                    {errors.role && (
                        <div className="text-red-500 text-sm mt-1">
                            {errors.role}
                        </div>
                    )}
                </div>

                <div>
                    <Button
                        label={t("Save Changes")}
                        type="submit"
                        disabled={processing}
                    />
                </div>
            </form>
            <BackLink href={route("admin.user.index")} label={t("Back to Users")} className="mb-0" />
        </div>
    );
};

export default UserEdit;
