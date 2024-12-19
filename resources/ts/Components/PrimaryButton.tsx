import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-dark px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary transition duration-150 ease-in-out hover:bg-primary hover:text-dark focus:bg-dark/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:bg-dark ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
