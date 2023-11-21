import axios from 'axios'

const serverUrl = 'https://bhshopadminserver.onrender.com'

const errorHandler = (err) => {
  console.log(err)
}

const reviewsService = {
  getAllReviews: async () => {
    const response = await axios.get(`${serverUrl}/reviews`).catch(errorHandler)
    return response
  },
  getReViewById: async () => {
    const response = await axios.post(`${serverUrl}/reviews/`).catch(errorHandler)
    return response
  },
  updateReviewStatus: async (id, label) => {
    try {
      const response = await axios.put(`${serverUrl}/reviews/${id}/status`, { label })
      return response.data
    } catch (error) {
      errorHandler(error)
      return null
    }
  },
  deleteReviewById: async (id) => {
    try {
      const response = await axios.delete(`${serverUrl}/reviews/${id}`)
      return response.data
    } catch (error) {
      errorHandler(error)
      return null
    }
  },
}

export default reviewsService
