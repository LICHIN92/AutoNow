import React, { useEffect, useState } from 'react'
import './driverhome.css'
import auto from '../../assets/image/auto-rickshaw-svgrepo-com.svg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FcAddImage } from 'react-icons/fc'
import AddProfile from '../../Components/addProfile/AddProfile'
import { BiCurrentLocation } from 'react-icons/bi'
import { ImLocation } from 'react-icons/im'
import { FaLongArrowAltDown, FaLongArrowAltRight } from 'react-icons/fa'
import DriverViewBook from '../../Components/DriverViewBook/DriverViewBook'
import { clearDriverData } from '../../redux/driverSlice'
import { useNavigate } from 'react-router-dom'
import { GrRefresh } from 'react-icons/gr'
const DriverHome = () => {
  const api_url = import.meta.env.VITE_API_URL
  const driver = useSelector((state) => state.driver?.driver)
  const token = localStorage.getItem('sarathi')
  const [openImg, setOpenImg] = useState(false)
  const [Book, setBookings] = useState(null)
  const stand = driver?.stand
  const [openBook, setOpenBook] = useState(false)
  const [data, setdata] = useState([])
  const [view, setView] = useState(false)
  const [id, setId] = useState(null)
  const [ride, setRide] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)
  const [todaysRide, setTodaysRide] = useState(null)
  const [tommarrow, setTommarrow] = useState(null)

  // todays Bookings
  useEffect(() => {
    const Bookings = async () => {
      // alert()
      try {
        const res = await axios.get(`${api_url}/driver/toadysMyRide`, {
          params: { stand },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBookings(res.data)
        console.log(res.data);

      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data)
      }
    }
    Bookings()
  }, [openBook, refresh])


  useEffect(() => {
    const myride = async () => {
      try {
        const res = await axios.get(`${api_url}/driver/myride`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setRide(res.data)
      } catch (error) {
        console.log(error);

      }
    }
    myride()
  }, [openBook, refresh])

  const getRemainingHours = (time) => {
    let [hour, minute] = time.split(':').map(Number);

    let period = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // handle 0 -> 12

    return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const viwBook = (id) => {
    setId(id)
    setView(true)
  }
  const Logout = () => {
    localStorage.removeItem('sarathi')
    dispatch(clearDriverData(driver))
    navigate('/driverLogin')
  }

  useEffect(() => {
    const todayride = async () => {
      try {
        const res = await axios.get(`${api_url}/driver/todayBookings`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(res.data)
        setdata(res.data)
        setOpenBook(true)
      } catch (error) {
        console.log(error);

      }
    }
    todayride()
  }, [openBook, refresh])

  // tommarrow
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${api_url}/driver/tommarrow`, {
          params: { stand },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setTommarrow(res.data)

      } catch (error) {
        console.log(error.response.data);
        alert(error.response.data)
      }
    }
    getBook()
  }, [openBook, refresh])

  return (
    <div className='driverHome d-flex flex-lg-row flex-column  '>
      {view && <DriverViewBook id={id} close={setView} refresh={setRefresh} />}
      
      {openImg && <AddProfile close={setOpenImg} />}



      {/* head */}
      <div className='driverBox'>
        <div className='DriverMainBox'>
          <div className='Name_Image'>
            <h4>{driver.Name} </h4>
            {driver?.pic ?
              <img className='driverImage' src={driver.pic} alt="driver" />
              :
              <span>
                <FcAddImage size={40} onClick={() => setOpenImg(true)} />
              </span>
            }
          </div>
          <div className='vNumber text-uppercase'>
            <img className='fw-medium' src={auto} alt="" />
            <span className='ms-1 fw-medium'>
              {driver?.vehicleNumber}

            </span>
            <span onClick={() => { Logout() }} style={{ cursor: 'pointer' }} className='ms-1 
            text-capitalize bg-danger p-1 rounded-2 text-white'  >
              Log Out
            </span>
          </div>
        </div>
      </div>




      {/* center bar */}
      <div className='centerBox '>
        <div className='driverMenu'>
          <div className='Driver_card'
            onClick={() => { navigate('/viewAcceptedRide', { state: { ride: ride } }) }}>
            Accepted Rides <span className='ms-1'>{ride.length}</span>
          </div>
          <div className='Driver_card '>
            Todays My Ride

            <span className=' rounded-circle ms-1'>{Book}</span>

          </div>
          <div className='Driver_card ' onClick={() => { setRefresh((prev) => !prev) }}>
            Today <span className='ms-1'>{data.length}</span>
          </div>
          <div className='Driver_card '>
            Tommarrow
            <span className='ms-1'>{tommarrow}</span>
          </div>
        </div>
        {openBook &&
          <div className='bookings py-1'>
            {data.map((file, index) => (
              <div key={index} className='rideInfo' onClick={() => viwBook(file._id)}>
                <p className=''>
                  <span className='text-uppercase'>
                    <BiCurrentLocation fill='blue' />
                    {file.pickup}
                  </span>
                  <FaLongArrowAltRight className='mx-2' />
                  <span className='text-uppercase'>
                    <ImLocation fill='brown' />
                    {file.drop}
                  </span>
                </p>
                <p>
                  <span>{file.date}</span> <span>{getRemainingHours(file.time)} </span>

                </p>
              </div>
            ))}
          </div>}
      </div>
      
    </div>
  )
}

export default DriverHome