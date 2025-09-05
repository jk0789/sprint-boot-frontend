import React, { useState } from "react";
import axios from "axios";

const ProductSuggestions = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:8080/suggestions", {
        params: { name, price }
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Find E-Commerce Suggestions</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Enter expected price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      <ul className="list-group mt-3">
        {results.map((product, index) => (
          <li key={index} className="list-group-item">
            <strong>{product.title}</strong> - ${product.price} <br />
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              View on Store
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSuggestions;
