import React, { useEffect, useState } from 'react'
import './StationBookView.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const StationBookView = () => {
    const api_Url = import.meta.env.VITE_API_URL
    const { station } = useParams()
    const [bookings, setBookings] = useState([])
    const [wait, setwait] = useState(false)
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
    const datenow = () => {
        const d = new Date().toISOString().split("T")[0];
        console.log(d); // 2026-04-27

        const [year, month, date] = d.split("-");
        const today = date + "/" + month + "/" + year
        return (today)
    }
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
                                <div className='Bookings'>
                                    <span>{data.Status}</span>
                                    <span>{data.total}</span>
                                </div>
                            )))
                            // </div>
                        )
                        :
                        "please wait"
                }

            </div>
        </div>
    )
}

export default StationBookView