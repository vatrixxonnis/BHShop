import axios from 'axios'

const serverUrl = 'https://bhshopadminserver.onrender.com'

const errorHandler = (err) => {
  console.log(err)
}

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`${serverUrl}/users`).catch(errorHandler)
    return response
  },
  getUserById: async (id) => {
    const response = await axios.get(`${serverUrl}/users/${id}`).catch(errorHandler)
    return response
  },
  login: async (user) => {
    console.log(user)
    const response = await axios.post(`${serverUrl}/users`, user).catch(errorHandler)
    if (response && response.data.user_type === 'Admin') {
      return response
    } else {
      return null
    }
  },

  register: async (user) => {
    const response = await axios.post(`${serverUrl}/users/register`, user).catch(errorHandler)
    return response
  },

  updateUser: async (id, user) => {
    try {
      const response = await axios.put(`${serverUrl}/users/update/${id}`, user)
      return response.data
    } catch (error) {
      errorHandler(error)
      return null
    }
  },
  changePassword: async (user) => {
    const response = await axios.put(`${serverUrl}/users/changePassword`, user).catch(errorHandler)
    return response
  },
  deleteUser: async (id) => {
    console.log(id)
    const response = await axios.delete(`${serverUrl}/users/${id}`).catch(errorHandler)
    return response
  },
}

export default userService
