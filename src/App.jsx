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
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	// local state
	const [isSessionExpired, setExpired] = useState(false)

	const validateUser = () => {
		authApi
			.get('/accounts/app/')
			.then(res => {
				const { statusCode, data } = res.data
				console.log(res.data);

				if (statusCode === 6000) {
					dispatch(editUserData({
						name: data.name,
						email: data.email,
						username: data.username,
						// sessionId: data.session_id,
					}))
				}
			})
			.catch(e => {
				if (e.response.status === 401) {
					dispatch(logout())
					setExpired(true)
				}
			})
	}
	console.log(isSessionExpired);
	useEffect(() => {
		if (isAuthenticated) {
			validateUser()
		}
	}, [])

	return (
		<>
			{isSessionExpired && <SessionExpired closeHandler={() => setExpired(false)} />}
			<MainRouter />
		</>
	)
}

export default App