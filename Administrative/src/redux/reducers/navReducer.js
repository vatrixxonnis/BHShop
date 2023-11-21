import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const initialState = {
  sidebarShow: true,
}
const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setSidebarShow':
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      }
    default:
      return state
  }
}
const persistConfig = {
  key: 'root',
  storage,
}

export default persistReducer(persistConfig, navReducer)
