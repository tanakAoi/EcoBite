import { usePage } from "@inertiajs/react";
import Header from "../Components/Header";
import { FC, ReactNode, useEffect } from "react";
import Footer from "../Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppLayoutProps {
    children: ReactNode;
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

    return (
        <div className="bg-glittery-yellow/20">
            <Header user={user || null} cart={cart} />
            <main className="my-10 mx-auto px-10 pb-32 min-h-screen">
                {children}
            </main>
            <Footer />
            <ToastContainer position="top-right" newestOnTop closeOnClick />
        </div>
    );
};

export default AppLayout;
