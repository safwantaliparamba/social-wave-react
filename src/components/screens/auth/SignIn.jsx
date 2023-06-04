import React, { useEffect, useState } from 'react'

import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// import { env } from '../../../App';
import curveIcon from "../../../assets/icons/curve.svg"
import closeIcon from "../../../assets/icons/close.svg"
import eyeIcon from "../../../assets/icons/eye.svg"
import hideEyeIcon from "../../../assets/icons/hide-eye.svg"
import googleLogo from "../../../assets/images/google-logo.svg"
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../includes/ToggleTheme';
import api from '../../../config/axios';
import { login } from '../../../store/authSlice';



const SignIn = ({ type = "SIGNUP" }) => {
    const theme = useSelector(state => state.ui.theme)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const inputsInitialState = {
        name: "",
        email: "chief@socialwaves.com",
        password: "Password",
    }
    const [errorMessage, setErrorMessage] = useState("")
    const [isError, setError] = useState("")
    const [isShow, setShow] = useState(false)
    const [inputs, setInputs] = useState({ ...inputsInitialState })

    useEffect(() => {
        setInputs({ ...inputsInitialState })
    }, [location.pathname])

    const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const toggleShow = () => setShow(!isShow)

    const closeErrorMessage = () => setError("close")

    const SignInHandler = () => {
        var url = "/accounts/sign-in/"

        api
            .post(url, { ...inputs })
            .then((res) => {
                const { statusCode, data } = res.data

                if (statusCode === 6000) {
                    dispatch(login({
                        name: data.name ?? "",
                        email: data.email,
                        accessToken: data.access,
                        refreshToken: data.refresh,
                        username: data.username ?? "",
                        sessionId: data.session_id,
                    }))
                    navigate("/")
                } else {
                    setError("active")
                    setErrorMessage(data.message)
                }
            })
    }

    const SignupHandler = ()=>{

    }

    return (
        <Wrapper theme={theme}>
            <Top id='top-head' theme={theme}>
                <div className="left">
                    {/* <img src={theme === "DARK" ? logoDark : logoLight} alt="logo" /> */}
                    <h1>Buy me a coffee</h1>
                </div>
                <ThemeToggle />
            </Top>
            <FormContainer>
                <Box theme={theme}>
                    <Header>
                        <h1> {type === "SIGNUP" ? "SIGN UP" : "SIGN IN"}</h1>
                    </Header>
                    <Form>
                        <ErrorMessageContainer
                            className={isError}
                        >
                            <span>{errorMessage}</span>
                            <img
                                src={closeIcon}
                                alt=""
                                onClick={closeErrorMessage}
                            />
                        </ErrorMessageContainer>
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
                        <SubmitButton onClick={type === "SIGNIN" ? SignInHandler : SignupHandler}>
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
                                    <> Don't have an account? <Link to="/sign-up">Sign Up </Link></>
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
    background-color:${({ theme }) => theme === "DARK" ? "#262626" : "#fff"} ;
    /* background-color:${({ theme }) => theme === "DARK" ? "#0d0d0d" : "#fff"} ; */

    &,*{
        transition: all 0.5s ease-in-out;
    }
`

const Top = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 22px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left h1{
        font-size: 24px;
        font-weight: 600;
        color: ${({ theme }) => theme === "DARK" ? "#fff" : "#111"};
    }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(-20px);
	display: none;
  }
`;
const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const ErrorMessageContainer = styled.div`
	width: 100%;
	background: linear-gradient(91.11deg, #FFDCE0 0%, #FFDCE0 99.07%);
	padding: 12px;
	margin-bottom: 22px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2%;
	display: none;
	transition: all 1s ease-in-out;
	
	span{
		display: block;
		width: 80%;
		font-size: 16px;
		color: rgba(177, 69, 77, 1);
	}
	img{
		width: 18px;
		cursor: pointer;
	}
	
	&.active{
		display: flex;
		animation: ${fadeIn} 0.3s ease-in-out;
		animation-fill-mode: forwards;
	}
	&.close{
		display: flex;
		animation: ${fadeOut} 0.3s ease-in-out;
		animation-fill-mode: forwards;
		/* display: none; */
	}
`
const Box = styled.div`
    width: 480px;
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
        padding: 11px 16px;
        border: 1px solid #004c64;
        border-radius: 9px;
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
                text-decoration: underline;
            }
        }
    }
`