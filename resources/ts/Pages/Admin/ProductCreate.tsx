import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

const ProductCreate: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: 0,
        stock_quantity: 0,
        image: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("stock_quantity", String(data.stock_quantity));

        if (data.image) {
            formData.append("image", data.image);
        }

        post(route("admin.product.store"), {
            data: formData,
        });
    };

    return (
        <form
            onSubmit={submit}
            method="POST"
            encType="multipart/form-data"
            className="flex flex-col"
        >
            <input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                placeholder="Product Name"
                required
            />
            <textarea
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
                placeholder="Product Description"
                required
            />
            <input
                type="number"
                name="price"
                value={data.price}
                onChange={(e) => setData("price", parseFloat(e.target.value))}
                placeholder="Product Price"
                required
            />
            <input
                type="number"
                name="stock_quantity"
                value={data.stock_quantity}
                onChange={(e) =>
                    setData("stock_quantity", parseInt(e.target.value))
                }
                placeholder="Stock quantity"
                required
            />
            <div>
                <label htmlFor="">Product image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                        setData("image", e.target.files?.[0] || null)
                    }
                    required
                />
            </div>
            <button
                type="submit"
                disabled={processing}
                className="bg-blue-500 text-white p-2 rounded"
            >
                {processing ? "Saving..." : "Save"}
            </button>

            {errors.name && <div className="text-red-500">{errors.name}</div>}
            {errors.description && (
                <div className="text-red-500">{errors.description}</div>
            )}
            {errors.price && <div className="text-red-500">{errors.price}</div>}
            {errors.stock_quantity && (
                <div className="text-red-500">{errors.stock_quantity}</div>
            )}
            {errors.image && <div className="text-red-500">{errors.image}</div>}
        </form>
    );
};

export default ProductCreate;
