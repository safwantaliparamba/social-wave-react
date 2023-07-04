import React, { useEffect, useMemo, useState } from 'react'

import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

// import tickIcon from '../../../assets/icons/tick.svg'
import Logo from '../../includes/extra/Logo'
import { login } from '../../../store/authSlice'
import SilentLink from '../../includes/extra/SilentLink'
import eyeIcon from '../../../assets/icons/eye.svg'
import ThemeToggle from '../../includes/extra/ToggleTheme'
import heroImg from '../../../assets/images/hero.svg'
import closeIcon from '../../../assets/icons/close.svg'
import hideIcon from '../../../assets/icons/hide-eye.svg'
import googleLogo from '../../../assets/images/google-logo.svg'
import Emailverification from '../../modals/auth/Emailverification'
import useApi from '../../hooks/useApi'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, googleAuthProvider } from '../../../config/firebase'
import GoogleAuthResult from '../../modals/auth/GoogleAuthResult'


const SignUp = ({ type = "SIGNUP" }) => {
	// -------global state-------
	const theme = useSelector(state => state.ui.theme)

	// ----------hooks----------
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const [searchParams] = useSearchParams({
		next: "/"
	})
	const { api: loginApi, controller: loginAborter } = useApi()
	const { api: signupApi, controller: signupController } = useApi()
	const { api, controller } = useApi()

	// local variables
	const initialInputs = {
		name: "",
		email: "",
		password: "",
		confirm_password: "",
	}
	// -------local state-------
	const [inputs, setInputs] = useState({ ...initialInputs })
	const [isShow, setShow] = useState({
		password: false,
		confirm_password: false,
	})
	const [errorMessage, setErrorMessage] = useState("")
	const [isMailSent, setIsSent] = useState(false)
	const [isError, setError] = useState("") // "active" or "close"
	const [isLoading, setLoading] = useState(false)
	const [isShowGoogleModal, setGoogle] = useState(false)

	// Effects
	useEffect(() => {
		setInputs({ ...initialInputs })
		setError("")
	}, [location.pathname])

	// -----functions----

	// function to set error messages  
	const setErrors = (errorMessage = "") => {
		setErrorMessage(errorMessage)
		setError("active")

		return true
	}

	// function for capture inputs 
	const onChange = useMemo(() =>
		(e) => {
			setInputs({ ...inputs, [e.target.name]: e.target.value })
		}
		, [inputs])

	// function for toggle password type
	const togglePasswordType = useMemo(() => (
		(password_type) => setShow({ ...isShow, [password_type]: !isShow[password_type] })
	), [isShow])

	// function for closing error message dialogue box
	const closeErrorMessage = useMemo(() => (
		() => {
			setErrorMessage("")
			setError("close")
		}
	), [])
	// email validation function
	const validateEmail = (email = "") => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}

	const validate = () => {
		console.log(inputs);

		if (type === "SIGNUP") {
			// signup error validation
			if (inputs.name.length < 6) {
				return setErrors("Please ensure name has atleast 6 characters")
			}
			if (inputs.password != inputs.confirm_password) {
				return setErrors("Entered passwords are not equal")
			}
		}
		// common error validation
		if (!inputs.email.length) {
			return setErrors("Please enter your email")
		}
		if (!validateEmail(inputs.email)) {
			return setErrors("please enter a valid email")
		}
		if (inputs.password.length < 8) {
			return setErrors("Please ensure password has atleast 8 characters")
		}


		return false
	}

	// Sign-in/Login Handler
	const SignInHandler = useMemo(() => (
		async () => {
			const isErrorsOccured = validate()

			if (isErrorsOccured) {
				return
			}

			loginApi
				.post("/accounts/sign-in/", { ...inputs }, {
					signal: loginAborter.signal,
				})
				.then((res) => {
					const { statusCode, data } = res.data

					if (statusCode === 6000) {

						dispatch(login({
							name: data.name,
							email: data.email,
							image: data.image,
							username: data.username,
							accessToken: data.access,
							refreshToken: data.refresh,
							sessionId: data.session_id,
						}))
						const next = searchParams.get("next")

						navigate(next)
					} else {
						setErrors(data.message)
					}
				})
				.catch(e => {

					if (axios.isCancel(e)) {
						console.log("Request cancelled");
					}
					console.log(e.message, "error message")
				})
		}
	), [inputs])

	// Signup/Register Handler
	const SignupHandler = useMemo(() => (
		() => {
			const isErrorOccured = validate()

			if (isErrorOccured) {
				return
			}
			signupApi
				.post("/accounts/sign-up/", { ...inputs }, {
					signal: signupController.signal
				})
				.then(res => {
					const { statusCode, data } = res.data

					if (statusCode === 6000) {
						setIsSent(data.is_mailed)
					} else {
						setErrors(data.message)
					}
				})
				.catch(e => console.log(e.message))
		}
	), [inputs])

	const SignInWithGoogleHandler = useMemo(() => (
		async () => {

			setGoogle(true)
			setLoading(true)
			try {
				const result = await signInWithPopup(auth, googleAuthProvider)

				const params = {
					email: result?.user?.email,
					name: result?.user?.displayName
				}

				api
					.post(`/accounts/sign-in-with-google/`, params)
					.then(({ data: { statusCode, data } }) => {

						if (statusCode === 6000) {
							dispatch(login({
								name: data.name,
								email: data.email,
								image: data.image,
								username: data.username,
								accessToken: data.access,
								refreshToken: data.refresh,
								sessionId: data.session_id,
							}))
							const next = searchParams.get("next")

							setGoogle(false)
							setLoading(false)
							navigate(next)
						}
					})

			} catch (e) {
				setGoogle(false)
				setLoading(false)
				console.log(e);
			}
		}
	), [])

	useEffect(() => {

		return () => {
			signupController.abort("user navigated to another page")
			loginAborter.abort("user navigated to another page")
		}
	}, [location.pathname])

	// Email modal close handler
	const emailModalCloseHandler = useMemo(() => (
		() => {
			setIsSent(false)
			navigate('/sign-in/')
		}
	), [])

	// title based on screen(SIGNUP | SIGNIN)
	const title = type === "SIGNUP" ? "Create an account" : "Hi, Welcome Back! 👋"
	// google authentication title based on screen(SIGNUP || SIGNIN)
	const buttonTitle = type === "SIGNUP" ? "Sign Up" : "Sign In"

	return (
		<>
			{isMailSent &&
				<Emailverification
					email={inputs.email}
					closeHandler={emailModalCloseHandler}
				/>
			}
			{isShowGoogleModal && (
				<GoogleAuthResult isLoading={isLoading} />
			)}
			<Wrapper theme={theme}>
				<Left theme={theme}>
					<div className="top">
						<Logo />
					</div>
					<div className="hero">
						<img src={heroImg} alt="" />
					</div>
				</Left>
				<Right theme={theme}>
					<ToggleWrapper>
						<div className="logo-wrapper">
							<Logo />
						</div>
						<ThemeToggle />
					</ToggleWrapper>
					<div>
						<Top theme={theme}>
							<h1>{title}</h1>
							<span>Where Opinions Shape News</span>
						</Top>
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
							{type === "SIGNUP" && (
								<InputContainer>
									<input
										type="text"
										name="name"
										placeholder="Name"
										value={inputs.name}
										onChange={onChange}
									/>
								</InputContainer>
							)}
							<InputContainer>
								<input
									type="email"
									name="email"
									placeholder="Email"
									onChange={onChange}
									value={inputs.email}
								/>
							</InputContainer>
							<InputContainer>
								<input
									type={!isShow.password ? "password" : "text"}
									name="password"
									placeholder="Password"
									onChange={onChange}
									value={inputs.password}
								/>
								<img
									src={isShow.password ? eyeIcon : hideIcon}
									alt="toggle password"
									onClick={() => togglePasswordType("password")}
								/>
							</InputContainer>
							{type === "SIGNUP" && (
								<InputContainer>
									<input
										type={!isShow.confirm_password ? "password" : "text"}
										name="confirm_password"
										placeholder="Confirm Password"
										onChange={onChange}
										value={inputs.confirm_password}
									/>
									<img
										src={isShow.confirm_password ? eyeIcon : hideIcon}
										alt="toggle password"
										onClick={() => togglePasswordType("confirm_password")}
									/>
								</InputContainer>
							)}
							<SubmitButton
								theme={theme}
								onClick={type === "SIGNIN" ? SignInHandler : SignupHandler}
							>
								<span>{buttonTitle}</span>
							</SubmitButton>

							{type === "SIGNIN" && (
								<ForgotPasswordSection theme={theme}>
									<div className="right">
										<span>Forgot Password?</span>
									</div>
								</ForgotPasswordSection>
							)}

						</Form>
						<Actions theme={theme}>
							<div className="or">
								<span>Or</span>
							</div>
							<SubmitButton
								className="google"
								theme={theme}
								onClick={SignInWithGoogleHandler}
							>
								<img src={googleLogo} alt="" />
								<span>
									{type === "SIGNUP" ? "Sign Up" : "Login"} with Google
								</span>
							</SubmitButton>
							<LoginActionContainer theme={theme}>
								{
									type === "SIGNUP" ? (
										<>
											<span theme={theme}>Already have an account?</span>
											<SilentLink to='/sign-in'>Login</SilentLink>
										</>
									) : (
										<>
											<span theme={theme}>Don’t have an account?</span>
											<SilentLink to='/sign-up'>Sign up</SilentLink>
										</>
									)
								}
							</LoginActionContainer>
						</Actions>
					</div>
				</Right>
			</Wrapper>
		</>
	)
}

