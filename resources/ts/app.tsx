/// <reference types="vite/client" />

import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppLayout from "./Layouts/AppLayout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51QT2jfGM3tsnbU0zeuYylJtYVS2nxxSXEjKgf5jMp4GhUNrKEWhvS0OxUXHOGhPL54ZgJGnX7urvGhNIGf95NZWo00erVkp35B");

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.tsx", {
            eager: true,
        }) as Record<string, any>;
        let page: any = pages[`./Pages/${name}.tsx`];
        page.default.layout =
            page.default.layout ||
            ((page: any) => <AppLayout children={page} />);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Elements stripe={stripePromise}>
                <App {...props} />
            </Elements>
        );
    },
}).then((r) => {});