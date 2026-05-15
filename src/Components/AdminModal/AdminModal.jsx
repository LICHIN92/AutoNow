import React, { useState } from 'react'
import './AdminModal.css'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Button } from 'react-bootstrap'
const AdminModal = ({ close, fun, h4, p1, p2, par }) => {
    const [clicked, setClicked] = useState(false)
    return (
        <div className='AdminModal'>
            <div className='AdminModalBox ' >
                <div className='firstBox '>
                    <div className='imgeBox my-1'>
                        <RiDeleteBinLine size={35} fill='blue' />

                    </div>
                    <div className='msgBox'>
                        <h4>{h4}</h4>
                        <span>{p1}</span>
                        <span>{p2}</span>
                    </div>
                </div>

                <div className='w-100 buttonBox'>
                    <span onClick={() => { close(false) }}>Cancel</span>
                    {clicked ?
                        <Button className='d-flex wait justify-content-center align-items-center gap-2'
                            style={{ backgroundColor: 'darkred', color: "white", border: 'none' }}>
                            wait
                            <div class="spinner-border" role="status">
                            </div>
                        </Button>
                        :
                        <span onClick={() => { setClicked(true), fun() }}>Yes</span>}

                </div>
            </div>
        </div>
    )
}

export default AdminModal