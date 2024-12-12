import { usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface AddToCartButtonProps {
    productQuantities: { [key: number]: number };
    inStock: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productQuantities,
    inStock,
}) => {
    const { success, error } = usePage().props;
    
    useEffect(() => {
        if (typeof success === "string") {
            toast.success(success);
        }

        if (typeof error === "string") {
            toast.error(error);
        }
    }, [success, error]);

    const handleAddToCart = async (e: any) => {
        e.preventDefault();

        const product = Object.entries(productQuantities).map(
            ([productId, quantity]) => ({
                product_id: parseInt(productId),
                quantity,
            })
        );

        try {
            const response = await axios.post(route("cart.item.add"), {
                ...product[0],
            });

            toast.success(response.data.message);

        } catch (error: any) {
            toast.error("Failed to add product to cart. Please try again.");
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <button
            onClick={(e) => handleAddToCart(e)}
            className={`${
                !inStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded transition`}
            disabled={!inStock}
        >
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
