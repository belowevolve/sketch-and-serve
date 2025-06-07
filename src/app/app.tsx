import { useIsHost } from 'playroomkit'
import { memo, useEffect, useState } from 'react'
import { GAME_STAGE, goToNextStage, switchStage, useCountDown, useIsTimerPaused, useStage } from '@/features/stage'
import { StageDrawing } from '@/features/stage/drawing'
import { StageNaming } from '@/features/stage/naming'
import { StageStart } from '@/features/stage/start'
import { StageWhere } from '@/features/stage/where'
import { Button } from '@/shared/ui/button'
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/shared/ui/drawer'
import { StageResults } from '../features/stage/results/stage-results'
import { Header } from './header'

const StageManager = memo(() => {
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
})

export function App() {
	return (
		<>
			<Header />
			<StageManager />
			<PauseOverlay />
		</>
	)
}

function TimeLeft({ children }: { children: React.ReactNode }) {
	return children
}

function WithHostProviders({ children }: { children: React.ReactNode }) {
	const isHost = useIsHost()
	console.log('isHost', isHost)
	return isHost ? <TimeLeft>{children}</TimeLeft> : children
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
