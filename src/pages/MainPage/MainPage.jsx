import React, { useState } from 'react'
import Navvbar from '../../Components/navbar/Navvbar'
import { Outlet } from 'react-router-dom'
import HeyAuto from '../../Components/heyauto/HeyAuto'

const MainPage = () => {
    const [logo, setLog] = useState(true)
    setTimeout(() => {
        setLog(false)
    }, 5000)
    return (
        <div>
            <Navvbar />
            {logo && <HeyAuto />}
            {!logo && <Outlet />}
        </div>
    )
}

export default MainPage