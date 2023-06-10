import { authApi } from "../../config/axios"
import { getItem, logout } from "../../store/authSlice"


//logout method
export const logoutHandler = (dispatch) => {
    // dispatch(logout())
    const sessionId = getItem("sessionId")

    authApi
        .post(`/accounts/sign-out/${sessionId}/`)
        .then(res => {
            const { statusCode } = res.data

            if (statusCode === 6000) {
                dispatch(logout())
            }
        })
        .catch(err => console.log(err.message))
}


// debounce method
let timer;

export default function debounce(fn, delay) {
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}