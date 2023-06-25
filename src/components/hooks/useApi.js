import axios from "axios"
import { useEffect } from "react"
import { getItem } from "../functions"


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
    
        request = {
            ...request,
            signal: controller.signal,
            params: {
                session_id: sessionId ?? null,
            } 
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
