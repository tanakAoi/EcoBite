import { Link } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";
interface DashboardProps {
    error?: string;
}

const Home: React.FC<DashboardProps> = ({ error }) => {
    console.log(error);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to EcoBite!</h1>
            <section>Hero</section>
            <section>
                <h2 className="text-2xl font-semibold">Latest Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                </div>
                <Link href={route("product.index")} className="text-blue-500">
                    View All Products
                </Link>
            </section>
            <section className="mt-8">
                <h2 className="text-2xl font-semibold">Featured Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                </div>
                <Link href={route("recipe.index")} className="text-blue-500">
                    Browse Recipes
                </Link>
            </section>
        </div>
    );
};

export default Home;
