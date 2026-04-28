import React, { useEffect, useState } from 'react'
import './StationView.css'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import { FaRegCalendarDays } from 'react-icons/fa6'
import { MdOutlineLocationCity } from 'react-icons/md'
import { IoIosRefreshCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
const StationView = () => {
    const api_Url = import.meta.env.VITE_API_URL
    const [data, setData] = useState([])

    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const stations = async () => {
            try {
                const res = await axios.get(`${api_Url}/admin/eachstation`);
                setData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        stations()


    }, [api_Url, refresh]);
    const totalAllBookings = data.reduce((sum, item) => sum + item.totalBookings, 0);
const navigate=useNavigate()
    return (
        <div className='StationView ps-1 ps-md-2'>
            <h4 className=''>Station Overview</h4>
            <small>Real-time over view of all station</small>
            <IoIosRefreshCircle
                size={20}
                className="ms-1"
                onClick={() => setRefresh(prev => prev+1)}
            />
            <div className=' d-flex flex-column  gap-3 px-2 pt-3'>
                <div className='d-flex flex-wrap gap-3'>
                    <div className="bookDatailBox gap-3 ">
                        <div className='w-auto iconBox h-auto d-flex justify-content-center '>
                            <FaRegCalendarDays />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <span >Total Stations</span>
                            <span className=' fw-bold'>{data.length}</span>
                            <small className=' small'>Active Stations</small>
                        </div>
                    </div>
                    <div className="bookDatailBox gap-3 ">
                        <div className='w-auto iconBox h-auto d-flex justify-content-center '>
                            <FaRegCalendarDays />
                        </div>
                        <div className='d-flex flex-column justify-content-center'>
                            <span>Total Bookings</span>
                            <span className=' fw-bold'> {totalAllBookings}</span>
                            <small className=' small'>Today</small>
                        </div>
                    </div>
                </div>
                <div className=' d-flex flex-wrap gap-3'>
                    {
                        data.length > 0 ?
                            (
                                data.map((file, index) => (
                                <div key={index} onClick={()=>navigate(`/todaystation/${file.station}`)} className='station bookDatailBox d-flex gap-2 text-capitalize'>
                                        <div className='w-auto iconBoxx h-auto d-flex justify-content-center '>
                                            <MdOutlineLocationCity />

                                        </div>
                                        <div className='d-flex flex-column justify-content-center'>
                                            <span className='fw-bold'>{file.station}</span>
                                            <span className=' fw-bold'>{file.totalBookings}</span>
                                        </div>

                                    </div>
                                ))
                            )
                            :
                            " no booking today"
                    }
                </div>

            </div>
        </div>
    )
}

export default StationView