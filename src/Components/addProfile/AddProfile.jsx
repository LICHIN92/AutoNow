import React, { useEffect, useRef, useState } from 'react'
import { FcAddImage } from 'react-icons/fc';
import './add_img.css'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Buttunn from '../Button/Buttunn';
import Allert from '../../Components/Alert/Allert'
import driveRedux from '../../redux/driverReduxfun';
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
  const token = localStorage.getItem('sarathi')
  const driver = useSelector((state) => state.driver?.driver)
  const [alertsbox, setAlertsbox] = useState(false)
  const [msg, setmsg] = useState('')
  const [clicked, setclicked] = useState(false)
  const dispatch = useDispatch()
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
      // console.log(data);
      data.pic = file
    const formData = new FormData()
    if (!file) {
      return alert('please select  image')
    }
    if (!selectedStand) {
      return alert('please select your Stand')
    }
    formData.append("image", file)          // ✅ file
    formData.append("stand", selectedStand) // ✅ stand
    try {
      const res = await axios.patch(`${api_Url}/driver/addprofile/${id}`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
      localStorage.setItem('sarathi', res.data.token)
      await driveRedux(res.data.token, dispatch)

      setAlertsbox(true)
      // alert('ok')
      setTimeout(() => {
        setAlertsbox(false)
        close(false)
      }, 3000);
    } catch (error) {
      console.log(error);
      alert(error)

    }
  }
  return (
    <div className=' add_img pt-5 d-flex justify-content-center align-items-center'>
      {alertsbox &&
        <Allert msg={'Picture Uploaded Successfully'}
          msg2={'please contact Admin'} fill={'green'} />}
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
            <select style={{ width: '50%', height: "35px", borderRadius: '5px' }}
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

          <div className='d-flex flex-column gap-2'>
            {clicked ?
              <Button className='d-flex align-items-center whenClick gap-2' style={{backgroundColor: 'darkred',color: "white", border: 'none', }}>
                wait
                <div class="spinner-border" role="status">
                </div>
              </Button>
              : <Buttunn value={'add profile'} />}
            <button style={{ height: "30px", borderRadius: "5px" }} className='border-0 bg-danger text-white' onClick={() => { close(false) }}>
              Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProfile