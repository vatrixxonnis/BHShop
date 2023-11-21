import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const customerService = {
    getCustomer: async (user_id) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/customers/user_id`, {
                user_id: user_id,
            })
            .catch(errorHandler);
        return response;
    },
    getWishlist: async (id) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/customers/wishlist`, {
                user_id: id,
            })
            .catch(errorHandler);
        return response;
    },
    addToWishlist: async (user_id, product) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/customers/wishlist/add`, {
                user_id: user_id,
                product: product,
            })
            .catch(errorHandler);
        return response;
    },
    removeFromWishlist: async (user_id, product) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/customers/wishlist/remove`, {
                user_id: user_id,
                product: product,
            })
            .catch(errorHandler);
        return response;
    },
};

export default customerService;
