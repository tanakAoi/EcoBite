import axios from "axios";


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
            const response = await axios.post(route("cart.add"), {
                ...product[0]
            });

            console.log("Success:", response.data);
        } catch (error: any) {
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
