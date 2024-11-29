import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/ts/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    build: {
        outDir: "public/build",
    },
    server: {
        https: process.env.APP_ENV === "production",
    },
    base:
        process.env.APP_ENV === "production"
            ? "https://your-heroku-app.herokuapp.com/"
            : "/",
});
