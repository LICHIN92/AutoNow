import React, { useState } from 'react'
import './edit.css'
import Input from '../Input/Input'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Edits = ({ data, close }) => {
    const { register, reset, handleSubmit } = useForm()
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('autoNowToken')
    const navigate = useNavigate()
    const [clicked, SetClicked] = useState(false)
    const EditSubmit = async (datas) => {
        if(clicked){
            return
        }
        try {
            SetClicked(true)
            const res = await axios.patch(`${api_url}/admin/editDriverData/${data._id}`, datas, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/pendingDriver', { replace: true })
        } catch (error) {

        }
    }
    return (
        <div className='Edits'>
            <div className='formContainer'>
                <div>
                    <h4>Edit Driver Data</h4>
                    <form onSubmit={handleSubmit(EditSubmit)}>
                        <div>
                            <small htmlFor="">Name</small>
                            <input type="text" {...register('Name')} defaultValue={data.Name} />
                        </div>
                        <div>
                            <small htmlFor="">Mobile</small>
                            <input type="Number" {...register('Mobile')} maxLength={10} defaultValue={data.Mobile} />
                        </div>
                        <div>
                            <small htmlFor="">Vehicle Number</small>
                            <input type="text" {...register('vehicleNumber')} defaultValue={data.vehicleNumber} />
                        </div>
                        <div>
                            <small htmlFor="">License Number</small>
                            <input type="text" {...register('licenseNumber')} defaultValue={data.licenseNumber} />
                        </div>
                        <div>
                            <small htmlFor="">Stand</small>
                            <input type="text" {...register('stand')} defaultValue={data.stand} />
                        </div>
                        <div>
                            <small htmlFor="">Vehicle Type</small>
                            <input type="text" {...register('vehicletype')} defaultValue={data.vehicleType} />
                        </div>
                        <div className='mb-2 d-flex gap-3 mt-1 flex-row justify-content-center'>
                            {clicked ?
                                <button className='disabled'>Wait</button>
                                : <button type='submit'> Edit</button>}
                            <button onClick={() => { close(false) }}>Cancel</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Edits