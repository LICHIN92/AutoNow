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
