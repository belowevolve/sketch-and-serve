import { GAME_STAGE, useMultiplayerStage } from '@/features/stage'
import { StageDrawing } from '@/features/stage/drawing'
import { Header } from './header'
import { StageResults } from '../features/stage/results/stage-results'
import { StageNaming } from '@/features/stage/naming'
import { StageWhere } from '@/features/stage/where'
import { StageStart } from '@/features/stage/start'

export function App() {
	return (
		<>
			<Header />
			<StageManager />
		</>
	)
}

function StageManager() {
	const [gameStage] = useMultiplayerStage()
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
