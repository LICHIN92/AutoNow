import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../Components/Input/Input'
import axios from 'axios'
import Buttunn from '../../Components/Button/Buttunn'
import { data, useNavigate } from 'react-router-dom'
import reducfunction from '../../redux/reduxfun'
import { useDispatch } from 'react-redux'

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const api_url = import.meta.env.VITE_API_URL
    const api_url = import.meta.env.VITE_API_URL
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const signupfun = async (data) => {
        try {
            const res = await axios.post(`${api_url}/user/signIn`, data)
            console.log(res.data)
            alert(res.data.message)
            localStorage.setItem('autoNowToken', res.data.token)
            reducfunction(res.data.token, dispatch)
          navigate('/userDashBoard')

        } catch (error) {
            console.log(error)
            // alert(error.response.data)
        }
    }
    return (
        <div>
            <h1 className='text-center text-capitalize mb-4'>Sign In</h1>
            <form className=' d-flex flex-column align-items-center  justify-content-center' onSubmit={handleSubmit(signupfun)}>
                <Input
                    label="Mobile"
                    type="text"
                    name="Mobile"
                    register={register}
                    errors={errors}
                    rules={{ required: "Mobile is required" }}
                />
                <Input
                    label="Password"
                    type="password"
                    name="Password"
                    register={register}
                    errors={errors}
                    rules={{ required: "Password is required" }}
                />
                <Buttunn name={'submit'} value={'Sign In'} type={'submit'} />
            </form>
        </div>
    )
}

export default SignUp