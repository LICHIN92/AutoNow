import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../Components/Input/Input'
import axios from 'axios'
import Buttunn from '../../Components/Button/Buttunn'
import { data, useNavigate } from 'react-router-dom'
import reducfunction from '../../redux/reduxfun'
import { useDispatch, useSelector } from 'react-redux'
import auto from '../../assets/image/auto.png'
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const api_url = import.meta.env.VITE_API_URL
    const api_url = import.meta.env.VITE_API_URL
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user?.user)
    useEffect(() => {
        if (user?.Role) {
            navigate('/admin')
        } else if (user) {
            navigate('/userDashBoard')
        }
    }, [user])
    const signupfun = async (data) => {
        try {
            const res = await axios.post(`${api_url}/user/signIn`, data)
            console.log(res.data)
            alert(res.data.message)
            localStorage.setItem('autoNowToken', res.data.token)
            reducfunction(res.data.token, dispatch)
            // if (user.Role) {
            //     return navigate('/admin')
            // }
            // return navigate('/userDashBoard')

        } catch (error) {
            console.log(error)
            // alert(error.response.data)
        }
    }
    return (
        <div className='signup'>
            <div className='signupDiv'>
                <div className=' d-flex justify-content-center gap-1 align-items-center'>
                    <img src={auto} alt="" />
                    <h1 className='text-center text-capitalize mb-3'>Sign In</h1>
                </div>

                <form onSubmit={handleSubmit(signupfun)}>
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
                    <div className=' d-flex justify-content-center'>
                        <Buttunn name={'submit'} value={'Sign In'} type={'submit'} />

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp