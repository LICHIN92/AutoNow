import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const DriverAuth = ({ children }) => {
    const sarathi = localStorage.getItem('sarathi')
    const driver = useSelector((state) => state.driver.driver)
    console.log(driver);
    console.log(sarathi && driver)
    if (sarathi && driver) {
        return children
    }
    return <Navigate to={'/driverLogin'} />
}

export default DriverAuth