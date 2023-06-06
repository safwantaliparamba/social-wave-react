import { authApi } from "../../config/axios"
import { getItem, logout } from "../../store/authSlice"

export const logoutHandler = (dispatch) => {
    // dispatch(logout())
    const sessionId = getItem("sessionId")

    authApi
        .post(`/accounts/sign-out/${sessionId}/`)
        .then(res => {
            const { statusCode } = res.data

            console.log(res.data);

            if (statusCode === 6000) {
                dispatch(logout())
            } else {
                
            }
        })
        .catch(err => console.log(err.message))
}