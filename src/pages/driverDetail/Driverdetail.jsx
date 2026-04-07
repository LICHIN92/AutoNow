import React from 'react'
import './driverdetail.css'
const Driverdetail = ({ data, close }) => {
    // alert(data.Name)
    return (
        <div className='Driverdetail'>

            <div className='detail_Box py-4'>
                <div className='py-2 d-flex flex-column align-items-center'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/7/7d/Retro_audio_launch_-_Suriya.jpg' alt="driver_image" />
                    <h4 >{data.Name}</h4>
                </div>
                <div className=' text-white d-flex flex-column align-items-center justify-content-center'>
                    <p>Mobile: <b>{data.Mobile}</b></p>
                    <p>License: <b>{data.licenseNumber}</b></p>
                    <p>Vehicle Number: <b>{data.vehicleNumber}</b></p>
                    <p>Vehicle Type: <b className=' text-capitalize'>{data.vehicleType}</b></p>
                </div>
                <div className='text-center text-danger'>
                    <span className='p-2 border-1 bg-dark-subtle rounded-2' style={{ cursor: 'pointer' }} onClick={() => close(false)}>
                        close</span>
                </div>
            </div>
        </div>
    )
}

export default Driverdetail