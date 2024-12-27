import { Link, usePage } from "@inertiajs/react";
import { FC } from "react";
import { decodeHtml } from "../../utils/decodeHtml";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface PaginationProps {
    pageData: {
        data: any[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    itemLabel: string;
}

const Pagination: FC<PaginationProps> = ({ pageData, itemLabel }) => {
    const { data, links, current_page, last_page, total } = pageData;
    const { locale } = usePage().props;
    const { t } = useLaravelReactI18n();

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-6 md:mt-8 flex md:justify-center items-center gap-1.5">
                {links.map((link, index) => {
                    const translatedLabel = t(link.label);
                    const decodedLabel = decodeHtml(translatedLabel);

                    if (link.url) {
                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`p-2 md:px-4 md:py-2 md:border md:rounded-md ${
                                    link.active
                                        ? "md:bg-primary md:text-white text-primary font-extrabold"
                                        : "md:bg-white text-gray-700 md:hover:bg-gray-100"
                                }`}
                            >
                                {decodedLabel}
                            </Link>
                        );
                    } else {
                        return (
                            <span
                                key={index}
                                className="md:px-4 md:py-2 md:border md:rounded-md text-gray-300"
                            >
                                {decodedLabel}
                            </span>
                        );
                    }
                })}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
                {t("pagination", { current_page, last_page })} {""}({total}{" "}
                {total < 2
                    ? itemLabel
                    : locale === "en"
                    ? `${itemLabel}s`
                    : locale === "sv"
                    ? `${itemLabel}er`
                    : locale === "jp"
                    ? `${itemLabel}`
                    : itemLabel}
                )
            </div>
        </div>
    );
};

export default Pagination;
