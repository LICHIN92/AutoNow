import React, { useEffect, useState } from 'react'
import './driverhome.css'
import auto from '../../assets/image/auto-rickshaw-svgrepo-com.svg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { FcAddImage } from 'react-icons/fc'
import AddProfile from '../../Components/addProfile/AddProfile'
const DriverHome = () => {
  const api_url = import.meta.env.VITE_API_URL
  const driver = useSelector((state) => state.driver.driver)
  console.log(driver?.profileImage)
  const [openImg, setOpenImg] = useState(false)
  useEffect(() => {
    const Bookings = async () => {
      try {
        const res = await axios.get(`${api_url}/driver/NoOfBook`)
      } catch (error) {
        console.log(error);

      }
    }
    Bookings()
  }, [])
  return (
    <div className='driverHome container-fluid '>
      {openImg && <AddProfile close={setOpenImg} />}
      <div className='row h-100'>
        {/* head */}
        <div className='col-12 head  bg-body-tertiary'>
          <div className='d-flex align-items-center gap-4'>
            <h4>hello Lichin</h4>
            {driver?.pic ?
              <img className='driverImage' src={driver.pic} alt="driver" />
              :
              <span>
                <FcAddImage size={40} onClick={() => setOpenImg(true)} />
              </span>
            }          </div>
          <div className='vNumber text-uppercase'>
            <img className='fw-medium' src={auto} alt="" />
            <span className='ms-1 fw-medium'>
              {driver.vehicleNumber}

            </span>
          </div>
        </div>


        {/* sidebar */}
        <div className='col-md-3 sidebar col-12 bg-body-secondary d-flex align-items-center '>
          <ul className=' list-unstyled d-flex flex-row  align-content-center justify-content-evenly 
           flex-md-column  justify-content-md-evenly '>
            <li>Home</li>
            <li>Profile</li>
            <li>Bookings</li>
          </ul>
        </div>

        {/* center bar */}
        <div className='col-12 center_bar col-md-9 d-flex  row-gap-0
        column-gap-0   pt-3'>
          <div className='Driver_card'>
            Rides
          </div>
          <div className='Driver_card'>
            Bookings
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverHome