import { Product } from "@/types";
import DeleteForm from "../../Components/DeleteForm";
import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

interface AdminProductProps {
    productsData: { data: Product[] };
    success?: string;
}

const ProductList: React.FC<AdminProductProps> = ({
    productsData,
    success,
}) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(productsData.data);
    }, [products]);

    const handleDelete = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    return (
        <div>
            <h1>Admin Product Management</h1>
            <Link href={route("admin.product.create")}>Add new product</Link>
            <table className="border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="relative">
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.stock_quantity}</td>
                            <td>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: "50px", height: "auto" }}
                                />
                            </td>
                            <td>{product.created_at}</td>
                            <td>{product.updated_at}</td>
                            <td className="relative">
                                <Link
                                    href={route("admin.product.edit", product.id)}
                                    className="relative z-10 w-fit"
                                >
                                    Edit
                                </Link>
                                <div className="relative z-10 w-fit">
                                    <DeleteForm
                                        productId={product.id}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            </td>
                            <Link
                                href={route("admin.product.show", product.id)}
                                className="absolute inset-0 z-0"
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
