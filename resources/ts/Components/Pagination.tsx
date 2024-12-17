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
            <div className="mt-8 flex justify-center">
                {links.map((link, index) => {
                    const label = decodeHtml(link.label);
                    if (link.url) {
                        return (
                            <Link
                                key={index}
                                href={link.url}
                                className={`px-4 py-2 ml-1 last-of-type:mr-1 border rounded-md ${
                                    link.active
                                        ? "bg-primary text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {label}
                            </Link>
                        );
                    } else {
                        return (
                            <span
                                key={index}
                                className="px-4 py-2 border rounded-md text-gray-300"
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
