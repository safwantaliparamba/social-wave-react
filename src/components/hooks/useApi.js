import axios from "axios"
import { useEffect } from "react"
import useCurrentSession from "./useCurrentSession"


const Url = "http://localhost:8000/api/v1"

const useApi = (auth = false, URL=Url) => {
    const api = axios.create({
        baseURL: URL,
    })
    const controller = new AbortController();

    if (auth) {
        api.interceptors.request.use((request) => {
            const activeSession = useCurrentSession()

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
            }

            return request

        }, (err) => {

            return err
        })
    }


    useEffect(() => {

        return () => {
            controller.abort("request Cancelled by hook cleanup function")
        }
    }, [location.pathname])

    return { api, controller }
}

export default useApi
