/// <reference types="vite/client" />

import "../css/app.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import AppLayout from "./Layouts/AppLayout";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx", {
            eager: true,
        }) as Record<string, any>;
        let page: any = pages[`./pages/${name}.tsx`];
        page.default.layout =
            page.default.layout ||
            ((page: any) => <AppLayout children={page} />);

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
}).then((r) => {});

// import "../css/app.css";
// import "./bootstrap.js";
// import { createInertiaApp } from "@inertiajs/react";
// import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// import { createRoot } from "react-dom/client";

// const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.tsx`,
//             import.meta.glob("./Pages/**/*.tsx")
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(<App {...props} />);
//     },
//     progress: {
//         color: "#4B5563",
//     },
// });
