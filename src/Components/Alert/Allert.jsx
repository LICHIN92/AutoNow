import React from 'react'
import './allert.css'
import { TiTick } from 'react-icons/ti'
const Allert = ({ msg,msg2,fill }) => {
    return (
        <div className='Allert'>

            <div className='AllertBox gap-2'>
                <div className=' h-50 d-flex align-items-center gap-1'>
                    <TiTick fill={fill} size={23} width={40} />
                    <span>{msg}</span>
                </div>
                <div className=' h-50 d-flex align-items-center gap-1'>
                    <p>{msg2}</p>
                </div>
            </div>
        </div>
    )
}

export default Allert