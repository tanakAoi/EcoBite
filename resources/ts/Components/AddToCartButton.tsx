import axios from "axios";
import { toast } from "react-toastify";
import Button from "../Components/Button";

interface AddToCartButtonProps {
    productQuantities: { [key: number]: number };
    inStock: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productQuantities,
    inStock,
}) => {
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

            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error: any) {
            toast.error("Failed to add product to cart. Please try again.");
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <Button
            label="Add to Cart"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="text-light"
        />
    );
};

export default AddToCartButton;
