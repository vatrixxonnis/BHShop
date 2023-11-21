import axios from 'axios';

const errorHandler = (error) => {
    if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
    }
};

const newsLetterService = {
    postEmail: async (email) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/newsletters`, email)
            .catch(errorHandler);
        return response;
    },
};

export default newsLetterService;
