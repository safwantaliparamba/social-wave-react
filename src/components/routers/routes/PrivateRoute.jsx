import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'


const PrivateRoute = ({ children }) => {
    const location = useLocation()
    //calculate if user is authenticated or not
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    
    // if user is authenticated, return protected routes/page else return to login page with current url as next destination url
    return isAuthenticated ? children : <Navigate to={`/sign-in?next=${location.pathname}`} />
}

export default PrivateRoute
