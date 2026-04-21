import { jwtDecode } from "jwt-decode"
import { setDriverData } from "./driverSlice"


const driveRedux = (token, dispatch) => {
    localStorage.setItem('sarathi',token)
    const data = jwtDecode(token)
    console.log(data)
    dispatch(setDriverData(data))
}

export default driveRedux