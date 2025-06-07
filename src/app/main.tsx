import { insertCoin } from 'playroomkit'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GAME_STAGE, GAME_STAGE_DURATIONS } from '@/features/stage'
import { App } from './app'
import { AppDevTools } from './app-dev-tools'
import './app.css'

const root = createRoot(document.getElementById('root')!)

root.render(
	<div className='grid min-h-screen place-items-center bg-gradient-to-b from-[#272729] to-[#121316]'>
		<div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-b-transparent'></div>
	</div>
)

insertCoin({
	defaultStates: {
		stage: GAME_STAGE.START,
		'START-secondsLeft': GAME_STAGE_DURATIONS.START,
		'NAMING-secondsLeft': GAME_STAGE_DURATIONS.NAMING,
		'DRAWING-secondsLeft': GAME_STAGE_DURATIONS.DRAWING,
		'RESULTS-secondsLeft': GAME_STAGE_DURATIONS.RESULTS,
	},
	defaultPlayerStates: { ready: false },
}).then(() => {
	root.render(
		<>
			<App />
			{import.meta.env.DEV && <AppDevTools />}
		</>
	)
})
