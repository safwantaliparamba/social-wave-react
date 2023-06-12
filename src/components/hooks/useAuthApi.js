import axios from "axios"
import { getItem } from "../../store/authSlice"
import { useEffect } from "react"


const URL = "http://localhost:8000/api/v1"


const useAuthApi = () => {
    const authApi = axios.create({
        baseURL: URL,
    })

    const CancelToken = axios.CancelToken.source()
    const controller = new AbortController();

    // middleware to add accessToken as auth credential
    const interceptor = authApi.interceptors.request.use((request) => {
        // get access token which we stored in localStorage
        const sessionId = getItem("sessionId")
        const accessToken = getItem("accessToken");

        request.headers.Authorization = `Bearer ${accessToken}`
        request.signal = controller.signal
        
        request.params = {
            session_id: sessionId ?? null,
        }

        return request

    }, (err) => {

        if (axios.isCancel(err)) {
            console.log("request canceled by the user");
        } else {
            console.log("error occured");
        }

        return err
    })

    useEffect(() => {
        console.log("Mounted");

        return () => {
            CancelToken.cancel("cancelled")
            console.log("Unmounted");
            authApi.interceptors.response.eject(interceptor)
        }
    }, [location.pathname])

    return { authApi, CancelToken }
}

export default useAuthApi
