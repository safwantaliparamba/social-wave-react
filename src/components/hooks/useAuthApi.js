import axios from "axios"
import { useEffect } from "react"
import { getItem } from "../functions"


const URL = "http://localhost:8000/api/v1"


const useAuthApi = () => {
    const authApi = axios.create({
        baseURL: URL,
    })
    const controller = new AbortController();

    // middleware to add accessToken as auth credential
    authApi.interceptors.request.use((request) => {
        // get access token which we stored in localStorage

        const activeIndex = getItem("activeIndex");
        const sessions = JSON.parse(getItem("sessions"));

        const activeSession = sessions[activeIndex];

        const sessionId = activeSession?.sessionId
        const accessToken = activeSession?.accessToken

        request = {
            ...request,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            signal: controller.signal,
            params: {
                session_id: sessionId ?? null,
            },
        }

        if (controller.signal.aborted) {
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

    return { authApi, controller }
}

export default useAuthApi
