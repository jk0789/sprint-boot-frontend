import axios from "axios";

const API_URL = "/products";

class ProductService {
    getAllProducts() {
        return axios.get(API_URL);
    }

    addProduct(product) {
        return axios.post(API_URL, product);
    }

    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    searchProducts(query) {
        return axios.get(`${API_URL}?search=${query}`);
    }

    updateProduct(id, product) {
        return axios.put(`${API_URL}/${id}`, product);
    }
}

export default new ProductService();
