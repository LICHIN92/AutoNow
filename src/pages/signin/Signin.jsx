import React from 'react'
import Input from '../../Components/Input/Input'
import { useForm } from 'react-hook-form'
import Buttunn from '../../Components/Button/Buttunn'
import axios from 'axios'
import './signin.css'
import reducfunction from '../../redux/reduxfun'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
      navigate('/')

    } catch (error) {
      console.log(error.response);
      alert(error.response.data)
    }
  }
  return (
    <div className='signin '>
      <h1 className=' text-center mb-4 text-capitalize'>Sign up</h1>
      <form className=' d-flex flex-column align-items-center  justify-content-center' onSubmit={handleSubmit(Signup)}>
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
        <Buttunn name={'submit'} value={'Sign Up'} type={'submit'} />
      </form>
    </div>
  )
}

export default Signin