import { Button } from '@/shared/ui/button'
import { useIsHost } from 'playroomkit'

export function StageResults() {
	// const { restartGame } = useGameStage()
	const isHost = useIsHost()
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			{isHost && <Button size='lg'>Restart Game</Button>}
		</div>
	)
}
