import { SET_LOGGED_IN, SET_USER, SET_USER_FIRST_NAME } from './../actions/authActions'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  isLoggedIn: false,
  user: {},
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case SET_USER_FIRST_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          first_name: action.payload,
        },
      }
    default:
      return state
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

export default persistReducer(persistConfig, authReducer)
