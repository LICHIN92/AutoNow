import { configureStore } from '@reduxjs/toolkit'
import userSlice from './useSlice'
import  driverSlice  from './driverSlice'

export default configureStore({
  reducer: {
    user: userSlice,
    driver: driverSlice
  },
})