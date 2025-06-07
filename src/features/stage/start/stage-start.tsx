import { ReadyButton, useOnAllPlayersReady } from '@/features/player'
import { updateSecondsLeft, useCountDown } from '../model/use-timer'

export function StageStart() {
	return (
		<div className='flex flex-col gap-4'>
			StageStart
			<div>rules here</div>
			<div>wait to every one ready</div>
			<ReadyButton />
			<ReadyOverlay />
		</div>
	)
}

function ReadyOverlay() {
	const secondsLeft = useCountDown('NAMING')
	useOnAllPlayersReady(
		() => updateSecondsLeft(3, 'START'),
		() => updateSecondsLeft(null, 'START')
	)

	if (!secondsLeft || secondsLeft <= 0) return null
	return (
		<div className='pointer-events-none fixed inset-0 bg-black/50'>
			<div className='flex h-full w-full items-center justify-center'>
				<div className='flex flex-col items-center gap-4'>
					<p>Ready to start in {secondsLeft} seconds</p>
				</div>
			</div>
		</div>
	)
}
