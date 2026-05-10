import React, { useEffect, useState } from 'react'
import './verifying.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaMobileAlt, FaUser } from 'react-icons/fa'
import { RiCarLine } from 'react-icons/ri'
import { FaMobile } from 'react-icons/fa6'
import { PiBuildingsDuotone, PiKeyboard } from 'react-icons/pi'
import axios from 'axios'
import Allert from '../../Components/Alert/Allert'
const Verifying = () => {
    const location = useLocation()
    const file = location.state?.file
    const navigate = useNavigate()
    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('autoNowToken')
    const [isClicked, SetisClicked] = useState(false)
    const [openAlert, SetOpenAlert] = useState(false)

    useEffect(() => {
        if (!file) {
            navigate('/pendingDriver', { replace: true });

        }
    })
    const verifying = async () => {
        try {
            const res = await axios.patch(`${api_url}/admin/verifyingDriver`,
                {
                    id: file._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            SetOpenAlert(true)
            setTimeout(() => {
                SetOpenAlert(false)
                navigate('/pendingDriver')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='Verifying'>
            {
                openAlert &&
                <Allert fill={'green'}
                    msg={'Verified Successfully'}
                    msg2={`${file.vehicleNumber} is verified successfully`} />
            }

            <h4>Verifying</h4>
            <div className='main_Box '>
                <div className='mainBox gap-2 '>
                    <div className='imgBox'>
                        <img src={file.profileImage} alt="" />
                    </div>
                    <div className='box '>

                        <div>

                            <FaUser />
                            <span>{file.Name}</span>

                        </div>
                        <div>
                            <RiCarLine />

                            <span>{file.vehicleNumber}</span>
                        </div>
                        <div>
                            <FaMobileAlt />
                            <span>{file.Mobile}</span>

                        </div>
                        <div>
                            <PiKeyboard />

                            <span>{file.licenseNumber}</span>

                        </div>
                        <div>
                            <PiBuildingsDuotone />

                            <span>{file.stand}</span>
                        </div>
                    </div>
                </div>
                <div className='buttonBox d-flex gap-3 w-100 justify-content-center'>
                    <span onClick={() => navigate('/pendingDriver')}>
                        Cancel
                    </span>

                    {
                        isClicked ?
                            <span className='d-flex align-items-center gap-1'>
                                <div>
                                    Verify
                                </div>
                                <div className="spinner-border" role="status">
                                </div>
                            </span>
                            :
                            <span onClick={() => { SetisClicked(true), verifying() }}>
                                Verify
                            </span>

                    }
                </div>

            </div>
        </div>
    )
}

export default Verifying