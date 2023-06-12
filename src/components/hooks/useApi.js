import axios from "axios"
import { getItem } from "../../store/authSlice"
import { useEffect } from "react"


const URL = "http://localhost:8000/api/v1"


const useApi = () => {
    const api = axios.create({
        baseURL: URL,
    })
    const controller = new AbortController();

    // middleware to add accessToken as auth credential
    api.interceptors.request.use((request) => {
        // get access token which we stored in localStorage
        const sessionId = getItem("sessionId")
    
        request.signal = controller.signal
        request.params = {
            session_id: sessionId ?? null,
        }

        if (controller.signal.aborted){
            console.log("aborted");

            // return 
        }

        return request

    }, (err) => {

        return err
    })

    useEffect(() => {

        return () => {
            controller.abort("request Cancelled hook cleanup")
        }
    }, [location.pathname])

    return { api, controller }
}

export default useApi
