import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const residenceService = {
    getResidences: async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/residences`)
            .catch(errorHandler);
        return response;
    },
    getProvinces: async () => {
        const response = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/provinces`)
            .catch(errorHandler);
        return response;
    },
};

export default residenceService;
