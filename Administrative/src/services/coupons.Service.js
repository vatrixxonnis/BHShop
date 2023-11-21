import axios from 'axios'

const serverUrl = 'https://bhshopadminserver.onrender.com'

const errorHandler = (err) => {
  console.log(err)
}

const couponsService = {
  getAllCoupons: async () => {
    const response = await axios.get(`${serverUrl}/coupons`).catch(errorHandler)
    return response
  },
  getCouponById: async (id) => {
    const response = await axios.get(`${serverUrl}/coupons/${id}`).catch(errorHandler)
    return response
  },
}

export default couponsService
