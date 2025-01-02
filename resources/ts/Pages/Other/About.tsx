import { Link } from "@inertiajs/react";
import { FC } from "react";
import { useLaravelReactI18n } from "laravel-react-i18n";

const About: FC = () => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mt-16">
                <h1 className="text-4xl font-bold font-serif text-center mb-8 text-gray-800">
                    About EcoBite
                </h1>
                <div className="space-y-6">
                    <p className="text-base text-gray-700 leading-relaxed">
                        {t("about_text")}
                    </p>
                    <div className="mt-8 text-center">
                        <Link
                            href={route("faq")}
                            className="text-dark hover:underline transition duration-300 mr-6"
                        >
                            FAQ
                        </Link>
                        <Link
                            href={route("contact.index")}
                            className="text-dark hover:underline transition duration-300"
                        >
                            {t("Contact")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
