import React from 'react'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'

import './assets/styles/global.css'
import './assets/styles/button.css'

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	)
}

export default App