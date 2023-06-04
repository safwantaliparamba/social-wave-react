import axios from "axios";


const URL = "http://localhost:8000/api/v1"

const api = axios.create({
    baseURL: URL
})

const authApi = axios.create({
    baseURL: URL,
})

// middleware to add accessToken as auth credential
authApi.interceptors.request.use((request) => {
    // get access token which we stored in localStorage
    const accessToken = localStorage.getItem("accessToken");

    request.headers.Authorization = `Bearer ${accessToken}`

    return request
})

export default api
export { authApi }