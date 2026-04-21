import React, { useEffect, useState } from 'react'
import './DriverViewBook.css'
import axios from 'axios'
import { FaArrowDown } from 'react-icons/fa'
import ConfirmModal from '../../Components/cofirmModal/ConfirmModal'
import DriverConfirmModal from '../DriverConfirmModal/DriverConfirmModal'
const DriverViewBook = ({ id, close, refresh }) => {
    const api_url = import.meta.env.VITE_API_URL
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [driverModal, setDriverModal] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                const getdata = await axios.get(`${api_url}/driver/getDetail`, {
                    params: { id: id } // ✅ correct format
                })
                console.log(getdata.data)
                setLoading(true)
                setData(getdata.data)
                // close(false)
            } catch (error) {
                console.log(error);

            }
        }
        fetch()
    }, [id, driverModal])
    const getRemainingHours = (time) => {
        if (!time) return
        let [hour, minute] = time.split(':').map(Number);

        let period = hour >= 12 ? 'PM' : 'AM';

        hour = hour % 12;
        hour = hour === 0 ? 12 : hour; // handle 0 -> 12

        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    };
    const formatDate = (dateStr) => {
        if (!dateStr) return "No Date";
        const [day, month, year] = dateStr.split('/');

        const date = new Date(`${year}-${month}-${day}`);

        const options = { day: '2-digit', month: 'long', year: 'numeric' };

        return date.toLocaleDateString('en-GB', options);
    };
    const token = localStorage.getItem('sarathi')
    const readyDrive = async () => {
        // alert('ready to drive')
        try {
            const res = await axios.patch(
                `${api_url}/driver/readyDrive`,
                {}, // body (empty if not needed)
                {
                    params: { id: id }, // query params go here,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            setDriverModal(false)
            console.log(res.data)
            refresh((prev) => !prev)
        } catch (error) {
            console.log(error)
            alert(error.response.data)
            setDriverModal(false)
            close(false)
        }
    }
    return (
        <div className='DriverViewBook d-flex justify-content-center align-items-center'>
            {driverModal &&
                <DriverConfirmModal msg_head={'Confirm Ride!'} fun={readyDrive} data={data}
                    msg={'Are you ready for this ride?'} close={setDriverModal} />}
            {loading ?
                <>
                    {data &&
                        <div>
                            <div className='box '>
                                <div className="folded-rectangle">
                                    <p className='text-center text-capitalize fw-bolder'>{data.pickup}</p>
                                    <p className='text-center'> <FaArrowDown /> </p>
                                    <p className='text-center text-capitalize fw-bolder'>{data.drop}</p>
                                    <div className="breadcrumb">
                                        <p>{formatDate(data?.date)} <span>{getRemainingHours(data.time)}</span> </p>

                                    </div>
                                </div>

                                {
                                    (data.Status === 'accepted' || data.Status === 'ongoing') && (
                                        <div>
                                            Booked By
                                            <p>{data.userId?.Name}</p>
                                            <p>{data.userId?.Mobile}</p>
                                        </div>
                                    )
                                }
                                {data.Status === 'pending' &&
                                    <button className='px-2 mb-2' onClick={() => { setDriverModal(true) }}>
                                        Yes! I'm Ready
                                    </button>
                                }
                                <button className='px-2' onClick={() => { close(false), refresh(!prev) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>

                    }
                </>
                : 'Loading'
            }
        </div>
    )
}

export default DriverViewBook