export default SignUp


const Wrapper = styled.section`
	display: flex;
	min-height: 100vh;

	*{
		transition: all 0.4s ease-in-out;
	}
`
const Left = styled.div`
	width: 50%;
	min-height: 100vh;
	/* padding: 32px; */
	background-color: ${({ theme }) => theme === "DARK" ? "#111111f2" : "#fff"};
	/* background-color: ${({ theme }) => theme === "DARK" ? "#333333" : "#fff"}; */

	.top{
		padding: 22px;
		img{
			width: 150px;
			cursor: pointer;
		}
	}
	.hero {
		padding: 42px 0;
		height: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
		img{
			width: 75%;
			margin: 0 auto;
		}
	}
	@media screen and (max-width:1180px) {
		display: none;
	}
`

const ToggleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 6px;

	.logo-wrapper{
		display: none;
	}

	@media screen and (max-width:1180px) {
		.logo-wrapper{
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;

			img{
				width: 150px;
			}
		}
	}
`

const Right = styled.div`
	width: 50%;
	min-height: 100vh;
	/* padding: 22px 0; */
	background-color: ${({ theme }) => theme === "DARK" ? "#37474f" : "#00b90214"};
	/* background-color: ${({ theme }) => theme === "DARK" ? "#2f3e2f" : "#00b90214"}; */
	
	@media screen and (max-width:1180px) {
		width: 100%;
		/* background-color: ${({ theme }) => theme === "DARK" ? "#1a1a1a" : "#00b90214"}; */
	}
