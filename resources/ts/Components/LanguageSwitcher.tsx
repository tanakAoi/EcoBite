import React from "react";
import axios from "axios";
import { usePage } from "@inertiajs/react";

const LanguageSwitcher = () => {
    const { locale } = usePage().props;

    const switchLanguage = async (language: string) => {
        try {
            await axios.post(route("lang.switch"), { language });
            
            window.location.reload();
        } catch (error) {
            console.error("Failed to switch language:", error);
        }
    };

    return (
        <div>
            <button
                onClick={() => switchLanguage("en")}
                disabled={locale === "en"}
            >
                English
            </button>
            <button
                onClick={() => switchLanguage("sv")}
                disabled={locale === "sv"}
            >
                Svenska
            </button>
            <button
                onClick={() => switchLanguage("jp")}
                disabled={locale === "jp"}
            >
                日本語
            </button>
        </div>
    );
};

export default LanguageSwitcher;
