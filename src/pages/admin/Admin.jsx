import React, { useEffect, useState } from 'react'
import './Admin.css'
import axios from 'axios'
import { MdAddLocationAlt, MdLogout, MdOutlineLocationCity, MdOutlineVerified } from "react-icons/md";
import Stattion from '../../Components/addStation/Stattion';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { PiCar } from 'react-icons/pi';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { FaUser, FaUsers } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../redux/useSlice';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiPassPendingLine } from 'react-icons/ri';
const Admin = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [drivers, setDrivers] = useState(null)
    const [user, setuser] = useState(null)
    const [stations, setStation] = useState(null)
    const [bookings, setBookings] = useState(null)
    const [stnd, setstnd] = useState(false)
    const [revenue,setRevenue]=useState(null)
    const [pendingDrivers,SetPendingDrivers]=useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

   

    useEffect(() => {
        const driver = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/getNumDriver`)
                setDrivers(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        driver()
    }, [])
    useEffect(() => {
        const users = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/getUsers`)
                setuser(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        users()
    }, [])
    useEffect(() => {
        const station = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/getStation`)
                setStation(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        station()
    }, [])

    // revenue
    useEffect(() => {
        const station = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/noofBookingToday`)
                setBookings(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        station()
    },[])

    useEffect(() => {
        const revenue = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/revenueToday`)
                setRevenue(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        revenue()
    },[])

    // pendingDrivers
     useEffect(() => {
        const revenue = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/pendingDrivers`)
                SetPendingDrivers(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        revenue()
    },[])

    const Logout = () => {
        localStorage.removeItem('autoNowToken')
        dispatch(clearUserData(user))
        navigate('/signin')
    }
    return (
        <div className='admin_container d-flex  '>

            {/* <h3 className=''>Admin Control</h3> */}
            <div className="d-flex  admin">

                {/* side bar */}
                <div className='sideBar bg-danger text-white d-flex flex-column gap-3 pt-5 align-items-center'>

                    <div className='sideBarOptionBox'>
                        <AiOutlineHome />
                        <span className=' d-none d-lg-block'>DashBoard</span>
                    </div>
                    <div className='sideBarOptionBox'>
                        <PiCar />
                        <span className=' d-none d-lg-block'>Drivers</span>
                    </div>
                    <div className='sideBarOptionBox'>
                        <HiOutlineCalendarDateRange />
                        <span className=' d-none d-lg-block'>Bookings</span>
                    </div>
                    <div className='sideBarOptionBox'>
                        <MdOutlineLocationCity />
                        <span className=' d-none d-lg-block'>Stations</span>
                    </div>
                    {/* <div className='sideBarOptionBox'>
                        <span>Users</span>
                    </div>
                    <div className='sideBarOptionBox'>
                        <span>
                            Revenue
                        </span>
                    </div>
                    <div className='sideBarOptionBox'>
                        <span>Settings</span>
                    </div> */}
                    <div onClick={() => Logout()} className='sideBarOptionBox mb-2 mt-5 border-1 logout'>
                        <MdLogout className='logoutSimbol' />
                        <span className='d-none d-md-block'>Log out</span>

                    </div>
                </div>

                {/* main */}
                <div className='main d-flex flex-column  ps-2'>
                    <h3 className=''>Admin Control</h3>

                    <div className="cards d-flex justify-content-lg-center pt-3  gap-1 gap-md-3 flex-wrap ">
                        <div className="card" onClick={() => { navigate('/viewDriver') }}>
                            <div className='NameAndInfo' >
                                <small>Drivers</small>
                                <div>
                                    {drivers && <span>{drivers}</span>}

                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <MdOutlineVerified  size={25} className='symbol' />

                            </div>
                        </div>
                        <div className="card" onClick={() => { users() }}>
                            <div className="NameAndInfo">
                                <small>Users</small>
                                <div>
                                    {user && <span>{user}</span>}

                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <FaUsers size={25} className='symbol' />

                            </div>

                        </div>
                        <div className="card" onClick={() => { navigate('/stations') }} >
                            <div className="NameAndInfo">
                                <small>Stations</small>
                                <div>
                                    {stations && <span>{stations}</span>}
                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <MdOutlineLocationCity size={25} className='symbol' />

                            </div>

                        </div>
                        <div className="card" onClick={() => { navigate('/station') }}>
                            <div className="NameAndInfo">
                                <small>Today Bookings</small>
                                <div>
                                    {bookings && <span>{bookings}</span>}
                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <HiOutlineCalendarDateRange size={25} className='symbol' />
                            </div>
                        </div>
                        <div className="card" onClick={() => { navigate('/Revenue') }}>
                            <div className="NameAndInfo">
                                <small>Revenue</small>
                                <div>
                                    {revenue && <span>{revenue}</span>}
                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <GiReceiveMoney size={25} className='symbol' />
                            </div>
                        </div>
                          <div className="card" onClick={() => { navigate('/pendingDriver') }}>
                            <div className="NameAndInfo">
                                <small>Pending Drivers</small>
                                <div>
                                    {pendingDrivers && <span>{pendingDrivers}</span>}
                                </div>
                            </div>
                            <div className=' h-100 w-25 d-flex  align-items-center'>
                                <RiPassPendingLine  size={25} className='symbol'  />

                            </div>
                        </div>
                    </div>


                    {/* <div>
                        {stations &&

                            <div style={{ height: '40px' }} className='d-flex align-items-center gap-2 ps-2' >
                                <span>Station: {stations}</span>
                                <div>
                                    <MdAddLocationAlt fill='blue' size={'25'} cursor={'pointer'} onClick={() => setstnd(true)} />

                                </div>
                            </div>}
                    </div> */}
                </div>
            </div>

        </div>
    )
}

export default Admin