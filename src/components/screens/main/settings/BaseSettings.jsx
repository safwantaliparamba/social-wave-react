import React from 'react'

import { useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { keyframes, styled } from 'styled-components'

import BaseModal from '../../../modals/base/BaseModal'
import settingsDark from "/icons/settings-dark.svg"
import settingsLight from "/icons/settings-light.svg"
import { useMemo } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { isPathnameEqual } from '../../../functions'
import { useEffect } from 'react'
import { useState } from 'react'


const BaseSettings = ({ prevLocation = "/" }) => {
    const { theme } = useSelector(state => state.ui)

    const navigate = useNavigate()

    const closeHandler = () => {
        navigate(prevLocation ?? "/")
    }

    const navItems = useMemo(() => (
        [
            {
                id: nanoid(12),
                title: "Public Profile",
                url: "profile",
            },
            {
                id: nanoid(12),
                title: "Accounts",
                url: "accounts",
            },
            {
                id: nanoid(12),
                title: "Sessions",
                url: "sessions",
            },
            {
                id: nanoid(12),
                title: "Security",
                url: "security",
            },
        ]
    ), [])

    return (
        <BaseModal
            onClick={closeHandler}
        >
            <Modal
                theme={theme}
                onClick={e => e.stopPropagation()}
            >
                <Header>
                    <img src={theme === "DARK" ? settingsLight : settingsLight} alt="" />
                    <h1>Settings</h1>
                </Header>
                <MainContent>
                    <LeftNav>
                        <Items>
                            {
                                navItems.map(item => (
                                    <Item
                                        key={item.id}
                                        theme={theme}
                                        onClick={e => navigate(`/settings/${item.url}`)}
                                        className={isPathnameEqual(`/settings/${item.url}`) ? "active" : ""}
                                    >
                                        <span>{item.title}</span>
                                    </Item>
                                ))
                            }
                        </Items>
                    </LeftNav>
                    <Content>
                        <Outlet />
                    </Content>
                </MainContent>
            </Modal>
        </BaseModal>
    )
}

export default BaseSettings;


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
    /* border-right: 1px solid #d9d9d9a6; */
`

const Content = styled.main`
    width: 80%;
    padding: 8px;
    max-height: calc(85vh - 77px);
    overflow-y: scroll;
`

const Items = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 16px;
`
const Item = styled.div`
    padding: 12px 0 ;
    margin: 0 6px;
    padding: 12px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    gap: 18px;
    cursor: pointer;
    /* border: 1px solid transparent; */
    transition: all 0.3s ease-in-out;
    border-radius: 8px;

    &:hover, 
    &.active{
        background:  ${({ theme }) => theme === "DARK" ? "#8080801a" : "#fff"};
        /* border-color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#808080"}; */
    }
    span{
        font-size: 14px;
        color: #fff;
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
    }

    span.count{
        font-size: 14px;
        // color: red;
        font-weight: 600;
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
        /* color: ${({ theme }) => theme === "DARK" ? "#d9d7d7" : "#111"}; */
    }
`