import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const userService = {
    getAllUsers: async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/users`)
            .catch(errorHandler);
        return response;
    },
    login: async (user) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/users`, user)
            .catch(errorHandler);
        return response;
    },
    register: async (user) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/users/regis`, user)
            .catch(errorHandler);
        return response;
    },
    update: async (user) => {
        const response = await axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users`, user)
            .catch(errorHandler);
        return response;
    },
    changePassword: async (user) => {
        const response = await axios
            .put(`${process.env.REACT_APP_SERVER_URL}/users/changePassword`, user)
            .catch(errorHandler);
        return response;
    },
    delete: async (user) => {
        const response = await axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/users`, user)
            .catch(errorHandler);
        return response;
    },
};

export default userService;
