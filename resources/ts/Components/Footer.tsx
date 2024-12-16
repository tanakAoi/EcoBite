import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-light font-serif py-8">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-6">
                    <p>
                        &copy; {new Date().getFullYear()} EcoBite. All rights
                        reserved.
                    </p>
                </div>

                <div className="flex justify-center space-x-8 mb-6">
                    <a href="/about" className="hover:text-glittery-yellow">
                        About Us
                    </a>
                    <a
                        href={route("product.index")}
                        className="hover:text-glittery-yellow"
                    >
                        Shop
                    </a>
                    <a
                        href={route("recipe.index")}
                        className="hover:text-glittery-yellow"
                    >
                        Recipes
                    </a>
                    <a href="/contact" className="hover:text-glittery-yellow">
                        Contact
                    </a>
                </div>

                <div className="flex justify-center space-x-6">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-pink-700"
                    >
                        <i className="fab fa-instagram"></i>{" "}
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-blue-600"
                    >
                        <i className="fab fa-facebook-f"></i>{" "}
                    </a>
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:text-blue-400"
                    >
                        <i className="fab fa-twitter"></i>{" "}
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
