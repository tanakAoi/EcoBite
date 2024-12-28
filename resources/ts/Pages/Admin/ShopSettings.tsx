import Button from "../../Components/Button";
import { FC, useEffect, useState } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import axios from "axios";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types/index";

interface ShopSetting {
    shop_currency: string;
}

interface ShopSettingsPageProps extends PageProps {
    shopSetting: ShopSetting;
}

const ShopSettings: FC = () => {
    const { t } = useLaravelReactI18n();
    const { shopSetting } = usePage<ShopSettingsPageProps>().props;

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
        <div>
            <label htmlFor="currency">Shop currency</label>
            <select name="currency" id="currency">
                <option value="SEK">SEK</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
            </select>
            <Button label={t("Save")} onClick={handleSaveCurrency} />
            <p>Current currency: {shopSetting.shop_currency}</p>
            <div className="p-4 mb-4 text-yellow-800 bg-yellow-200 border border-yellow-300 rounded-md">
                <strong>{t("Warning")}</strong>: {t("currency_warning_message")}
            </div>
        </div>
    );
};

export default ShopSettings;
