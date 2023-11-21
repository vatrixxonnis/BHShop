import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const reviewService = {
    getReviewById: async (id) => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/reviews/${id}`)
            .catch(errorHandler);
        return response;
    },
    postReview: async (review) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/reviews`, review)
            .catch((error) => {
                if (error.response) {
                    return error.response;
                }
            });
        return response;
    },
};

export default reviewService;
