import React, { useRef, useState } from 'react'
import Input from '../../Components/Input/Input'
import './RideBooking.css'
import Map from '../../Components/Map/Map'
import Buttunn from '../../Components/Button/Buttunn'
import DatePicker from 'react-datepicker'
import { FaCalendarDay } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
const RideBooking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
const dateRef=useRef(null)
const Opencalender=()=>{
    dateRef.current.setOpen(true); // 👈 key line
}
  const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <div className=' RideBooking container-fluid'>
            <div className='row'>

                <div className='col-lg-6 bg-success d-flex justify-content-center align-items-center'>
                    <form className='col-lg-6'>
                        <Input label={'Pick-up Location'} name={'pickup'}  />
                        <Input label={'Drop-Off Location'} name={'drop'} />
                        <Input onclick={Opencalender}  register={register}
                            label={<span><FaCalendarDay style={{ marginRight: "8px" }}   />
                                Date</span>} 
                        />

                        {/* ✅ Date Picker */}
                        <div className="  dateConstianer">


                            <DatePicker ref={dateRef} 
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            //   showTimeSelect
                            //   dateFormat="Pp"
                            //   className="form-control"
                            //   minDate={new Date()}

                              filterTime={(time) => {
                                const now = new Date();

                                // If selected date is today
                                if (
                                  selectedDate &&
                                  selectedDate.toDateString() === now.toDateString()
                                ) {
                                  return time > now; // block past time
                                }

                                return true; // allow all time for future dates
                              }}
                            />
                        </div>
                        <div className='btn_box '>
                            <Buttunn value={'Book'} type={'submit'} bgcolor={'black'} />

                        </div>
                    </form>
                </div>
                <div className=' col-lg-6'>
                    <Map />

                </div>
            </div>
        </div>
    )
}

export default RideBooking