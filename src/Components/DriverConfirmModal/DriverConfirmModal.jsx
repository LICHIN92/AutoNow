import React from 'react'
import './drivermodal.css'
import { FaArrowRight } from 'react-icons/fa'
const DriverConfirmModal = ({msg_head,close,fun,msg,data,refresh}) => {
  return (
    <div className='drivermodal'>

        <div className='modal_Box'>
            <h2>{msg_head}</h2>
            <hr />
            <p className='text-capitalize'>{data.pickup} <FaArrowRight/> {data.drop}</p>
            <p >{msg}</p>
            <div>
                <button onClick={()=>{refresh((prev)=>!prev),close(false)}}>Cancel</button>
                <button onClick={()=>{fun()}}>yes</button>
            </div>
        </div>
    </div>
  )
}

export default DriverConfirmModal