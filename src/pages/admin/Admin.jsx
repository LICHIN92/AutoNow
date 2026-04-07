import React, { useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { MdAddLocationAlt } from "react-icons/md";
import Stattion from '../../Components/addStation/Stattion';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [drivers, setDrivers] = useState(null)
    const [user, setuser] = useState(null)
    const [stations, setStation] = useState(null)
    const [stnd, setstnd] = useState(false)
    const navigate=useNavigate()
    
    const driver = async () => {
        try {
            const res = await axios.get(`${api_url}/admin/getNumDriver`)
            setDrivers(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const users = async () => {
        try {
            const res = await axios.get(`${api_url}/admin/getUsers`)
            setuser(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const station = async () => {
        try {
            const res = await axios.get(`${api_url}/admin/getStation`)
            setStation(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='admin_container container-fluid row'>
            {stnd && <Stattion close={setstnd} />}
            <div className='sideBar col-md-2 pt-lg-5  rounded-5'>
                <ul className='d-flex flex-md-column w-100  h-100 justify-content-evenly p-0 justify-content-center
                justify-content-md-evenly align-items-center '>
                    <li className='' onClick={()=>navigate('/viewDriver')}>Drivers</li>
                    <li className=''>Bookings</li>
                    <li className=''>Users</li>

                </ul>
            </div>
            <div className='main col-md-10 ps-lg-4 pt-2'>
                <h3 className='text-center'>Admin Control</h3>

                <div className="cards pt-3 d-flex flex-wrap justify-content-evenly
                 align-items-center row-gap-4 w-100  ">
                    <div className="card" onClick={() => { driver() }}>

                        Reg:Drivers</div>
                    <div className="card" onClick={() => { users() }}>Users</div>
                    <div className="card" onClick={() => { station() }}>Stations</div>
                    <div className="card">Revenue</div>
                </div>
                <div className='mt-3'>
                    {drivers &&
                        <p>Registered Drivers: {drivers}</p>
                    }
                </div>
                <div>
                    {user &&
                        <p>User: {user}</p>
                    }
                </div>
                <div>
                    {stations &&

                        <div style={{ height: '40px' }} className='d-flex align-items-center gap-2 ps-2' >
                            <span>Station: {stations}</span>
                            <div>
                                <MdAddLocationAlt fill='blue' size={'25'} cursor={'pointer'} onClick={() => setstnd(true)} />

                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Admin