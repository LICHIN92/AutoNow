import React, { useState } from 'react'
import Signin from '../signin/Signin'
import SignUp from '../signin/SignUp'
import './signinup.css'
import Map from '../../Components/Map/Map'
const SignINUP = () => {
    const [signUp, setSignUP] = useState(false)
    return (
        <div className='SignINUP '>
            {
                signUp ?
                    <Signin fun={setSignUP} />
                    :
                    <SignUp />
            }
            <span className={signUp?'mt-4':' gg'} onClick={() => { setSignUP(!signUp) }}>
                click to {signUp?' Sign In':" Sign Up"}
                </span>
            {/* <Map/> */}
        </div>
    )
}

export default SignINUP