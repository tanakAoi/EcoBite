import { Link, usePage } from "@inertiajs/react";
import React from "react";

interface User {
    id: number;
    username: string;
    email: string;
}

interface HeaderProps {
    auth: { user: User | null };
}

const Header: React.FC<HeaderProps> = ({ auth }) => {

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = document.head
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        if (!token) {
            console.error("CSRF token is missing");
            return;
        }

        const response = await fetch("logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": token,
            },
            body: JSON.stringify({}),
        });
        console.log(response);
        
        if (response.ok) {
            window.location.href = "/";
        } else {
            console.error("Failed to logout");
        }
    };

    return (
        <header className="bg-green-800 px-8 py-4 flex justify-between text-white">
            <h1 className="m-0">EcoBite</h1>
            {auth.user ? (
                <div className="flex gap-3">
                    <p>Welcome {auth.user.username}!</p>
                    <form onSubmit={handleLogout}>
                        <button type="submit">Logout</button>
                    </form>
                </div>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </header>
    );
};

export default Header;
