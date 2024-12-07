import { Link } from "@inertiajs/react";
import React from "react";
import { User } from "../types";

interface HeaderProps {
    auth: { user: User } | null;
}

const Header: React.FC<HeaderProps> = ({ auth }) => {
    console.log(auth);
    
    
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
            <Link href="/">EcoBite</Link>
            <ul className="flex gap-10">
                <li>
                    <Link href="/products">Products</Link>
                </li>
                <li>
                    <Link href="/recipes">Recipes</Link>
                </li>
                {auth && auth.user ? (
                    <li>
                        <Link href="/user">Account</Link>
                    </li>
                ) : (
                    <li>
                        <Link href="/register">Create account</Link>
                    </li>
                )}
                {auth && auth.user && auth.user.role === "admin" && (
                    <li>
                        <Link href="/admin">Admin</Link>
                    </li>
                )}
            </ul>
            <div className="flex gap-6">
                {auth && auth.user ? (
                    <form onSubmit={handleLogout}>
                        <button type="submit">Logout</button>
                    </form>
                ) : (
                    <Link href="/login">Login</Link>
                )}
                <Link href="/cart">Cart</Link>
            </div>
        </header>
    );
};

export default Header;
