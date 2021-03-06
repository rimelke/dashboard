import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Sidebar from '../components/Sidebar'

import Home from '../pages/Home'
import Payers from '../pages/Payers'
import Spents from '../pages/Spents'
import DetailedSpent from '../pages/DetailedSpent'
import NewSpent from '../pages/NewSpent'

const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Sidebar />
			<Route path="/" exact component={Home} />
			<Route path="/payers" exact component={Payers} />
			<Route path="/spents" exact component={Spents} />
			<Route path="/spents/new" exact component={NewSpent} />
			<Route path="/spents/detail/:id" component={DetailedSpent} />
		</BrowserRouter>
	)
}

export default AppRoutes