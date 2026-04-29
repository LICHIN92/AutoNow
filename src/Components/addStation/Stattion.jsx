import React from 'react'
import Input from '../../Components/Input/Input.jsx'
import Buttunn from '../../Components/Button/Buttunn.jsx'
import './station.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const Stattion = ({ close }) => {
    const { register, handleSubmit } = useForm()
    const api_url = import.meta.env.VITE_API_URL

    const addStand = async (data) => {
        try {
            const res = await axios.post(`${api_url}/admin`, data)
            alert(res.data)
            close(false)
            console.log(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='AddStation'>
            <div className='formdiv py-4'>
                <h4 className='text-center text-success my-3'>Add Stand</h4>
                <form onSubmit={handleSubmit(addStand)}>
                    <Input name={'standName'} label={'Stand Name'} register={register} rules={{required:'enter Stand Name'}} />
                    <div className='d-flex justify-content-center flex-wrap gap-1'>
                        <Buttunn value={'Add Station'} />
                        <button className='button' onClick={() => close(false)} >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Stattion