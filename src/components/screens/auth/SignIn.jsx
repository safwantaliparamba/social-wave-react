import React from 'react'
import { env } from '../../../App';


const SignIn = () => {
    console.log(env.VITE_TEST);
    return (
        <div>
            <h1>SignIn</h1>
        </div>
    )
}

export default SignIn
