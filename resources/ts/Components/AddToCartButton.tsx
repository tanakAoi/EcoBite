import axios from "axios";
import { toast } from "react-toastify";
import Button from "../Components/Button";
import { useLaravelReactI18n } from "laravel-react-i18n";

interface AddToCartButtonProps {
    productQuantities: { [key: number]: number };
    inStock: boolean;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productQuantities,
    inStock,
}) => {
    const { t } = useLaravelReactI18n();

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
            label={t("Add to Cart")}
            onClick={handleAddToCart}
            disabled={!inStock}
            className="text-light"
        />
    );
};

export default AddToCartButton;
