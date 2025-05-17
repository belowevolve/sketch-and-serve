import { useGameStage } from '@/features/game-stage/use-game-stage'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { cn } from '@/shared/lib/css'
import { Icon } from '@/shared/ui/icon'
import { usePlayersList } from 'playroomkit'

export function Navbar() {
	const { gameStage } = useGameStage()
	return (
		<nav className='flex flex-col items-center justify-between p-4'>
			<h1 className='text-2xl font-bold'>Sketch & Serve {gameStage}</h1>
			<PlayerList />
			<Timer />
		</nav>
	)
}

function PlayerList() {
	const players = usePlayersList()

	return (
		<ul className='flex items-center gap-2'>
			{players.map((player) => {
				const profile = player.getProfile()
				const isReady = player.getState('ready')
				return (
					<li key={player.id} className='relative'>
						<Avatar>
							<AvatarImage src={profile.photo} className={cn('transition-all', !isReady && 'grayscale')} />
							<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
						</Avatar>
						{isReady ? (
							<span
								className='border-background absolute -end-1 -bottom-1 size-6 rounded-full border-2 bg-emerald-500'
								aria-label='Ready'
							></span>
						) : (
							<span
								className='bg-background absolute -end-1 -bottom-1 grid size-6 place-items-center rounded-full border-2 p-0.5'
								aria-label='Not Ready'
							>
								<Icon icon='lucide--pen-line' className='size-4' />
							</span>
						)}
					</li>
				)
			})}
		</ul>
	)
}

function Timer() {
	const { secondsLeft, togglePause, startGame, restartGame } = useGameStage()
	return (
		<>
			<p className='text-lg'>
				Timer: {secondsLeft} seconds <button onClick={togglePause}>Pause</button>
			</p>
			<button onClick={startGame}>Start Game</button>
			<button onClick={restartGame}>Restart Game</button>
		</>
	)
}
