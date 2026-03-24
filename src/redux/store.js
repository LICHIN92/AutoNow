import { configureStore } from '@reduxjs/toolkit'
import userSlice  from './useSlice'

export default configureStore({
  reducer: {
    user:userSlice
  },
})