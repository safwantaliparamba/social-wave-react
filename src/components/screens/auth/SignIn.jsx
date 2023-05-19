import React, { useEffect, useState } from 'react'

import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// import { env } from '../../../App';
import { changeTheme } from '../../../store/uiSlice';
import curveIcon from "../../../assets/icons/curve.svg"
import logoLight from "../../../assets/icons/logo-light.svg"
import logoDark from "../../../assets/icons/logo-dark.svg"
import eyeIcon from "../../../assets/icons/eye.svg"
import hideEyeIcon from "../../../assets/icons/hide-eye.svg"
import googleLogo from "../../../assets/images/google-logo.svg"
import { Link } from 'react-router-dom';



const SignIn = ({ type = "SIGNUP" }) => {
    const theme = useSelector(state => state.ui.theme)
    const dispatch = useDispatch()
    const inputsInitialState = {
        name: "",
        email: "",
        password: "",
    }

    const [isShow, setShow] = useState(false)
    const [inputs, setInputs] = useState({ ...inputsInitialState })

    useEffect(() => {
        setInputs({...inputsInitialState})
    }, [location.pathname])

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const toggleTheme = () => {
        theme === "DARK" ? dispatch(changeTheme({ theme: "LIGHT" })) : dispatch(changeTheme({ theme: "DARK" }))
    }

    const toggleShow = () => {
        setShow(!isShow)
    }

    return (
        <Wrapper theme={theme}>
            <Top id='top-head'>
                <div className="left">
                    <img src={theme === "DARK" ? logoDark : logoLight} alt="logo" onClick={toggleTheme} />
                </div>
            </Top>
            <FormContainer>
                <Box theme={theme}>
                    <Header>
                        <h1> {type === "SIGNUP" ? "SIGN UP" : "SIGN IN"}</h1>
                    </Header>
                    <Form>
                        <InputContainer theme={theme}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Email" onChange={onChange} value={inputs.email} />
                        </InputContainer>
                        {type === "SIGNUP" && (
                            <InputContainer theme={theme}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Name" onChange={onChange} value={inputs.name} />
                            </InputContainer>
                        )}
                        <InputContainer theme={theme}>
                            <label htmlFor="password">Password </label>
                            <div className="input-container">
                                <input type={!isShow ? "password" : "text"} id="password" name="password" placeholder="Password" onChange={onChange} value={inputs.password} />
                                <img src={!isShow ? eyeIcon : hideEyeIcon} alt="" onClick={toggleShow} />
                            </div>
                        </InputContainer>
                        <SubmitButton>
                            Continue
                        </SubmitButton>
                    </Form>
                    <OtherSection>
                        <div className="top">
                            <span className="or">
                                or
                            </span>
                            <SubmitButton className="google">
                                <img src={googleLogo} alt="google logo" />
                                <span>continue with google</span>
                            </SubmitButton>
                        </div>
                        <div className="bottom">
                            <span className='or new'>
                                {type === "SIGNUP" ? (
                                    <> Already a member ? <Link to="/sign-in">Sign In </Link></>
                                ) : (
                                    <> New to <span>Social</span>Waves ? <Link to="/sign-up">Sign Up </Link></>
                                )}
                            </span>
                        </div>
                    </OtherSection>
                </Box>
            </FormContainer>
        </Wrapper>
    )
}

export default SignIn

const Wrapper = styled.section`
    background: url(${curveIcon}) no-repeat center center;
    background-position: 0 300px;
    /* background-size: 100%; */
    background-color:${({ theme }) => theme === "DARK" ? "#0d0d0d" : "#fff"} ;
`

const Top = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 22px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left img{
        cursor: pointer;
    }
`

const Box = styled.div`
    width: 440px;
    max-width: 90%;
    background-color:   ${({ theme }) => theme === "DARK" ? "#b8d7ca" : "#dbf2de"};
    border: 1px solid #004c64;
    border-radius: 10px;
    padding: 32px;
    box-shadow: 0px 0px 27px -8px rgba(0, 0, 0, 0.42);
    transition: all 0.4s ease-in-out;
`
const Header = styled.div`
    padding: 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    h1{
        font-size: 24px;
        /* font-weight: 600; */
        font-family: gordita_bold;
    }

    @media screen and (max-width: 380px) {
        h1{
            font-size: 20px;
        }
    }
`

const FormContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 85px );
`

const Form = styled.main`
    
`
const InputContainer = styled.div`
    margin-bottom: 16px;

    label{
        display: block;
        width: 100%;
        margin-bottom: 6px;
        cursor: pointer;
        font-size: 16px;
        color: #004c64;
        font-weight: 600;
    }
    input,.input-container{
        display: block;
        width: 97%;
        font-family: gordita_regular;
        margin: 0 auto;
        padding: 6px 16px;
        border: 1px solid #004c64;
        border-radius: 12px;
        font-size: 16px;
        background-color: #fff;
        color: #004c64;
        /* color: ${({ theme }) => theme === "DARK" ? "#fff" : "#004c64"}; */
        /* background-color: ${({ theme }) => theme === "DARK" ? "#363636ac" : "#fff"}; */
        font-weight: 500;
    }
    .input-container{
        /* padding: 0; */
        display: flex;
        align-items: center;
        justify-content: space-between;

        input{
            padding: 0;
            border: none;
            flex: 1;
            background: none;
            border-radius: 0;
        }
        img{
            width: 20px;
            cursor: pointer;
        }
    }
`

export const SubmitButton = styled.button`
    width: 97%;
    display: block;
    margin: 0 auto;
    padding: 9px;
    background-color: #004C64;
    border-radius: 12px;
    margin-top: 38px;
    font-size: 19px;
    color: #fff;
    cursor: pointer;
    font-family: gordita_regular;

    &.google{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 6px 18px;
        background-color: #fff;
        border: 1px solid #137cfb;
        margin: 0 auto;

        img{
            width: 32px;
        }
        span{
            font-family: gordita_regular;
            color: #137cfb;
            font-size: 18px;
            font-weight: 600;
        }
    }
`

const OtherSection = styled.div`
        span.or{
            display: block;
            text-align: center;
            margin: 18px 0;
            color: #004C64;

            &.new{
                font-size: 16px;
                margin: 9px 0;

                span{
                    font-size: 17px;
                    font-weight: 600;
                    color: inherit;
                }
            }
        }
    .bottom{
        span{
            a{
                color: #004C64;
                font-weight: 600;
            }
        }
    }
`