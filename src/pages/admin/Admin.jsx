import React, { useEffect, useState } from 'react'
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
    const navigate = useNavigate()
useEffect(()=>{
      const allfun=async()=>{
        
      }
},[])
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
        <div className='admin_container d-flex flex-column '>
            {stnd && <Stattion close={setstnd} />}
            <h3 className=''>Admin Control</h3>
            <div className="d-flex flex-column flex-lg-row admin">
                <div className='sideBar d-flex justify-content-center align-items-center'>
                    <ul className='d-flex flex-lg-column justify-content-lg-evenly align-items-lg-center
                    flex-row justify-content-evenly align-items-center'>
                        <li className='' onClick={() => navigate('/viewDriver')}>Drivers</li>
                        <li className=''>Bookings</li>
                        <li className=''>Users</li>

                    </ul>
                </div>
                <div className='main  ps-2'>

                    <div className="cards d-flex justify-content-lg-center pt-3  gap-2 flex-wrap ">
                        <div className="card" onClick={() => { driver() }}>

                            Reg Drivers
                            {drivers && <span>{drivers}</span>}
                        </div>
                        <div className="card" onClick={() => { users() }}>Users
                            {user && <span>{user}</span>}
                        </div>
                        <div className="card" onClick={() => { station() }}>Stations
                            {stations && <span>{stations}</span>}
                        </div>
                        <div className="card">Revenue</div>
                    </div>
                    {/* <div className='mt-3'>
                        {drivers &&
                            <p>Registered Drivers: {drivers}</p>
                        }
                    </div> */}
                    {/* <div>
                        {user &&
                            <p>User: {user}</p>
                        }
                    </div> */}
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

        </div>
    )
}

export default Admin