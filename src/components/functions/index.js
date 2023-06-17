import { getItem, logout } from "../../store/authSlice"
import useAuthApi from "../hooks/useAuthApi"


//logout method
export const logoutHandler = (dispatch) => {
    const { authApi } = useAuthApi()
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

// function to trim text based on maxlength
export function trimText(text = "", maxLength = 10) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.slice(0, maxLength).trim() + '...';
    }
}

// Function to check if string is equal to location.pathname
export function isPathnameEqual(string, pathname = location.pathname) {
    // Remove the trailing '/' from the pathname
    const trimmedPathname = pathname.replace(/\/$/, '');

    // Check if the trimmed pathname is equal to the provided string
    return trimmedPathname === string;
}

// Function to slice number
export function sliceNumber(number = 0, maxLength = 99) {

    if (+number > +maxLength) {
        return `${maxLength}+`;
    }
    
    return number.toString();
}