import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import useClickOutside from 'react-use-click-outside-hook'

import Loader from '../includes/loaders/Loader'


const SearchResults = ({ closeHandler = () => { }, isLoading = false, users = [] }) => {
    const { theme } = useSelector(state => state.ui)

    const modalRef = useClickOutside(closeHandler, "search-input")

    return (
        <Wrapper theme={theme} ref={modalRef}>
            {isLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <ContentWrapper>

                </ContentWrapper>
            )}
        </Wrapper>
    )
}

export default SearchResults

const Wrapper = styled.section`
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    min-height: 300px;
    border-radius: 12px;
    border: 1px solid #fff;
    background-color: ${({ theme }) => theme === "DARK" ? "rgb(22 22 25)" : "#fff"};
    /* border: 1px solid ${({ theme }) => theme === "DARK" ? "rgb(38,39,42)" : "transparent"}; */
`
const LoaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 300px;

    *{
        scale: .7;
    }
`

const ContentWrapper = styled.div`
    
`