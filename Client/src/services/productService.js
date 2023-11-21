import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const productService = {
    getAllProduct: async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/products`)
            .catch(errorHandler);
        return response;
    },
    getProduct: async (id) => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/products/${id}`)
            .catch(errorHandler);
        return response;
    },
    getAllProductWithOnlyName: async () => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/products/allWithOnlyName`)
            .catch(errorHandler);
        return response;
    },
};

export default productService;
