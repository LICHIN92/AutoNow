import React, { useEffect, useState } from 'react'
import './driverpending.css'
import axios from 'axios'
import AdminModal from '../../Components/AdminModal/AdminModal'
import Allert from '../../Components/Alert/Allert'
import { useNavigate } from 'react-router-dom'
const DriverPending = () => {
    const api_url = import.meta.env.VITE_API_URL

    const [driver, setDriver] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [driverId, setDriverId] = useState('')
    const token = localStorage.getItem('autoNowToken')
    const navigate = useNavigate()

    useEffect(() => {
        const drivers = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/pendingDriverslist`)
                setDriver(res.data)
            } catch (error) {

            }
        }
        drivers()
    }, [refresh])

    const modalOpenFunction = async (id) => {
        setOpenModal(true)
        setDriverId(id)
    }

    const deleteDriver = async () => {
        try {
            const res = await axios.delete(`${api_url}/admin/deleteNonVerified/${driverId._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setOpenModal(false)
            setrefresh(!refresh)
            setConfirm(true)
            setTimeout(() => {
                setConfirm(false)
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='DriverPending'>
            {
                openModal && <AdminModal
                    close={setOpenModal}
                    p1={'Delete Confirmation'}
                    p2={`Are you Sure want to delete ${driverId.vehicleNumber} `}
                    fun={deleteDriver} />
            }

            {
                confirm && <Allert
                    msg={`${driverId.vehicleNumber} is deleted Successfully`} />
            }

            <h3>DriverPending</h3>
            <div className='d-flex justify-content-center'>
                {
                    driver.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th className='slNo'>sl.No</th>
                                <th>Driver</th>
                                <th style={{ width: '60px' }}>Delete</th>
                                {/* <th></th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {driver.map((file, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td onClick={() => navigate('/verify', { state: { file }})} className='details d-flex justify-content-evenly ' >
                                        <div className='d-flex align-items-center ' >
                                            <img src={file.profileImage} alt="no image" />
                                        </div>
                                        <div className='d-flex flex-column justify-content-start'>
                                            <span className='text-capitalize'>{file.Name}</span>
                                            <span>{file.Mobile}</span>
                                            <span>{file.vehicleNumber}</span>
                                            <span className={file.stand ? '' : 'text-danger'}>
                                                {file.stand ? file.stand : "Not added"}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ cursor: 'pointer' }} className='text-danger' onClick={() => { modalOpenFunction(file) }}>
                                        Delete

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default DriverPending