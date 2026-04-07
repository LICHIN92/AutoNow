import React from 'react'
import './confirm.css'
import { Button } from 'react-bootstrap'
import { CiWarning } from 'react-icons/ci'
const ConfirmModal = ({ msg, close, fun }) => {
    return (
        <div className='ConfirmMo'>

            <div className='modalConatiner'>
                <div className=' d-flex justify-content-center'>
                    <CiWarning fill='red' size={30} />

                </div>
                <h4 className='text-center'> Cancel Ride?</h4>
                <p className='text-center'>Are you sure you want to cancel this ride?</p>
                <p className='text-center'>This action cannot be undone.</p>
                <div className='d-flex justify-content-evenly pt-1' >
                    <Button onClick={() => { close(false) }} style={{ backgroundColor: 'wheat', color: "black", border: 'none' }} >
                        No,Go back
                    </Button>
                    <Button onClick={()=>{fun()}} style={{ backgroundColor: '#EB312F', color: "white", border: 'none' }}>
                        Yes,Cancel Ride
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal