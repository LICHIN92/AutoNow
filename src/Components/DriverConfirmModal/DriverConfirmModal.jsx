import React, { useState } from 'react'
import './drivermodal.css'
import { FaArrowRight } from 'react-icons/fa'
import { Button } from 'react-bootstrap';
const DriverConfirmModal = ({ msg_head, close, fun, msg, data, refresh }) => {
  const getRemainingHours = (time) => {
    if (!time) return
    let [hour, minute] = time.split(':').map(Number);

    let period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // handle 0 -> 12

    return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
  };
  const [clicked, setClicked] = useState(false)
  return (
    <div className='drivermodal'>

      <div className='modal_Box'>
        <h2>{msg_head}</h2>
        <hr />
        <p className='text-capitalize fw-semibold'>{data.pickup} <FaArrowRight /> {data.drop}</p>
        <span className='bg-danger-subtle fw-semibold  px-2 py-1'>{getRemainingHours(data.time)}</span>
        <p className='mt-1'>{msg}</p>
        <div>
          <button onClick={() => { close(false) }}>Cancel</button>
          {clicked ?
            <Button className='d-flex align-items-center gap-2' style={{ backgroundColor: 'darkred', color: "white", border: 'none' }}>
              wait
              <div class="spinner-border" role="status">
              </div>
            </Button>
            :
            <button onClick={() => {setClicked(true), fun() }}>yes</button>}
        </div>
      </div>
    </div>
  )
}

export default DriverConfirmModal