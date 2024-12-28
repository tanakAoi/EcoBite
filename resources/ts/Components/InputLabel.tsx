import { LabelHTMLAttributes } from 'react';
import { useLaravelReactI18n } from "laravel-react-i18n";

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    const { t } = useLaravelReactI18n();

    return (
        <label
            {...props}
            className={
                `block text-md font-bold font-serif text-gray-700 ` +
                className
            }
        >
            {t(value ? value : String(children))}
        </label>
    );
}
