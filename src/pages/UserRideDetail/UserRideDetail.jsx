import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UserRideDetail.css'
import { TiTick } from 'react-icons/ti'
import { HiOutlineCalendarDateRange } from 'react-icons/hi2'
import { IoIosArrowBack, IoIosArrowRoundBack, IoMdTime } from 'react-icons/io'
import { IoCallOutline, IoPricetagOutline } from 'react-icons/io5'
import { MdDirectionsCar } from 'react-icons/md'
import { CiStar } from 'react-icons/ci'
import { FaRegStar } from 'react-icons/fa'
const UserRideDetail = () => {
    const { id } = useParams()
    const api_Url = import.meta.env.VITE_API_URL
    const [data, setdata] = useState(null)
    useEffect(() => {
        const getdetails = async () => {
            try {
                const res = await axios.get(`${api_Url}/user/getDetails`, {
                    params: { id }
                })
                setdata(res.data)
                alert(ok)
            } catch (error) {
                console.log(error.response.data)
                alert(error.response.data)
            }
        }
        getdetails()
    }, [id])
    const handleCall = () => {
        window.location.href = `tel:${data?.driverId?.Mobile}`;
    };
    const navigate = useNavigate()
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/");

        const date = new Date(`${year}-${month}-${day}`);

        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }
    return (
        <div className='UserRideDetail'>
            <p className='text-success  text-capitalize' onClick={() => { navigate('/userDashBoard') }}>
                <IoIosArrowRoundBack fill=' green' />
                back to ride</p>
            {data && (
                <div className=' d-flex flex-column flex-lg-row '>
                    <div className='RideInfo d-flex flex-column  px-2'>
                        <div className='d-flex justify-content-between my-1  ' >
                            <span className='head'>Ride Detail</span>
                            <span className=' tick d-flex justify-content-center align-items-center text-capitalize text-success ' >
                                <TiTick fill='green' />
                                {data.Status}
                            </span>

                        </div>
                        <div className='d-flex flex-column uu'>
                            <div className='  pickDrop  d-flex flex-column justify-content-between'>
                                <div className='d-flex flex-column position-relative'>
                                    <span className='pick'></span>
                                    <small>Pick Up Location</small>
                                    <span className='text-capitalize'>{data.pickup}</span>
                                </div>
                                <div className='d-flex flex-column position-relative'>
                                    <span className='drop'></span>
                                    <small>Drop Location</small>
                                    <span className='text-capitalize'> {data.drop}</span>
                                </div>
                            </div>
                            <div>
                                <hr className='mx-4' />

                            </div>
                            <div className='timeDateBox'>

                                <div className='timeDate'>
                                    <div>
                                        <HiOutlineCalendarDateRange />

                                    </div>
                                    <div className=' d-flex flex-column'>
                                        <small>
                                            Date
                                        </small>
                                        <span> {formatDate(data.date)}</span>
                                    </div>
                                </div>
                                <div className='timeDate'>
                                    <div>
                                        <IoMdTime />
                                    </div>
                                    <div className=' d-flex flex-column'>
                                        <small>Time</small>

                                        <span>{data.time}</span>

                                    </div>
                                </div>
                                <div className='timeDate'>
                                    <div>
                                        <IoPricetagOutline />
                                    </div>
                                    <div className=' d-flex flex-column'>
                                        <small>Nearest Station</small>
                                        <span>{data.NearestStation}</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=' driverInfo pt-3 px-2'>

                        <div className='driverInfoBox d-flex flex-column gap-1 pb-3'>
                            <h5>Driver Details</h5>

                            <div className=' d-flex gap-3 '>
                                <div className='h-50'>
                                    <img src={data.driverId?.profileImage} alt="" />

                                </div>
                                <div className='h-50 d-flex flex-column gap-3'>
                                    <h3>{data.driverId?.Name}</h3>
                                    <div className=' d-flex align-items-center gap-2'>
                                        <FaRegStar  fill='gold' className='star' />
                                        <span>4.5</span>
                                    </div>
                                    <div className=' d-flex align-items-center gap-2'>
                                        <IoCallOutline />
                                        <span>{data.driverId?.Mobile}</span>
                                    </div>
                                    <div className=' d-flex align-items-center gap-2'>
                                        <MdDirectionsCar />
                                        <span className=' text-uppercase'>{data.driverId?.vehicleNumber}</span>

                                    </div>

                                </div>
                            </div>
                            <div className=' d-flex align-items-center px-2 justify-content-center gap-2'>
                                <button onClick={handleCall} >Call Driver </button>
                            </div>
                        </div>
                    </div>

                    {/* populated driver */}

                </div>
            )}
        </div>
    )
}

export default UserRideDetail