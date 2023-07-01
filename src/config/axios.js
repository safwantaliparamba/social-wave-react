



///////////////////////////////////////////////////////////////////////

//        Look at ./components/hooks/useApi.js for axios instances

///////////////////////////////////////////////////////////////////////







// import axios from "axios";
// import { getItem } from "../store/authSlice";

// const URL = "http://localhost:8000/api/v1"

// const api = axios.create({
//     baseURL: URL
// })

// const authApi = axios.create({
//     baseURL: URL,
// })

// // middleware to add accessToken as auth credential
// authApi.interceptors.request.use((request) => {
//     // get access token which we stored in localStorage
//     const sessionId = getItem("sessionId")
//     const accessToken = getItem("accessToken");

//     request.headers.Authorization = `Bearer ${accessToken}`
//     request.params = {
//         session_id: sessionId ?? null,
//     }

//     return request
// })

// export default api
// export { authApi }