import React, { useEffect, useState } from 'react'
import './viewdriver.css'
import axios from 'axios'
import Driverdetail from '../driverDetail/Driverdetail'
const ViewDriver = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [drivers, SetDrivers] = useState([])
    const [view, setview] = useState(false)
    const [data, setdata] = useState([])
    useEffect(() => {
        const getDriver = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/verfiedDriver`)
                SetDrivers(res.data)
            } catch (error) {
                console.log(error);

            }
        }
        getDriver()
    }, [])
    const viewData = (detail) => {
        setdata(detail)
        setview(true)
    }
    return (
        <div className=' ViewDriver'>

            {view && <Driverdetail data={data} close={setview}/>}
            <h3 className='text-center'>View Driver</h3>

            <div className='d-flex justify-content-center'>
                {drivers.length > 0 && <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Driver</th>
                            <th>Verified</th>
                            <th>Station</th>

                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((data, index) => (
                            <tr style={{cursor:'pointer'}} key={data._id || index} >
                                <td>{index + 1}</td>
                                <td onClick={() => viewData(data)}>{data.vehicleNumber}</td>
                                <td>{data.isVerified ? 'true' : ''}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
            </div>
        </div>
    )
}

export default ViewDriver