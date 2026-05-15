import React, { useEffect, useState } from 'react'
import './ViewUsers.css'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import AdminModal from '../../Components/AdminModal/AdminModal'
import Allert from '../../Components/Alert/Allert'
import { FaMobileAlt, FaUser } from 'react-icons/fa'
import { FaMobile } from 'react-icons/fa6'
import { TbAccessible } from 'react-icons/tb'
import { VscWorkspaceTrusted, VscWorkspaceUntrusted } from 'react-icons/vsc'
const ViewUsers = () => {
  const api_url = import.meta.env.VITE_API_URL
  const [user, setuser] = useState('')
  const { register, handleSubmit, reset } = useForm()
  const token = localStorage.getItem('autoNowToken')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openalert, Setopenalert] = useState(false)
  const [bloked, setblocked] = useState([])
  const [show, setShow] = useState(false)
  const [msg2,setmsg2]=useState('')

  useEffect(() => {
    const users = async () => {
      try {
        const res = await axios.get(`${api_url}/admin/getUsers`)
        setuser(res.data)
      } catch (error) {
        console.log(error);

      }
    }
    users()
  }, [])

  useEffect(() => {
    const users = async () => {
      try {
        const res = await axios.get(`${api_url}/admin/getBlockeduser`)
        setblocked(res.data)
      } catch (error) {
        console.log(error);
        alert(error)
      }
    }
    users()
  }, [])

  const handleSubmitSearch = async (data) => {
    setData(null)
    try {
      setLoading(true)
      setShow(false)
      const res = await axios.post(`${api_url}/admin/getuser`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(res.data)
      setLoading(false)

    } catch (error) {
      setData({})
      alert(error.response.data)


    }
  }

  const blockFunction = async () => {
    try {
      const res = await axios.patch(`${api_url}/admin/blockUser/${data._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setOpenModal(false)
      Setopenalert(true)
      setmsg2(res.data)
      setTimeout(() => {
        // reset
        Setopenalert(false)

      }, 3000);
      setData(null)
    } catch (error) {
      setOpenModal(false)
      alert(error.response.data)
    }
  }
  return (
    <div className='ViewUsers'>
      {
        openalert && <Allert msg={'Block User'} msg2={msg2} fill={'green'} />
      }
      {
        openModal && <AdminModal fun={blockFunction}
          close={setOpenModal} p1={`Are you sure ${data.fake ? 'Unblock' : 'Block'} this user`} p2={''} />
      }

      <h2>Users</h2>
      <div className='d-flex gap-2 pb-2'>
        <span style={{cursor:"pointer"}} onClick={() => {setData(null), setShow(!show) }}>Blocked User {bloked.length}</span>
        <span>No.of Users {user}</span>

      </div>
      <div>
        <form onSubmit={handleSubmit(handleSubmitSearch)} className='searchBox'>
          <input type="number" maxLength={10} required {...register("mobile")} placeholder='Search User' />
          <button>Search</button>
        </form>
      </div>
      {loading ?
        loading :
        (
          data != null ?
            <div className='userBox'>
              <div className='d-flex flex-row align-items-center text-uppercase gap-2'>
                <FaUser />

                <span>{data.Name}</span>
              </div>
              <div className='d-flex flex-row align-items-center text-uppercase gap-2'>
                <FaMobileAlt />
                <span>{data.Mobile}</span>

              </div>
              <div className='d-flex flex-row align-items-center text-capitalize gap-2'>
                <TbAccessible />
                <span>{data.Role ? 'Admin' : 'User'}</span>

              </div>
              <div className='d-flex flex-row align-items-center text-capitalize gap-2'>
                {
                  !data.fake ?
                    <VscWorkspaceTrusted />
                    :
                    <VscWorkspaceUntrusted />

                }

                <span>{data.fake ? 'Fake' : 'genuine'}</span>

              </div>
              <div className='d-flex justify-content-center'>
                {
                  data.fake ?
                    <span onClick={() => { setOpenModal(true) }} >UnBlock</span>
                    :
                    <span onClick={() => { setOpenModal(true) }} >Block</span>

                }
              </div>
            </div> :
            ""
        )
      }

      {
        show && (
          <div className='d-flex gap-2 gap-lg-3 flex-wrap'>
            {
              bloked.map((data, index) => (
                <div className='userBox'>
                  <div className='d-flex flex-row align-items-center text-uppercase gap-2'>
                    <FaUser />

                    <span>{data.Name}</span>
                  </div>
                  <div className='d-flex flex-row align-items-center text-uppercase gap-2'>
                    <FaMobileAlt />
                    <span>{data.Mobile}</span>

                  </div>
                  <div className='d-flex flex-row align-items-center text-capitalize gap-2'>
                    <TbAccessible />
                    <span>{data.Role ? 'Admin' : 'User'}</span>

                  </div>
                  <div className='d-flex flex-row align-items-center text-capitalize gap-2'>
                    {
                      !data.fake ?
                        <VscWorkspaceTrusted />
                        :
                        <VscWorkspaceUntrusted />

                    }

                    <span>{data.fake ? 'Fake' : 'genuine'}</span>

                  </div>
                  {/* <div className='d-flex justify-content-center'>
                {
                  data.fake ?
                    <span onClick={() => { setOpenModal(true) }} >UnBlock</span>
                    :
                    <span onClick={() => { setOpenModal(true) }} >Block</span>

                }
              </div> */}
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default ViewUsers