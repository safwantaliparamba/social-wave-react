import React from 'react'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { keyframes, styled } from 'styled-components'

import BaseModal from '../modals/base/BaseModal'
import settingsDark from "/icons/settings-dark.svg"
import settingsLight from "/icons/settings-light.svg"


const Settings = () => {
    const { theme } = useSelector(state => state.ui)
    const navigate = useNavigate()

    const closeHandler = () => navigate("/")

    return (
        <BaseModal
            onClick={closeHandler}
        >
            <Modal theme={theme} onClick={e => e.stopPropagation()}>
                <Header>
                    <img src={theme === "DARK" ? settingsLight : settingsLight} alt="" />
                    <h1>Settings</h1>
                </Header>
                <MainContent>
                    <LeftNav>
                        <h1>aside</h1>
                    </LeftNav>
                    <Content></Content>
                </MainContent>
            </Modal>
        </BaseModal>
    )
}

export default Settings;


const popup = keyframes`
    0%{
        scale: 0.7;
        opacity: 0.7;
    }
    100%{
        scale: 1;
        opacity: 1;
    }
`;

const Modal = styled.main`
    width: 85%;
    max-width: 95%;
    height: 85vh;
    /* padding: 22px 42px; */
    border-radius: 12px;
    animation: ${popup} 0.4s ease-in-out;

    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
    border: 1px solid ${({ theme }) => theme === "DARK" ? "#D9D9D9a6" : "#222"};
    /* border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"}; */
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 42px;
    border-bottom: 1px solid #d9d9d9a6;

    img{
        width: 16px;
    }
    h1{
        font-size: 22px;
        color: #d7d7d7;
    }
`

const MainContent = styled.section`
    display: flex;
`

const LeftNav = styled.aside`
    width: 20%;
    height: calc(85vh - 77px);
    border-right: 1px solid #d9d9d9a6;
`

const Content = styled.main`
    width: 80%;
`