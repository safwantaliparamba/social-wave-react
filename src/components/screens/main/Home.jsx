import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Outlet } from "react-router-dom"
// import { useSelector } from 'react-redux'

import CreatePost from '../../includes/home/posts/CreatePost'
import Image from '../../includes/extra/Image'


const Home = () => {
    // const { theme } = useSelector(state => state.ui)

    return (
        <>
            <Helmet>
                <title>Home | SocialWaves</title>
            </Helmet>
            <Wrapper>
                <CreatePost />
                <Image
                    image="http://localhost:8000/media/accounts/profile/Safwan_P_ruRGUam.png"
                    thumbImage="http://localhost:8000/media/accounts/thumb/ecd8e47b-3fe5-453e-9c71-6f5fdf84cba6.jpeg"
                />
            </Wrapper>
            <Outlet />
        </>
    )
}

export default Home

const Wrapper = styled.section`

`