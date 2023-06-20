import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Outlet } from "react-router-dom"
// import { useSelector } from 'react-redux'

import CreatePost from '../includes/home/posts/CreatePost'


const Home = () => {
    // const { theme } = useSelector(state => state.ui)

    return (
        <>
            <Helmet>
                <title>Home | SocialWaves</title>
            </Helmet>
            <Wrapper>
                <CreatePost />
            </Wrapper>
            <Outlet />
        </>
    )
}

export default Home

const Wrapper = styled.section`

`