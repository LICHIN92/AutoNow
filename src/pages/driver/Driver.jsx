import React, { useState } from 'react'
import Input from '../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import Buttunn from '../../Components/Button/Buttunn'
import './diver.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import driveRedux from '../../redux/driverReduxfun'
import { useDispatch } from 'react-redux'
// import driver from '../../assets/image/ChatGPT Image Mar 25, 2026, 11_37_13 AM.png'
const Driver = () => {
    const api_Url = import.meta.env.VITE_API_URL
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [login, setlogin] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registerSubmit = async (data) => {
        try {
            const res = await axios.post(`${api_Url}/driver`, data)
            console.log(res.data);
            alert(res.data)
        } catch (error) {
            console.log(error.response.data);

        }
    }
    const toggleLogin = () => {
        setlogin(!login)
        reset()
    }
    const LoginSubmit = async (data) => {
        try {
            const res = await axios.post(`${api_Url}/driver/login`, data)
            console.log(res.data.token);
            alert(res.data.message)
            await localStorage.setItem('sarathi', res.data.token)
            driveRedux(res.data.token, dispatch)
            navigate('/driverHome')
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }
    }
    return (
        <div className='driver d-flex flex-column justify-content-center align-items-center'>
            <div className='register_login '>
                {
                    login ?
                        <div className='reg ' onClick={() => { toggleLogin() }}>
                            Register
                        </div>
                        :
                        <div className='logg mb-2' onClick={() => { toggleLogin() }} >
                            Driver Login
                        </div>
                }
            </div>
            <div
                className='d-flex flex-lg-row flex-column form_container '>
                <div className={login ? "formLogin" : "formDiv"}>
                    <form onSubmit={handleSubmit(login ? LoginSubmit : registerSubmit)} >
                        <h2 className=' text-center'>Driver {login ? 'Login' : 'Registration'}</h2>
                        {
                            !login ?
                                <>
                                    <Input name={'Name'} label={'Name'} rules={{ required: 'Name is required' }}
                                        type={'text'} register={register} />
                                    <Input name={'Mobile'} label={'Mobile'} rules={{ required: 'Moile is required' }}
                                        type={'text'} register={register} />
                                    <Input name={'vehicleNumber'} rules={{ required: 'Vehicle is required' }}
                                        label={'Vehicle Number'}
                                        type={'text'} register={register} />
                                    <Input name={'licenceNumber'} rules={{ required: 'Licence Number is required' }}
                                        label={'Licence Number'}
                                        type={'text'} register={register} />
                                    <Input name={'vehicleType'} label={'Vehicle Type'} rules={{ required: 'Vehicle Number is required' }}
                                        type={'text'} register={register} />
                                    <Input label={"Password"} type={'Password'} rules={{ required: 'Password is required' }}
                                        name={'password'} register={register} />
                                    <Input label={'Confirm Password'} type={'password'} rules={{ required: 'confirm Password is required' }}
                                        name={'confirmPassword'} register={register} />
                                </>
                                :
                                <>
                                    <Input name={'vehicleNumber'}
                                        label={'Vehicle Number'} rules={{ required: 'enter vehicle number' }}
                                        type={'text'} register={register} />
                                    <Input label={"Password"} name={'password'} type={'password'} rules={{ required: 'enter your password' }}
                                        register={register} />
                                </>
                        }
                        <div className="d-flex justify-content-center">
                            <Buttunn value={login ? 'Login' : 'register'} type={'submit'} />

                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Driver