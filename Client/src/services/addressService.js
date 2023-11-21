import axios from 'axios';

const errorHandler = (err) => {
    console.log(err);
};

const addressService = {
    getProvinceName: async (provinceId) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/provinceName`, {
                code: provinceId,
            })
            .catch(errorHandler);
        return response;
    },
    getDistrictName: async (provinceId) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/districtName`, {
                code: provinceId,
            })
            .catch(errorHandler);
        return response;
    },
    getWardName: async (wardId) => {
        const response = await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/wardName`, {
                code: wardId,
            })
            .catch(errorHandler);
        return response;
    },
};

export default addressService;
