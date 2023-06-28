import React from 'react'
import { useSelector } from 'react-redux'


const useCurrentSession = () => {
    const { activeIndex, sessions } = useSelector(state => state.auth)

    return sessions[activeIndex]
}

export default useCurrentSession
