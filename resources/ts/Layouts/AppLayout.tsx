import { usePage } from "@inertiajs/react";
import Header from "../Components/Header";
import React from "react";
import Footer from "../Components/Footer";

interface AppLayoutProps {
    children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    const { auth } = usePage().props;

    return (
        <div className="bg-glittery-yellow/20">
            {auth ? <Header auth={auth} /> : <Header auth={null} />}
            <main className="my-10 mx-auto px-10 pb-32 min-h-screen">{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
