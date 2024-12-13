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
        if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash.message]);

    return (
        <div className="bg-glittery-yellow/20">
            {user ? (
                <Header user={user} cart={cart} />
            ) : (
                <Header user={null} cart={cart} />
            )}
            <main className="my-10 mx-auto px-10 pb-32 min-h-screen">
                {children}
            </main>
            <Footer />
            <ToastContainer position="top-right" newestOnTop closeOnClick />
        </div>
    );
};

export default AppLayout;
