import React from 'react'
import { styled } from 'styled-components'


const Header = ({ }) => {
    return (
        <HeaderContainer>

        </HeaderContainer>
    )
}


const SideBar = ({ }) => {
    return (
        <SideBarContainer>

        </SideBarContainer>
    )
}

const RightSideBar = ({ }) => {
    return (
        <RightSideBarContainer>

        </RightSideBarContainer>
    )
}

const Nav = ({ children }) => { 
    return (
        <MainWrapper>
            <SideBar />
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
    width: 85%;
`

const SideBarContainer = styled.div`
    width: 20%;
    border: 1px solid #111;
`
const HeaderContainer = styled.div`
    height: 100px;
    border: 1px solid #111;
`
const RightSideBarContainer = styled.div`
    width: 15%;
    border: 1px solid #111;
`