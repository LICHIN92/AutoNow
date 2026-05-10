import React, { useEffect, useState } from 'react'
import './stations.css'
import axios from 'axios'
import { HiOutlineHome } from 'react-icons/hi'
import { PiBuildingLight } from 'react-icons/pi'
import { IoMdAdd } from 'react-icons/io'
import Stattion from '../../Components/addStation/Stattion'
import AdminModal from '../../Components/AdminModal/AdminModal'
import { FaDeleteLeft } from 'react-icons/fa6'
import { RiDeleteBin5Line } from 'react-icons/ri'
import Allert from '../../Components/Alert/Allert'
const Stations = () => {
    const api_url = import.meta.env.VITE_API_URL
    const [stand, setstand] = useState([])
    const [open, setOpen] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [selectedStand, SetSelectedStand] = useState('')
    const [alertView, setalertView] = useState(false)
    const [msg, setMsg] = useState('')
    useEffect(() => {
        const station = async () => {
            try {
                const res = await axios.get(`${api_url}/admin/stations`)
                setstand(res.data)
            } catch (error) {

            }
        }
        station()
    }, [open,Delete])

    const deleteFunction = (stnd) => {
        SetSelectedStand(stnd)
        setDelete(true)
    }

    const deleteStand = async () => {
        alert('deleting')
        try {
            const res = await axios.delete(`${api_url}/admin/DeleteStand`, {
                params: { stand: selectedStand }
            })
            setMsg(res.data)
            setDelete(false)
            setalertView(true)
            setTimeout(() => {
                setalertView(false)
            }, 3000)
        } catch (error) {

        }
    }
    return (
        <div className='Station '>
            {open && <Stattion close={setOpen} />}
            {alertView && <Allert msg={'Delete successfully'} fill={'green'}  msg2={msg}/>}
            {Delete &&
                <AdminModal close={setDelete} fun={deleteStand} 
                    h4={'Delete Stand'}
                    p1={`Are you realy want to Delete ${selectedStand}`}
                    p2={'This Action undone'}

                />}
            <h3>Stations </h3>
            <span className='d-flex add align-items-center gap-1' onClick={() => setOpen(true)}>
                <IoMdAdd fill='yellow' size={20} className='my-2' />
                <span>Add Stand</span>
            </span>
            <div className='StationsContainer'>
                {
                    stand.map((files, index) => (
                        <div className='stationsBox' onClick={() => { deleteFunction(files.StandName) }}>
                            <div>
                                <PiBuildingLight />
                            </div>
                            <span>
                                {files.StandName}

                            </span>
                            <div>
                                <RiDeleteBin5Line fill='rgb(167, 5, 5)' />
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Stations