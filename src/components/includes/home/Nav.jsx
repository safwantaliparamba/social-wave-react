import React from 'react'

import { styled } from 'styled-components'

import Header from './includes/Header'
import LeftSideBar from './includes/LeftSideBar'
import RightSideBar from './includes/RightSideBar'


const Nav = ({ children }) => { 
    return (
        <MainWrapper>
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
`

const MainHomeWrapper = styled.div`
    width: 80%;
    border: 1px solid #111;
`
const HomeWrapper = styled.div`
    display: flex;
`

const Home = styled.div`
    width: 75%;
    min-height: 70vh;
`