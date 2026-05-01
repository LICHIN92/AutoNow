import React from 'react'
import Input from '../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import Buttunn from '../../Components/Button/Buttunn'
import axios from 'axios'
import './signin.css'
import reducfunction from '../../redux/reduxfun'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import auto from '../../assets/image/auto.png'
const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const api_url = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const Signup = async (data) => {
    // alert(VITE_API_URL)
    try {
      const res = await axios.post(`${api_url}/user`, data)
      console.log(res.data.message)
      alert(res.data.message)
      localStorage.setItem('autoNowToken', res.data.token)

      reducfunction(res.data.token, dispatch)
      navigate('/userDashBoard')

    } catch (error) {
      console.log(error.response);
      alert(error.response.data)
    }
  }
  return (
    <div className='signin '>
      <div className='signinDiv'>
        <div className='d-flex justify-content-center gap-1'>
          <img src={auto} alt="" className='mt-1' />
          <h1 className=' text-center mb-4 text-capitalize'>Sign up</h1>
        </div>
        <form onSubmit={handleSubmit(Signup)}>
          <Input
            label="Name"
            type="text"
            name="Name"
            register={register}
            errors={errors}
            rules={{ required: "Name is required" }}
          />
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
          <Input
            label="Confirm Password"
            type="password"
            name="password"
            register={register}
            errors={errors}
            rules={{ required: "confirm Password is required" }}
          />
          <div className='d-flex justify-content-center'>
            <Buttunn name={'submit'} value={'Sign Up'} type={'submit'} />

          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin