import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductListComponent from "./components/ProductListComponent";
import AddProductComponent from "./components/AddProductComponent";
import ProductSuggestions from "./components/ProductSuggestions";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>My Product App</h1>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>
          </div>

          {/* Keep all features accessible here */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <AddProductComponent />
                  <hr />
                  <ProductListComponent allowEdit={true} />
                  <hr />
                  <ProductSuggestions />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
