import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ChangeDriverStand = () => {
    const location = useLocation()
    const data = location.state?.data
    const stand = location.state.stand
    const [stands, setStands] = useState([])
    const api_url = import.meta.env.VITE_API_URL
    const [newstand, setNewstand] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const getstand = async () => {
            try {
                const res = await axios.get(`${api_url}/ride/getStand`)
                // console.log(res.data);
                setStands(res.data)

            } catch (error) {
                console.log(error);
            }
        }
        getstand()
    }, [])

    const sumbit = async (e) => {
        e.preventDefault()
        if (!newstand) {
            return alert('Select new stand');
        }

        if (newstand === stand) {
            return alert('New stand is same as Current Stand');
        }

        try {
            const res = await axios.patch(`${api_url}/admin/changeStand`,
                { newstand, vehicleNumber: `${data.vehicleNumber}` }
            )
            alert(res.data);
            navigate('/viewDriver', { replace: true })
        } catch (error) {

        }
    }
    return (
        <div className='pt-5 px-3'>
            <h5 className='mt-5'>Change Driver Stand</h5>

            <div>
                <form className=' d-flex flex-column gap-2' onSubmit={sumbit}>
                    <div className='d-flex flex gap-1'>
                        <label htmlFor="">Driver Name: </label>
                        <span className='fw-bold'>{data.Name}</span>
                    </div>
                    <div className='d-flex flex gap-1'>
                        <label htmlFor="">Vehicle Number: </label>
                        <span  className='fw-bold'>{data.vehicleNumber}</span>
                    </div>
                    <div className='d-flex flex gap-1'>
                        <label htmlFor="">Current Stand: </label>
                        <span  className='fw-bold'>{stand}</span>
                    </div>
                    <div className='d-flex flex gap-1'>
                        <label htmlFor="">Select New stand:</label>
                        <select name="" id=""
                            onChange={(e) => { setNewstand(e.target.value) }}
                        >
                            {stands.map((dd, index) => (
                                <>
                                    <option className='default '>Select New Stand</option>
                                    <option value={dd.StandName}>{dd.StandName}</option>
                                </>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className=' btn-outline-success btn' type='submit'>Change</button>

                    </div>
                </form>
            </div>

        </div>
    )
}

export default ChangeDriverStand