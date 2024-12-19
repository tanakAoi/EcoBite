import axios from "axios";
import { usePage } from "@inertiajs/react";
import IconEN from "./IconEN";
import IconJP from "./IconJP";
import IconSV from "./IconSV";
import { useState } from "react";

const LanguageSwitcher = () => {
    const { locale: initialLocale } = usePage().props;
    const [locale, setLocale] = useState(initialLocale);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const switchLanguage = async (language: string) => {
        try {
            await axios.post(route("lang.switch"), { language });
            setLocale(language);
            window.location.reload();
        } catch (error) {
            console.error("Failed to switch language:", error);
        }
    };

    const getCurrentLanguageIcon = () => {
        switch (locale) {
            case "en":
                return <IconEN />;
            case "sv":
                return <IconSV />;
            case "jp":
                return <IconJP />;
            default:
                return <IconEN />;
        }
    };

    return (
        <div className="relative flex">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cursor-pointer"
            >
                {getCurrentLanguageIcon()}
            </button>
            {isMenuOpen && (
                <div className="absolute top-10 right-0 px-6 py-4 bg-dark/60 border border-light rounded-md flex flex-col gap-4">
                    <button
                        onClick={() => switchLanguage("en")}
                        disabled={locale === "en"}
                        className="w-full flex justify-between items-center gap-2"
                    >
                        <IconEN />
                        <span>English</span>
                    </button>
                    <button
                        onClick={() => switchLanguage("sv")}
                        disabled={locale === "sv"}
                        className="w-full flex justify-between items-center gap-2"
                    >
                        <IconSV />
                        <span>Svenska</span>
                    </button>
                    <button
                        onClick={() => switchLanguage("jp")}
                        disabled={locale === "jp"}
                        className="w-full flex justify-between items-center gap-2"
                    >
                        <IconJP />
                        <span>日本語</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
