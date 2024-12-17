import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Cart, User } from "../types";
import axios from "axios";
import { toast } from "react-toastify";
import Logo from "./Logo";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
    user: User | null;
    cart: Cart;
}

const Header: React.FC<HeaderProps> = () => {
    const { user } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const response = await axios.post(route("logout"));

        if (response.status === 200) {
            toast.success("You have been logged out!");
            setTimeout(() => {
                window.location.href = "/";
            }, 5000);
        }
    };

    return (
        <header className="bg-dark text-light px-8 py-4 flex justify-between font-serif relative">
            <Link href="/">
                <Logo />
            </Link>
            <button
                className="md:hidden flex flex-col items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
            <ul className="md:flex gap-10 hidden">
                <li>
                    <Link href={route("product.index")}>Products</Link>
                </li>
                <li>
                    <Link href={route("recipe.index")}>Recipes</Link>
                </li>
                {user ? (
                    <li>
                        <Link href={route("user.index")}>Account</Link>
                    </li>
                ) : (
                    <li>
                        <Link href={route("register")}>Create account</Link>
                    </li>
                )}
                {user && user.role === "admin" && (
                    <li>
                        <Link href={route("admin.index")}>Admin</Link>
                    </li>
                )}
            </ul>
            <div className="md:flex gap-6 hidden">
                {user ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <Link href={route("login")}>Login</Link>
                )}
                <Link href={route("cart.index")}>Cart</Link>
            </div>
            <ul
                className={`absolute top-0 left-0 h-screen w-full py-10 z-10 bg-dark/95 text-3xl flex flex-col items-center justify-center gap-8  ${
                    isMenuOpen ? "block" : "hidden"
                }`}
            >
                <button className="absolute top-5 right-5">
                    <XMarkIcon
                        onClick={() => setIsMenuOpen(false)}
                        className="h-6 w-6"
                    />
                </button>
                <li>
                    <Link
                        href={route("product.index")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        href={route("recipe.index")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Recipes
                    </Link>
                </li>
                {user ? (
                    <li>
                        <Link
                            href={route("user.index")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Account
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link
                            href={route("register")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Create account
                        </Link>
                    </li>
                )}
                {user && user.role === "admin" && (
                    <li>
                        <Link
                            href={route("admin.index")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Admin
                        </Link>
                    </li>
                )}
                <li>
                    <Link
                        href={route("cart.index")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Cart
                    </Link>
                </li>
                <li>
                    {user ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link
                            href={route("login")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </li>
            </ul>
        </header>
    );
};

export default Header;
