import { PageProps } from "@/types/index";
import { usePage } from "@inertiajs/react";
import Button from "../../../../Components/Button";
import axios from "axios";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { FC } from "react";

interface ShopSetting {
    shop_currency: string;
}

interface ShopSettingsPageProps extends PageProps {
    shopSetting: ShopSetting;
}

const SelectCurrency: FC = () => {
    const { shopSetting } = usePage<ShopSettingsPageProps>().props;
    const { t } = useLaravelReactI18n();

    const handleSaveCurrency = async () => {
        const currencyElement = document.getElementById(
            "currency"
        ) as HTMLSelectElement;

        if (currencyElement) {
            const selectedCurrency = currencyElement.value;

            try {
                await axios.post(route("admin.settings.currency.update"), {
                    shop_currency: selectedCurrency,
                });

                window.location.reload();
            } catch (error) {
                console.error("Failed to save currency:", error);
            }
        } else {
            console.error("Currency select element not found");
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-6">
            <h3 className="font-bold text-xl">{t("Shop currency")}</h3>
            <div className="flex gap-4 justify-between items-center">
                <div className="flex gap-4 items-center w-full">
                    <select
                        name="currency"
                        id="currency"
                        className="w-1/3 p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="SEK">SEK</option>
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
                    </select>
                    <Button label={t("Save")} onClick={handleSaveCurrency} />
                </div>
                {shopSetting.shop_currency && (
                    <p className="text-lg text-nowrap">
                        {t("Current currency")}:{" "}
                        <strong>{shopSetting.shop_currency}</strong>
                    </p>
                )}
            </div>
            <div className="p-4 mb-4 text-yellow-800 bg-yellow-200 border border-yellow-300 rounded-md">
                <strong>{t("Warning")}</strong>: {t("currency_warning_message")}
            </div>
        </div>
    );
};

export default SelectCurrency;
