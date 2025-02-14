/// <reference types="vite/client" />

import "../css/app.css";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppLayout from "./Layouts/AppLayout";
import { LaravelReactI18nProvider } from "laravel-react-i18n";

createInertiaApp({
    title: (title) => `${import.meta.env.VITE_APP_NAME}`,
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
            <LaravelReactI18nProvider
                locale={window.locale}
                fallbackLocale={"en"}
                files={import.meta.glob("/lang/*.json")}
            >
                <App {...props} />
            </LaravelReactI18nProvider>
        );
    },
}).then((r) => {});