`

const Top = styled.div`
	padding: 48px 0;
	text-align: center;

	h1{
		font-size: 32px;
		font-family: gordita_bold;
		color:${({ theme }) => theme === "DARK" ? "#fff" : "#111"};
	}
	span{
		font-size: 16px;
		color:${({ theme }) => theme === "DARK" ? "#ffffffe5" : "#000000e5"};
	}

	@media screen and (max-width:1180px) {
		padding: 32px 0;
	}
	@media screen and (max-width:680px) {
		h1{
			font-size: 27px;
		}
		span{
			font-size: 15px;
		}
	}
`

const Form = styled.div`
	width: 55%;
	transition: all 0.3s ease-in-out;
	margin: 0 auto;

	@media screen and (max-width:1580px) {
		width: 65%;
	}
	@media screen and (max-width:1180px) {
		width: 45%;
	}
	@media screen and (max-width:890px) {
		width: 60%;
	}
	@media screen and (max-width:580px) {
		width: 80%;
	}
`

const Actions = styled.div`
	width: 55%;
	margin: 0 auto;

	.or{
		text-align: center;
		padding: 26px 0;
		span{
			display: block;
			position: relative;
			font-size: 16px;
			color: ${({ theme }) => theme === "DARK" ? "#fff" : "#000"};
			

			::before{
				position: absolute;
				content: ' ';
				width: 40%;
				height: 1px;
				top: 11px;
				right: 60%;
				background-color: ${({ theme }) => theme === "DARK" ? "#ffffffb2" : "rgba(0, 0, 0, 0.3)"};
			}
			::after{
				position: absolute;
				content: ' ';
				width: 40%;
				height: 1px;
				top: 11px;
				left: 60%;
				background-color: ${({ theme }) => theme === "DARK" ? "#ffffffb2" : "rgba(0, 0, 0, 0.3)"};
			}
		}
	}
	@media screen and (max-width:1580px) {
		width: 65%;
	}
	@media screen and (max-width:1180px) {
		width: 45%;
	}
	@media screen and (max-width:890px) {
		width: 60%;
	}
	@media screen and (max-width:580px) {
		width: 80%;
	}
