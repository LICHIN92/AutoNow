import React, { useState } from 'react'
import './confirm.css'
import { Button } from 'react-bootstrap'
import { CiWarning } from 'react-icons/ci'
const ConfirmModal = ({ msg, close, fun }) => {
    const [clicked, setClicked] = useState(false)
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
                    
                    {!clicked ?
                        <Button onClick={() => { setClicked(true), fun() }} style={{ backgroundColor: '#EB312F', color: "white", border: 'none' }}>
                            Yes,Cancel Ride
                        </Button>
                        :
                        <Button className='d-flex align-items-center gap-3' style={{ backgroundColor: '#EB312F', color: "white", border: 'none' }}>
                            <div>
                                Please wait
                            </div>
                            <div class="spinner-border" role="status">
                            </div>
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal