import React from 'react'
import './AdminModal.css'
import { RiDeleteBinLine } from 'react-icons/ri'
const AdminModal = ({ close, fun, h4, p1, p2,par }) => {
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
                    <span onClick={() => {fun() }}>Yes</span>

                </div>
            </div>
        </div>
    )
}

export default AdminModal