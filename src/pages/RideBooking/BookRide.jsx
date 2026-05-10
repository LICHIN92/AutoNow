import React, { useEffect, useRef, useState } from 'react'
import Input from '../../Components/Input/Input'
import './RideBooking.css'
import Map from '../../Components/Map/Map'
import Buttunn from '../../Components/Button/Buttunn'
import DatePicker from 'react-datepicker'
import { FaCalendarDay } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { IoMdTimer } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import Allert from '../../Components/Alert/Allert'
const BookRide = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const dateRef = useRef(null);
    const timeRef = useRef(null);
    const api_url = import.meta.env.VITE_API_URL
    const user = useSelector((state) => state.user.user)
    const [stands, setStands] = useState([])
    const [selectedStand, setSelectedStand] = useState("");
    const [openalert, Setopenalert] = useState(false)
    const [msg, setmsg] = useState('')
    // console.log(user);
    const navigate = useNavigate()
    const Opencalender = () => {
        dateRef.current?.setOpen(true);
    };

    const OpenTimeSlot = () => {
        timeRef.current?.setOpen(true);
    };
    const { register, handleSubmit, formState: { errors } } = useForm()
    useEffect(() => {
        const getstand = async () => {
            try {
                const res = await axios.get(`${api_url}/ride/getStand`)
                console.log(res.data);
                setStands(res.data)

            } catch (error) {
                console.log(error);
            }
        }
        getstand()
    }, [])
    const filterPassedTime = (time) => {
        const now = new Date();

        // If no date selected → allow all
        if (!selectedDate) {
            return true;
        }

        const selectedDay = selectedDate.toDateString();
        const today = now.toDateString();

        // Only filter if today is selected
        if (selectedDay === today) {
            // 🔥 Combine selected date + time
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(time.getHours());
            selectedDateTime.setMinutes(time.getMinutes());
            selectedDateTime.setSeconds(0);
            selectedDateTime.setMilliseconds(0);

            return selectedDateTime > now;
        }

        return true;
    };

    const RideBook = async (data) => {
        if (!selectedStand) {
            return alert('Please select Nearest stand')
        }
        if (!selectedDate) {
            return alert('Please select Date')
        }
        if (!selectedTime) {
            return alert('Please select Time')
        }
        const token = localStorage.getItem('autoNowToken')
        if (!token) {
            return navigate('/signin')
        }
        // alert(data.date);
        // Format Date → dd/mm/yyyy
        const formattedDate = selectedDate
            ? selectedDate.toLocaleDateString('en-GB')
            : '';

        // Format Time → hh:mm
        const formattedTime = selectedTime
            ? selectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, // change to true if you want AM/PM
            })
            : '';
        data.date = formattedDate,
            data.time = formattedTime,
            data.userId = user.id,
            data.nearStand = selectedStand

        try {
            const res = await axios.post(`${api_url}/ride`, data)
            alert(res.data)
            navigate('/userDashBoard')

        } catch (error) {
            console.log(error);
            alert(error.response.data)
            // navigate('/userDashBoard')

        }
    }
    return (
        <div className=' RideBooking container-fluid'>



            <div className='row'>

                <div className='col-lg-6 py-4 bg-success d-flex flex-column justify-content-center align-items-center'>
                    <h1>Book Ride</h1>

                    <form className='col-lg-6' onSubmit={handleSubmit(RideBook)}>
                        <Input label={'Pick-up Location'} name={'pickup'}
                            register={register}
                            errors={errors}
                            rules={{ required: "pick-Up required" }}
                        />
                        <Input label={'Drop-Off Location'}
                            name={'drop'} register={register}
                            errors={errors}
                            rules={{ required: "drop-off Location is required" }}
                        />
                        <div className="nearestStand mb-2 d-flex flex-column">
                            <label htmlFor="std" className=' text-white'>Nearest Auto Stand</label>
                            <select id='std'
                                value={selectedStand}
                                onChange={(e) => setSelectedStand(e.target.value)}
                            >
                                <option className='default ' >Select Stand</option>
                                {stands.map((stand, index) => (
                                    <option key={index} value={stand.StandName}>
                                        {stand.StandName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className=' d-flex flex-column gap-1 text-white'>
                            <label htmlFor="">
                                <span><FaCalendarDay style={{ marginRight: "8px" }} />
                                    Pick-Up Date</span>
                            </label>
                            <input className='dateTime ps-1'
                                type="text"
                                readOnly
                                value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                                onClick={Opencalender}
                                placeholder='mm/dd/yyyy'
                            />

                        </div>
                        {/* ✅ Date Picker */}
                        <div className="  dateConstianer">
                            <DatePicker
                                ref={dateRef}
                                selected={selectedDate}
                                // a onChange={(date) => setSelectedDate(date)}

                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setSelectedTime(null); // reset time when date changes
                                }}

                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                            />
                        </div>

                        {selectedDate &&
                            <div className='timeSlot d-flex flex-column'>
                                <label htmlFor="" style={{ color: 'white' }}><IoMdTimer color='white' size={20} style={{ marginBottom: "4px", marginRight: "8px" }} />
                                    Pick-Up Time</label>
                                <input className='dateTime ps-1'
                                    type="text"
                                    readOnly
                                    value={selectedTime ? selectedTime.toLocaleTimeString('en-US', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    }) : ""}
                                    onClick={() => setIsTimeOpen(true)}
                                    placeholder='select Time'
                                />
                                <div className='timeSlot position-relative'>
                                    <DatePicker
                                        selected={selectedTime}
                                        onChange={(time) => {
                                            setSelectedTime(time);
                                            setIsTimeOpen(false);
                                        }}
                                        open={isTimeOpen}
                                        onClickOutside={() => setIsTimeOpen(false)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        dateFormat="h:mm aa"
                                        filterTime={filterPassedTime}
                                        // Time range
                                        minTime={new Date().setHours(5, 15)}
                                        maxTime={new Date().setHours(22, 30)}
                                    />

                                </div>
                            </div>}

                        <div className='btn_box mb-2'>
                            <Buttunn value={'Book'} type={'submit'} bgcolor={'black'} />

                        </div>
                    </form>
                </div>
                <div className='mapdiv col-lg-6'>
                    <Map />

                </div>
            </div>
        </div>
    )
}

export default BookRide