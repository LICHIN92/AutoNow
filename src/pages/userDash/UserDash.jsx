import React, { useEffect, useState } from 'react'
import './usedash.css'
import { useDispatch, useSelector } from 'react-redux'
import { TbCurrentLocationFilled } from 'react-icons/tb'
import { ImLocation2 } from 'react-icons/im'
import axios from 'axios'
import ConfirmModal from '../../Components/cofirmModal/ConfirmModal'
import { FaUserAlt } from 'react-icons/fa'
import { clearUserData } from '../../redux/useSlice'
import { useNavigate } from 'react-router-dom'
import { IoIosLogOut } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
const UserDash = () => {

    const user = useSelector((state) => state.user?.user)
    // console.log(user);
    const id = user?.id
    const api_Url = import.meta.env.VITE_API_URL
    const [ride, setRide] = useState([])
    const [cancel, setCancel] = useState(false)
    const [Id, setId] = useState(null)
    const [Ride_Id, setRide_Id] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!id) {
            return
        }
        const myride = async () => {
            try {
                const res = await axios.get(`${api_Url}/user/getMyride/${id}`)
                setRide(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        myride()
    }, [Id, cancel])
    const cancelRide = async () => {
        try {
            const res = await axios.delete(`${api_Url}/user/cancel/${Id}`)
            setCancel(false)
            alert(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const convertTo12Hour = (time) => {
        let [hours, minutes] = time.split(':');

        hours = parseInt(hours);

        let ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 → 12

        return `${hours}:${minutes} ${ampm}`;
    };
    const Logout = async () => {
        localStorage.removeItem('autoNowToken')
        dispatch(clearUserData(user))
        navigate('/signin')
    }
    const UserRideDetailFunction = (id) => {
        // alert(id)
        setRide_Id(id);
        navigate(`/UserRideDetail/${id}`);
    }
    return (
        <div className='userdash'>
            {cancel &&
                <ConfirmModal close={setCancel} fun={cancelRide} />
            }

            <div className='userHead w-100'>
                <div className='d-flex align-items-cente '>
                    <div className='userIcon '>
                        <FaUserAlt fill='green' className='user' />
                    </div>

                    <div className='userName d-flex  flex-column ms-1'>
                        <div className='d-flex flex-wrap justify-content-lg-start nameHello align-items-center'>

                            <span className=''> hello</span>
                            <span className='text-success'>{user?.Name}! &#128075;</span>
                        </div>
                        <span className='welcome mb-1'>
                            Welcome back your dashborad
                        </span>
                    </div>
                </div>
                <div className='d-flex align-items-center gap-2 logout'>
                    <IoIosLogOut fill='red' onClick={() => { Logout() }} />
                    <span onClick={() => { Logout() }}>Log Out</span>
                </div>
            </div>
            <div className='rideContainer'>
                <p className=' text-capitalize fw-bold'>
                    <span className='your'>Your</span> current ride
                </p>
                <div className='w-100  d-flex flex-wrap gap-2'>
                    {ride.map((data, index) => (
                        <div className=' info'>
                            <div className="timeline">
                                <div className="item">
                                    <div>
                                        <span>
                                            <TbCurrentLocationFilled className="icon pickup" markerEnd='2px' />

                                        </span>
                                        <span className='fields text-success'>
                                            Pick up Location
                                        </span>
                                        <p>
                                            {data.pickup}
                                        </p>
                                    </div>
                                    <span className='bg-success text-white'>
                                        {data.date} {convertTo12Hour(data.time)}
                                    </span>
                                </div>
                                <div className="item">
                                    <div>
                                        <span>
                                            <ImLocation2 className="icon drop" />
                                        </span>
                                        <span className='fields text-danger'>
                                            Drop off Location
                                        </span>
                                        <p>
                                            {data.drop}
                                        </p>
                                    </div>
                                </div>


                            </div>
                            {data.Status == 'accepted' ?
                                <div className='text-center  accepted text-capitalize'>
                                    <span onClick={() => { UserRideDetailFunction(data?._id) }} className=' border-light-subtle accept p-1'>
                                        your Ride is  {data.Status}

                                    </span>
                                </div> :
                                <div className='cancel'>

                                    <span className='cancelButton' onClick={() => { setId(data?._id), setCancel(true) }}>
                                        <RiDeleteBin5Line />
                                        <span>
                                        </span>
                                        Cancel

                                    </span>
                                </div>
                            }
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default UserDash