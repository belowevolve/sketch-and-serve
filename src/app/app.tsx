import { GAME_STAGE, useStage } from '@/features/stage'
import { StageDrawing } from '@/features/stage/drawing'
import { StageNaming } from '@/features/stage/naming'
import { StageStart } from '@/features/stage/start'
import { StageWhere } from '@/features/stage/where'
import { StageResults } from '../features/stage/results/stage-results'
import { Header } from './header'

export function App() {
	return (
		<>
			<Header />
			<StageManager />
		</>
	)
}

function StageManager() {
	const [gameStage] = useStage()
	return (
		<main className='mx-auto max-w-lsm'>
			{
				{
					[GAME_STAGE.START]: <StageStart />,
					[GAME_STAGE.NAMING]: <StageNaming />,
					[GAME_STAGE.DRAWING]: <StageDrawing />,
					[GAME_STAGE.WHERE]: <StageWhere />,
					[GAME_STAGE.RESULTS]: <StageResults />,
				}[gameStage]
			}
		</main>
	)
}

function PauseOverlay() {
	return (
		<div className='absolute inset-0 grid place-items-center'>
			<h1>Game is paused</h1>
		</div>
	)
}
