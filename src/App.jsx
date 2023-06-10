import React, { useEffect, useState } from 'react';
import './assets/css/style.css';
import MainRouter from './components/routers/router/MainRouter';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from './config/axios';
import { editUserData, logout } from './store/authSlice';
import SessionExpired from './components/modals/auth/SessionExpired';


export const env = import.meta.env

const App = () => {
	const dispatch = useDispatch()
	// global state
	const { isAuthenticated } = useSelector(state => state.auth)
	// local state
	const [isSessionExpired, setExpired] = useState(false)
	// functions
	const validateUser = () => {
		authApi
			.get('/accounts/app/')
			.then(res => {
				const { statusCode, data } = res.data

				if (statusCode === 6000) {
					dispatch(editUserData({
						name: data.name,
						email: data.email,
						username: data.username,
					}))
				} else {
					setExpired(true)
				}
			})
			.catch(e => {
				if (e.response.status === 401) {
					setExpired(true)
				}
			})
	}

	useEffect(() => {
		const authURLS = ['/sign-in','/sign-up','/sign-in/','/sign-up/',]
		
		if (isAuthenticated && !authURLS.includes(location.pathname)) validateUser()
	}, [])

	return (
		<>
			{isSessionExpired &&
				<SessionExpired
					closeHandler={() => setExpired(false)}
				/>
			}
			<MainRouter />
		</>
	)
}

export default App