import React, { useEffect, useState } from 'react'
import './viewdriver.css'
import axios from 'axios'
import Driverdetail from '../driverDetail/Driverdetail'
import AdminModal from '../../Components/AdminModal/AdminModal'
import Allert from '../../Components/Alert/Allert'
const ViewDriver = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [drivers, SetDrivers] = useState([])
    const [view, setview] = useState(false)
    const [data, setdata] = useState([])
    const [DriverAtStation, setDriversAtStation] = useState([])
    const [viewStation, setViewStation] = useState(false)
    const [stationName, setStationName] = useState('')
    const [Delete, setDelete] = useState(false)
    const [id, setid] = useState('')
    const [alert, setalert] = useState(false)
    const [msg, setmsg] = useState(null)

    useEffect(() => {
        const getDriver = async () => {
            alert(verfiedDriver)
            try {
                const res = await axios.get(`${api_url}/admin/verfiedDriver`)
                SetDrivers(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        getDriver()
    }, [alert, Delete])

    useEffect(() => {
        const driver = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/DriverAtStation`)
                setDriversAtStation(res.data)
                setViewStation(false)
                console.log(res.data)
            } catch (error) {
                console.log(error)
                alert(error)
            }
        }
        driver()
    }, [alert, Delete])

    const viewData = (detail) => {
        setdata(detail)
        setview(true)
    }

    const funtionCall = (data, Name,) => {
        //  setViewStation(prev => !prev)
        setViewStation(false)

        SetDrivers(data)
        setStationName(Name)
        setViewStation(true)
    }

    const delfun = async (para) => {
        try {
            const res = await axios.delete(`${api_url}/admin/deleteDriver`, {
                data: { id }
            })
            setmsg(res.data)
            setDelete(false)
            setalert(true)
            setTimeout(() => {
                setalert(false)

            }, 3000)
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className=' ViewDriver'>
            {alert &&
                <Allert
                    msg={`Delete Driver`}
                    msg2={msg}
                />
            }
            {
                Delete &&
                <AdminModal
                    h4={'Delete Confirmation'}
                    close={setDelete}
                    p1={'Are you sure want to delete ?'}
                    p2={`This action can't be undone `}
                    fun={delfun}

                />
            }

            {view && <Driverdetail data={data} close={setview} />}

            <h3 className='text-center'>View Driver</h3>

            <div className='d-flex ms-1 ms-md-2 flex-wrap gap-2 flex-row'>
                {DriverAtStation.map((data, index) => (
                    <div key={index} className='stationDrivers' onClick={() => { funtionCall(data.drivers, data.stand) }} >
                        <span>{data.total}</span>
                        <span>{data.stand}</span>
                    </div>
                ))}
            </div>

            <div className='d-flex flex-column  align-items-center justify-content-center'>
                {
                    viewStation &&  stationName &&
               ( <div className='w-100 ps-2 pt-3'>
                    <p className=' text-uppercase text-decoration-underline text-start'>
                        Drivers At  {stationName}
                    </p>
                </div>)
                }

                {drivers.length > 0 && viewStation &&

                    <table>
                        <thead>
                            <tr>
                                <th className='slNo'>Sl.No</th>
                                <th>Driver</th>
                                <th className='del'>Delete</th>
                                {/* <th>Station</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {drivers.map((data, index) => (
                                <tr style={{ cursor: 'pointer' }} key={data._id || index} >
                                    <td>{index + 1}</td>
                                    <td onClick={() => viewData(data)} className=' d-flex flex-column' >
                                        <span className='text-uppercase'>
                                            {data.vehicleNumber}
                                        </span>
                                        <span className=' text-uppercase'>{data.Name}</span>

                                    </td>
                                    <td>
                                        <span className='dell' onClick={() => { setid(data.vehicleNumber), setDelete(true) }}>
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>}
            </div>
        </div>
    )
}

export default ViewDriver