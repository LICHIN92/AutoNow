import React, { useEffect, useState } from 'react'
import './StationBookView.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaCarAlt, FaMobile, FaMobileAlt, FaUser } from 'react-icons/fa'
const StationBookView = () => {
    const api_Url = import.meta.env.VITE_API_URL
    const { station } = useParams()
    const [bookings, setBookings] = useState([])
    const [wait, setwait] = useState(false)
    const [driver, setdriver] = useState([])
    const [values, setValues] = useState(null)
    const [pendings, setpendings] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${api_Url}/admin/todaystation`, {
                    params: { station }
                })
                setwait(true)
                setBookings(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
    }, [station])

    useEffect(() => {
        const driver = async () => {
            try {
                const res = await axios.get(`${api_Url}/admin/stationsDriver`, {
                    params: { station }
                })
                setdriver(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)

            }
        }
        driver()
    }, [station])

    const datenow = () => {
        const d = new Date().toISOString().split("T")[0];

        const [year, month, date] = d.split("-");
        const today = date + "/" + month + "/" + year
        return (today)
    }

    const pending = async () => {
        // alert("Pending clicked");
        try {
            const res = await axios.get(`${api_Url}/admin/pending`, {
                params: { station }
            })
            setpendings(res.data)
        } catch (error) {
            console.log(error)

        }
    }

    const accepted = async () => {
        // alert("Accepted clicked");
        try {
            const res = await axios.get(`${api_Url}/admin/verifiedDrivers`, {
                params: { station }
            })
            setpendings(res.data)
        } catch (error) {
            console.log(error)

        }
    }
    const driversAtstation = async () => {
        setValues('drivers')
        try {
            const res = await axios.get(`${api_Url}/admin/verifiedDrivers`, {
                params: { station }
            })
        } catch (error) {

        }
    }
    const actions = {
        pending,
        accepted
    };
    const getRemainingHours = (time) => {
        if (!time) return
        let [hour, minute] = time.split(':').map(Number);

        let period = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // handle 0 -> 12

        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    };
    return (
        <div className='StationBookView '>
            <div className='d-flex flex-column ps-2'>
                <span className='  fs-4 text-capitalize'>Ride Booking in {station}</span>
                <span className=' '>{datenow()}</span>
            </div>
            <div className='ps-2 d-flex flex-wrap py-2 gap-1 gap-md-3'>
                {
                    wait ?
                        (bookings.length > 0 &&
                            // <div>
                            (bookings.map((data, index) => (
                                <div className='Bookings' onClick={() => { setValues(data.Status), actions[data.Status]?.() }}>
                                    <span>{data.Status}</span>
                                    <span>{data.total}</span>
                                </div>
                            )))
                            // </div>
                        )
                        :
                        "please wait"
                }
                {
                    driver.length > 0 &&
                    <div className='Bookings' onClick={() => { driversAtstation() }} >
                        <span>Drivers </span>
                        <span>{driver.length}</span>
                    </div>
                }



            </div>
            <div >
                {/* pending */}
                {
                    values == 'pending' && pendings.length > 0 &&

                    <div className='d-flex flex-wrap ps-1 ps-md-2 pt-2'>

                        {pendings.map((file, index) => (
                            <div key={index} className='d-flex flex-column pending'>

                                <span >Pick-Up: {file.pickup}</span>
                                <span >Drop: {file.drop}</span>
                                <span>Stand: {file.NearestStation}</span>
                                <span>Stand: {file.date}</span>
                                <span>Time: {getRemainingHours(file.time)}</span>
                                {file.Status == "pending" &&
                                    <span className='pending_status' ></span>
                                }
                            </div>

                        ))}
                    </div>
                }

                {/* accepted */}
                {
                    values == 'accepted' &&
                    <div>
                        accepted
                    </div>
                }


                {
                    values === 'drivers' &&
                    <div className='d-flex flex-wrap ps-1 ps-md-3 pt-2'>
                        {driver.map((file, index) => (
                            <div key={index} className='d-flex flex-column pending'>
                                <div className='d-flex w-100 h-100 flex-row-reverse justify-content-between'>
                                    <div className='driverImageBox'>
                                        <img src={file.profileImage} alt="driver Image" />

                                    </div>
                                    <div className='d-flex flex-column pt-1 gap-3 ps-0 ps-md-2'>
                                        <span className='d-flex align-items-center gap-1'>
                                            <FaUser /> {file?.Name}
                                        </span>

                                        <span className='d-flex align-items-center gap-1'>
                                            <FaMobileAlt />
                                            {file?.Mobile}
                                        </span>
                                        <span className='d-flex align-items-center gap-1 text-uppercase'>
                                            <FaCarAlt/>
                                            {file?.vehicleNumber}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}

export default StationBookView