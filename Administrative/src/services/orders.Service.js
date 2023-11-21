import axios from 'axios'

const serverUrl = 'https://bhshopadminserver.onrender.com'

const errorHandler = (err) => {
  console.log(err)
}

const ordersService = {
  getAllOrders: async () => {
    const response = await axios.get(`${serverUrl}/orders`).catch(errorHandler)
    return response
  },
  getOrderById: async (id) => {
    const response = await axios.get(`${serverUrl}/orders/${id}`).catch(errorHandler)
    return response
  },
  updateOrderStatus: async (id, status) => {
    try {
      const response = await axios.put(`${serverUrl}/orders/${id}/status`, { status })
      return response.data
    } catch (error) {
      errorHandler(error)
      return null
    }
  },
}

export default ordersService
