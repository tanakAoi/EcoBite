import { Product, Recipe } from "@/types";
import { Link } from "@inertiajs/react";
import { FC } from "react";
import { route } from "ziggy-js";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface HomeProps {
    heroData: {
        tagline: string;
        text_color: string;
        image: string;
    };
    latestProducts: Product[];
    featuredRecipes: Recipe[];
}

const Home: FC<HomeProps> = ({ latestProducts, featuredRecipes, heroData }) => {
    const { t } = useLaravelReactI18n();

    return (
        <div className="">
            <div
                className={`flex items-center w-full bg-cover bg-center bg-no-repeat md:h-[40rem] ${
                    heroData?.image ? "" : "bg-gray-200"
                }`}
                style={{
                    backgroundImage: heroData?.image
                        ? `url(${heroData.image})`
                        : "none",
                }}
            >
                <h1
                    className={`font-serif ${
                        heroData?.text_color === "dark"
                            ? "text-dark"
                            : "text-light"
                    }  text-6xl md:text-7xl pl-10 py-24 md:pt-32`}
                >
                    {heroData?.tagline}
                </h1>
            </div>
            <div className="max-w-7xl mt-16 mx-auto px-6 md:px-10">
                <section className="mt-8 mb-16 flex flex-col gap-8">
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-dark"></div>
                        <h2 className="text-2xl font-bold font-serif text-center mx-4">
                            {t("Featured Recipes")}
                        </h2>
                        <div className="flex-grow border-t border-dark"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
                        <div className="md:col-span-3 relative flex flex-col mb-4 md:mb-0">
                            {featuredRecipes[0] && (
                                <Link
                                    href={route(
                                        "recipe.show",
                                        featuredRecipes[0].id
                                    )}
                                    className="h-full"
                                >
                                    {featuredRecipes[0].image ? (
                                        <img
                                            src={featuredRecipes[0].image}
                                            alt={featuredRecipes[0].title}
                                            className="w-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200"></div>
                                    )}
                                    <div className="flex justify-between items-center absolute bottom-0 left-0 right-0 bg-dark text-primary p-4">
                                        <h3 className="font-light text-2xl">
                                            {featuredRecipes[0].title}
                                        </h3>
                                        <p>
                                            {new Date(
                                                featuredRecipes[0].created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="col-span-2 space-y-4 flex flex-col">
                            {featuredRecipes.slice(1, 3).map((recipe) => (
                                <Link
                                    href={route("recipe.show", recipe.id)}
                                    key={recipe.id}
                                    className="relative flex-1"
                                >
                                    <div className="bg-dark"></div>
                                    {recipe.image ? (
                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full min-h-48 h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                            <span>
                                                {t("No Image Available")}
                                            </span>
                                        </div>
                                    )}
                                    <div className="w-full flex justify-between items-center absolute bottom-0 bg-dark text-primary p-4">
                                        <h3 className="font-light text-xl">
                                            {recipe.title}
                                        </h3>

                                        <p>
                                            {new Date(
                                                recipe.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link
                        href={route("recipe.index")}
                        className="text-secondary text-lg hover:text-secondary/50 transition-all flex items-center gap-2 justify-end"
                    >
                        <span>{t("All Recipes")}</span>

                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </section>
                <section className="flex flex-col gap-8">
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-dark"></div>
                        <h2 className="text-2xl font-bold font-serif text-center mx-4">
                            {t("Latest Products")}
                        </h2>
                        <div className="flex-grow border-t border-dark"></div>
                    </div>
                    <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {latestProducts.map((product) => (
                            <Link
                                href={route("product.show", product.id)}
                                key={product.id}
                                className="h-full flex flex-col items-center justify-between gap-3"
                            >
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full object-cover object-center"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-secondary/20">
                                        <span>{t("No Image Available")}</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-medium uppercase">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                    <Link
                        href={route("product.index")}
                        className="text-secondary text-lg hover:text-secondary/50 transition-all flex items-center gap-2 justify-end"
                    >
                        <span>{t("All Products")}</span>

                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Home;
