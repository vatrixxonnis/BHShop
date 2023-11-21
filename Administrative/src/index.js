import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import authReducer from './redux/reducers/authReducer'
import store from './store'
const persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)

reportWebVitals()
