import React from 'react';
import DeleteForm from '../../Components/DeleteForm';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface ProductShowProps {
    product: Product;
}

const ProductShow: React.FC<ProductShowProps> = ({ product }) => {

    const handleDelete = () => {
        window.location.href = "/admin/product";
    }

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div>
                <a
                    href={`/admin/product/${product.id}/edit`}
                >
                    Edit
                </a>
                <DeleteForm productId={product.id} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default ProductShow;