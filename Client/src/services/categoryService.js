import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const categoryService = {
    getAllCategory: async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/categories`)
            .catch(errorHandler);
        return response;
    },
};

export default categoryService;
