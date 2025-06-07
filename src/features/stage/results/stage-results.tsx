import { useIsHost } from 'playroomkit'
import { Button } from '@/shared/ui/button'
import { goToStageStart } from '../model/use-stage'

export function StageResults() {
	// const { restartGame } = useGameStage()
	const isHost = useIsHost()
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			{isHost && (
				<Button size='lg' onClick={goToStageStart}>
					Restart Game
				</Button>
			)}
		</div>
	)
}
