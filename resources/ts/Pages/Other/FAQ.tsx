import { FC } from "react";

const FAQ: FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mt-16">
                <h1 className="text-4xl font-bold font-serif text-center mb-8">
                    Frequently Asked Questions
                </h1>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-medium">
                            Q: How does EcoBite work?
                        </h2>
                        <p className="text-base text-gray-700">
                            EcoBite connects you with sustainable recipes and
                            grocery options tailored to your needs.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium">
                            Q: Can I customize recipes?
                        </h2>
                        <p className="text-base text-gray-700">
                            Yes, you can select ingredients and adjust portions
                            directly from the recipe page.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-xl font-medium">
                            Q: What payment methods are accepted?
                        </h2>
                        <p className="text-base text-gray-700">
                            We accept all major credit cards and secure online
                            payment systems.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;