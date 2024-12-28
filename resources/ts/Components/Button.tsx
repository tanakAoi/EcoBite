import React from "react";

interface ButtonProps {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled = false,
    className = "",
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={` ${className} px-6 py-2 text-nowrap rounded transition ${
                disabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary hover:bg-primary text-light"
            }`}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
