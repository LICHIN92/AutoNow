import React, { useEffect, useState } from 'react'
import './navbarr.css'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navvbar = () => {
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem('autoNowToken')
  const user = useSelector((state) => state.user?.user)
  console.log(user);
  const driver = useSelector((state) => state.driver?.driver)
  console.log(driver);

  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 770) {
        setOpen(false) // close mobile menu when switching to desktop
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className='navbar_Container d-flex justify-content-center mt-2'>

      <div className='custom_navbar d-flex align-items-center justify-content-between px-4'>

        {/* LEFT (Desktop only) */}
        <div className='left_side d-none d-md-flex gap-4 '>
          <div className='items'>Products ▾</div>
          {/* <div className='items'>Customers</div> */}
          {
            driver && <div className='items' onClick={() => navigate('/driverLogin')}>
              Driver
            </div>
          }
          {token && user.Role ?
            <div onClick={() => navigate('/admin')} className='items'>
              Admin
            </div>
            :
            <div className='items' onClick={()=>navigate('userDashBoard')}>
              User
            </div>
          }
        </div>

        {/* LOGO */}
        <div className='center_side fw-bold fs-3 fst-italic' onClick={() => navigate('/')}>
          Hey Auto
        </div>

        {/* RIGHT (Desktop only) */}
        <div className='right_side d-none d-md-flex align-items-center gap-3'>
          {token ?
            <div>
              <BsPersonBoundingBox size={25} />

            </div>
            : <div onClick={() => { navigate('/signin') }}>Sign in</div>}
          <button className='demo_btn'>See a demo →</button>
        </div>

        {/* MOBILE MENU ICON */}
        <div className='d-md-none'>
          {/* <button className='menu_btn' onClick={() => setOpen(!open)}>
            ☰
            {open?'':<GiHamburgerMenu />
}
          </button> */}
          <div className="menu_btn" onClick={() => setOpen(!open)}>
            <span className={open ? "line line1 active" : "line line1"}></span>
            <span className={open ? "line line2 active" : "line line2"}></span>
            <span className={open ? "line line3 active" : "line line3"}></span>
          </div>
        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className='mobile_menu'>
          <div>Products</div>
          <div>Customers</div>
          <div className='items' onClick={() => navigate('/driverLogin')}>Driver</div>
          {token &&
            <div onClick={() => navigate('/admin')} className='items'>
              Admin
            </div>
          }
          <button className='demo_btn w-100 mt-2'>See a demo</button>
        </div>
      )}

    </div>
  )
}

export default Navvbar