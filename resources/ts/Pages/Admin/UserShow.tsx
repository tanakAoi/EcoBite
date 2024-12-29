import React from "react";
import { User } from "@/types";
import BackLink from "../../Components/BackLink";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface UserShowProps {
    user: User;
}

const UserShow: React.FC<UserShowProps> = ({ user }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t("user_details", { username: user.username })}
            </h2>
            <div className="space-y-4 mb-6">
                <div>
                    <strong className="text-gray-700">ID:</strong> {user.id}
                </div>
                <div>
                    <strong className="text-gray-700">{t("username")}:</strong>{" "}
                    {user.username}
                </div>
                <div>
                    <strong className="text-gray-700">{t("Email")}:</strong>{" "}
                    {user.email}
                </div>
                <div>
                    <strong className="text-gray-700">{t("Role")}:</strong>{" "}
                    {(user.role === "customer" && t("Customer")) ||
                        (user.role === "admin" && t("Administrator"))}
                </div>
            </div>
            <BackLink
                href={route("admin.user.index")}
                label={t("Back to Users")}
                className="mb-0"
            />
        </div>
    );
};

export default UserShow;
