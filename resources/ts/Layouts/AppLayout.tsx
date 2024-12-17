import { usePage } from "@inertiajs/react";
import Header from "../Components/Header";
import { FC, ReactNode, useEffect } from "react";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppLayoutProps {
    children: ReactNode;
    noMargin?: boolean;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const { user, cart, flash } = usePage().props;
    console.log(usePage().props);

    useEffect(() => {
        if (flash.message && flash.type) {
            const toastType = {
                success: toast.success,
                error: toast.error,
                info: toast.info,
                warning: toast.warn,
            };

            (toastType[flash.type] || toast)(flash.message);
        }
    }, [flash.message, flash.type]);

    const isHomePage = usePage().component === "Home";

    return (
        <div className="bg-light/10">
            <Header user={user || null} cart={cart} />
            <main
                className={
                    "min-h-screen pb-12 md:pb-24" +
                    (isHomePage ? "" : " max-w-7xl mx-auto mt-16 mb-10 px-10")
                }
            >
                {children}
            </main>
            <Footer />
            <ToastContainer position="top-right" newestOnTop closeOnClick />
        </div>
    );
};

export default AppLayout;
