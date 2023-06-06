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
	const { isAuthenticated, sessionId } = useSelector(state => state.auth)
	// local state
	const [isSessionExpired, setExpired] = useState(false)

	const logoutHandler = () => {
		dispatch(logout())
		setExpired(true)
	}

	const validateUser = () => {
		authApi
			.get('/accounts/app/', {
				params: {
					session_id: sessionId,
				}
			})
			.then(res => {
				const { statusCode, data } = res.data

				if (statusCode === 6000) {
					dispatch(editUserData({
						name: data.name,
						email: data.email,
						username: data.username,
						// sessionId: data.session_id,
					}))
				} else {
					logoutHandler()
				}
			})
			.catch(e => {
				if (e.response.status === 401) {
					logoutHandler()
				}
			})
	}

	useEffect(() => {
		if (isAuthenticated) {
			validateUser()
		}
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