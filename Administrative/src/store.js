import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './redux/reducers/authReducer'
import navReducer from './redux/reducers/navReducer'
const rootReducer = combineReducers({
  user: authReducer,
  sidebarShow: navReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store
