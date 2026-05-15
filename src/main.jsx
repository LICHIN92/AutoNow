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
import Userprotection from './Components/AuthProtection/Userprotection.jsx';
import AdminAuth from './Components/AuthProtection/AdminAuth.jsx';
import DriverAuth from './Components/AuthProtection/DriverAuth.jsx';
import DriverProtecttion from './Components/AuthProtection/DriverProtecttion.jsx';
import ViewAccepted from './pages/ViewAccepted/ViewAccepted.jsx';
import UserLogedIn from './Components/AuthProtection/UserLogedIn.jsx';
import UserRideDetail from './pages/UserRideDetail/UserRideDetail.jsx';
import StationView from './pages/StationView/StationView.jsx';
import StationBookView from './pages/StationBookView/StationBookView.jsx';
import Stations from './pages/StationS/Stations.jsx';
import Revenue from './pages/Revenue/Revenue.jsx';
import DriverPending from './pages/DriverPending/DriverPending.jsx';
import Verifying from './pages/Verify/Verifying.jsx';
import RouteMap from './Components/Routes/RouteMap.jsx';
import "leaflet/dist/leaflet.css";
import ViewUsers from './pages/ViewUsers/ViewUsers.jsx';
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
        element: (
          <Userprotection>
            <SignINUP />
          </Userprotection>
        )
      },
      {
        path: '/driverLogin',
        element: (
          <DriverProtecttion>
            <Driver />
          </DriverProtecttion>
        )
      },
      {
        path: '/admin',
        element: (
          <AdminAuth>
            <Admin />
          </AdminAuth>
        )
      },
      {
        path: '/viewDriver',
        element: <ViewDriver />
      },
      {
        path: '/driverhome',
        element: (
          <DriverAuth>
            <DriverHome />
          </DriverAuth>
        )
      },
      {
        path: '/Revenue',
        element: (
          <AdminAuth>
            <Revenue />
          </AdminAuth>
        )
      },
      {
        path: '/userDashBoard',
        element: (
          <UserLogedIn>
            <UserDash />
          </UserLogedIn>
        )
      },
      {
        path: '/viewAcceptedRide',
        element: <ViewAccepted />
      },
      {
        path: '/UserRideDetail/:id',
        element: (
          <UserLogedIn>
            <UserRideDetail />
          </UserLogedIn>
        )
      },
      {
        path: "/station",
        element: <StationView />
      },
      {
        path: '/todaystation/:station',
        element: <StationBookView />
      },
      {
        path: '/stations',
        element: <Stations />
      },
      {
        path: "/pendingDriver",
        element: (
          <AdminAuth>
            <DriverPending />
          </AdminAuth>
        )
      },
      {
        path: "/verify",
        element: (
          <AdminAuth>
            <Verifying />
          </AdminAuth>
        )
      },
      {
        path: '/users',
        element: (
          <AdminAuth>
            <ViewUsers />
          </AdminAuth>
        )
      }
      // {
      //   path:'/routes',
      //   element:<RouteMap/>
      // }

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
