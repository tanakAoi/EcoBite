import { useForm } from "@inertiajs/react";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

interface ProductEditProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        stock_quantity: number;
        image: File | string;
    };
}

const ProductEdit: FC<ProductEditProps> = ({ product }) => {
    const { data, setData, put, processing, errors } = useForm({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock_quantity: product.stock_quantity,
        image: product.image || "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", String(data.id));
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("stock_quantity", String(data.stock_quantity));
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }

        put(route("admin.product.update", { id: data.id }), { data: formData });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                />
            </label>
            <label>
                Stock Quantity:
                <input
                    type="number"
                    name="stock_quantity"
                    value={data.stock_quantity}
                    onChange={handleChange}
                />
            </label>
            <label>
                Image:
                <input type="file" name="image" onChange={handleImageChange} />
            </label>
            {typeof data.image === "string" && data.image && (
                <div>
                    <img src={data.image} alt="Product" width={100} />
                </div>
            )}

            <button type="submit">Save</button>
        </form>
    );
};

export default ProductEdit;
