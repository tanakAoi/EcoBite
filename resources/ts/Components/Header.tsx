import { Link, usePage } from "@inertiajs/react";
import React from "react";

interface AuthProps {
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
}

const Header: React.FC = () => {
    const { auth }: { auth: AuthProps } = usePage().props;

    return (
        <header className="bg-green-800 px-8 py-4 flex justify-between">
            <h1 className="text-white m-0">My Application</h1>
            <form action="" method="POST">
                {auth.user ? (
                    <button type="submit">Logout</button>
                ) : (
                    <Link href="/login">Login</Link>
                )}
            </form>
        </header>
    );
};

export default Header;
