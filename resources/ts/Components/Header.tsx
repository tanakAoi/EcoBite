import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { Cart, User } from "../types";
import axios from "axios";
import { toast } from "react-toastify";
import { Bars3BottomLeftIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLaravelReactI18n } from "laravel-react-i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoVertical from "./LogoVertical";

interface HeaderProps {
    user: User | null;
    cart: Cart;
}

const Header: React.FC<HeaderProps> = () => {
    const { user } = usePage().props;
    const { t } = useLaravelReactI18n();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const response = await axios.post(route("logout"));

        if (response.status === 200) {
            toast.success(t("You have been logged out!"));
            setTimeout(() => {
                window.location.href = "/";
            }, 5000);
        }
    };

    return (
        <header className="bg-dark text-light px-8 py-4 flex justify-between items-center font-serif relative">
            <Link href="/">
                <LogoVertical />
            </Link>
            <button
                className="md:hidden flex flex-col items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
            <ul className="md:flex gap-10 hidden">
                <li>
                    <Link href={route("product.index")}>{t("Products")}</Link>
                </li>
                <li>
                    <Link href={route("recipe.index")}>{t("Recipes")}</Link>
                </li>
                {user ? (
                    <li>
                        <Link href={route("user.index")}>{t("Account")}</Link>
                    </li>
                ) : (
                    <li>
                        <Link href={route("register")}>
                            {t("Create account")}
                        </Link>
                    </li>
                )}
                {user && user.role === "admin" && (
                    <li>
                        <Link href={route("admin.index")}>{t("Admin")}</Link>
                    </li>
                )}
            </ul>
            <div className="md:flex items-center gap-6 hidden">
                {user ? (
                    <button onClick={handleLogout}>{t("Logout")}</button>
                ) : (
                    <Link href={route("login")}>{t("Login")}</Link>
                )}
                <Link href={route("cart.index")}>
                    <ShoppingCartIcon className="h-6 w-6" />
                </Link>
                <LanguageSwitcher />
            </div>
            {/* Mobile menu */}
            <ul
                className={`absolute top-0 left-0 h-screen w-full py-10 z-20 bg-dark/95 text-3xl flex flex-col items-center justify-center gap-8  ${
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
                        {t("Products")}
                    </Link>
                </li>
                <li>
                    <Link
                        href={route("recipe.index")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t("Recipes")}
                    </Link>
                </li>
                {user ? (
                    <li>
                        <Link
                            href={route("user.index")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("Account")}
                        </Link>
                    </li>
                ) : (
                    <li>
                        <Link
                            href={route("register")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("Create account")}
                        </Link>
                    </li>
                )}
                {user && user.role === "admin" && (
                    <li>
                        <Link
                            href={route("admin.index")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("Admin")}
                        </Link>
                    </li>
                )}
                <li>
                    <Link
                        href={route("cart.index")}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {t("Cart")}
                    </Link>
                </li>
                <li>
                    {user ? (
                        <button onClick={handleLogout}>{t("Logout")}</button>
                    ) : (
                        <Link
                            href={route("login")}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t("Login")}
                        </Link>
                    )}
                </li>
            </ul>
        </header>
    );
};

export default Header;
