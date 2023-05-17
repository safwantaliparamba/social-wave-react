import React from 'react';
import './assets/css/style.css';
import MainRouter from './components/routers/router/MainRouter';


export const env = import.meta.env

const App = () => {

	return (
		<>
			<MainRouter />
		</>
	)
}

export default App