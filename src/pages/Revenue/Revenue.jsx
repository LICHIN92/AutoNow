import React, { useEffect, useState } from 'react'
import './Revenue.css'
import axios from 'axios'
import { GrRefresh } from 'react-icons/gr'
const Revenue = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [revenue, setRevenue] = useState([])
  const datee = new Date().toLocaleDateString('en-GB');
  const [time, setTime] = useState(new Date());
  const [refresh, setrefresh] = useState(false)
  const [stand, setStand] = useState(null)
  const [drivers, setDrivers] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, []);
  useEffect(() => {
    const revenueBySatnd = async () => {
      try {
        const fetch = await axios.get(`${api_url}/admin/revenueBySatnd`)
        setRevenue(fetch.data)
      } catch (error) {

      }
    }
    revenueBySatnd()
  }, [refresh])
  const refreshFunction = () => {
    setrefresh(true)

    setTimeout(() => {
      setrefresh(false)
    }, 2000)
  }
  const revenues = async (stnd) => {
    setStand(stnd)
    try {
      const res = await axios.get(`${api_url}/admin/driverRevenue`, {
        params: {
          stand: stnd
        }
      })
      setDrivers(res.data)
    } catch (error) {

    }
  }
  return (
    <div className='RevenueContainer '>
      <div className='d-flex flex-column pb-2 ps-1'>
        <span className='fw-bold fs-3'>Today's Revenue </span>
        <div className='d-flex gap-2 ps-1 align-items-center' >
          <span className=''>{datee}</span>
          <span>{time.toLocaleTimeString()}</span>
          <GrRefresh className={refresh ? 'rotate' : ''} onClick={() => { refreshFunction() }} />
        </div>
      </div>

      <div className='Revenue'>
        {revenue.length > 0 && (
          revenue.map((file, index) => (
            <div className='RevenueBox' key={index} onClick={() => revenues(file._id)} >
              <div className='gap-2 d-flex'>
                <span>{file._id}</span>
                <span>{file.total}</span>
              </div>
              {file.total &&
                <span>Revenue {Number(file.total) * 15}/-</span>
              }
            </div>
          ))
        )}
      </div>
      <div>
        {
          drivers.length > 0 &&
          <div className='mt-2 d-flex flex-column align-items-center'>
            <p className='text-center text-capitalize fw-bold '>{stand}</p>
            <table>
              <thead>
                <tr style={{ fontSize: '.89rem' }}>
                  <th style={{ width: '32px' }}>
                    Sl.No
                  </th>
                  <th style={{ width: "30vw" }}  >Driver</th>
                  <th style={{ width: "2px" }}>
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((data, index) => (
                  <tr key={index} className="driverBox">
                    <td>{index + 1}</td>
                    <td className='d-flex flex-column '>
                      <span>
                        {data.name}

                      </span>
                      <span>
                        {data.vehicleNumber}
                      </span>
                    </td>
                    <td className=''>
                      <div>Rides {data.totalRides}</div>
                      <div> ₹ {data.totalRides * 15}/-</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        }
      </div>
    </div>
  )
}

export default Revenue