import { jwtDecode } from "jwt-decode"
import { setDriverData } from "./driverSlice"


const driveRedux = (token, dispatch) => {
    const data = jwtDecode(token)
    dispatch(setDriverData(data))
}

export default driveRedux