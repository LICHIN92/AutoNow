import React, { useEffect, useRef, useState } from 'react'
import { FcAddImage } from 'react-icons/fc';
import './add_img.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Buttunn from '../Button/Buttunn';
const AddProfile = ({ close }) => {
  const Imgref = useRef(null)
  const [preview, setPreview] = useState(null)
  const [file, setfile] = useState(null)
  const [open, setopen] = useState(false)
  const [stands, setStands] = useState([])
  const [selectedStand, setSelectedStand] = useState('')
  const api_Url = import.meta.env.VITE_API_URL
  const id = useSelector((state) => state.driver.driver.id)
  console.log(id);
  const token = localStorage.getItem('driver')
  useEffect(() => {
    const getstand = async () => {
      try {
        const res = await axios.get(`${api_Url}/ride/getStand`)
        console.log(res.data);
        setStands(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getstand()
  }, [])
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    const files = e.target.files[0]
    if (!files) {
      setfile(null)
      return
    }

    setfile(files)

    const previewUrl = URL.createObjectURL(files)
    setPreview(previewUrl)
  };

  const openfile = () => {
    Imgref.current.click()
  }

  const { register, handleSubmit } = useForm()
  const submit = async (data) => {
    data.stand = selectedStand,
      console.log(data);
    data.pic = file
    const formData = new FormData()

    formData.append("image", file)          // ✅ file
    formData.append("stand", selectedStand) // ✅ stand
    try {
      const res = await axios.patch(`${api_Url}/driver/addprofile`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        })
      close(false)
    } catch (error) {
      console.log(error);


    }
  }
  return (
    <div className=' add_img pt-5 d-flex justify-content-center align-items-center'>

      <div className='pt-5 d-flex flex-column justify-content-center align-items-center form_div'>
        <form onSubmit={handleSubmit(submit)}>
          <h4>Add Profile Image </h4>

          <div className="d-flex flex-wrap">
            <FcAddImage style={{ cursor: 'pointer' }} size={'40'} onClick={openfile} />

            <input ref={Imgref} style={{ display: 'none' }} type="file" onChange={handleChange}
              accept="image/png, image/jpeg, image/jpg" />
            {
              file &&
              <img style={{ width: '70px', height: '80px' }} src={preview} alt="" />
            }
          </div>

          <div className=' d-flex flex-column justify-content-center align-items-center h-auto w-100'>
            {/* <label htmlFor="">Add Stand</label> <br /> */}
            <select name="" id=""
              value={selectedStand}
              onChange={(e) => setSelectedStand(e.target.value)}>
              <option className='default '  >Select Stand</option>
              {stands.map((stand, index) => (
                <option key={index} value={stand.StandName}>
                  {stand.StandName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Buttunn value={'add profile'} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProfile