import { insertCoin } from 'playroomkit'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { AppDevTools } from './app-dev-tools'
import './app.css'

const root = createRoot(document.getElementById('root')!)

root.render(
	<div className='grid min-h-screen place-items-center bg-gradient-to-b from-[#272729] to-[#121316]'>
		<div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-b-transparent'></div>
	</div>
)

insertCoin().then(() => {
	root.render(
		<StrictMode>
			<App />
			{import.meta.env.DEV && <AppDevTools />}
		</StrictMode>
	)
})
