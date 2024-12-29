import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import i18n from "laravel-react-i18n/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/ts/app.tsx",
            refresh: true,
        }),
        react(),
        i18n(),
    ],
    build: {
        outDir: "public/build",
    },
    assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg"],
    server: {
        https: process.env.APP_ENV === "production",
    },
    base:
        process.env.APP_ENV === "production"
            ? "https://ecobite-4c90906c8f67.herokuapp.com/"
            : "/",
});
