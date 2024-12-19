import React from "react";
import { useForm } from "@inertiajs/react";

interface DeleteFormProps {
    productId: number;
    onDelete: (id: number) => void;
}

const DeleteForm: React.FC<DeleteFormProps> = ({ productId, onDelete }) => {
    const { delete: destroy } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this product?")) {
            destroy(route("admin.product.destroy", productId), {
                onSuccess: () => {
                    onDelete(productId);
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Failed to delete the product.");
                },
            });
        }
    };

    return (
        <form
            className="max-w-md w-full flex items-center justify-center"
            onSubmit={handleSubmit}
        >
            <button
                type="submit"
                className="bg-dark text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-dark transition w-full text-center"
            >
                Delete
            </button>
        </form>
    );
};

export default DeleteForm;
