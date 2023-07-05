import React, { useMemo, useState } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { styled } from 'styled-components'
import { useSelector } from 'react-redux'
import useClickOutside from "react-use-click-outside-hook"

import dropDark from "/icons/dropdown-dark.svg"
import dropLigh from "/icons/dropdown-light.svg"
import editPen from "/icons/pen.svg"
import useCurrentSession from '../../../hooks/useCurrentSession'
import { DARK_PRIMARY, DARK_SECONDARY, HEADING, PRIMARY, SECONDARY } from '../../../constants/colors'


const ProfileSettings = () => {
    // Global state
    const { theme } = useSelector(state => state.ui)
    // Local state
    const [profileInputs, setInputs] = useState({
        name: "",
        username: "",
        bio: "",
        pronouns: "Don't specify",
        location: "India",
    })
    const [dropdowns, setDropdown] = useState({
        pronouns: false
    })
    // hooks
    const { image } = useCurrentSession()

    // local variables
    const inputsSkelton = useMemo(() => (
        [
            {
                id: nanoid(12),
                label: "Name",
                slug: "name",
            },
            {
                id: nanoid(12),
                label: "Username",
                slug: "username",
            },
            {
                id: nanoid(12),
                label: "Bio",
                slug: "bio",
            },
            {
                id: nanoid(12),
                label: "Pronouns",
                slug: "pronouns",
                isDropdown: true,
                options: [
                    {
                        id: nanoid(12),
                        title: "Don't specify"
                    },
                    {
                        id: nanoid(12),
                        title: "he/him"
                    },
                    {
                        id: nanoid(12),
                        title: "she/her"
                    },
                    {
                        id: nanoid(12),
                        title: "they/them"
                    },
                    {
                        id: nanoid(12),
                        title: "other"
                    },
                ]
            },
            {
                id: nanoid(12),
                label: "Location",
                slug: "location",
                isDisabled: true,
            },
        ]
    ), [])

    // local functions
    const onChangeHandler = e => {
        setInputs({ ...profileInputs, [e.target.name]: e.target.value })
    }

    const toggleDropdown = (slug) => {
        setDropdown({ ...dropdowns, [slug]: !dropdowns[slug] })
    }

    const dropdownSelectHandler = (slug = "", selectedTitle = "") => {
        setInputs({ ...profileInputs, [slug]: selectedTitle })
    }

    // Inner Component
    const DropdownModal = ({ options = [], slug = "", selecter = (slug = "", selected = "") => { }, closeHandler = () => { } }) => {
        const modalRef = useClickOutside(closeHandler, slug)

        return (
            <DropdownContainer
                ref={modalRef}
                onClick={e => e.stopPropagation()}
            >
                {
                    options
                        .map(option => (
                            <DropdownItem
                                theme={theme}
                                key={option.id}
                                onClick={() => {
                                    selecter(slug, option.title)
                                    closeHandler()
                                }}
                                className={profileInputs[slug] === option.title ? "active" : ""}
                            >
                                <span>{option.title}</span>
                            </DropdownItem>
                        ))
                }
            </DropdownContainer>
        )
    }

    return (
        <Wrapper>
            <Top>
                <h1>Public Profile</h1>
            </Top>
            <Content>
                <Left>
                    {
                        inputsSkelton.map(input => (
                            <InputContainer
                                key={input.id}
                            >
                                <label htmlFor={input.slug}>{input.label}</label>
                                {"isDropdown" in input ? (
                                    <div
                                        className="input-container dropdown"
                                        onClick={() => toggleDropdown(input.slug)}
                                        id={input.slug}
                                    >
                                        <span>{profileInputs[input.slug]}</span>
                                        <img src={theme === "DARK" ? dropLigh : dropDark} alt="" />
                                        {
                                            dropdowns[input.slug] && (
                                                <DropdownModal
                                                    slug={input.slug}
                                                    options={input.options}
                                                    closeHandler={() => toggleDropdown(input.slug)}
                                                    selecter={dropdownSelectHandler}
                                                />
                                            )
                                        }
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        id={input.slug}
                                        name={input.slug}
                                        placeholder={input.label}
                                        onChange={onChangeHandler}
                                        value={profileInputs[input.slug]}
                                        disabled={"isDisabled" in input ? input.isDisabled : false}
                                    />
                                )}
                            </InputContainer>
                        ))
                    }
                </Left>
                <Right>
                    <ProfileImageWrapper>
                        <img src="http://localhost:8000/media/accounts/profile/git_u3g5KXD.jpg" alt="" />
                        <EditButton>
                            <img src={editPen} alt="" />
                            <span>
                                Edit
                            </span>
                        </EditButton>
                    </ProfileImageWrapper>
                </Right>
            </Content>
        </Wrapper>
    )
}

export default ProfileSettings

const Wrapper = styled.section`
    padding: 22px;
`

const Top = styled.header`
    margin-bottom: 32px;
    h1{
        font-size: 20px;
        color: ${HEADING};
    }
`
const Content = styled.div`
    display: flex;
    gap: 8px;
`

const Left = styled.main`
    width: 60%;
`

const Right = styled.aside`
    width: 40%;
    padding: 16px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    label{
        font-size: 16px;
        color: ${HEADING};
        margin-bottom: 8px;
    }
    input,.input-container{
        background-color: ${DARK_SECONDARY};
        color: ${PRIMARY};
        font-size: 14px;
        width: 97%;
        padding: 6px 12px;
        border-radius: 6px;
        border: 1px solid ${SECONDARY};
    }
    .input-container{
        span{
            font-size: 14px;
            color: ${PRIMARY};
        }
    }
    .dropdown{
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        position: relative;

        span{
            flex: 1;
        }
        img{
            width: 16px;
        }
    }
`

const DropdownContainer = styled.div`
    position: absolute;
    left: 0;
    top: 35px;
    width: 100%;
    border: 1px solid ${SECONDARY};
    background: ${DARK_PRIMARY};
    padding: 4px;
    border-radius: 6px;
    max-height: 100px;
    overflow-y: scroll;
`
const DropdownItem = styled.div`
    padding: 4px;
    transition: all 0.3s ease-in-out;

    &:hover, &.active{
        background:  ${({ theme }) => theme === "DARK" ? "#8080801a" : "#fff"};
    }
`

const ProfileImageWrapper = styled.div`
    position: relative;

    img{
        width: 60%;
        margin: 0 auto;
        border-radius: 50%;
    }
`
const EditButton = styled.button`
    position: absolute;
    left: 35%;
    bottom: -10px;
    border-radius: 6px;
    cursor: pointer;
    background-color:${DARK_SECONDARY};
    border: 1px solid ${PRIMARY};
    padding: 6px 18px;
    display: flex;
    align-items: center;
    gap: 4px;

    span{
        font-size: 14px;
        color: ${PRIMARY};
        font-family: gordita_regular;
    }
    img{
        border-radius: 0;
        width: 12px;
    }
`