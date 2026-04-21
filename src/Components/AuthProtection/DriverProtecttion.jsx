import React from 'react'
import { Navigate } from 'react-router-dom'

const DriverProtecttion = ({ children }) => {
    const sarathi = localStorage.getItem('sarathi')
    if (!sarathi) {
        return children
    }
    return <Navigate to={'/driverhome'} />
}

export default DriverProtecttion