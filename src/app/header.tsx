import { PlayerAvatar, usePlayersReady } from '@/features/player'
import { useIsTimerPaused } from '@/features/stage'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

export function Header() {
	return (
		<header className='mx-auto flex max-w-lsm items-center justify-center'>
			{/* <h1 className='text-2xl font-bold'>Sketch & Serve {gameStage}</h1> */}
			<PlayerList />
			<Timer />
		</header>
	)
}

function PlayerList() {
	const players = usePlayersReady()
	return (
		<ul className='flex overflow-x-auto overflow-y-visible py-2'>
			{players.map(({ player, state }) => {
				const profile = player.getProfile()
				return <PlayerAvatar key={player.id} profile={profile} isReady={state} />
			})}
		</ul>
	)
}

function Timer() {
	const [isPaused, setIsPaused] = useIsTimerPaused()

	return (
		<div className='bg-white'>
			<Button size='icon' onClick={() => setIsPaused(!isPaused)}>
				<Icon icon={isPaused ? 'lucide--play' : 'lucide--pause'} className='size-6' />
			</Button>

			{/* <p className='text-lg'>
				Timer: {secondsLeft} seconds <button onClick={togglePause}>Pause</button>
			</p>
			<button onClick={restartGame}>Restart Game</button> */}
		</div>
	)
}