`
const InputContainer = styled.div`
	padding: 14px 20px;
	background-color: #ffffff;
	margin-bottom: 22px;
	border: 1px solid #00000033;
	display: flex;
	align-items: center;
    justify-content: space-between;
	gap: 24px;
	border-radius:10px;

	input{
		/* width: 100%; */
        flex: 1;
		padding: 6px;
		font-size: 16px;
	}

	img{
		width: 26px;
		cursor: pointer;
	}

	@media screen and (max-width:1280px) {
		padding: 8px 16px;
	}
	@media screen and (max-width:580px) {
		padding: 6px 14px;
        gap: 0;

		input{
			font-size: 15px;
		}
	}
`

const SubmitButton = styled.button`
	width: 100%;
	cursor: pointer;
	padding: 14px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 14px;
	background-color: ${({ theme }) => theme === "DARK" ? "#ba68c8" : "#4e2056b0"};
	border-radius: 8px;
    /* #4e2056b0 - button light */
    /* #ba68c8 - button light */
    /* #37474f - bg dark */

	span{
		color: #fff;
		font-size: 17px;
		font-family: gordita_bold;
		line-height: 24px;
	}

	&.google{
		background-color: ${({ theme }) => theme === "DARK" ? "#fff" : "#ffffffb2"};
		border: 1px solid #00000033;

		img{
			width: 28px;
		}
		span{
			color: #111;
			font-family: gordita_regular;
			font-weight: 600;
		}
	}

	@media screen and (max-width:1280px) {
		padding: 10px;
	}
	@media screen and (max-width:580px) {
		padding: 8px;

		span{
			font-size: 15px;
		}
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
	@media screen and (max-width:580px) {
		gap: 10px;
		span{
			font-size: 14px;
		}
	}
`
const LoginActionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 18px;

	span{
		font-size: 17px;
		color: ${({ theme }) => theme === "DARK" ? "#fff" : "#111"};
		/* font-weight: 600; */
	}
	a{
		text-decoration: underline;
		color:${({ theme }) => theme === "DARK" ? "#ba68c8" : "#4e2056b0"};
		font-weight: 600;
	}
`

const ForgotPasswordSection = styled.div`
	display: flex;
	align-items: center;
    justify-content: flex-end;
	/* justify-content: space-between; */
	padding: 18px 0;

	.left{
		display: flex;
		align-items: center;
		gap: 12px;

		span.tick{
			width: 20px;
			height: 20px;
			border-radius: 5px;
			cursor: pointer;
			border: 1px solid ${({ theme }) => theme === "DARK" ? "#cdd1e0" : "#111"};
			display: flex;
			align-items: center;
			justify-content: center;

			&.active{
				background: #fff;

				img{
					width: 15px;
				}
			}
		}
		span:not(span.tick){
			font-size: 16px;
			cursor: pointer;
			color:  ${({ theme }) => theme === "DARK" ? "#ffffffb2" : "#000c14b2"};
		}
	}
	.right{
		span{
			font-size: 16px;
			color: ${({ theme }) => theme === "DARK" ? "#ffc9c9" : "#f44949"};
			/* color: ${({ theme }) => theme === "DARK" ? "#ff9a9a" : "#e86969"}; */
			cursor: pointer;
		}
	}
`