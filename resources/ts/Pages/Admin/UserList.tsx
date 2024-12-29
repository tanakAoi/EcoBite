import { FC, useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import Pagination from "../../Components/Pagination";
import BackLink from "../../Components/BackLink";
import DeleteForm from "../../Components/DeleteForm";
import { useLaravelReactI18n } from "laravel-react-i18n";

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
    const [users, setUsers] = useState<User[]>([]);
    const { t } = useLaravelReactI18n();

    useEffect(() => {
        setUsers(data);
    }, [data]);

    const handleDelete = (id: number) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-6">
                {t("User Management")}
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border text-nowrap">{t("username")}</th>
                            <th className="px-4 py-2 border text-nowrap">{t("Email")}</th>
                            <th className="px-4 py-2 border text-nowrap">{t("Role")}</th>
                            <th className="px-4 py-2 border text-nowrap">{t("Actions")}</th>
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
                                <td className="px-4 py-2 border">
                                    {
                                        (user.role === "customer" && t("Customer")) 
                                        ||
                                        (user.role === "admin" && t("Administrator"))
                                    }
                                </td>
                                <td className="px-4 py-2 border">
                                    <div className="flex flex-col items-center gap-2 relative z-10">
                                        <Link
                                            href={route("admin.user.edit", user.id)}
                                            className=" bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition w-full text-center text-nowrap"
                                        >
                                            {t("Edit")}
                                        </Link>
                                        <DeleteForm
                                            deleteObject="user"
                                            userId={user.id}
                                            onDelete={handleDelete}
                                        />
                                    </div>
                                </td>
                                <Link
                                    href={route("admin.user.show", user.id)}
                                    className="absolute inset-0 z-0"
                                ></Link>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination pageData={usersData} itemLabel={t("user")} />
            <BackLink
                href={route("admin.index")}
                label={t("Back to Dashboard")}
                className="mb-0"
            />
        </div>
    );
};

export default UserList;
