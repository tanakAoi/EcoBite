import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { usePage } from "@inertiajs/react";

const Accordion: FC = ({}) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const { t } = useLaravelReactI18n();
    const { shopCurrency } = usePage().props;

    const currencyNames: { [key: string]: string } = {
        SEK: t("Swedish Krona"),
        USD: t("US Dollar"),
        JPY: t("Japanese Yen"),
    };

    const handleAccordionToggle = () => {
        setIsAccordionOpen((prev) => !prev);
    };

    return (
        <div className="rounded-lg mb-4 bg-dark text-primary">
            <button
                className="w-full p-4 flex justify-between font-semibold border-b border-b-light/20"
                onClick={handleAccordionToggle}
            >
                {t("About displayed prices")}
                <ChevronDownIcon
                    className={`h-5 w-5 ml-2 transform ${
                        isAccordionOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            {isAccordionOpen && (
                <div className="p-4 bg-dark rounded-lg">
                    <p>
                        {t("price_warning", {
                            currency:
                                currencyNames[shopCurrency] || shopCurrency,
                        })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Accordion;
