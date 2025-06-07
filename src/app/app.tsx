import { GAME_STAGE, useIsTimerPaused, useStage } from '@/features/stage'
import { StageDrawing } from '@/features/stage/drawing'
import { StageNaming } from '@/features/stage/naming'
import { StageStart } from '@/features/stage/start'
import { StageWhere } from '@/features/stage/where'
import { Button } from '@/shared/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer'
import { StageResults } from '../features/stage/results/stage-results'
import { Header } from './header'

export function App() {
	return (
		<>
			<Header />
			<StageManager />
			<PauseOverlay />
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
	const [isPaused, setIsPaused] = useIsTimerPaused()

	return (
		<Drawer open={isPaused} onOpenChange={setIsPaused}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Game is paused</DrawerTitle>
				</DrawerHeader>
				<DrawerFooter>
					<Button onClick={() => setIsPaused(false)}>Resume</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
