import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const orderService = {
    getOrdersOfUser: async (id) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/orders`, id)
            .catch(errorHandler);
        return response;
    },
    getOrderById: async (orderId) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/orders/detail`, {
                order_id: orderId,
            })
            .catch(errorHandler);
        return response;
    },
    postOrder: async (order) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/orders/add`, order)
            .catch(errorHandler);
        return response;
    },
};

export default orderService;
