import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import Signin from './pages/signin/Signin.jsx'
import Input from './Components/Input/Input.jsx';
import SignUp from './pages/signin/SignUp.jsx';
import SignINUP from './pages/user/SignINUP.jsx';
import Navvbar from './Components/navbar/Navvbar.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import RideBooking from './pages/RideBooking/RideBooking.jsx';
import BookRide from './pages/RideBooking/BookRide.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Driver from './pages/driver/Driver.jsx';
import Admin from './pages/admin/Admin.jsx';
import ViewDriver from './pages/viewDriver/ViewDriver.jsx';
import DriverHome from './pages/DriverHome/DriverHome.jsx';
import AddProfile from './Components/addProfile/AddProfile.jsx';
import UserDash from './pages/userDash/UserDash.jsx';

const router = createBrowserRouter([
  {
    element: <MainPage />,
    children: [
      {
        path: '/',
        element: <BookRide />
      },
      {
        path: '/signin',
        element: <SignINUP />
      },
      {
        path: '/driverLogin',
        element: <Driver />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/viewDriver',
        element: <ViewDriver/>
      },
      {
        path:'/driverhome',
        element:<DriverHome/>
      },
      {
        path:'/p',
        element:<AddProfile/>
      },
      {
        path:'/userDashBoard',
        element:<UserDash/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>
  </StrictMode>,
)
