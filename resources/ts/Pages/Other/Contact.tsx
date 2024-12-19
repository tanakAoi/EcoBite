import { FC } from "react";

const Contact: FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mt-16">
                <h1 className="text-4xl font-bold font-serif text-center mb-8">
                    Contact Us
                </h1>
                <div className="space-y-6">
                    <p className="text-base text-gray-700">
                        Have questions or feedback? We’d love to hear from you!
                    </p>
                    <form className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                rows={4}
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;