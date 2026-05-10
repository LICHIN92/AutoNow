import React from 'react'
import { Navigate } from 'react-router-dom'

const UserLogedIn = ({ children }) => {
    const token = localStorage.getItem('autoNowToken')

    if (token) {
        return children

    }
    return <Navigate to="/signin" />
}

export default UserLogedIn