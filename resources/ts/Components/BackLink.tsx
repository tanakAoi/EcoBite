import { FC } from "react";
import { Link } from "@inertiajs/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

interface BackLinkProps {
    href: string;
    label: string;
    className?: string;
}

const BackLink: FC<BackLinkProps> = ({ href, label, className }) => {
    return (
        <div className={`my-4 ${className}`}>
            <Link
                href={href}
                className="text-secondary flex items-center gap-2 hover:underline w-fit"
            >
                <ArrowUturnLeftIcon className="h-5 w-5 inline-block" />
                <span>{label}</span>
            </Link>
        </div>
    );
};

export default BackLink;
