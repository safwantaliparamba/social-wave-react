import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import useClickOutside from 'react-use-click-outside-hook'

import Loader from '../includes/loaders/Loader'


const SearchResults = ({ closeHandler = () => { }, isLoading = false, users = [] }) => {
    // Global state
    const { theme } = useSelector(state => state.ui)

    // Third party hooks
    const modalRef = useClickOutside(closeHandler, "search-input")

    return (
        <Wrapper theme={theme} ref={modalRef}>
            {isLoading ? (
                <LoaderWrapper>
                    <Loader />
                </LoaderWrapper>
            ) : (
                <ContentWrapper>
                    {
                        users.map((user, i) => (
                            <UserContainer
                                key={user.id}
                                className='focusable'
                                tabIndex={0}
                                onKeyDown={e => {
                                    if (e.key === "Enter") {
                                        // console.log(user.id);
                                    }
                                }}
                            >
                                <LeftContainer>
                                    <img src={user.image} alt="user-profile" />
                                    <div className="details">
                                        <span className='name'>{user.username}</span>
                                        <span className="username">@{user.username}</span>
                                    </div>
                                </LeftContainer>
                                <FollowButton
                                    className={['focusable ', user.isFollowing ? " unfollow " : ""]}
                                    tabIndex={0}
                                    onClick={e => {
                                        e.stopPropagation()
                                        // console.log(`following ${user.username}`);
                                    }}
                                >
                                    {user.isFollowing ? "Unfollow" : "Follow"}
                                </FollowButton>
                            </UserContainer>
                        ))
                    }
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
    max-height: 300px;
    border-radius: 12px;
    border: 1px solid #fff;
    overflow-y: scroll;
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

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 22px;
    cursor: pointer;
    border: 1px solid transparent;

    &:active, &:focus-within, &:hover{
        /* border-color:#8080805d; */
        background-color:#212121;
    }
`
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    img{
        width: 35px;
        border-radius: 50%;
    }
    .details{
        display: flex;
        flex-direction: column;
        span.username{
            font-size: 14px;
            color: #808080;
        }
        span.name{
            font-size: 16px;
        }
    }
`
const FollowButton = styled.button`
    width: 74px;
    padding: 7px 0 !important;
    border: 1px solid #7d67ff;
    color: #7d67ff;
    font-weight: 600;
    border-radius: 9px;
    transition: all 0.3s ease-in-out;

    &.unfollow{
        border-color: #ff4b4b;
        color: #ff4b4b;
    }

    &:focus, &:hover{
        background-color: #7d67ff;
        color: #fff;

        &.unfollow{
            background-color: #ff4b4b;
        }
    }
`