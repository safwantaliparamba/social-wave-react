import React, { useMemo, useState, useEffect } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import useClickOutside from "react-use-click-outside-hook"

import editPen from "/icons/pen.svg"
import useApi from '../../../hooks/useApi'
import profileIcon from "/icons/profile.svg"
import dropDark from "/icons/dropdown-dark.svg"
import dropLigh from "/icons/dropdown-light.svg"
import Loader from '../../../includes/loaders/Loader'
import { Button } from '../../../modals/auth/Emailverification'
import { DARK_PRIMARY, DARK_SECONDARY, HEADING, PRIMARY, SECONDARY } from '../../../constants/colors'
import Cropper from '../../../includes/extra/Cropper'
import { editUserData } from '../../../../store/authSlice'
import { toast } from 'react-toastify'


const ProfileSettings = () => {
    // Global state
    const { theme } = useSelector(state => state.ui)
    // Local state
    const [profileInputs, setInputs] = useState({
        name: "",
        username: "",
        bio: "",
        image: "",
        pronouns: "Don't specify",
        location: "India",
    })
    const [dropdowns, setDropdown] = useState({
        pronouns: false,
        editAction: false
    })
    const [isLoading, setLoading] = useState(false)
    const [toggleCropper, setImage] = useState({
        isShow: false,
        image: null,
        tempImage: null,
        isCropped: false,
    })
    const [apiResponse, setResponse] = useState({
        status: null,
        message: null,
    })
    // hooks
    const { api, controller } = useApi(true)
    const dispatch = useDispatch()

    // useEffect fetch functions
    const fetchProfile = () => {
        setLoading(true)

        api
            .get("/accounts/settings/profile/")
            .then(({ data: { statusCode, data: { data } } }) => {

                if (statusCode === 6000) {
                    setInputs({
                        name: data.name,
                        location: data.country,
                        pronouns: data.gender,
                        username: data.username,
                        bio: data.bio,
                        image: data.image
                    })
                }
                setLoading(false)
            })
            .catch(e => {
                console.log(e, "error occured while fetching profile");
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchProfile()

        return () => {
            controller.abort("request aborted")
        }
    }, [])

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
                        title: "He/Him"
                    },
                    {
                        id: nanoid(12),
                        title: "She/Her"
                    },
                    {
                        id: nanoid(12),
                        title: "They/Them"
                    },
                    {
                        id: nanoid(12),
                        title: "Other"
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

    const ImageEditActionModal = ({ }) => {
        const handler = () => setDropdown({ ...dropdowns, editAction: false })
        const modalRef = useClickOutside(handler, "image-edit-parent")

        const removeHandler = () => {
            setInputs({ ...profileInputs, image: null })
            setImage({ ...toggleCropper, image: "CANCELLED", isCropped: false })
        }

        const onImageChange = useMemo(() => (
            e => {

                if (e.target.files.length) {
                    let reader = new FileReader();

                    reader.onload = (e) => {
                        setImage({
                            ...toggleCropper,
                            isShow: true,
                            tempImage: e.target.result,
                        });
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            }
        ), [])

        return (
            <ActionModalWrapper
                ref={modalRef}
                onClick={e => e.stopPropagation()}
            >
                <DropdownItem
                    onClick={removeHandler}
                    theme={theme}
                >
                    <span>Remove Image</span>
                </DropdownItem>
                <DropdownItem theme={theme}>
                    <input
                        hidden
                        type="file"
                        id="profile-image"
                        onChange={onImageChange}
                    />
                    <label htmlFor="profile-image">Upload Image</label>
                </DropdownItem>
            </ActionModalWrapper>
        )
    }

    const cropperCloseHandler = () => setImage({ ...toggleCropper, isShow: false })

    const cropperSubmitHandler = (image = "") => setImage({ ...toggleCropper, isCropped: true, image, isShow: false })

    const saveHandler = () => {
        const { bio, name, username, pronouns } = profileInputs

        const params = {
            name,
            username,
            bio,
            gender: pronouns,
            cropped_image: toggleCropper.image
        }

        api
            .post("/accounts/settings/profile/edit/", params)
            .then(({ data: { statusCode, data: { data, message } } }) => {

                if (statusCode === 6000) {
                    dispatch(editUserData({
                        name: data.name,
                        username: data.username,
                        image: data.thumbnail,
                    }))
                    setResponse({
                        status: "SUCCESS",
                        message,
                    })
                    // toast.success("Public profile updated successfully") 
                } else {
                    setResponse({
                        status: "ERROR",
                        message,
                    })
                }
            })
            .catch((e) => {
                console.log(e, "Error occured");
            })
    }
    const closeStatusDialog = () => {
        setResponse({ status: null })
    }

    return (
        <Wrapper>
            {
                toggleCropper.isShow && (
                    <Cropper
                        image={toggleCropper.tempImage}
                        closeHandler={cropperCloseHandler}
                        submitHandler={cropperSubmitHandler}
                    />
                )
            }
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {
                            apiResponse.status && (
                                <ErrorContainer
                                    className={apiResponse.status.toLowerCase()}
                                >
                                    <p>{apiResponse.message}</p>
                                    <span
                                        onClick={closeStatusDialog}
                                    >
                                        x
                                    </span>
                                </ErrorContainer>
                            )
                        }
                        <Top>
                            <h1>Public Profile</h1>
                            <Button
                                className="save"
                                onClick={saveHandler}
                            >
                                Save
                            </Button>
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
                                    {
                                        toggleCropper.isCropped ? (
                                            <img src={toggleCropper.image} alt="" />
                                        ) : (
                                            <img
                                                src={profileInputs.image ?? profileIcon}
                                                alt=""
                                            />
                                        )
                                    }
                                    <EditButton>
                                        <div className="wrapp"
                                            id='image-edit-parent'
                                            onClick={e => {
                                                setDropdown({ ...dropdowns, editAction: !dropdowns.editAction })
                                            }}
                                        >
                                            <img src={editPen} alt="" />
                                            <span>
                                                Edit
                                            </span>
                                            {
                                                dropdowns.editAction && (
                                                    <ImageEditActionModal />
                                                )
                                            }
                                        </div>
                                    </EditButton>
                                </ProfileImageWrapper>
                            </Right>
                        </Content>
                    </>
                )
            }

        </Wrapper>
    )
}

export default ProfileSettings

const Wrapper = styled.section`
    padding: 22px;
`
const Top = styled.header`
    margin-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;

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

        &:disabled{
            cursor: not-allowed;
        }
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
    label,span{
        cursor: pointer;
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

    .wrapp{
        position: relative;
        border-radius: 6px;
        cursor: pointer;
        background-color:${DARK_SECONDARY};
        border: 1px solid ${PRIMARY};
        padding: 6px 18px;
        display: flex;
        align-items: center;
        gap: 4px;

        span,label{
            font-size: 14px;
            color: ${PRIMARY};
            font-family: gordita_regular;
        }
        img{
            border-radius: 0;
            width: 12px;
        }
    }
`

const ActionModalWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 35px;
    width: 150px;
    border: 1px solid ${SECONDARY};
    background: ${DARK_PRIMARY};
    padding: 4px;
    border-radius: 6px;
    max-height: 100px;
    overflow-y: scroll;
`

const ErrorContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    border: 1px solid ;
    padding:  18px;
    border-radius: 8px;
    margin-bottom: 22px;

    &.error{
        border-color: #ff9292;
        
        p,span{
            color: #ff9292;
        }
    }
    &.success{
        border-color: #a2ffb1;
        
        p,span{
            color: #a2ffb1;
        }
    }
    p{
        font-size: 15px;
    }
    span{
        font-size: 14px;
        cursor: pointer;
    }
`