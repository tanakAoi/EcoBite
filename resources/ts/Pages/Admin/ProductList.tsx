import DeleteForm from "../../Components/DeleteForm";
import { Session } from "inspector";
import React, { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock_quantity: number;
    image: string;
    created_at: string;
    updated_at: string;
}

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
            <a href="product/create">Add new product</a>
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
                        <tr key={product.id}>
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
                            <td>
                                <button>Edit</button>
                                <DeleteForm productId={product.id} onDelete={handleDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
