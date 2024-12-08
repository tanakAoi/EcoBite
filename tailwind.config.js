import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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
                sans: ["Be Vietnam Pro", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "chinese-leaf": "#CCD5AE",
                "green-essence": "#E9EDC9",
                "beaming-sun": "#FEFAE0",
                "glittery-yellow": "#FAEDCD",
                "muntok-white-pepper": "#D4A373"
            },
        },
    },

    plugins: [forms],
};
