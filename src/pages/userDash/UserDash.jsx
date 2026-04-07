import React, { useEffect, useState } from 'react'
import './usedash.css'
import { useSelector } from 'react-redux'
import { TbCurrentLocationFilled } from 'react-icons/tb'
import { ImLocation2 } from 'react-icons/im'
import axios from 'axios'
import ConfirmModal from '../../Components/cofirmModal/ConfirmModal'
const UserDash = () => {

    const user = useSelector((state) => state.user?.user)
    console.log(user);
    const id = user.id
    const api_Url = import.meta.env.VITE_API_URL
    const [ride, setRide] = useState([])
    const [cancel, setCancel] = useState(false)
    const [Id, setId] = useState(null)
    useEffect(() => {
        const myride = async () => {
            try {
                const res = await axios.get(`${api_Url}/user/getMyride/${id}`)
                setRide(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        myride()
    }, [Id,cancel])
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
    return (
        <div className='userdash'>
            {cancel &&
                <ConfirmModal close={setCancel} fun={cancelRide} />
            }

            <div className='userHead w-100'>
                <p >
                    hello
                    <span>{user.Name}......!</span>
                </p>
            </div>
            <div className='rideContainer'>
                {ride.map((data, index) => (
                    <div className='ride '>
                        <div>
                            <span>
                                <TbCurrentLocationFilled fill='blue' markerEnd='2px' />
                                {data.pickup}
                            </span>
                            <span className='bg-success text-white'>
                                {data.date} {convertTo12Hour(data.time)}
                            </span>
                        </div>
                        <div>
                            <span>
                                <ImLocation2 fill='#C02C26' />
                                {data.drop}
                            </span>
                        </div>

                        {data.status == 'accepted' ?
                            <div className='breadcrumb'>
                                {data.status}
                            </div> :
                            <div className='cancel'>
                                <span onClick={() => { setId(data._id), setCancel(true) }}>
                                    Cancel
                                </span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserDash