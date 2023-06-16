import React from 'react'

import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

import Header from './includes/Header'
import LeftSideBar from './includes/LeftSideBar'
import RightSideBar from './includes/RightSideBar'


const Nav = ({ children }) => {
    const { theme } = useSelector(state => state.ui)

    return (
        <MainWrapper theme={theme}>
            <LeftSideBar />
            <MainHomeWrapper>
                <Header />
                <HomeWrapper>
                    <Home>
                        {children}
                    </Home>
                    <RightSideBar />
                </HomeWrapper>
            </MainHomeWrapper>
        </MainWrapper>
    )
}

export default Nav


const MainWrapper = styled.section`
    display: flex;
    height: 100vh;
    transition: all 0.3s ease-in-out;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
`

const MainHomeWrapper = styled.div`
    width: 80%;
    /* border: 1px solid #111; */
`
const HomeWrapper = styled.div`
    display: flex;
`

const Home = styled.div`
    width: 75%;
    /* min-height: calc(100vh - 124px); */
    max-height: calc(100vh - 124px);
    /* height: 1200px; */
    overflow-y: auto;
`