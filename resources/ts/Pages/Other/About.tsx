import { FC } from "react";

const About: FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mt-16">
                <h1 className="text-4xl font-bold font-serif text-center mb-8">
                    About EcoBite
                </h1>
                <div className="space-y-6">
                    <p className="text-base text-gray-700">
                        EcoBite is a platform dedicated to promoting sustainable
                        living by connecting users with eco-friendly recipes and
                        groceries.
                    </p>
                    <p className="text-base text-gray-700">
                        Our mission is to make sustainability accessible to
                        everyone by simplifying the process of finding,
                        planning, and purchasing ingredients for delicious
                        meals.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;