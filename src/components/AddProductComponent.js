import React, { useState, useEffect } from 'react';
import ProductService from '../ProductService';

const AddProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        ProductService.getAllProducts()
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Filter products by name
    const filteredProducts = products.filter(product =>
        (product.name ?? "").toLowerCase().includes((searchTerm ?? "").toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2>Search Products</h2>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Type product name to filter..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul className="list-group">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <li
                            key={product.id}
                            className="list-group-item bg-warning"
                        >
                            <strong>{product.name}</strong> - ${product.price}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center">No products found.</li>
                )}
            </ul>
        </div>
    );
};

export default AddProductComponent;
