import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'

const AuthRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Route path="/" component={Login} />
		</BrowserRouter>
	)
}

export default AuthRoutes