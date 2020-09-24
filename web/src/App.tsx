import React from 'react'
import Routes from './routes'
import { AuthProvider } from './contexts/auth'

import './assets/styles/global.css'
import './assets/styles/button.css'
import './assets/styles/input.css'

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	)
}

export default App