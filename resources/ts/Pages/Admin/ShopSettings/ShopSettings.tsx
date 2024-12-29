import { FC } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

import SelectCurrency from "./Partials/SelectCurrency";
import EditHeroForm from "./Partials/EditHeroForm";

const ShopSettings: FC = () => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-10">
                {t("Shop Settings")}
            </h2>
            <EditHeroForm />
            <SelectCurrency />
        </div>
    );
};

export default ShopSettings;
