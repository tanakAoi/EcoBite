import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import { text } from 'stream/consumers';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/ts/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Albert Sans", ...defaultTheme.fontFamily.sans],
                serif: ["Playfair", ...defaultTheme.fontFamily.serif],
            },
            colors: {
                primary: "#C0AC5D",
                secondary: "#90AAC6",
                dark: "#011C27",
                light: "#F2F2F2",
                text: "#222222",
            },
        },
    },

    plugins: [forms],
};
