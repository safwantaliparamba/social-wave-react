import { useEffect } from "react"


const useHandleScroll = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])
}

export default useHandleScroll
