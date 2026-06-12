import React from 'react'
import Input from '../Input/Input'
import './ForgotPassword.css'
import Buttunn from '../Button/Buttunn'
import bg from '../../assets/image/Gemini_Generated_Image_sowcslsowcslsowc.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const api_url = import.meta.env.VITE_API_URL
  const password = watch("Password");
  const mobile = watch("Mobile");
  const naviagte = useNavigate()
  const ChangePassword = async (data) => {
    if (data.Password != data.NewPassword) {
      alert('confirmPassword must be Password')
      return

    } if (data.Password.length < 6) {
      alert('Password Length must be atleast 6')
      return
    }
    try {
      const res = await axios.patch(`${api_url}/user/forgotpassword`, data)
      alert(res.data)
      naviagte('/signin')


    } catch (error) {
      // console.log(error);

    }
  }
  return (
    <div style={{ backgroundImage: `url(${bg})` }} className='ForgotPassword '>

      <h3 className=''>Forgot Password</h3>

      <form onSubmit={handleSubmit(ChangePassword)} >
        <Input
          name="Mobile"
          register={register}
          label="Enter Your Mobile"
          type="Number"
          validation={{
            // required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit mobile number"
            }
          }}
        />

        {errors.Mobile && (
          <p style={{ color: "red" }}>
            {errors.Mobile.message}
          </p>
        )}
        <Input name={'Password'} register={register} type={'password'} label={'New Password'} />
        <Input name={'NewPassword'} label={'Confirm New Password'} type={'password'}
          register={(name) =>
            register(name, {
              validate: (value) =>
                value === password || "Passwords do not match"
            })
          }
        />
        {errors.NewPassword && (
          <p style={{ color: "red" }}>
            {errors.NewPassword.message}
          </p>
        )}
        <div className='d-flex justify-content-center'>
          <Buttunn name={'Change Password'} type={'submit'} value={'Change Password'} />
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword