import React, { useEffect, useState } from 'react';
import ProductService from '../ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductListComponent = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [editProductData, setEditProductData] = useState({
        name: '',
        price: '',
        description: '',
        category: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        ProductService.getAllProducts()
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        ProductService.addProduct(newProduct)
            .then(() => {
                setNewProduct({ name: '', price: '', description: '', category: '' });
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error adding product:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            ProductService.deleteProduct(id)
                .then(() => {
                    fetchProducts();
                })
                .catch((error) => {
                    console.error("Error deleting product:", error);
                });
        }
    };

    const startEdit = (product) => {
        setEditingProduct(product.id);
        setEditProductData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProductData({ ...editProductData, [name]: value });
    };

    const saveEdit = (id) => {
        ProductService.updateProduct(id, editProductData)
            .then(() => {
                setEditingProduct(null);
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Products</h2>

            {/* Add Product Form */}
            <form onSubmit={handleAddProduct} className="mb-4">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                            placeholder="Category"
                            className="form-control"
                        />
                    </div>
                    <div className="col">
                        <button type="submit" className="btn btn-success w-100">Add</button>
                    </div>
                </div>
            </form>

            {/* Product List */}
            <ul className="list-group">
                {products.length > 0 ? (
                    products.map((product) => (
                        <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingProduct === product.id ? (
                                <div className="w-100">
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="name"
                                                value={editProductData.name}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="number"
                                                name="price"
                                                value={editProductData.price}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="description"
                                                value={editProductData.description}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                name="category"
                                                value={editProductData.category}
                                                onChange={handleEditChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col d-flex gap-2">
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => saveEdit(product.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={() => setEditingProduct(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <strong>{product.name}</strong> - ${product.price}
                                        <br />
                                        <small>{product.description}</small> | <em>{product.category}</em>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => startEdit(product)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item text-center">No products found.</li>
                )}
            </ul>
        </div>
    );
};

export default ProductListComponent;
