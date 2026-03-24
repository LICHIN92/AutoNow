import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux";
import { setUserData } from "./useSlice";

const reducfunction = (token, dispatch) => {
    console.log(data);

    const user = jwtDecode(token)
    console.log(user);

    dispatch(setUserData(user))

}

export default reducfunction