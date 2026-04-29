import React, { useEffect, useState } from 'react'
import './stations.css'
import axios from 'axios'
import { HiOutlineHome } from 'react-icons/hi'
import { PiBuildingLight } from 'react-icons/pi'
import { IoMdAdd } from 'react-icons/io'
import Stattion from '../../Components/addStation/Stattion'
const Stations = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [stand, setstand] = useState([])
    const [open,setOpen]=useState(false)
    useEffect(() => {
        const station = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/stations`)
                setstand(res.data)
            } catch (error) {

            }
        }
        station()
    }, [open])
    return (
        <div className='Station '>
            {open && <Stattion close={setOpen} />}
            <h3>Stations </h3>
            <span className='d-flex add align-items-center gap-1' onClick={()=>setOpen(true)}>
                <IoMdAdd fill='green' size={20} className='my-2' />
                <span>Add Stand</span>
            </span>
            <div className='StationsContainer'>
                {
                    stand.map((files, index) => (
                        <div className='stationsBox'>
                            <PiBuildingLight />
                            <span>
                                {files.StandName}

                            </span>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Stations