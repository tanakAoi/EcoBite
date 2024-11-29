/// <reference types="vite/client" />

import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppLayout from "./Layouts/AppLayout";

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
        createRoot(el).render(<App {...props} />);
    },
}).then((r) => {});