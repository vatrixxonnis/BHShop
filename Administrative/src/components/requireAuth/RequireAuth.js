import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const requireAuth = (Component) => (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  if (isLoggedIn) {
    return <Component {...props} />
  } else {
    return <Redirect to="/login" />
  }
}

export default requireAuth
