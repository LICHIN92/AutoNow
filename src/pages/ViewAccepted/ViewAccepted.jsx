import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './ViewAccepted.css'
import axios from 'axios'
import { AiOutlineUser } from 'react-icons/ai'
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import { HiOutlineCalendarDateRange } from 'react-icons/hi2'
import { MdAccessTime } from 'react-icons/md'
import auto from '../../assets/image/auto.png'
const ViewAccepted = ({ refresh }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const ride = location.state?.ride
    const api_url = import.meta.env.VITE_API_URL
    useEffect(() => {
        if (ride.length <= 0) {
            navigate('/driverhome')
        }
    }, [ride])
    const [ok, setOk] = useState(false)
    const getRemainingHours = (time) => {
        if (!time) return
        let [hour, minute] = time.split(':').map(Number);

        let period = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // handle 0 -> 12

        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    };
    const finishFun = async () => {
        const token = localStorage.getItem('sarathi')
        try {
            const res = await axios.patch(`${api_url}/driver/finishRide/${ride[0]._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setOk(true)
            setTimeout(() => {
                navigate('/driverhome')
                refresh((prev) => !prev)


            }, 1500);
        } catch (error) {
            console.log(error)
            alert(error.response.date)
        }
    }
    return (
        <div className='ViewAccepted '>
            <div className='ViewAcceptedBox'>
                <div className='imgBox'>
                    <img src={auto} alt="sss" />
                </div>
                <div className='infoBox'>
                    <h4 className='text-text-center'><span className='under'>Ride</span> Info</h4>
                    <div className=' d-flex flex-column gap-2 gap-lg-3 '>
                        <div className='d-flex align-items-center  gap-2'>
                            <span className='d-flex align-items-center'>
                                <AiOutlineUser fill='green' className='icons' />

                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Name
                                </span>
                                <span className='text-uppercase'> {ride[0]?.userId.Name}</span>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <span className='d-flex align-items-center'>
                                <IoCallOutline fill='green' className='icons' />

                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Mobile

                                </span>
                                <span>
                                    {ride[0]?.userId.Mobile}
                                </span>

                            </div>

                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <span>
                                <IoLocationOutline className='icons' />
                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Pick up Place

                                </span>
                                <span className='text-capitalize'>  {ride[0]?.pickup} </span>
                            </div>
                        </div>

                        <div className='d-flex align-items-center gap-2'>
                            <span>
                                <IoLocationOutline className='icons' />
                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Drop Place

                                </span>
                                <span className='text-capitalize'>{ride[0]?.drop}</span>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <span>
                                <HiOutlineCalendarDateRange className='icons' />
                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Date

                                </span>
                                <div className='dd'>  <span>{ride[0]?.date}</span> </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <span>
                                <MdAccessTime className='icons' />
                            </span>
                            <div className='d-flex flex-column flex-md-row justify-content-between w-100'>
                                <span>
                                    Time

                                </span>
                                <div className='dd'>  {getRemainingHours(ride[0]?.time)}  </div>

                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-center '>
                        {ok ?
                            <button className='finishButton' >Ride Finished</button>
                            :
                            <button className='finishButton' onClick={() => { finishFun() }}>Finsh Ride</button>
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ViewAccepted