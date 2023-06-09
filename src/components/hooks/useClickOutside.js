//custom hook for handle outside click
import { useEffect, useRef } from "react"


const useClickOutside = (handler = () => { }, parentRef = null) => {
    const itemRef = useRef()

    useEffect(() => {

        const eventHandler = (e) => {
            if (!itemRef?.current?.contains(e.target) && !parentRef?.contains(e.target)) {
                handler();
            }
        }

        document.addEventListener('mousedown', eventHandler)

        return () => {
            document.removeEventListener('mousedown', eventHandler)
        }
    })

    return itemRef
}

export default useClickOutside;