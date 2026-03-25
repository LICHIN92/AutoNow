import React from 'react'
import Input from '../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import Buttunn from '../../Components/Button/Buttunn'
import './diver.css'
import axios from 'axios'
import driver from '../../assets/image/ChatGPT Image Mar 25, 2026, 11_37_13 AM.png'
const Driver = () => {
    const api_Url = import.meta.env.VITE_API_URL
    const { register, handleSubmit, formState: { errors } } = useForm()
    const registerSubmit = async (data) => {
        try {
            const res = await axios.post(`${api_Url}/driver`, data)
            console.log(res.data);

        } catch (error) {
            console.log(error.response.data);

        }
    }
    return (
        <div className='driver d-flex justify-content-center align-items-center'>
            <div
                className='d-flex flex-lg-row flex-column form_container '>
                <div className="formDiv">
                    <form onSubmit={handleSubmit(registerSubmit)} >
                        <h2 className=' text-center'>Driver Registration</h2>
                        <Input name={'Name'} label={'Name'} type={'text'} register={register} />
                        <Input name={'Mobile'} label={'Mobile'} type={'text'} register={register} />
                        <Input name={'vehicleNumber'}
                            label={'Vehicle Number'}
                            type={'text'} register={register} />
                        <Input name={'vehicleType'} label={'Vehicle Type'} type={'text'} register={register} />
                        <Input label={"Password"} name={'password'} register={register} />
                        <Input label={'Confirm Password'} name={'confirmPassword'} register={register} />
                        <Buttunn value={'register'} type={'submit'} />
                    </form>
                </div>
                
            </div>

        </div>
    )
}

export default Driver