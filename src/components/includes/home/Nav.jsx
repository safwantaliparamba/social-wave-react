import React from 'react'

import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

import Header from './includes/Header'
import LeftSideBar from './includes/LeftSideBar'
import RightSideBar from './includes/RightSideBar'


const Nav = ({ children }) => {
    const { theme } = useSelector(state => state.ui)

    window.addEventListener("beforeunload",(e)=>{
        e.preventDefault()
        
        console.log('tried to close the tab');
    })

    return (
        <MainWrapper theme={theme}>
            <LeftSideBar />
            <MainHomeWrapper>
                <Header />
                <HomeWrapper>
                    <Home theme={theme}>
                        {children}
                    </Home>
                    {/* <RightSideBar /> */}
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
    width: 82%;
    /* border: 1px solid #111; */
`
const HomeWrapper = styled.div`
    display: flex;
`

const Home = styled.div`
    min-height: calc(100vh - 136px);
    max-height: calc(100vh - 136px);
    /* width: 78%; */
    width: 100%;
    margin-bottom: 12px;
    margin-right: 12px;
    overflow-y: auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.2) inset;
    transition: all 0.5s ease-in-out;
    border: 1px solid ${({theme}) => theme === "DARK" ? "rgb(38,39,42)": "transparent"};
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(27 28 31)" : "#a0a0a045"};
`