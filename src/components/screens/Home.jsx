import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | SocialWaves</title>
            </Helmet>
            <Wrapper>
                <h1>Home</h1>
            </Wrapper>
        </>
    )
}

export default Home

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    h1{
        font-size: 28px;
        color: #fff;
    }
`