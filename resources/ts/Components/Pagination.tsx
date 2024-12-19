import { Link } from "@inertiajs/react";
import { FC } from "react";
import { decodeHtml } from "../../utils/htmlUtils";

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

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mt-6 md:mt-8 flex md:justify-center items-center gap-1.5">
                {links.map((link, index) => {
                    const label = decodeHtml(link.label);
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
                                {label}
                            </Link>
                        );
                    } else {
                        return (
                            <span
                                key={index}
                                className="md:px-4 md:py-2 md:border md:rounded-md text-gray-300"
                            >
                                {label}
                            </span>
                        );
                    }
                })}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
                Page {current_page} of {last_page} ({total} {total < 2 ? itemLabel : `${itemLabel}s`})
            </div>
        </div>
    );
};

export default Pagination;
