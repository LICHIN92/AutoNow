import React from 'react'
import Navvbar from '../../Components/navbar/Navvbar'
import { Outlet } from 'react-router-dom'

const MainPage = () => {
    return (
        <div>
            <Navvbar />
            <Outlet />
        </div>
    )
}

export default MainPage