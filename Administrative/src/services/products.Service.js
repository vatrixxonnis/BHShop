import axios from 'axios'

const serverUrl = 'https://bhshopadminserver.onrender.com'

const errorHandler = (err) => {
  console.log(err)
}

const productService = {
  getAllProduct: async () => {
    const response = await axios.get(`${serverUrl}/products?sort=-created_date`).catch(errorHandler)
    return response
  },

  getProductById: async (id) => {
    const response = await axios.get(`${serverUrl}/products/${id}`).catch(errorHandler)
    return response
  },
  addProduct: async (product) => {
    const response = await axios.post(`${serverUrl}/products`, product).catch(errorHandler)
    return response
  },
  deleteProduct: async (id) => {
    console.log(id)
    const response = await axios.delete(`${serverUrl}/products/${id}`).catch(errorHandler)
    return response
  },
  updateProduct: async (id, product) => {
    try {
      const response = await axios.put(`${serverUrl}/products/${id}`, product)
      return response.data
    } catch (error) {
      errorHandler(error)
      return null
    }
  },
}

export default productService
